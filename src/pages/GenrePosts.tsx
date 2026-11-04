import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { usePostsByGenre } from '../hooks/usePosts'
import { sortPostsByDate } from '../utils/posts'
import { site } from '../data/site'
import ArchiveRows from '../components/ArchiveRows'
import { GENRE_LABEL } from '../data/genres'
import type { Genre } from '../types'

export default function GenrePosts() {
  const { name } = useParams<{ name: string }>()
  const genre: Genre = name === 'vibe' ? 'vibe' : name === 'tech' ? 'tech' : 'my'
  const posts = usePostsByGenre(genre)

  const sorted = useMemo(() => sortPostsByDate(posts), [posts])

  const label = GENRE_LABEL[genre]

  return (
    <div className="page">
      <Helmet>
        <title>{`${label} · ${site.name}`}</title>
      </Helmet>

      <div className="page-body">
          <header className="page-head">
            <h1 className="page-title">{label}</h1>
          </header>

          <ArchiveRows posts={sorted} showGenre={false} />

          <div className="section-link-row">
            <Link to="/posts">全部文章</Link>
            <Link to="/tags">索引</Link>
          </div>
      </div>
    </div>
  )
}
