import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSearch } from '../hooks/useSearch'
import { excerpt, shortDate } from '../utils/format'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SearchDialog({ open, onClose }: Props) {
  const { query, setQuery, results } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="搜索文章"
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <div className="search-panel">
        <div className="search-field">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜一个词"
            aria-label="搜索文章"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="search-hint">ESC</span>
          <button type="button" className="search-hint" onClick={onClose}>
            关闭
          </button>
        </div>

        <div className="search-results">
          {!query && <p className="search-empty">输入标题、标签或正文里的字词。</p>}

          {query && results.length === 0 && (
            <p className="search-empty">没有找到。</p>
          )}

          {results.map((r) => (
            <Link
              key={r.slug}
              to={`/posts/${r.slug}`}
              onClick={onClose}
              className="search-result"
            >
              <time dateTime={r.date}>{shortDate(r.date)}</time>
              <span>
                <span className="t">{r.title}</span>
                {(r.description || r.content) && (
                  <span className="entry-desc">
                    {r.description || excerpt(r.content, 54)}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
