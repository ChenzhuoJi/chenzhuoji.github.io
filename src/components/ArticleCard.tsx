import { Link } from 'react-router-dom'
import type { PostMeta } from '../types'

interface Props {
  post: PostMeta
}

export default function ArticleCard({ post }: Props) {
  return (
    <article className="group">
      <Link to={`/posts/${post.slug}`} className="article-row">
        <div className="flex items-end gap-3">
          <h2 className="text-[1.2rem] font-normal text-ink-900 dark:text-ink-100 group-hover:text-vermilion-500 dark:group-hover:text-vermilion-400 transition-colors truncate">
            {post.title}
          </h2>
          <time className="text-[0.8rem] text-ink-400 dark:text-ink-500 font-mono shrink-0 ml-auto">{post.date}</time>

        </div>
        {post.description && (
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400 line-clamp-1 font-accent">{post.description}</p>
        )}
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-ink-400 dark:text-ink-500">
          {post.column && (
            <>
              <span>{post.column}</span>
              {post.order != null && <span>第 {post.order} 篇</span>}
            </>
          )}
          {post.tags.length > 0 && (
            <>
              {post.tags.map((t) => (
                <span key={t} className="tag">#{t}</span>
              ))}
            </>
          )}
        </div>
      </Link>
    </article>
  )
}
