import PostCard from '@/components/PostCard'
import Section from '@/components/Section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing – Akaran Sivakumar',
  description: 'Thoughts on cognitive science, data science, AI/ML, and the intersection of technology with human behavior.',
}

const posts = [
  {
    title: 'From Cognitive Science to Data Science',
    excerpt: 'My journey from studying human cognition to applying computational methods to understand behavior and intelligence.',
    date: 'December 2024',
    slug: 'cognitive-to-data-science'
  },
  {
    title: 'Why Bayesian Thinking Fits Real-World Data Work',
    excerpt: 'Exploring how probabilistic reasoning from cognitive science translates to robust data analysis and modeling practices.',
    date: 'November 2024',
    slug: 'bayesian-thinking-data'
  },
  {
    title: 'Modeling Human Behavior with Agents and LLMs',
    excerpt: 'How combining agent-based models with large language models can create more realistic simulations of human cognition.',
    date: 'October 2024',
    slug: 'agents-llms-behavior'
  }
]

export default function Writing() {
  return (
    <Section>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Writing</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </Section>
  )
}