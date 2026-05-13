import { useParams, Link } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import TOC from '../components/TOC'
import { usePost } from '../hooks/usePosts'

export default function Post() {
  const { slug } = useParams<{ slug: string }>()
  const post = usePost(slug ?? '')

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

      <div className="flex gap-12">
        <div className="flex-1 min-w-0">
          <MarkdownRenderer content={post.content} />
        </div>
        <TOC post={post} />
      </div>
    </article>
  )
}
