/**
 * 8-0 World Cup Draft — data pipeline.
 *
 * Reads the Fjelstul World Cup CSVs (downloaded to /tmp), filters to the men's
 * tournaments 1990–2022, joins squads + goals + standings + awards, generates a
 * 1–99 rating for every player, and writes a TypeScript dataset.
 *
 * Run:  node scripts/8-0/processData.mjs
 * Out:  app/8-0/data/players.generated.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const CSV_DIR = '/tmp';
const OUT_FILE = path.join(REPO_ROOT, 'app', '8-0', 'data', 'players.generated.ts');

const MEN_TOURNAMENTS = {
  'WC-1990': 1990,
  'WC-1994': 1994,
  'WC-1998': 1998,
  'WC-2002': 2002,
  'WC-2006': 2006,
  'WC-2010': 2010,
  'WC-2014': 2014,
  'WC-2018': 2018,
  'WC-2022': 2022,
};

// ---------------------------------------------------------------------------
// Minimal robust CSV parser (handles quoted fields + escaped quotes).
// ---------------------------------------------------------------------------
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n') {
      row.push(field); field = '';
      rows.push(row); row = [];
    } else if (c === '\r') {
      // ignore
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function readCSV(name) {
  const file = path.join(CSV_DIR, `wc_${name}.csv`);
  const text = fs.readFileSync(file, 'utf8');
  const rows = parseCSV(text);
  const header = rows[0];
  return rows.slice(1).filter((r) => r.length === header.length).map((r) => {
    const obj = {};
    header.forEach((h, idx) => { obj[h] = r[idx]; });
    return obj;
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const stripAccents = (s) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function displayName(family, given) {
  const f = (family || '').trim();
  const g = (given || '').trim();
  if (!g || g.toLowerCase() === 'not applicable') return f;
  return `${g} ${f}`;
}

const norm = (s) => stripAccents(s).toLowerCase().trim();

// deterministic small jitter from a string
function hashJitter(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return (h % 3) - 1; // -1, 0, +1
}

function groupFromCode(code) {
  switch (code) {
    case 'GK': return 'GK';
    case 'DF': return 'DEF';
    case 'MF': return 'MID';
    case 'FW': return 'FWD';
    default: return 'MID';
  }
}

function specificPosition(code, shirt) {
  const n = parseInt(shirt, 10) || 0;
  if (code === 'GK') return 'GK';
  if (code === 'DF') return ({ 2: 'RB', 3: 'LB', 4: 'CB', 5: 'CB', 6: 'CB', 12: 'RB', 13: 'LB' })[n] || 'CB';
  if (code === 'MF') return ({ 4: 'CDM', 5: 'CDM', 6: 'CDM', 7: 'RM', 8: 'CM', 10: 'CAM', 11: 'LM' })[n] || 'CM';
  if (code === 'FW') return ({ 7: 'RW', 9: 'ST', 10: 'CF', 11: 'LW', 17: 'LW' })[n] || 'ST';
  return 'CM';
}

// ---------------------------------------------------------------------------
// Load & index source data
// ---------------------------------------------------------------------------
const squads = readCSV('squads').filter((r) => MEN_TOURNAMENTS[r.tournament_id]);
const goals = readCSV('goals').filter((r) => MEN_TOURNAMENTS[r.tournament_id]);
const standings = readCSV('tournament_standings').filter((r) => MEN_TOURNAMENTS[r.tournament_id]);
const awardWinners = readCSV('award_winners').filter((r) => MEN_TOURNAMENTS[r.tournament_id]);

// goals per player per tournament (exclude own goals)
const goalsByKey = {};
for (const g of goals) {
  if (g.own_goal === '1') continue;
  const key = `${g.tournament_id}|${g.player_id}`;
  goalsByKey[key] = (goalsByKey[key] || 0) + 1;
}

// final standing position per team per tournament
const standingByKey = {};
for (const s of standings) {
  standingByKey[`${s.tournament_id}|${s.team_id}`] = parseInt(s.position, 10);
}

// awards per player per tournament
const awardsByKey = {};
for (const a of awardWinners) {
  const key = `${a.tournament_id}|${a.player_id}`;
  (awardsByKey[key] ||= []).push(a.award_name);
}

// ---------------------------------------------------------------------------
// Rating model
// ---------------------------------------------------------------------------
const BASE = 73;

function teamBoost(position) {
  if (!position) return -1;
  if (position === 1) return 15;
  if (position === 2) return 12;
  if (position === 3) return 10;
  if (position === 4) return 8;
  if (position <= 8) return 5;
  if (position <= 16) return 2;
  return 0;
}

// Flat role bonus: regular starters (1–11) are clearly better than deep squad.
function starterBonus(shirt) {
  const n = parseInt(shirt, 10) || 0;
  if (n >= 1 && n <= 11) return 4;
  if (n >= 12 && n <= 16) return 1;
  if (n === 0) return 1;
  return -3;
}

const AWARD_BOOST = {
  'Golden Ball': 13, 'Silver Ball': 8, 'Bronze Ball': 6,
  'Golden Boot': 10, 'Silver Boot': 6, 'Bronze Boot': 4,
  'Golden Glove': 11, 'Best Young Player': 6,
};

function computeRating({ tournamentId, teamId, playerId, shirt, goalCount }) {
  const pos = standingByKey[`${tournamentId}|${teamId}`];
  const tb = teamBoost(pos);
  const goalBoost = Math.min(goalCount * 1.6, 9);
  const awards = awardsByKey[`${tournamentId}|${playerId}`] || [];
  let awardBoost = 0;
  for (const a of awards) awardBoost += AWARD_BOOST[a] || 0;
  awardBoost = Math.min(awardBoost, 16);
  let r = BASE + tb * 0.6 + starterBonus(shirt) + goalBoost + awardBoost;
  r += hashJitter(playerId);
  return Math.max(70, Math.min(99, Math.round(r)));
}

// ---------------------------------------------------------------------------
// Curated overrides for iconic players (matched on year|code|normalized name).
// rating + optional true position.
// ---------------------------------------------------------------------------
const OVERRIDES = [
  // 1990
  ['ARG', 1990, 'Diego Maradona', 95, 'CAM'],
  ['DEU', 1990, 'Lothar Matthäus', 92, 'CM'], ['DEU', 1990, 'Jürgen Klinsmann', 88, 'ST'],
  ['DEU', 1990, 'Rudi Völler', 86, 'ST'], ['DEU', 1990, 'Andreas Brehme', 85, 'LB'],
  ['ITA', 1990, 'Salvatore Schillaci', 88, 'ST'], ['ITA', 1990, 'Roberto Baggio', 88, 'CF'],
  ['ITA', 1990, 'Franco Baresi', 88, 'CB'], ['ITA', 1990, 'Paolo Maldini', 86, 'LB'],
  // 1994
  ['BRA', 1994, 'Romário', 94, 'ST'], ['BRA', 1994, 'Bebeto', 88, 'ST'],
  ['BRA', 1994, 'Dunga', 84, 'CDM'], ['BRA', 1994, 'Cafu', 83, 'RB'],
  ['ITA', 1994, 'Roberto Baggio', 93, 'CF'], ['ITA', 1994, 'Paolo Maldini', 90, 'LB'],
  ['ITA', 1994, 'Franco Baresi', 89, 'CB'],
  ['BGR', 1994, 'Hristo Stoichkov', 90, 'LW'],
  // 1998
  ['FRA', 1998, 'Zinedine Zidane', 95, 'CAM'], ['FRA', 1998, 'Thierry Henry', 86, 'LW'],
  ['FRA', 1998, 'Lilian Thuram', 86, 'RB'], ['FRA', 1998, 'Marcel Desailly', 86, 'CB'],
  ['FRA', 1998, 'Fabien Barthez', 85, 'GK'], ['FRA', 1998, 'Patrick Vieira', 84, 'CM'],
  ['FRA', 1998, 'Didier Deschamps', 84, 'CDM'], ['FRA', 1998, 'Emmanuel Petit', 84, 'CM'],
  ['BRA', 1998, 'Ronaldo', 95, 'ST'], ['BRA', 1998, 'Rivaldo', 90, 'CAM'],
  ['BRA', 1998, 'Roberto Carlos', 90, 'LB'], ['BRA', 1998, 'Cafu', 86, 'RB'],
  ['BRA', 1998, 'Dunga', 84, 'CDM'], ['BRA', 1998, 'Cláudio Taffarel', 84, 'GK'],
  ['ARG', 1998, 'Gabriel Batistuta', 90, 'ST'], ['ARG', 1998, 'Juan Sebastián Verón', 86, 'CM'],
  ['NLD', 1998, 'Dennis Bergkamp', 90, 'CF'], ['NLD', 1998, 'Edgar Davids', 85, 'CM'],
  ['NLD', 1998, 'Patrick Kluivert', 86, 'ST'],
  // 2002
  ['BRA', 2002, 'Ronaldo', 96, 'ST'], ['BRA', 2002, 'Rivaldo', 92, 'CAM'],
  ['BRA', 2002, 'Ronaldinho', 91, 'CAM'], ['BRA', 2002, 'Roberto Carlos', 90, 'LB'],
  ['BRA', 2002, 'Cafu', 88, 'RB'], ['BRA', 2002, 'Lúcio', 86, 'CB'],
  ['BRA', 2002, 'Gilberto Silva', 84, 'CDM'], ['BRA', 2002, 'Kaká', 82, 'CAM'],
  ['DEU', 2002, 'Oliver Kahn', 92, 'GK'], ['DEU', 2002, 'Michael Ballack', 88, 'CM'],
  ['DEU', 2002, 'Miroslav Klose', 86, 'ST'],
  ['PRT', 2002, 'Luís Figo', 90, 'RW'], ['PRT', 2002, 'Rui Costa', 86, 'CAM'],
  ['ENG', 2002, 'David Beckham', 88, 'RM'], ['ENG', 2002, 'Michael Owen', 87, 'ST'],
  ['ENG', 2002, 'Paul Scholes', 86, 'CM'], ['ENG', 2002, 'Sol Campbell', 84, 'CB'],
  ['FRA', 2002, 'Zinedine Zidane', 94, 'CAM'], ['FRA', 2002, 'Thierry Henry', 89, 'ST'],
  // 2006
  ['ITA', 2006, 'Fabio Cannavaro', 94, 'CB'], ['ITA', 2006, 'Gianluigi Buffon', 92, 'GK'],
  ['ITA', 2006, 'Andrea Pirlo', 90, 'CM'], ['ITA', 2006, 'Francesco Totti', 88, 'CAM'],
  ['ITA', 2006, 'Alessandro Nesta', 88, 'CB'], ['ITA', 2006, 'Gennaro Gattuso', 84, 'CDM'],
  ['FRA', 2006, 'Zinedine Zidane', 93, 'CAM'], ['FRA', 2006, 'Thierry Henry', 89, 'ST'],
  ['FRA', 2006, 'Patrick Vieira', 86, 'CM'], ['FRA', 2006, 'Lilian Thuram', 84, 'CB'],
  ['DEU', 2006, 'Michael Ballack', 88, 'CM'], ['DEU', 2006, 'Miroslav Klose', 88, 'ST'],
  ['DEU', 2006, 'Philipp Lahm', 84, 'LB'], ['DEU', 2006, 'Lukas Podolski', 84, 'LW'],
  ['ARG', 2006, 'Juan Román Riquelme', 88, 'CAM'], ['ARG', 2006, 'Hernán Crespo', 86, 'ST'],
  ['ARG', 2006, 'Lionel Messi', 84, 'RW'], ['ARG', 2006, 'Roberto Ayala', 85, 'CB'],
  ['BRA', 2006, 'Ronaldo', 88, 'ST'], ['BRA', 2006, 'Ronaldinho', 90, 'CAM'],
  ['BRA', 2006, 'Kaká', 89, 'CAM'], ['BRA', 2006, 'Roberto Carlos', 86, 'LB'],
  ['PRT', 2006, 'Luís Figo', 86, 'RW'], ['PRT', 2006, 'Cristiano Ronaldo', 86, 'RW'],
  // 2010
  ['ESP', 2010, 'Andrés Iniesta', 92, 'CM'], ['ESP', 2010, 'Xavi', 92, 'CM'],
  ['ESP', 2010, 'Iker Casillas', 90, 'GK'], ['ESP', 2010, 'David Villa', 88, 'ST'],
  ['ESP', 2010, 'Sergio Ramos', 88, 'RB'], ['ESP', 2010, 'Carles Puyol', 87, 'CB'],
  ['ESP', 2010, 'Xabi Alonso', 86, 'CM'], ['ESP', 2010, 'Gerard Piqué', 86, 'CB'],
  ['ESP', 2010, 'Fernando Torres', 85, 'ST'],
  ['NLD', 2010, 'Wesley Sneijder', 89, 'CAM'], ['NLD', 2010, 'Arjen Robben', 89, 'RW'],
  ['NLD', 2010, 'Robin van Persie', 86, 'ST'],
  ['ARG', 2010, 'Lionel Messi', 93, 'RW'], ['ARG', 2010, 'Carlos Tevez', 86, 'ST'],
  ['ARG', 2010, 'Gonzalo Higuaín', 85, 'ST'], ['ARG', 2010, 'Javier Mascherano', 85, 'CDM'],
  ['DEU', 2010, 'Thomas Müller', 86, 'RW'], ['DEU', 2010, 'Mesut Özil', 85, 'CAM'],
  ['DEU', 2010, 'Bastian Schweinsteiger', 86, 'CM'], ['DEU', 2010, 'Miroslav Klose', 86, 'ST'],
  ['URY', 2010, 'Diego Forlán', 90, 'ST'], ['URY', 2010, 'Luis Suárez', 86, 'ST'],
  // 2014
  ['DEU', 2014, 'Manuel Neuer', 92, 'GK'], ['DEU', 2014, 'Thomas Müller', 89, 'RW'],
  ['DEU', 2014, 'Toni Kroos', 89, 'CM'], ['DEU', 2014, 'Philipp Lahm', 88, 'RB'],
  ['DEU', 2014, 'Mesut Özil', 87, 'CAM'], ['DEU', 2014, 'Bastian Schweinsteiger', 87, 'CDM'],
  ['DEU', 2014, 'Mats Hummels', 86, 'CB'], ['DEU', 2014, 'Miroslav Klose', 85, 'ST'],
  ['ARG', 2014, 'Lionel Messi', 95, 'CF'], ['ARG', 2014, 'Javier Mascherano', 86, 'CDM'],
  ['ARG', 2014, 'Ángel Di María', 86, 'RW'], ['ARG', 2014, 'Sergio Agüero', 87, 'ST'],
  ['NLD', 2014, 'Arjen Robben', 90, 'RW'], ['NLD', 2014, 'Robin van Persie', 87, 'ST'],
  ['BRA', 2014, 'Neymar', 90, 'LW'], ['BRA', 2014, 'Thiago Silva', 88, 'CB'],
  ['BRA', 2014, 'David Luiz', 84, 'CB'], ['BRA', 2014, 'Oscar', 83, 'CAM'],
  ['COL', 2014, 'James Rodríguez', 90, 'CAM'],
  // 2018
  ['FRA', 2018, 'Kylian Mbappé', 92, 'ST'], ['FRA', 2018, 'Antoine Griezmann', 90, 'CF'],
  ['FRA', 2018, 'Paul Pogba', 88, 'CM'], ['FRA', 2018, "N'Golo Kanté", 88, 'CDM'],
  ['FRA', 2018, 'Raphaël Varane', 87, 'CB'], ['FRA', 2018, 'Hugo Lloris', 86, 'GK'],
  ['HRV', 2018, 'Luka Modrić', 94, 'CM'], ['HRV', 2018, 'Ivan Rakitić', 87, 'CM'],
  ['HRV', 2018, 'Mario Mandžukić', 84, 'ST'], ['HRV', 2018, 'Ivan Perišić', 84, 'LW'],
  ['BEL', 2018, 'Eden Hazard', 91, 'LW'], ['BEL', 2018, 'Kevin De Bruyne', 90, 'CM'],
  ['BEL', 2018, 'Romelu Lukaku', 86, 'ST'], ['BEL', 2018, 'Thibaut Courtois', 88, 'GK'],
  ['ENG', 2018, 'Harry Kane', 88, 'ST'], ['ENG', 2018, 'Raheem Sterling', 84, 'RW'],
  ['ENG', 2018, 'Jordan Pickford', 82, 'GK'], ['ENG', 2018, 'Harry Maguire', 82, 'CB'],
  ['BRA', 2018, 'Neymar', 91, 'LW'], ['BRA', 2018, 'Philippe Coutinho', 86, 'CAM'],
  ['ARG', 2018, 'Lionel Messi', 94, 'CF'],
  ['PRT', 2018, 'Cristiano Ronaldo', 92, 'ST'],
  // 2022
  ['ARG', 2022, 'Lionel Messi', 96, 'CF'], ['ARG', 2022, 'Julián Álvarez', 86, 'ST'],
  ['ARG', 2022, 'Emiliano Martínez', 88, 'GK'], ['ARG', 2022, 'Ángel Di María', 86, 'RW'],
  ['ARG', 2022, 'Rodrigo De Paul', 84, 'CM'], ['ARG', 2022, 'Enzo Fernández', 84, 'CM'],
  ['ARG', 2022, 'Cristian Romero', 84, 'CB'], ['ARG', 2022, 'Alexis Mac Allister', 84, 'CM'],
  ['FRA', 2022, 'Kylian Mbappé', 95, 'ST'], ['FRA', 2022, 'Antoine Griezmann', 89, 'CF'],
  ['FRA', 2022, 'Olivier Giroud', 85, 'ST'], ['FRA', 2022, 'Hugo Lloris', 86, 'GK'],
  ['FRA', 2022, 'Aurélien Tchouaméni', 85, 'CDM'], ['FRA', 2022, 'Theo Hernández', 83, 'LB'],
  ['BRA', 2022, 'Neymar', 90, 'CAM'], ['BRA', 2022, 'Vinícius Júnior', 88, 'LW'],
  ['BRA', 2022, 'Casemiro', 87, 'CDM'], ['BRA', 2022, 'Thiago Silva', 84, 'CB'],
  ['ENG', 2022, 'Harry Kane', 89, 'ST'], ['ENG', 2022, 'Jude Bellingham', 85, 'CM'],
  ['ENG', 2022, 'Bukayo Saka', 84, 'RW'], ['ENG', 2022, 'Jordan Pickford', 82, 'GK'],
  ['PRT', 2022, 'Cristiano Ronaldo', 87, 'ST'], ['PRT', 2022, 'Bruno Fernandes', 86, 'CAM'],
  ['NLD', 2022, 'Virgil van Dijk', 89, 'CB'], ['NLD', 2022, 'Frenkie de Jong', 86, 'CM'],
  ['HRV', 2022, 'Luka Modrić', 88, 'CM'],
  ['MAR', 2022, 'Achraf Hakimi', 85, 'RB'], ['MAR', 2022, 'Hakim Ziyech', 83, 'RW'],

  // ---- 2006 additions: world-class players dragged down by early exits ----
  ['SWE', 2006, 'Zlatan Ibrahimović', 87, 'ST'],
  ['CIV', 2006, 'Didier Drogba', 87, 'ST'],
  ['ESP', 2006, 'Iker Casillas', 83, 'GK'],
  ['ESP', 2006, 'David Villa', 83, 'ST'],
  ['ESP', 2006, 'Andrés Iniesta', 83, 'CM'],
  ['ENG', 2006, 'Wayne Rooney', 82, 'ST'],
  ['ENG', 2006, 'Steven Gerrard', 83, 'CM'],
  ['ENG', 2006, 'Frank Lampard', 82, 'CM'],

  // ---- 2010 additions ----
  ['PRT', 2010, 'Cristiano Ronaldo', 90, 'RW'],
  ['CIV', 2010, 'Didier Drogba', 88, 'ST'],
  ['CMR', 2010, 'Samuel Eto\'o', 86, 'ST'],
  ['ITA', 2010, 'Andrea Pirlo', 87, 'CM'],
  ['ITA', 2010, 'Gianluigi Buffon', 86, 'GK'],
  ['ITA', 2010, 'Giorgio Chiellini', 82, 'CB'],
  ['GHA', 2010, 'Asamoah Gyan', 82, 'ST'],
  ['ENG', 2010, 'Wayne Rooney', 82, 'ST'],
  ['ENG', 2010, 'Steven Gerrard', 81, 'CM'],

  // ---- 2014 additions ----
  ['PRT', 2014, 'Cristiano Ronaldo', 93, 'RW'],
  ['URY', 2014, 'Luis Suárez', 91, 'ST'],
  ['URY', 2014, 'Diego Godín', 87, 'CB'],
  ['URY', 2014, 'Edinson Cavani', 84, 'ST'],
  ['BEL', 2014, 'Eden Hazard', 87, 'LW'],
  ['BEL', 2014, 'Kevin De Bruyne', 84, 'CM'],
  ['BEL', 2014, 'Romelu Lukaku', 82, 'ST'],
  ['ESP', 2014, 'Andrés Iniesta', 88, 'CM'],
  ['ESP', 2014, 'Xavi', 87, 'CM'],
  ['ESP', 2014, 'Iker Casillas', 84, 'GK'],
  ['ESP', 2014, 'David Silva', 87, 'CAM'],
  ['ESP', 2014, 'Cesc Fàbregas', 85, 'CM'],
  ['ESP', 2014, 'Sergio Ramos', 87, 'CB'],
  ['ESP', 2014, 'Gerard Piqué', 84, 'CB'],
  ['ESP', 2014, 'David Villa', 83, 'ST'],
  ['ITA', 2014, 'Andrea Pirlo', 89, 'CM'],
  ['ITA', 2014, 'Gianluigi Buffon', 88, 'GK'],
  ['ITA', 2014, 'Giorgio Chiellini', 88, 'CB'],
  ['ENG', 2014, 'Wayne Rooney', 84, 'CAM'],
  ['ENG', 2014, 'Steven Gerrard', 82, 'CM'],
  ['ENG', 2014, 'Daniel Sturridge', 82, 'ST'],
  ['CIV', 2014, 'Didier Drogba', 82, 'ST'],
  ['CMR', 2014, 'Samuel Eto\'o', 81, 'ST'],
  ['CHE', 2014, 'Xherdan Shaqiri', 81, 'RW'],
  ['DZA', 2014, 'Riyad Mahrez', 77, 'RW'],

  // ---- 2018 additions ----
  ['URY', 2018, 'Luis Suárez', 88, 'ST'],
  ['URY', 2018, 'Edinson Cavani', 86, 'ST'],
  ['URY', 2018, 'Diego Godín', 87, 'CB'],
  ['DEU', 2018, 'Manuel Neuer', 86, 'GK'],
  ['CHE', 2018, 'Xherdan Shaqiri', 81, 'RW'],
  ['ESP', 2018, 'Andrés Iniesta', 83, 'CM'],
  ['MEX', 2018, 'Hirving Lozano', 81, 'RW'],

  // ---- 2022 additions ----
  ['BEL', 2022, 'Eden Hazard', 82, 'LW'],
  ['BEL', 2022, 'Kevin De Bruyne', 90, 'CM'],
  ['DEU', 2022, 'Manuel Neuer', 83, 'GK'],
  ['DEU', 2022, 'Leroy Sané', 83, 'RW'],
  ['DEU', 2022, 'İlkay Gündoğan', 84, 'CM'],
  ['DEU', 2022, 'Thomas Müller', 84, 'RW'],
  ['ESP', 2022, 'Pedri', 84, 'CM'],
  ['ESP', 2022, 'Gavi', 83, 'CM'],
  ['URY', 2022, 'Federico Valverde', 84, 'CM'],
];

const overrideMap = new Map();
for (const [code, year, name, rating, pos] of OVERRIDES) {
  overrideMap.set(`${year}|${code}|${norm(name)}`, { rating, pos });
}

// ---------------------------------------------------------------------------
// Build player records
// ---------------------------------------------------------------------------
const players = [];
const seenIds = new Set();
const overrideHits = new Set();

for (const s of squads) {
  const year = MEN_TOURNAMENTS[s.tournament_id];
  const name = displayName(s.family_name, s.given_name);
  const goalCount = goalsByKey[`${s.tournament_id}|${s.player_id}`] || 0;
  const group = groupFromCode(s.position_code);
  let position = specificPosition(s.position_code, s.shirt_number);
  let rating = computeRating({
    tournamentId: s.tournament_id,
    teamId: s.team_id,
    playerId: s.player_id,
    shirt: s.shirt_number,
    goalCount,
  });

  const ovKey = `${year}|${s.team_code}|${norm(name)}`;
  const ov = overrideMap.get(ovKey);
  if (ov) {
    rating = ov.rating;
    if (ov.pos) position = ov.pos;
    overrideHits.add(ovKey);
  }

  // build a short stable id
  let id = `${year}-${s.team_code}-${(s.shirt_number || '00').padStart(2, '0')}`;
  let suffix = 1;
  while (seenIds.has(id)) { id = `${year}-${s.team_code}-${(s.shirt_number || '00').padStart(2, '0')}-${suffix++}`; }
  seenIds.add(id);

  const rec = {
    id,
    name,
    country: s.team_name,
    countryCode: s.team_code,
    worldCupYear: year,
    position,
    positionGroup: group,
    rating,
    goals: goalCount,
  };
  players.push(rec);
}

// sort: year, country, rating desc
players.sort((a, b) =>
  a.worldCupYear - b.worldCupYear ||
  a.country.localeCompare(b.country) ||
  b.rating - a.rating
);

// ---------------------------------------------------------------------------
// Report missed overrides (typos) and write output
// ---------------------------------------------------------------------------
const missed = OVERRIDES
  .map(([code, year, name]) => `${year}|${code}|${norm(name)}`)
  .filter((k) => !overrideHits.has(k));
if (missed.length) {
  console.warn(`\n⚠️  ${missed.length} overrides did not match any player (check spelling):`);
  missed.forEach((m) => console.warn('   - ' + m));
}

const header = `// AUTO-GENERATED by scripts/8-0/processData.mjs — DO NOT EDIT BY HAND.
// Source: Fjelstul World Cup Database (github.com/jfjelstul/worldcup), men's 1990–2022.
// ${players.length} players across ${new Set(players.map((p) => p.worldCupYear + '-' + p.countryCode)).size} country-year squads.
import type { PlayerRecord } from '../lib/types';

export const HISTORIC_PLAYERS: PlayerRecord[] = `;

const body = JSON.stringify(players);
fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, header + body + ';\n', 'utf8');

console.log(`\n✅ Wrote ${players.length} players → ${path.relative(REPO_ROOT, OUT_FILE)}`);
console.log(`   Combos: ${new Set(players.map((p) => p.worldCupYear + '-' + p.countryCode)).size}`);
console.log(`   Overrides applied: ${overrideHits.size}/${OVERRIDES.length}`);
const dist = {};
for (const p of players) { const b = Math.floor(p.rating / 5) * 5; dist[b] = (dist[b] || 0) + 1; }
console.log('   Rating distribution:', dist);
