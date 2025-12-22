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
        </div>

        {/* Experience Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Experience</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-gray-600 pl-6">
              <h3 className="text-xl font-semibold text-white mb-2">Co-Founder</h3>
              <p className="text-gray-400 mb-2">2024 - Current • BetterRoomie, Aarhus</p>
              <ul className="text-gray-300 space-y-1">
                <li>• Built a platform with two fellow students to simplify roommate search in Aarhus</li>
                <li>• Designed algorithm and backend in Firestore (GCP) to calculate compatibility scores</li>
                <li>• Developed automated dataflows connecting questionnaires with matching algorithm</li>
                <li>• Designed structured data models and validation logic for reliable matching</li>
                <li>• Project funded by The Kitchen, Grundfos, and Fonden for Entreprenørskab</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-600 pl-6">
              <h3 className="text-xl font-semibold text-white mb-2">Data og Marketing Analyst</h3>
              <p className="text-gray-400 mb-2">2022 - Sep 2025 • Curry Leaves, Sønderborg</p>
              <ul className="text-gray-300 space-y-1">
                <li>• Improved SEO and increased online visibility by 63%</li>
                <li>• Automated reporting processes in Python and Zapier</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-600 pl-6">
              <h3 className="text-xl font-semibold text-white mb-2">Marketing Assistant</h3>
              <p className="text-gray-400 mb-2">Oct 2025 - Dec 2025 • TwelveSixteen, Aarhus</p>
              <ul className="text-gray-300 space-y-1">
                <li>• Led Google Ads campaigns with audience segmentation and competitor analysis</li>
                <li>• Set up GA4 tracking and integrated with Shopify</li>
                <li>• Worked with Klaviyo email marketing, flows, and segmentation</li>
                <li>• Conducted data analyses to improve ROAS and mobile experience</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Education</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-gray-600 pl-6">
              <h3 className="text-xl font-semibold text-white mb-2">BSc in Cognitive Science</h3>
              <p className="text-gray-400 mb-2">Aug 2022 - Jul 2025 • Aarhus University, Aarhus</p>
              <p className="text-gray-300 mb-2">GPA: 10.3 / 12</p>
              <p className="text-gray-300">Relevant coursework: Statistics & Data Science, Machine Learning, Bayesian Methods, Data Visualisation, Human–Computer Interaction</p>
              <p className="text-gray-300 mt-2"><strong>Bachelor&apos;s Thesis:</strong> Built a Generative Agent-Based Model using GPT-4o-mini to study personality traits and language adoption. Executed 2,000+ simulations and analyzed results using Bayesian statistical models in R.</p>
            </div>

            <div className="border-l-4 border-gray-600 pl-6">
              <h3 className="text-xl font-semibold text-white mb-2">Study Abroad</h3>
              <p className="text-gray-400 mb-2">Jan 2025 - Jun 2025 • University of Leeds</p>
              <p className="text-gray-300 mb-2">GPA: A level (≈ 11.5 on Danish 7-point scale)</p>
              <p className="text-gray-300">Courses: Artificial Intelligence, Machine Learning, Marketing</p>
            </div>

            <div className="border-l-4 border-gray-600 pl-6">
              <h3 className="text-xl font-semibold text-white mb-2">High School</h3>
              <p className="text-gray-400 mb-2">Aug 2019 - Jun 2022 • Alssundgymnasiet, Sønderborg</p>
              <p className="text-gray-300 mb-2">GPA: 11.4</p>
              <p className="text-gray-300">Courses: Maths A, Physics A, Chemistry A</p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Technical Skills</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Digital Marketing</li>
                <li>• Databases & SQL</li>
                <li>• Python & R Programming</li>
                <li>• Machine Learning & AI</li>
                <li>• Data Analysis & Visualization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Languages</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Danish</li>
                <li>• Tamil</li>
                <li>• English</li>
                <li>• German</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}