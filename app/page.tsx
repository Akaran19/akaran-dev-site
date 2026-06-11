'use client'

import Link from 'next/link'
import Section from '@/components/Section'
import TechStack from '@/components/TechStack'
import { techStackData } from '@/app/data/techStackData'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Akaran Sivakumar
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Data scientist focused on decision-making under uncertainty using behavioral data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projects" className="inline-flex items-center px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors">
                  View Projects
                </Link>
                <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 transition-colors">
                  Work With Me
                </Link>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="text-sm text-gray-400 font-mono space-y-2">
                <div>Current Focus:</div>
                <div>I frame problems through data, build statistical models, validate rigorously, and communicate insights that drive better decisions.</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* What I Do */}
      <Section className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Systems Thinking</h3>
              <p className="text-gray-300 leading-relaxed">
                I approach problems through the lens of interconnected systems, combining cognitive science principles with rigorous data analysis to understand complex behavioral patterns.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Technical Rigor</h3>
              <p className="text-gray-300 leading-relaxed">
                Every solution begins with experimental validation, statistical grounding, and careful consideration of edge cases before scaling to production systems.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Decision Framework</h3>
              <p className="text-gray-300 leading-relaxed">
                I prototype quickly, validate with data, and only scale models that survive statistical and behavioral scrutiny.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Skills and Tools */}
      <Section className="py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Core Competencies</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Decision-making under uncertainty
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Statistical modeling and validation
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Behavioral and language data analysis
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Problem framing and experimental design
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Uncertainty communication
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Technical Stack</h3>
              <TechStack data={techStackData} />
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Projects Section */}
      <Section className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 8-0 World Cup Game — featured first */}
            <div className="bg-gray-900 border border-yellow-500/30 rounded-lg p-6 hover:border-yellow-500/60 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-wider text-yellow-400 border border-yellow-500/30 rounded px-2 py-0.5">Game</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">8-0 — World Cup Draft</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400 font-mono">Concept:</span>
                  <span className="text-gray-300 ml-2">Draft a dream XI from World Cup history and simulate the run to glory</span>
                </div>
                <div>
                  <span className="text-gray-400 font-mono">Scope:</span>
                  <span className="text-gray-300 ml-2">6,400+ players across 73 nations and 10 World Cups</span>
                </div>
                <div>
                  <span className="text-gray-400 font-mono">Goal:</span>
                  <span className="text-gray-300 ml-2">Win all eight matches for a perfect 8-0 run on the leaderboard</span>
                </div>
              </div>
              <Link href="/8-0" className="inline-flex items-center mt-4 text-yellow-400 hover:text-yellow-300 text-sm transition-colors">
                Play now →
              </Link>
            </div>

            {/* Project 1 */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-4">World Cup Sentiment Analysis</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400 font-mono">Problem:</span>
                  <span className="text-gray-300 ml-2">Understanding real-time public sentiment to inform marketing and engagement decisions during global events</span>
                </div>
                <div>
                  <span className="text-gray-400 font-mono">Method:</span>
                  <span className="text-gray-300 ml-2">NLP pipeline processing millions of tweets with sentiment analysis</span>
                </div>
                <div>
                  <span className="text-gray-400 font-mono">Outcome:</span>
                  <span className="text-gray-300 ml-2">Enabled data-driven fan engagement strategies and cultural insights for event organizers</span>
                </div>
              </div>
              <Link href="/projects/world-cup-sentiment" className="inline-flex items-center mt-4 text-blue-400 hover:text-blue-300 text-sm transition-colors">
                View case study →
              </Link>
            </div>

            {/* Project 2 */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-4">Personality & Language Adoption (GABM)</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400 font-mono">Problem:</span>
                  <span className="text-gray-300 ml-2">How personality traits influence decision-making in language evolution and adoption</span>
                </div>
                <div>
                  <span className="text-gray-400 font-mono">Method:</span>
                  <span className="text-gray-300 ml-2">GPT-4o-mini agent-based simulations with Bayesian analysis</span>
                </div>
                <div>
                  <span className="text-gray-400 font-mono">Outcome:</span>
                  <span className="text-gray-300 ml-2">2,000+ simulations providing insights for behavioral interventions and language learning strategies</span>
                </div>
              </div>
              <Link href="/projects/generative-agent-model" className="inline-flex items-center mt-4 text-blue-400 hover:text-blue-300 text-sm transition-colors">
                View case study →
              </Link>
            </div>

            {/* Project 3 */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-4">Peerly</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400 font-mono">Problem:</span>
                  <span className="text-gray-300 ml-2">Streamlining academic peer review workflows to improve decision quality in publishing</span>
                </div>
                <div>
                  <span className="text-gray-400 font-mono">Method:</span>
                  <span className="text-gray-300 ml-2">Full-stack platform with automated reviewer matching</span>
                </div>
                <div>
                  <span className="text-gray-400 font-mono">Outcome:</span>
                  <span className="text-gray-300 ml-2">Real-time collaboration platform reducing review time and improving matching accuracy</span>
                </div>
              </div>
              <Link href="/projects/peerly-platform" className="inline-flex items-center mt-4 text-blue-400 hover:text-blue-300 text-sm transition-colors">
                View case study →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section className="py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-16 text-center">Experience</h2>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-700 hidden md:block"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {/* Item 1 - Right side */}
              <div className="relative flex items-center justify-end">
                <div className="w-full md:w-5/12 md:pr-8">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <h3 className="text-xl font-semibold text-white">Co-Founder</h3>
                    </div>
                    <p className="text-blue-400 text-sm mb-2">2024 - Current • BetterRoomie, Aarhus</p>
                    <p className="text-gray-300 text-sm">Built a cognitive-science–driven matching platform; designed compatibility algorithms and data pipelines. Funded by The Kitchen, Grundfos, and Fonden for Entreprenørskab.</p>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900 hidden md:block"></div>
              </div>

              {/* Item 2 - Left side */}
              <div className="relative flex items-center justify-start">
                <div className="w-full md:w-5/12 md:pl-8">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <h3 className="text-xl font-semibold text-white">Data & Marketing Analyst</h3>
                    </div>
                    <p className="text-green-400 text-sm mb-2">2022 - Sep 2025 • Curry Leaves, Sønderborg</p>
                    <p className="text-gray-300 text-sm">Improved SEO by 63% and automated reporting processes using Python and Zapier.</p>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-gray-900 hidden md:block"></div>
              </div>

              {/* Item 3 - Right side */}
              <div className="relative flex items-center justify-end">
                <div className="w-full md:w-5/12 md:pr-8">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                      <h3 className="text-xl font-semibold text-white">Marketing Assistant</h3>
                    </div>
                    <p className="text-purple-400 text-sm mb-2">Oct 2025 - Dec 2025 • TwelveSixteen, Aarhus</p>
                    <p className="text-gray-300 text-sm">Led Google Ads campaigns and GA4 tracking; improved ROAS through data-driven audience and funnel analysis.</p>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-gray-900 hidden md:block"></div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/about" className="inline-flex items-center px-6 py-3 bg-gray-700 text-gray-300 hover:text-white transition-colors">
              View Full Experience →
            </Link>
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Have a project in mind?</h2>
          <p className="text-xl text-gray-300 mb-8">Open to data science and ML roles.</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold hover:bg-gray-200 transition-colors text-lg">
            Contact Me
          </Link>
        </div>
      </Section>
    </div>
  )
}