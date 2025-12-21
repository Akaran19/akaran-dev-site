import Section from '@/components/Section'
import ContactForm from '@/components/ContactForm'
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-8">Get in Touch</h2>
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-2">Email</p>
                <a href="mailto:akaran19@gmail.com" className="text-white hover:text-gray-300 transition-colors">
                  akaran19@gmail.com
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-2">LinkedIn</p>
                <a href="https://linkedin.com/in/akaran-sivakumar-3b630b291" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                  linkedin.com/in/akaran-sivakumar
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-2">GitHub</p>
                <a href="https://github.com/Akaran19" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                  github.com/Akaran19
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-8">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  )
}