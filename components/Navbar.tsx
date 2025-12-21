'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#0a0a0a] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-6">
          <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
            Akaran Sivakumar
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors border-b-2 border-transparent hover:border-gray-600 pb-1">Home</Link>
            <Link href="/projects" className="text-gray-300 hover:text-white transition-colors border-b-2 border-transparent hover:border-gray-600 pb-1">Projects</Link>
            <Link href="/writing" className="text-gray-300 hover:text-white transition-colors border-b-2 border-transparent hover:border-gray-600 pb-1">Writing</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors border-b-2 border-transparent hover:border-gray-600 pb-1">About</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors border-b-2 border-transparent hover:border-gray-600 pb-1">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
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
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/projects" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Projects</Link>
              <Link href="/writing" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Writing</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>About</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}