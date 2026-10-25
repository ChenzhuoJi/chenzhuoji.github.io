import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { usePosts } from '../hooks/usePosts'
import { site } from '../data/site'
import { chineseNumber } from '../utils/format'

export default function TagList() {
  const posts = usePosts()

  const tags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const post of posts) {
      for (const tag of post.meta.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  }, [posts])

  return (
    <div className="page">
      <Helmet>
        <title>{`索引 · ${site.name}`}</title>
      </Helmet>

      <div className="spread">
        <aside className="rail">
          <span className="rail-label">索引</span>
          <span className="rail-date">
            <span>{chineseNumber(tags.length)}个标签</span>
          </span>
        </aside>

        <div className="spread-main">
          <header className="page-head">
            <h1 className="page-title">索引</h1>
            <p className="page-dek">按标签找文章。</p>
          </header>

          {tags.length === 0 ? (
            <p className="empty">还没有标签。</p>
          ) : (
            <div className="tag-list">
              {tags.map(([tag, count]) => (
                <Link key={tag} to={`/tags/${tag}`}>
                  {tag}
                  <span className="count">{count}</span>
                </Link>
              ))}
            </div>
          )}

          <div className="section-link-row">
            <Link to="/posts">全部文章</Link>
            <Link to="/gallery">影</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
