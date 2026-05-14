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
      <h2 className="text-lg font-serif font-semibold text-ink-900 dark:text-ink-100 mb-4">
        相关文章
      </h2>
      <div className="space-y-3">
        {articles.map(({ post, sharedTags }) => (
          <Link
            key={post.meta.slug}
            to={`/posts/${post.meta.slug}`}
            className="block p-4 rounded-lg bg-ink-50 dark:bg-ink-800/50 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
          >
            <div className="text-sm font-medium text-ink-900 dark:text-ink-100">
              {post.meta.title}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {sharedTags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded-full bg-vermilion-100 dark:bg-vermilion-900/30 text-vermilion-600 dark:text-vermilion-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
