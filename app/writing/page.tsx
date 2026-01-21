import Section from '@/components/Section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing – Akaran Sivakumar',
  description: 'Thoughts on cognitive science, data science, AI/ML, and the intersection of technology with human behavior.',
}

export default function Writing() {
  return (
    <Section className="py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">Writing</h1>
        <div className="prose prose-lg max-w-none text-gray-300">
          <p>
            In 2026, I&apos;ve made a personal commitment to re-engage with writing as a way to explore and share my thoughts on the evolving landscape of technology, cognition, and human behavior. 
          </p>
        </div>
      </div>
    </Section>
  )
}