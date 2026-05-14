import { useParams, Link } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import TOC from '../components/TOC'
import { usePost, useColumnNav, useRelatedPosts } from '../hooks/usePosts'
import RelatedArticles from '../components/RelatedArticles'

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

  return (
    <article>
      <Link
        to="/"
        className="inline-flex items-center text-sm text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors mb-8"
      >
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        返回
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-ink-900 dark:text-ink-100 leading-tight">
          {post.meta.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-400 dark:text-ink-500">
          <time>{post.meta.date}</time>
          <span className="w-1 h-1 rounded-full bg-ink-300 dark:bg-ink-600" />
          <span>{post.readingTime} 分钟阅读</span>
          <span className="w-1 h-1 rounded-full bg-ink-300 dark:bg-ink-600" />
          <Link
            to={`/genre/${post.meta.genre}`}
            className="text-vermilion-500 hover:text-vermilion-600 dark:hover:text-vermilion-400 transition-colors"
          >
            {post.meta.genre === 'vibe' ? 'Vibe Writing' : 'My Writing'}
          </Link>
          {post.meta.column && (
            <>
              <span className="w-1 h-1 rounded-full bg-ink-300 dark:bg-ink-600" />
              <Link
                to={`/columns/${post.meta.column}`}
                className="text-vermilion-500 hover:text-vermilion-600 dark:hover:text-vermilion-400 transition-colors"
              >
                {post.meta.column}
              </Link>
            </>
          )}
          {post.meta.tags.length > 0 && (
            <>
              <span className="w-1 h-1 rounded-full bg-ink-300 dark:bg-ink-600" />
              <div className="flex gap-1.5">
                {post.meta.tags.map((t) => (
                  <Link
                    key={t}
                    to={`/tags/${t}`}
                    className="text-vermilion-500 hover:text-vermilion-600 dark:hover:text-vermilion-400 transition-colors"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      <div className="flex gap-12 items-start">
        <div className="flex-1 min-w-0">
          <MarkdownRenderer content={post.content} />

          <RelatedArticles articles={related} />

          {(nav.prev || nav.next) && (
            <nav className="mt-12 pt-8 border-t border-ink-200 dark:border-ink-700">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {nav.prev && (
                    <Link
                      to={`/posts/${nav.prev.meta.slug}`}
                      className="group block"
                    >
                      <span className="text-xs text-ink-400 dark:text-ink-500">← 上一篇</span>
                      <div className="mt-0.5 text-sm text-ink-700 dark:text-ink-300 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors truncate">
                        {nav.prev.meta.title}
                      </div>
                    </Link>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-right">
                  {nav.next && (
                    <Link
                      to={`/posts/${nav.next.meta.slug}`}
                      className="group block"
                    >
                      <span className="text-xs text-ink-400 dark:text-ink-500">下一篇 →</span>
                      <div className="mt-0.5 text-sm text-ink-700 dark:text-ink-300 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors truncate">
                        {nav.next.meta.title}
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          )}
        </div>
        <TOC post={post} />
      </div>
    </article>
  )
}
