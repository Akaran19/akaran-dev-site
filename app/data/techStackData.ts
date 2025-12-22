export interface TechItem {
  name: string;
  iconKey: string;
}

export interface TechCategory {
  title: string;
  items: TechItem[];
}

export const techStackData: TechCategory[] = [
  {
    title: "Machine Learning & Data",
    items: [
      { name: "Python", iconKey: "logos:python" },
      // scikit-learn has a Simple Icons entry; Iconify often uses "simple-icons:scikitlearn"
      { name: "scikit-learn", iconKey: "simple-icons:scikitlearn" },
      { name: "TensorFlow", iconKey: "logos:tensorflow" },
      { name: "PyTorch", iconKey: "logos:pytorch" },
    ],
  },
  {
    title: "R",
    items: [
      { name: "R", iconKey: "logos:r-lang" },
      { name: "tidyverse", iconKey: "simple-icons:tidyverse" },
      { name: "Stan", iconKey: "mdi:chart-bell-curve" },
      { name: "Bayesian Modeling", iconKey: "mdi:sigma" },
    ],
  },
  {
    title: "SQL",
    items: [
      // Use a generic database icon instead of MySQL as "SQL"
      { name: "SQL", iconKey: "mdi:database" },
      { name: "PostgreSQL", iconKey: "logos:postgresql" },

      // Prefer a BigQuery-specific icon; keep a GCP fallback if the icon isn't available
      { name: "BigQuery", iconKey: "simple-icons:googlebigquery" },
      // If "simple-icons:googlebigquery" is not found in your Iconify bundle, fallback to:
      // { name: "BigQuery", iconKey: "logos:google-cloud" },
    ],
  },
  {
    title: "Cloud",
    items: [
      { name: "AWS", iconKey: "logos:aws" },
      { name: "GCP", iconKey: "logos:google-cloud" },
      { name: "Vercel", iconKey: "simple-icons:vercel" },
    ],
  },
];