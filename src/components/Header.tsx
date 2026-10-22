import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import SearchDialog from './SearchDialog'

const navItems = [
  { path: '/', label: '首页' },
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
      <header className="safe-top sticky top-0 z-40 bg-paper/95 backdrop-blur-sm dark:bg-ink-950/95 border-b border-ink-200 dark:border-ink-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <Link to="/" className="flex flex-col leading-tight">
            <span className="whitespace-nowrap text-[1.25rem] sm:text-[1.6rem] font-serif font-semibold text-ink-900 dark:text-ink-50 tracking-tight">
              Chenzhuo's Blog
            </span>
          </Link>

          <nav className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`whitespace-nowrap px-2 py-2 text-sm tracking-[0.12em] transition-colors sm:px-4 sm:text-base ${
                  location.pathname === item.path
                    ? 'text-vermilion-600 dark:text-vermilion-400'
                    : 'text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-200 transition-colors"
              aria-label="搜索"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
