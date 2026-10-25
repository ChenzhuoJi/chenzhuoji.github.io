import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ArchiveRows from '../components/ArchiveRows'
import { usePostsByColumn } from '../hooks/usePosts'
import { site } from '../data/site'
import { resolveColumnName } from '../utils/posts'
import { chineseNumber } from '../utils/format'

export default function ColumnPosts() {
  const { name: identifier } = useParams<{ name: string }>()
  const columnName = resolveColumnName(identifier ?? '') ?? ''
  const posts = usePostsByColumn(columnName)

  if (!columnName || posts.length === 0) {
    return (
      <div className="page">
        <p className="empty">栏目未找到。</p>
        <Link to="/posts" className="back-link">
          ← 记
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <Helmet>
        <title>{`${columnName} · ${site.name}`}</title>
      </Helmet>

      <div className="spread">
        <aside className="rail">
          <span className="rail-label">栏目</span>
          <span className="rail-date">
            <span>{chineseNumber(posts.length)}篇</span>
          </span>
        </aside>

        <div className="spread-main">
          <header className="page-head">
            <h1 className="page-title">{columnName}</h1>
            <p className="page-meta">
              共 {posts.length} 篇 · {posts.some((p) => p.meta.series === '后记') ? '完结' : '连载'}
            </p>
          </header>

          <ArchiveRows posts={posts} />

          <div className="section-link-row">
            <Link to="/posts">全部文章</Link>
            <Link to="/tags">索引</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
