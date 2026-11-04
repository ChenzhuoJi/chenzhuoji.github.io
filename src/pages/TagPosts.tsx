import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { usePostsByTag } from '../hooks/usePosts'
import { sortPostsByDate } from '../utils/posts'
import { site } from '../data/site'
import ArchiveRows from '../components/ArchiveRows'

export default function TagPosts() {
  const { tag } = useParams<{ tag: string }>()
  const posts = usePostsByTag(tag ?? '')

  const sorted = useMemo(() => sortPostsByDate(posts), [posts])

  return (
    <div className="page">
      <Helmet>
        <title>{`${tag} · 索引 · ${site.name}`}</title>
      </Helmet>

      <div className="page-body">
          <header className="page-head">
            <h1 className="page-title">{tag}</h1>
            <p className="page-meta">共 {sorted.length} 篇</p>
          </header>

          <ArchiveRows posts={sorted} />

          <div className="section-link-row">
            <Link to="/tags">所有标签</Link>
            <Link to="/posts">全部文章</Link>
          </div>
      </div>
    </div>
  )
}
