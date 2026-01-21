import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  title: string
  problem: string
  description: string
  techStack: string[]
  slug: string
  demoUrl?: string
  faviconUrl?: string
  datasetUrl?: string
}

export default function ProjectCard({ title, problem, description, techStack, slug, demoUrl, faviconUrl, datasetUrl }: ProjectCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-colors">
      <Link href={`/projects/${slug}`} className="block">
        <div className="flex items-start gap-3 mb-4">
          {faviconUrl && (
            <Image
              src={faviconUrl}
              alt={`${title} favicon`}
              width={32}
              height={32}
              className="rounded-sm flex-shrink-0 mt-1"
            />
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <div className="text-xs text-gray-400 font-mono uppercase tracking-wider mb-1">Problem</div>
            <p className="text-gray-300 text-sm leading-relaxed">{problem}</p>
          </div>

          <div>
            <div className="text-xs text-gray-400 font-mono uppercase tracking-wider mb-1">Approach</div>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </Link>

      <div className="border-t border-gray-800 pt-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {techStack.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs font-mono rounded">
              {tech}
            </span>
          ))}
        </div>

        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-400 hover:text-white text-sm font-mono transition-colors mr-4"
          >
            Live Demo →
          </a>
        )}
        {datasetUrl && (
          <a
            href={datasetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-400 hover:text-white text-sm font-mono transition-colors"
          >
            Dataset →
          </a>
        )}
      </div>
    </div>
  )
}