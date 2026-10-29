import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import SearchDialog from './SearchDialog'
import { site } from '../data/site'

const navItems = [
  { path: '/posts', label: '笔记', match: ['/posts', '/genre', '/tags', '/columns'] },
  { path: '/gallery', label: 'Gallery', match: ['/gallery'] },
  { path: '/reading', label: '阅读', match: ['/reading'] },
]

function isActive(pathname: string, match: string[]) {
  return match.some((m) => (m === '/' ? pathname === '/' : pathname === m || pathname.startsWith(`${m}/`)))
}

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <header className="masthead">
        <div className="shell masthead-inner">
          <div className="masthead-left">
            <Link to="/" className="wordmark" aria-label={`${site.name}，回到首页`}>
              {site.name}
            </Link>
            <span className="masthead-note">
              {site.place} · 二〇二六
            </span>
          </div>

          <nav className="site-nav" aria-label="主导航">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive(pathname, item.match) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}

            <span className="nav-sep" aria-hidden="true" />

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="nav-button"
              aria-label="搜索文章"
            >
              搜索
            </button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
