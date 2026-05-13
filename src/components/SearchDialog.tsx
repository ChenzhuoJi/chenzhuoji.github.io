import { useEffect, useRef, useCallback } from 'react'
import { useSearch } from '../hooks/useSearch'
import { Link } from 'react-router-dom'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SearchDialog({ open, onClose }: Props) {
  const { query, setQuery, results } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/30 dark:bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="w-full max-w-lg mx-4 bg-white dark:bg-ink-900 rounded-xl shadow-2xl border border-ink-200 dark:border-ink-700 overflow-hidden">
        <div className="flex items-center px-4 border-b border-ink-200 dark:border-ink-700">
          <svg className="w-4 h-4 text-ink-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章..."
            className="flex-1 px-3 py-3 bg-transparent text-ink-900 dark:text-ink-100 placeholder-ink-400 outline-none text-sm"
          />
          <kbd className="text-xs text-ink-400 border border-ink-300 dark:border-ink-600 rounded px-1.5 py-0.5">ESC</kbd>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {query && results.length === 0 && (
            <p className="text-center text-sm text-ink-400 py-8">未找到相关文章</p>
          )}
          {results.map((r) => (
            <Link
              key={r.slug}
              to={`/posts/${r.slug}`}
              onClick={onClose}
              className="block px-4 py-3 hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
            >
              <div className="text-sm font-medium text-ink-900 dark:text-ink-100">{r.title}</div>
              {r.description && (
                <div className="text-xs text-ink-400 dark:text-ink-500 mt-0.5 line-clamp-1">{r.description}</div>
              )}
              {r.tags.length > 0 && (
                <div className="flex gap-1.5 mt-1">
                  {r.tags.map((t) => (
                    <span key={t} className="text-xs text-ink-400 dark:text-ink-500">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
