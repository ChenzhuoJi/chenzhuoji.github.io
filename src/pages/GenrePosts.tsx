import type { CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import ArticleList from '../components/ArticleList'
import { usePostsByGenre } from '../hooks/usePosts'
import type { Genre } from '../types'

const GENRE_META: Record<Genre, { title: string; subtitle: string }> = {
  my: { title: '随笔', subtitle: '' },
  tech: { title: '有用的笔记', subtitle: '把看过的论文折成纸飞机，飞一会儿' },
  vibe: { title: '和 AI 一起写的', subtitle: '' },
}

export default function GenrePosts() {
  const { name } = useParams<{ name: string }>()
  const genre: Genre = name === 'vibe' ? 'vibe' : name === 'tech' ? 'tech' : 'my'
  const posts = usePostsByGenre(genre)
  const meta = GENRE_META[genre]

  return (
    <div className="mx-auto w-full max-w-[50rem]">
      <Link
        to="/"
        className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] text-ink-400 transition-colors hover:text-vermilion-600 dark:text-ink-500 dark:hover:text-vermilion-400"
      >
        飘回去
        <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
      </Link>

      <section className="relative pb-8 pt-6 sm:pb-10">
        <div className="relative">
          <span className="relative inline-block pb-3">
            <h1 className="font-accent text-[2.35rem] leading-[1.15] text-ink-900 dark:text-ink-50 sm:text-5xl">
              {meta.title}
            </h1>

            {/* 手绘下划线 */}
            <svg
              viewBox="0 0 240 12"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-3 w-full text-vermilion-500/70 dark:text-vermilion-400/60"
            >
              <path
                d="M3 8 Q 58 3 112 7 T 236 5"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M14 11 Q 64 7 118 10 T 226 8"
                stroke="currentColor"
                strokeWidth={0.8}
                strokeLinecap="round"
                opacity={0.35}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>

          {/* 一只慢慢飘的小气球 */}
          <span
            className="bubble-float absolute right-0 top-0 hidden text-ink-400/60 dark:text-ink-500/70 sm:block"
            style={{ '--tilt': '2deg' } as CSSProperties}
            aria-hidden="true"
          >
            <svg viewBox="0 0 70 110" fill="none" className="h-24 w-16">
              <path
                d="M35 8 C 50 8, 58 22, 58 36 C 58 51, 48 60, 35 60 C 22 60, 12 51, 12 36 C 12 22, 20 8, 35 8 Z"
                stroke="currentColor"
                strokeWidth={1.4}
              />
              <path
                d="M31 60 L 35 67 L 39 60"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35 67 C 30 76, 40 82, 34 92 C 30 98, 38 100, 42 97"
                stroke="currentColor"
                strokeWidth={1}
                strokeLinecap="round"
                strokeDasharray="2 4"
              />
              <path
                d="M22 28 Q 17 36 20 46"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                opacity={0.4}
              />
            </svg>
          </span>
        </div>

        {meta.subtitle && (
          <p className="mt-5 font-accent text-base text-ink-500 dark:text-ink-400 sm:text-lg">{meta.subtitle}</p>
        )}
        <p className="mt-3 text-[0.65rem] tracking-[0.3em] text-ink-400 dark:text-ink-500">共 {posts.length} 篇</p>
      </section>

      <ArticleList posts={posts} />
    </div>
  )
}
