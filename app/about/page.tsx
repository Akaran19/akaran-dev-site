import Section from '@/components/Section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About – Akaran Sivakumar',
  description: 'Learn about my background in cognitive science and transition to data science and AI/ML.',
}

export default function About() {
  return (
    <Section className="py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">About</h1>

        <div className="prose prose-lg max-w-none prose-invert">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            I&apos;m Akaran Sivakumar, a cognitive science graduate transitioning into data science and machine learning.
            My background bridges experimental psychology, computational modeling, and data analysis to understand human cognition and behavior.
          </p>

          <p className="text-gray-300 mb-8 leading-relaxed">
            Currently building intelligent systems that combine technical rigor with human-centered design.
            I believe the most effective AI solutions emerge from deep understanding of how humans think, learn, and interact with technology.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-6">Current Focus</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Seeking roles in data science and ML engineering where I can contribute to projects involving:
          </p>
          <ul className="text-gray-300 mb-8 space-y-3">
            <li className="flex items-start">
              <span className="text-gray-500 mr-3">•</span>
              Machine learning model development and deployment
            </li>
            <li className="flex items-start">
              <span className="text-gray-500 mr-3">•</span>
              Behavioral data analysis and experimentation
            </li>
            <li className="flex items-start">
              <span className="text-gray-500 mr-3">•</span>
              Data-driven product development
            </li>
            <li className="flex items-start">
              <span className="text-gray-500 mr-3">•</span>
              Research that connects theory with practical application
            </li>
          </ul>

          <p className="text-gray-300 leading-relaxed">
            Particularly interested in organizations that prioritize methodological rigor, continuous learning, and the integration of technology with human factors.
          </p>
        </div>
      </div>
    </Section>
  )
}