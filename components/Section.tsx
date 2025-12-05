interface SectionProps {
  children: React.ReactNode
  className?: string
}

export default function Section({ children, className = '' }: SectionProps) {
  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  )
}