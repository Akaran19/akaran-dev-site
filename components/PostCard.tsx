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
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-3">{excerpt}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </Link>
  )
}