import ProjectCard from '@/components/ProjectCard'
import Section from '@/components/Section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects – Akaran Sivakumar',
  description: 'Explore my data science, AI/ML, and cognitive science projects including agent-based models, NLP analysis, and experimental research.',
}

const projects = [
  {
    title: 'Generative Agent-Based Model of Language Adoption',
    problem: 'How do languages evolve and spread in populations?',
    description: 'BSc thesis exploring computational models of language change using agent-based simulations. Implemented evolutionary algorithms to model linguistic adaptation and cultural transmission.',
    techStack: ['Python', 'NetworkX', 'Pandas', 'Matplotlib'],
    slug: 'generative-agent-model'
  },
  {
    title: 'World Cup Twitter Sentiment Analysis',
    problem: 'Understanding public sentiment during major sporting events',
    description: 'Analyzed millions of tweets during the 2022 World Cup to track sentiment patterns, fan engagement, and cultural reactions across different demographics.',
    techStack: ['Python', 'Tweepy', 'NLTK', 'TextBlob'],
    slug: 'world-cup-sentiment'
  },
  {
    title: 'Pac-Man Eye-Tracking & Cognitive Load',
    problem: 'How does cognitive load affect decision-making in games?',
    description: 'Conducted eye-tracking experiments with participants playing Pac-Man under different cognitive load conditions to study attention patterns and decision strategies.',
    techStack: ['R', 'EyeLink', 'PsychoPy', 'ggplot2'],
    slug: 'pacman-eye-tracking'
  },
  {
    title: 'Topic Modelling Cognitive Science Syllabus',
    problem: 'What topics dominate modern cognitive science curricula?',
    description: 'Applied LDA and BERT-based topic modeling to analyze course syllabi from top cognitive science programs, revealing trends in research focus areas.',
    techStack: ['Python', 'scikit-learn', 'BERT', 'Gensim'],
    slug: 'topic-modelling-syllabus'
  },
  {
    title: 'Peerly.io – Paper Review Platform',
    problem: 'Streamlining academic peer review process',
    description: 'Built a web platform for managing academic paper submissions and reviews, featuring real-time collaboration and automated matching algorithms.',
    techStack: ['React', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    slug: 'peerly-platform'
  }
]

export default function Projects() {
  return (
    <Section>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>
    </Section>
  )
}