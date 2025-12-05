import Section from '@/components/Section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About – Akaran Sivakumar',
  description: 'Learn about my background in cognitive science and transition to data science and AI/ML.',
}

export default function About() {
  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">About</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            I&apos;m Akaran Sivakumar, a recent BSc graduate in Cognitive Science from Aarhus University. 
            My background combines experimental psychology, computational modeling, and data analysis to understand how humans think, learn, and interact with technology.
          </p>
          
          <p className="mb-6">
            Currently, I&apos;m transitioning into data science and AI/ML roles, where I can apply my research experience to build intelligent systems that are both technically sound and human-centered. 
            I believe the best AI solutions come from understanding human cognition and behavior deeply.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">What I&apos;m Looking For</h2>
          <p className="mb-6">
            I&apos;m seeking entry-level positions in data science, machine learning, or analytics where I can contribute to projects that involve:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Building and deploying ML models</li>
            <li>Analyzing user behavior and experimentation</li>
            <li>Creating data-driven products</li>
            <li>Research-oriented work that combines theory and practice</li>
          </ul>
          
          <p>
            I&apos;m particularly interested in roles at companies that value rigorous methodology, continuous learning, and the intersection of technology with human factors.
          </p>
        </div>
      </div>
    </Section>
  )
}