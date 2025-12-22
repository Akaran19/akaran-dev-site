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

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Send a Message</h2>
            <p className="text-gray-300">I'd love to hear about your project or opportunity. Let's connect!</p>
          </div>

          <ContactForm />
        </div>
      </div>
    </Section>
  )
}