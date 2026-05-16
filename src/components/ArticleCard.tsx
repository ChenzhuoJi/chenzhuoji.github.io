import type { PostMeta } from '../types'
import { useInView } from '../hooks/useInView'

interface Props {
  post: PostMeta
  index?: number
}

export default function ArticleCard({ post, index = 0 }: Props) {
  const { ref, inView } = useInView<HTMLElement>(0.1)

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${index * 0.1}s` }}
      className={`group transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <a href={`/posts/${post.slug}`} className="block">
        <div className="text-sm text-ink-400 dark:text-ink-500">
          <time className="font-mono">{post.date}</time>
          {post.column && (
            <>
              <span className="mx-1.5">·</span>
              <span>{post.column}</span>
              {post.order != null && <span> · 第 {post.order} 篇</span>}
            </>
          )}
        </div>
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
