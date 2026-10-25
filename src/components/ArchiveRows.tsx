import { Link } from 'react-router-dom'
import type { Post } from '../types'
import { shortDate } from '../utils/format'
import { GENRE_LABEL } from '../data/genres'

interface Props {
  posts: Post[]
  showGenre?: boolean
}

export default function ArchiveRows({ posts, showGenre = true }: Props) {
  if (posts.length === 0) {
    return <p className="empty">还没有文章。</p>
  }

  return (
    <div>
      {posts.map((post) => (
        <Link key={post.meta.slug} to={`/posts/${post.meta.slug}`} className="archive-row">
          <time dateTime={post.meta.date}>{shortDate(post.meta.date)}</time>
          <span className="archive-title">{post.meta.title}</span>
          {showGenre && <span className="archive-genre">{GENRE_LABEL[post.meta.genre]}</span>}
        </Link>
      ))}
    </div>
  )
}
