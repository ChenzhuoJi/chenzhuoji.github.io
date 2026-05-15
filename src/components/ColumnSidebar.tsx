import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { usePostsByColumn } from '../hooks/usePosts'

interface Props {
  column: string
  currentSlug: string
}

export default function ColumnSidebar({ column, currentSlug }: Props) {
  const posts = usePostsByColumn(column)
  const [expanded, setExpanded] = useState(false)

  const groups = useMemo(() => {
    const map = new Map<string, typeof posts>()
    for (const p of posts) {
      const key = p.meta.series ?? '其他'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(p)
    }
    return [...map.entries()]
  }, [posts])

  if (posts.length < 2) return null

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs font-medium text-ink-400 dark:text-ink-500 uppercase tracking-wider w-full text-left group"
      >
        <svg
          className={`w-3 h-3 transition-transform duration-200 text-ink-300 dark:text-ink-600 ${expanded ? 'rotate-90' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        {column}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? 'max-h-[2000px]' : 'max-h-0'
        }`}
      >
        <div className="overflow-y-auto max-h-[40vh] scrollbar-thin space-y-4 border-l-2 border-ink-100 dark:border-ink-800 pl-3 pt-1.5 pb-1">
          {groups.map(([series, items]) => (
            <div key={series}>
              <h4 className="text-[11px] font-medium text-ink-300 dark:text-ink-600 uppercase tracking-wider mb-1.5">{series}</h4>
              <ul className="space-y-1 text-sm">
                {items.map((p) => (
                  <li key={p.meta.slug}>
                    <Link
                      to={`/posts/${p.meta.slug}`}
                      className={`block transition-colors ${
                        p.meta.slug === currentSlug
                          ? 'text-vermilion-600 dark:text-vermilion-400 font-semibold'
                          : 'text-ink-500 dark:text-ink-400 hover:text-vermilion-500 dark:hover:text-vermilion-400'
                      }`}
                    >
                      {p.meta.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
