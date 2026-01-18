import Section from '@/components/Section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact – Akaran Sivakumar',
  description: 'Get in touch with me for opportunities in data science, AI/ML, and research roles.',
}

export default function Contact() {
  return (
    <Section className="py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12">Contact</h1>

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-white mb-6">Let&apos;s Connect</h2>
          <p className="text-gray-300 mb-8">
            I&apos;d love to hear about your project or opportunity. Feel free to reach out!
          </p>

          <div className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-2">Email</h3>
              <a
                href="mailto:akaran1909@gmail.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                akaran1909@gmail.com
              </a>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-2">LinkedIn</h3>
              <a
                href="https://linkedin.com/in/akaran-sivakumar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                linkedin.com/in/akaran-sivakumar
              </a>
            </div>
          </div>

          <div className="mt-8 text-gray-400 text-sm">
            <p>Prefer to connect directly? Feel free to email me or message me on LinkedIn.</p>
          </div>
        </div>
      </div>
    </Section>
  )
}