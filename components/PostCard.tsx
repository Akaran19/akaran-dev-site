import Link from 'next/link'

interface PostCardProps {
  title: string
  excerpt: string
  date: string
  slug: string
}

export default function PostCard({ title, excerpt, date, slug }: PostCardProps) {
  return (
    <Link href={`/writing/${slug}`} className="block">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-colors">
        <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-400 mb-4 leading-relaxed">{excerpt}</p>
        <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">{date}</p>
      </div>
    </Link>
  )
}