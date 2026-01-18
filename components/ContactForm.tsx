'use client'

export default function ContactForm() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Get In Touch</h3>
        <p className="text-gray-400 mb-6">
          Feel free to reach out to me directly:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:akaran1909@gmail.com"
            className="inline-block px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors rounded-lg"
          >
            📧 akaran1909@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/akaran-sivakumar-3b630b291/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors rounded-lg"
          >
            💼 LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  )
}