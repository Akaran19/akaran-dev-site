import Link from 'next/link'

interface ProjectCardProps {
  title: string
  problem: string
  description: string
  techStack: string[]
  slug: string
}

export default function ProjectCard({ title, problem, description, techStack, slug }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-accent font-medium mb-3">{problem}</p>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-gray-100 text-sm rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}