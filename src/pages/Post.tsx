import { useParams, Link } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import TOC from '../components/TOC'
import ColumnSidebar from '../components/ColumnSidebar'
import { usePost, useColumnNav, useRelatedPosts } from '../hooks/usePosts'
import { getColumnUrl } from '../utils/posts'
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
      <div className="flex items-center gap-2 text-xs text-ink-400 dark:text-ink-500 mb-8">
        <Link
          to="/"
          className="hover:text-ink-600 dark:hover:text-ink-300 transition-colors"
        >
          首页
        </Link>
        <span>/</span>
        <Link
          to={`/genre/${post.meta.genre}`}
          className="hover:text-ink-600 dark:hover:text-ink-300 transition-colors"
        >
          {post.meta.genre === 'vibe' ? 'Vibe Writing' : 'My Writing'}
        </Link>
        {post.meta.column && (
          <>
            <span>/</span>
            <Link
              to={`/columns/${getColumnUrl(post.meta.column)}`}
              className="hover:text-ink-600 dark:hover:text-ink-300 transition-colors"
            >
              {post.meta.column}
            </Link>
          </>
        )}
      </div>

      <header className="mb-10">
        <h1 className="text-3xl font-heading font-bold text-ink-900 dark:text-ink-100 leading-tight">
          {post.meta.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-400 dark:text-ink-500">
          <time>{post.meta.date}</time>
          <span className="text-ink-300 dark:text-ink-600">/</span>
          <span>{post.readingTime} 分钟阅读</span>
          <span className="text-ink-300 dark:text-ink-600">/</span>
          <Link
            to={`/genre/${post.meta.genre}`}
            className="text-vermilion-500 hover:text-vermilion-600 dark:hover:text-vermilion-400 transition-colors"
          >
            {post.meta.genre === 'vibe' ? 'Vibe Writing' : 'My Writing'}
          </Link>
          {post.meta.column && (
            <>
              <span className="text-ink-300 dark:text-ink-600">/</span>
              <Link
                to={`/columns/${getColumnUrl(post.meta.column)}`}
                className="text-vermilion-500 hover:text-vermilion-600 dark:hover:text-vermilion-400 transition-colors"
              >
                {post.meta.column}
              </Link>
            </>
          )}
          {post.meta.tags.length > 0 && (
            <>
              <span className="text-ink-300 dark:text-ink-600">/</span>
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
        <div className="flex-1 min-w-0 max-w-2xl">
          <MarkdownRenderer content={post.content} />

          {(nav.prev || nav.next) && (
            <nav className="mt-12 pt-5 border-t-2 border-ink-200 dark:border-ink-700">
              <div className="text-xs text-ink-400 dark:text-ink-500 mb-4 tracking-wide">
                {post.meta.column}
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {nav.prev ? (
                    <Link
                      to={`/posts/${nav.prev.meta.slug}`}
                      className="group block"
                    >
                      <span className="text-xs text-ink-400 dark:text-ink-500">← 上一篇</span>
                      <div className="mt-0.5 text-sm font-medium text-ink-700 dark:text-ink-300 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors truncate">
                        {nav.prev.meta.title}
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-right">
                  {nav.next ? (
                    <Link
                      to={`/posts/${nav.next.meta.slug}`}
                      className="group block"
                    >
                      <span className="text-xs text-ink-400 dark:text-ink-500">下一篇 →</span>
                      <div className="mt-0.5 text-sm font-medium text-ink-700 dark:text-ink-300 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors truncate">
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
        </div>
        <aside className="hidden lg:flex flex-col gap-6 sticky top-24 w-56 shrink-0">
          <TOC post={post} />
          {post.meta.column && (
            <ColumnSidebar column={post.meta.column} currentSlug={post.meta.slug} />
          )}
        </aside>
      </div>
    </article>
  )
}
