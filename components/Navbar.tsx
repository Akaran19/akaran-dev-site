'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold">
            Akaran Sivakumar
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-accent transition-colors">Projects</Link>
            <Link href="/writing" className="hover:text-accent transition-colors">Writing</Link>
            <Link href="/about" className="hover:text-accent transition-colors">About</Link>
            <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/projects" className="hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Projects</Link>
              <Link href="/writing" className="hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Writing</Link>
              <Link href="/about" className="hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>About</Link>
              <Link href="/contact" className="hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}