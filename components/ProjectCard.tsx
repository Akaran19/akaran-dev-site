import Link from 'next/link'

interface ProjectCardProps {
  title: string
  problem: string
  description: string
  techStack: string[]
  slug: string
  demoUrl?: string
}

export default function ProjectCard({ title, problem, description, techStack, slug, demoUrl }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border">
      <Link href={`/projects/${slug}`} className="block">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-accent font-medium mb-3">{problem}</p>
        <p className="text-gray-600 mb-4">{description}</p>
      </Link>
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech) => (
          <span key={tech} className="px-2 py-1 bg-gray-100 text-sm rounded">
            {tech}
          </span>
        ))}
      </div>
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-accent hover:text-blue-700 font-medium"
        >
          View Live Demo →
        </a>
      )}
    </div>
  )
}