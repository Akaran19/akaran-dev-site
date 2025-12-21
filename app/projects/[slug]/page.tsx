import { notFound } from 'next/navigation'
import Section from '@/components/Section'

const projectDetails: Record<string, {
  title: string
  problem: string
  description: string
  techStack: string[]
  content: string
  demoUrl?: string
  githubUrl?: string
}> = {
  'rapid-recall-marketing-quiz': {
    title: 'Rapid Recall - LUBS2850 Marketing Quiz',
    problem: 'How to make marketing concepts engaging and memorable?',
    description: 'Interactive educational mini-game for mastering LUBS2850 Marketing concepts.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Firebase Firestore'],
    content: 'A modern, interactive educational mini-game built for LUBS2850 Marketing students at the University of Leeds. Features a Kahoot-style interface with timer, progress tracking, and visual feedback. Includes a persistent global leaderboard using Firebase Firestore for cross-device score tracking. The app uses glassmorphism design with smooth animations and is fully responsive across desktop, tablet, and mobile devices. Built with vanilla JavaScript and modern CSS, requiring no build tools and running entirely in the browser.',
    demoUrl: 'https://akaran19.github.io/LUBS2850_flashcards/',
    githubUrl: 'https://github.com/Akaran19/LUBS2850_flashcards'
  },
  'credit-risk-modeling': {
    title: 'Credit Risk Modeling System',
    problem: 'How to assess credit risk using machine learning?',
    description: 'Built a complete credit risk modeling system from scratch using Python and machine learning.',
    techStack: ['Python', 'Scikit-learn', 'Flask', 'Machine Learning'],
    content: 'This project demonstrates a complete end-to-end data science workflow for credit risk assessment. Starting with real-world financial data processing, the system applies machine learning techniques to evaluate credit risk. Key features include handling imbalanced datasets, model training with Scikit-learn, and an interactive web application for credit risk evaluation. The project serves as both a practical tool and a learning resource for data science beginners and interview preparation.',
    demoUrl: 'https://akaran.dev/credit-risk'
  },
  'generative-agent-model': {
    title: 'Generative Agent-Based Model of Language Adoption',
    problem: 'How do languages evolve and spread in populations?',
    description: 'BSc thesis exploring computational models of language change using agent-based simulations.',
    techStack: ['Python', 'NetworkX', 'Pandas', 'Matplotlib'],
    content: 'This project implemented evolutionary algorithms to model linguistic adaptation and cultural transmission in simulated populations. The model demonstrated how simple interaction rules can lead to complex language evolution patterns.',
    githubUrl: 'https://github.com/Akaran19/bachelors-project-new'
  },
  'world-cup-sentiment': {
    title: 'World Cup Twitter Sentiment Analysis',
    problem: 'Understanding public sentiment during major sporting events',
    description: 'Analyzed millions of tweets during the 2022 World Cup.',
    techStack: ['Python', 'Tweepy', 'NLTK', 'TextBlob'],
    content: 'Collected and analyzed real-time Twitter data during the tournament, identifying sentiment trends and cultural reactions across different fan bases and demographics.'
  },
  'pacman-eye-tracking': {
    title: 'Pac-Man Eye-Tracking & Cognitive Load',
    problem: 'How does cognitive load affect decision-making in games?',
    description: 'Conducted eye-tracking experiments with participants playing Pac-Man.',
    techStack: ['R', 'EyeLink', 'PsychoPy', 'ggplot2'],
    content: 'Participants played Pac-Man while performing secondary tasks of varying difficulty. Eye movement patterns revealed how cognitive load influences spatial attention and decision-making strategies.',
    githubUrl: 'https://github.com/Akaran19/PercAct-exam'
  },
  'topic-modelling-syllabus': {
    title: 'Topic Modelling Cognitive Science Syllabus',
    problem: 'What topics dominate modern cognitive science curricula?',
    description: 'Applied LDA and BERT-based topic modeling to analyze course syllabi.',
    techStack: ['Python', 'scikit-learn', 'BERT', 'Gensim'],
    content: 'Processed syllabi from 50+ universities to identify emerging trends in cognitive science education, showing a shift towards computational and data-driven approaches.',
    githubUrl: 'https://github.com/Akaran19/soccult_exam'
  },
  'peerly-platform': {
    title: 'Peerly.io – Paper Review Platform',
    problem: 'Streamlining academic peer review process',
    description: 'Built a web platform for managing academic paper submissions and reviews.',
    techStack: ['React', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    content: 'Developed a full-stack application with real-time notifications, automated reviewer matching based on expertise, and collaborative review workflows.',
    demoUrl: 'https://peerly.io'
  }
}

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectDetails[params.slug]

  if (!project) {
    notFound()
  }

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-accent font-medium mb-6">{project.problem}</p>
        <p className="text-lg mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm font-mono rounded">
              {tech}
            </span>
          ))}
        </div>
        <div className="prose max-w-none">
          <p>{project.content}</p>
        </div>
        {project.demoUrl && (
          <div className="mt-8">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Live Demo
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
        {project.githubUrl && (
          <div className="mt-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        )}
      </div>
    </Section>
  )
}