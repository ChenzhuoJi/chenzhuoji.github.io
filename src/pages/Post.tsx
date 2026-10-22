import { useParams, Link } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { usePost, useColumnNav, useRelatedPosts } from '../hooks/usePosts'
import { getColumnUrl, countChars } from '../utils/posts'
import type { Genre } from '../types'
import RelatedArticles from '../components/RelatedArticles'

const GENRE_LABEL: Record<Genre, string> = { vibe: 'Vibe', my: '随笔', tech: '有用' }
const GENRE_DOT: Record<Genre, string> = {
  my: 'bg-ink-800/60 dark:bg-ink-200/50',
  vibe: 'bg-vermilion-500/80',
  tech: 'bg-frost-600/80 dark:bg-frost-300/80',
}

export default function Post() {
  const { slug } = useParams<{ slug: string }>()
  const post = usePost(slug ?? '')
  const nav = useColumnNav(slug ?? '')
  const related = useRelatedPosts(slug ?? '')

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-ink-400 dark:text-ink-500">文章未找到</p>
        <Link to="/" className="mt-4 inline-block text-sm text-vermilion-500 hover:text-vermilion-600 transition-colors">
          ← 返回首页
        </Link>
      </div>
    )
  }

  const genre = post.meta.genre
  const date = post.meta.date.replace(/-/g, '.')

  return (
    <article className="mx-auto w-full max-w-[45rem]">
      <nav className="mb-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] tracking-[0.12em] text-ink-500 dark:text-ink-400">
        <Link to="/" className="transition-colors hover:text-vermilion-600 dark:hover:text-vermilion-400">
          首页
        </Link>
        <span className="text-ink-300 dark:text-ink-600">/</span>
        <Link
          to={`/genre/${genre}`}
          className="transition-colors hover:text-vermilion-600 dark:hover:text-vermilion-400"
        >
          {GENRE_LABEL[genre]}
        </Link>
        <span className="hidden text-ink-300 dark:text-ink-600 sm:inline">/</span>
        <span
          className="hidden max-w-[20rem] truncate text-ink-400 dark:text-ink-500 sm:inline"
          aria-current="page"
        >
          {post.meta.title}
        </span>
      </nav>

      <header className="mb-12">
        <h1 className="font-heading text-[2.15rem] font-semibold leading-[1.25] tracking-[0.035em] text-ink-900 dark:text-ink-50 sm:text-[2.6rem]">
          {post.meta.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.7rem] text-ink-400 dark:text-ink-500">
          <span className={`h-1.5 w-1.5 rounded-full ${GENRE_DOT[genre]}`} aria-hidden="true" />
          <time className="font-mono tracking-wider">{date}</time>

          <span className="text-ink-300 dark:text-ink-600">·</span>
          <Link
            to={`/genre/${genre}`}
            className="transition-colors hover:text-vermilion-600 dark:hover:text-vermilion-400"
          >
            {GENRE_LABEL[genre]}
          </Link>

          {post.meta.column && (
            <>
              <span className="text-ink-300 dark:text-ink-600">·</span>
              <Link
                to={`/columns/${getColumnUrl(post.meta.column)}`}
                className="transition-colors hover:text-vermilion-600 dark:hover:text-vermilion-400"
              >
                {post.meta.column}
                {post.meta.order != null && ` · 第 ${post.meta.order} 篇`}
              </Link>
            </>
          )}

          <span className="text-ink-300 dark:text-ink-600">·</span>
          <span>共 {countChars(post.content).toLocaleString('zh-CN')} 字</span>
        </div>
      </header>

      <MarkdownRenderer content={post.content} />

      {(nav.prev || nav.next) && (
        <nav className="mt-14 border-t border-dashed border-ink-300/80 pt-6 dark:border-ink-700">
          <div className="mb-4 font-accent text-sm text-ink-400 dark:text-ink-500">{post.meta.column}</div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              {nav.prev ? (
                <Link to={`/posts/${nav.prev.meta.slug}`} className="group block">
                  <span className="text-sm text-ink-400 dark:text-ink-500">← 上一篇</span>
                  <div className="mt-1 truncate font-heading text-base font-medium text-ink-700 transition-colors group-hover:text-vermilion-600 dark:text-ink-300 dark:group-hover:text-vermilion-400">
                    {nav.prev.meta.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
            <div className="flex-1 min-w-0 text-right">
              {nav.next ? (
                <Link to={`/posts/${nav.next.meta.slug}`} className="group block">
                  <span className="text-sm text-ink-400 dark:text-ink-500">下一篇 →</span>
                  <div className="mt-1 truncate font-heading text-base font-medium text-ink-700 transition-colors group-hover:text-vermilion-600 dark:text-ink-300 dark:group-hover:text-vermilion-400">
                    {nav.next.meta.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </nav>
      )}

      <RelatedArticles articles={related} />
    </article>
  )
}
