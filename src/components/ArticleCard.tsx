import { Link } from 'react-router-dom'
import type { Genre, PostMeta } from '../types'

interface Props {
  post: PostMeta
}

/** 悬停时在左侧浮现的小气泡，按门类取色 */
const BUBBLE_TONE: Record<Genre, string> = {
  my: 'border-ink-900/45 dark:border-ink-100/45',
  vibe: 'border-vermilion-500/60 dark:border-vermilion-400/60',
  tech: 'border-frost-600/60 dark:border-frost-300/60',
}

export default function ArticleCard({ post }: Props) {
  return (
    <article className="group relative">
      <Link
        to={`/posts/${post.slug}`}
        className="block rounded-[1.4rem] px-4 py-6 transition-colors duration-300 hover:bg-ink-100/60 dark:hover:bg-ink-900/40 sm:px-6 sm:py-7"
      >
        <span
          className={`absolute left-1 top-[2.1rem] h-[7px] w-[7px] -translate-x-1 rounded-full border bg-paper/40 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:bg-ink-950/40 sm:left-2 ${BUBBLE_TONE[post.genre]}`}
          aria-hidden="true"
        />

        <h2 className="font-accent text-[1.35rem] leading-snug text-ink-900 decoration-vermilion-400/60 decoration-dashed decoration-1 underline-offset-[7px] transition-all duration-300 group-hover:-translate-x-1 group-hover:text-vermilion-600 group-hover:underline dark:text-ink-50 dark:group-hover:text-vermilion-400 sm:text-[1.6rem]">
          {post.title}
        </h2>

        {post.description && (
          <p className="mt-1.5 line-clamp-1 font-heading text-[0.85rem] leading-relaxed text-ink-500/90 dark:text-ink-400/90">
            {post.description}
          </p>
        )}

        <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.68rem] text-ink-400/80 dark:text-ink-500">
          <time className="font-mono tracking-wider">{post.date.replace(/-/g, '.')}</time>

          {post.column && (
            <span className="text-ink-400/70 dark:text-ink-600">
              {post.column}
              {post.order != null && ` · 第 ${post.order} 篇`}
            </span>
          )}

          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-ink-400/65 transition-colors duration-300 group-hover:text-ink-400 dark:text-ink-600 dark:group-hover:text-ink-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  )
}
