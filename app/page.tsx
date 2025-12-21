import Link from 'next/link'
import Section from '@/components/Section'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Akaran Sivakumar
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Data scientist bridging cognitive science and machine learning to build systems that understand human behavior and language.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projects" className="inline-flex items-center px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors">
                  View Projects
                </Link>
                <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 transition-colors">
                  Get In Touch
                </Link>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="text-sm text-gray-400 font-mono space-y-2">
                <div>Current Focus:</div>
                <div>• ML Engineering</div>
                <div>• Behavioral Analytics</div>
                <div>• NLP Systems</div>
                <div>• Experimental Design</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* What I Do */}
      <Section className="py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Systems Thinking</h3>
              <p className="text-gray-300 leading-relaxed">
                I approach problems through the lens of interconnected systems, combining cognitive science principles with rigorous data analysis to understand complex behavioral patterns.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Technical Rigor</h3>
              <p className="text-gray-300 leading-relaxed">
                Every solution begins with experimental validation, statistical grounding, and careful consideration of edge cases before scaling to production systems.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Skills and Tools */}
      <Section className="py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Core Skills</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Machine Learning Engineering
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Natural Language Processing
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Behavioral Data Analysis
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Experimental Design
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Technical Stack</h3>
              <div className="space-y-3 text-gray-300 font-mono text-sm">
                <div>Python • scikit-learn, TensorFlow, PyTorch</div>
                <div>R • Statistical Modeling, Visualization</div>
                <div>SQL • PostgreSQL, BigQuery</div>
                <div>Cloud • AWS, GCP, Vercel</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}