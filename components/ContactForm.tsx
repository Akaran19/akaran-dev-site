'use client'

export default function ContactForm() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Get In Touch</h3>
        <p className="text-gray-400 mb-6">
          Feel free to reach out to me directly via email:
        </p>
        <a
          href="mailto:akaran1909@gmail.com"
          className="inline-block px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors rounded-lg"
        >
          akaran1909@gmail.com
        </a>
      </div>
    </div>
  )
}