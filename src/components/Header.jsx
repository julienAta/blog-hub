import { useState } from 'react'

export default function Header({ navigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#/"
            onClick={(e) => { e.preventDefault(); navigate('/') }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-sm group-hover:bg-indigo-600 transition-colors">
              B
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Blog<span className="text-indigo-500">Hub</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#/" onClick={(e) => { e.preventDefault(); navigate('/') }}
               className="text-sm font-medium text-stone-600 hover:text-indigo-500 transition-colors">
              Home
            </a>
            <a href="#/category/technology" onClick={(e) => { e.preventDefault(); navigate('/category/technology') }}
               className="text-sm font-medium text-stone-600 hover:text-indigo-500 transition-colors">
              Technology
            </a>
            <a href="#/category/design" onClick={(e) => { e.preventDefault(); navigate('/category/design') }}
               className="text-sm font-medium text-stone-600 hover:text-indigo-500 transition-colors">
              Design
            </a>
            <a href="#/category/ai-ml" onClick={(e) => { e.preventDefault(); navigate('/category/ai-ml') }}
               className="text-sm font-medium text-stone-600 hover:text-indigo-500 transition-colors">
              AI & ML
            </a>
          </nav>

          {/* Search + Subscribe */}
          <div className="hidden md:flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-full hover:bg-indigo-600 transition-colors">
              Subscribe
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-stone-100">
            <nav className="flex flex-col gap-3">
              <a href="#/" onClick={() => { navigate('/'); setMenuOpen(false) }}
                 className="text-sm font-medium text-stone-600 hover:text-indigo-500 px-2 py-1">Home</a>
              <a href="#/category/technology" onClick={() => { navigate('/category/technology'); setMenuOpen(false) }}
                 className="text-sm font-medium text-stone-600 hover:text-indigo-500 px-2 py-1">Technology</a>
              <a href="#/category/design" onClick={() => { navigate('/category/design'); setMenuOpen(false) }}
                 className="text-sm font-medium text-stone-600 hover:text-indigo-500 px-2 py-1">Design</a>
              <a href="#/category/ai-ml" onClick={() => { navigate('/category/ai-ml'); setMenuOpen(false) }}
                 className="text-sm font-medium text-stone-600 hover:text-indigo-500 px-2 py-1">AI & ML</a>
              <button className="mt-2 px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-full hover:bg-indigo-600 transition-colors w-fit">
                Subscribe
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
