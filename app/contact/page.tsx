import Section from '@/components/Section'
import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact – Akaran Sivakumar',
  description: 'Get in touch with me for opportunities in data science, AI/ML, and research roles.',
}

export default function Contact() {
  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:akaran19@gmail.com" className="text-accent hover:underline">
                  akaran19@gmail.com
                </a>
              </div>
              <div>
                <p className="font-medium">LinkedIn</p>
                <a href="https://linkedin.com/in/akaran-sivakumar-3b630b291" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  linkedin.com/in/akaran-sivakumar-3b630b291
                </a>
              </div>
              <div>
                <p className="font-medium">GitHub</p>
                <a href="https://github.com/Akaran19" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  github.com/Akaran19
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  )
}