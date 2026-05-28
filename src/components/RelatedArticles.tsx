import { Link } from 'react-router-dom'
import type { Post } from '../types'

interface RelatedPost {
  post: Post
  sharedTags: string[]
}

interface Props {
  articles: RelatedPost[]
}

export default function RelatedArticles({ articles }: Props) {
  if (articles.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-ink-200 dark:border-ink-700">
      <h2 className="text-lg font-heading font-semibold text-ink-900 dark:text-ink-100 mb-4">
        相关文章
      </h2>
      <div className="space-y-3">
        {articles.map(({ post, sharedTags }) => (
          <Link
            key={post.meta.slug}
            to={`/posts/${post.meta.slug}`}
            className="block py-3 border-b border-ink-100 dark:border-ink-800 last:border-b-0 hover:border-ink-200 dark:hover:border-ink-700 transition-colors"
          >
            <div className="text-sm font-medium text-ink-900 dark:text-ink-100">
              {post.meta.title}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {sharedTags.map((t) => (
                <span
                  key={t}
                  className="text-xs text-vermilion-600 dark:text-vermilion-400"
                >
                  #{t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
