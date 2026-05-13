import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import SearchDialog from './SearchDialog'

const navItems = [
  { path: '/', label: '首页' },
  { path: '/tags', label: '标签' },
  { path: '/about', label: '关于' },
]

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 bg-ink-50/80 dark:bg-ink-950/80 backdrop-blur-md border-b border-ink-100 dark:border-ink-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-lg font-serif font-semibold text-ink-900 dark:text-ink-100 tracking-tight">
            Chenzhuo's Blog
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'text-vermilion-600 dark:text-vermilion-400 bg-vermilion-50 dark:bg-vermilion-950/30'
                    : 'text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
              aria-label="搜索"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
