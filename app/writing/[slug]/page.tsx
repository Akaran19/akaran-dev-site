import { notFound } from 'next/navigation'
import Section from '@/components/Section'

const postDetails: Record<string, {
  title: string
  content: string
  date: string
}> = {
  'cognitive-to-data-science': {
    title: 'From Cognitive Science to Data Science',
    date: 'December 2024',
    content: 'This is a placeholder for the full article content about transitioning from cognitive science to data science.'
  },
  'bayesian-thinking-data': {
    title: 'Why Bayesian Thinking Fits Real-World Data Work',
    date: 'November 2024',
    content: 'This is a placeholder for the full article content about Bayesian thinking in data work.'
  },
  'agents-llms-behavior': {
    title: 'Modeling Human Behavior with Agents and LLMs',
    date: 'October 2024',
    content: 'This is a placeholder for the full article content about modeling behavior with agents and LLMs.'
  }
}

interface WritingPageProps {
  params: {
    slug: string
  }
}

export default function WritingPage({ params }: WritingPageProps) {
  const post = postDetails[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-8">{post.date}</p>
        <div className="prose max-w-none">
          <p>{post.content}</p>
        </div>
      </div>
    </Section>
  )
}