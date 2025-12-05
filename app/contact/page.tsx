'use client'

import { useState } from 'react'
import Section from '@/components/Section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact – Akaran Sivakumar',
  description: 'Get in touch with me for opportunities in data science, AI/ML, and research roles.',
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For now, just log to console and show success
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <p className="text-green-800">Thank you for your message! I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <button type="submit" className="btn">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}