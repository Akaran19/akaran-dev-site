import Link from 'next/link'
import Section from '@/components/Section'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Section>
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Akaran Sivakumar</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Cognitive science–trained data scientist working at the intersection of behavior, language, and intelligent systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className="btn">
              View Projects
            </Link>
            <a href="#" className="btn bg-gray-200 text-gray-800 hover:bg-gray-300">
              Download CV
            </a>
          </div>
        </div>
      </Section>

      {/* Summary */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">What I Do</h2>
          <p className="text-lg leading-relaxed mb-6">
            I combine experimental rigor from cognitive science with practical data science and AI/ML techniques.
            My work focuses on understanding human behavior through data, building intelligent systems that learn from language and interaction,
            and creating user experiences that are both effective and ethical.
          </p>
        </div>
      </Section>

      {/* Skills and Tools */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Key Skills & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Skills</h3>
              <ul className="space-y-2">
                <li>• Data Analysis & Visualization</li>
                <li>• Machine Learning & NLP</li>
                <li>• Experimental Design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Tools</h3>
              <ul className="space-y-2">
                <li>• Python (Pandas, Scikit-learn, TensorFlow)</li>
                <li>• R for Statistical Analysis</li>
                <li>• SQL & NoSQL Databases</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}