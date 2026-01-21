import ProjectCard from '@/components/ProjectCard'
import Section from '@/components/Section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects – Akaran Sivakumar',
  description: 'Explore data science projects focused on decision-making under uncertainty, behavioral analysis, and statistical modeling.',
}

const projects = [
  {
    title: 'World Cup Twitter Sentiment Analysis',
    problem: 'Understanding public sentiment during major sporting events',
    description: 'Analyzed millions of tweets during the 2022 World Cup to track sentiment patterns, fan engagement, and cultural reactions across different demographics.',
    techStack: ['Python', 'Tweepy', 'NLTK', 'TextBlob'],
    slug: 'world-cup-sentiment'
  },
  {
    title: 'Generative Agent-Based Model of Language Adoption',
    problem: 'How do languages evolve and spread in populations?',
    description: 'BSc thesis exploring computational models of language change using agent-based simulations. Implemented evolutionary algorithms to model linguistic adaptation and cultural transmission.',
    techStack: ['Python', 'NetworkX', 'Pandas', 'Matplotlib'],
    slug: 'generative-agent-model'
  },
  {
    title: 'Peerly.io – Paper Review Platform',
    problem: 'Streamlining academic peer review process',
    description: 'Built a web platform for managing academic paper submissions and reviews, featuring real-time collaboration and automated matching algorithms.',
    techStack: ['React', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    slug: 'peerly-platform',
    demoUrl: 'https://peerly.io',
    faviconUrl: 'https://peerly.io/favicon.ico'
  },
  {
    title: 'Credit Risk Modeling System',
    problem: 'How to assess credit risk using machine learning?',
    description: 'Built a complete credit risk modeling system from scratch using Python and machine learning. Processes real-world financial data, trains models with Scikit-learn, and handles imbalanced datasets. Deployed as an interactive web application integrated into my portfolio for credit risk evaluation.',
    techStack: ['Python', 'Scikit-learn', 'Flask', 'Machine Learning'],
    slug: 'credit-risk-modeling',
    demoUrl: 'https://akaran.dev/credit-risk',
  },
  {
    title: 'Topic Modelling Cognitive Science Syllabus',
    problem: 'What topics dominate modern cognitive science curricula?',
    description: 'Applied LDA and BERT-based topic modeling to analyze course syllabi from top cognitive science programs, revealing trends in research focus areas.',
    techStack: ['Python', 'scikit-learn', 'BERT', 'Gensim'],
    slug: 'topic-modelling-syllabus'
  },
  {
    title: 'Eyes on the Prize - Investigating Cognitive Load in Pac-Man Gameplay through Eye Tracking',
    problem: 'How does cognitive load affect decision-making in games?',
    description: 'Current attention levels in society have caused a shift in the media consumed and games played. Everything must be shorter, and less taxing cognitively. This study aims to investigate the major cultural trend in the 1980s, the arcade game Ms. Pac-Man, to try and deduce what made the game a global sensation. We investigated cognitive load dynamics through player gaze behaviour.',
    techStack: ['Python', 'CatEyes', 'OpenCV', 'Matplotlib', 'Statsmodels', 'EyeLink', 'ALE'],
    slug: 'pacman-eye-tracking'
  },
  {
    title: 'Rapid Recall - LUBS2850 Marketing Quiz',
    problem: 'How to make marketing concepts engaging and memorable?',
    description: 'Interactive educational mini-game for mastering LUBS2850 Marketing concepts. Built with modern web technologies, featuring a Kahoot-style interface, persistent leaderboards, and responsive glassmorphism design.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Firebase Firestore'],
    slug: 'rapid-recall-marketing-quiz',
    demoUrl: 'https://akaran19.github.io/LUBS2850_flashcards/',
    faviconUrl: 'https://akaran19.github.io/LUBS2850_flashcards/rapid-recall-favicon.svg'
  },
  {
    title: 'AI Snake Game with Reinforcement Learning',
    problem: 'How can AI learn to play games optimally?',
    description: 'An intelligent Snake game implementation where an AI agent learns optimal gameplay strategies through reinforcement learning algorithms. The project demonstrates how machine learning can master classic games by training neural networks to maximize scores and avoid collisions, showcasing practical applications of AI in game environments.',
    techStack: ['Python', 'PyTorch', 'NumPy', 'Pygame'],
    slug: 'ai-snake'
  },
]

export default function Projects() {
  return (
    <Section className="py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>
    </Section>
  )
}