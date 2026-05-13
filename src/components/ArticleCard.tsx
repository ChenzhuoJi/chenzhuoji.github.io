import type { PostMeta } from '../types'

interface Props {
  post: PostMeta
}

export default function ArticleCard({ post }: Props) {
  return (
    <article className="group">
      <a href={`/posts/${post.slug}`} className="block">
        <time className="text-sm text-ink-400 dark:text-ink-500 font-mono">{post.date}</time>
        <h2 className="mt-1 text-lg font-medium text-ink-900 dark:text-ink-100 group-hover:text-vermilion-500 dark:group-hover:text-vermilion-400 transition-colors">
          {post.title}
        </h2>
        {post.description && (
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400 line-clamp-2">{post.description}</p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </a>
    </article>
  )
}
