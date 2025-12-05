import { notFound } from 'next/navigation'
import Section from '@/components/Section'

const projectDetails: Record<string, {
  title: string
  problem: string
  description: string
  techStack: string[]
  content: string
}> = {
  'generative-agent-model': {
    title: 'Generative Agent-Based Model of Language Adoption',
    problem: 'How do languages evolve and spread in populations?',
    description: 'BSc thesis exploring computational models of language change using agent-based simulations.',
    techStack: ['Python', 'NetworkX', 'Pandas', 'Matplotlib'],
    content: 'This project implemented evolutionary algorithms to model linguistic adaptation and cultural transmission in simulated populations. The model demonstrated how simple interaction rules can lead to complex language evolution patterns.'
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
    content: 'Participants played Pac-Man while performing secondary tasks of varying difficulty. Eye movement patterns revealed how cognitive load influences spatial attention and decision-making strategies.'
  },
  'topic-modelling-syllabus': {
    title: 'Topic Modelling Cognitive Science Syllabus',
    problem: 'What topics dominate modern cognitive science curricula?',
    description: 'Applied LDA and BERT-based topic modeling to analyze course syllabi.',
    techStack: ['Python', 'scikit-learn', 'BERT', 'Gensim'],
    content: 'Processed syllabi from 50+ universities to identify emerging trends in cognitive science education, showing a shift towards computational and data-driven approaches.'
  },
  'peerly-platform': {
    title: 'Peerly.io – Paper Review Platform',
    problem: 'Streamlining academic peer review process',
    description: 'Built a web platform for managing academic paper submissions and reviews.',
    techStack: ['React', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    content: 'Developed a full-stack application with real-time notifications, automated reviewer matching based on expertise, and collaborative review workflows.'
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
            <span key={tech} className="px-3 py-1 bg-gray-100 text-sm rounded">
              {tech}
            </span>
          ))}
        </div>
        <div className="prose max-w-none">
          <p>{project.content}</p>
        </div>
      </div>
    </Section>
  )
}