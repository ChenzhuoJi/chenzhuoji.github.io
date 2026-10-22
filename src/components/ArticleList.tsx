import type { Post } from '../types'
import PostCard from './ArticleCard'

interface Props {
  posts: Post[]
}

/** 列表之间手绘的浅色虚线 */
function HandRule() {
  return (
    <svg
      viewBox="0 0 600 8"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className="h-2 w-full text-ink-300/70 dark:text-ink-700/80"
    >
      <path
        d="M2 4 C 48 1.5, 96 6.5, 144 4 S 240 1.5, 288 4 S 384 6.5, 432 4 S 528 1.5, 576 4 S 592 3.5, 598 4"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeDasharray="2 6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/** 没有文章时，一只瘪掉的气球 */
function EmptyState() {
  return (
    <div className="mx-auto flex w-full max-w-[50rem] flex-col items-center px-4 py-16 text-center sm:py-20">
      <svg
        viewBox="0 0 120 110"
        fill="none"
        aria-hidden="true"
        className="h-40 w-40 text-ink-400/65 dark:text-ink-500/80"
      >
        <path
          d="M42 46 C 42 30, 54 22, 66 24 C 80 26, 88 38, 84 50 C 81 60, 70 68, 58 66 C 47 64, 42 57, 42 46 Z"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
        />
        <path
          d="M56 67 L 60 74 L 64 67"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M60 74 C 54 84, 68 89, 60 100 C 55 106, 66 108, 72 103"
          stroke="currentColor"
          strokeWidth={1.1}
          strokeLinecap="round"
          strokeDasharray="2 4"
        />
        <path d="M88 34 Q 92 30 95 34" stroke="currentColor" strokeWidth={1} strokeLinecap="round" opacity={0.5} />
        <path d="M91 44 Q 96 41 99 45" stroke="currentColor" strokeWidth={1} strokeLinecap="round" opacity={0.35} />
        <path d="M32 32 Q 35 29 38 32" stroke="currentColor" strokeWidth={1} strokeLinecap="round" opacity={0.35} />
        <path d="M48 59 Q 52 63 56 60" stroke="currentColor" strokeWidth={1} strokeLinecap="round" opacity={0.35} />
        <path d="M64 64 Q 67 67 71 64" stroke="currentColor" strokeWidth={1} strokeLinecap="round" opacity={0.3} />
      </svg>
      <p className="mt-5 font-accent text-base text-ink-500 dark:text-ink-400">这里还空着，等我慢慢吹个气球</p>
    </div>
  )
}

export default function ArticleList({ posts }: Props) {
  if (posts.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="mx-auto w-full max-w-[50rem]">
      {posts.map((post, index) => (
        <div key={post.meta.slug}>
          {index > 0 && <HandRule />}
          <PostCard post={post.meta} />
        </div>
      ))}
    </div>
  )
}
