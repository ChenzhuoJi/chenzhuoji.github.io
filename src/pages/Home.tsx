import { Link } from 'react-router-dom'
import { usePosts, usePinnedPosts, useColumns } from '../hooks/usePosts'

export default function Home() {
  const posts = usePosts()
  const pinned = usePinnedPosts()
  const columns = useColumns()

  const totalChars = posts.reduce((s, p) => s + p.content.replace(/\s/g, '').length, 0)

  return (
    <div>
      <section className="mb-8">
        <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed">
          一个普通人眼中的世界。
        </p>
        <div className="mt-3 flex gap-5 text-xs text-ink-400 dark:text-ink-500">
          <span>共 {posts.length} 篇</span>
          <span>约 {(totalChars / 10000).toFixed(1)} 万字</span>
        </div>
      </section>

      {pinned.length > 0 && (
        <section className="mb-10">
          <div className="space-y-3">
            {pinned.map((post) => (
              <Link
                key={post.meta.slug}
                to={`/posts/${post.meta.slug}`}
                className="block group"
              >
                <article className="flex items-center gap-3 p-4 rounded-xl bg-ink-100/60 dark:bg-ink-800/40 border border-ink-200 dark:border-ink-700 hover:border-vermilion-300 dark:hover:border-vermilion-700 transition-colors">
                  <svg className="w-5 h-5 text-vermilion-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink-900 dark:text-ink-100 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors truncate">
                      {post.meta.title}
                    </div>
                    <div className="text-xs text-ink-400 dark:text-ink-500 mt-0.5">
                      <time>{post.meta.date}</time>
                      {post.meta.column && (
                        <>
                          <span className="mx-1">·</span>
                          <span>{post.meta.column}</span>
                          {post.meta.order != null && <span> · 第 {post.meta.order} 篇</span>}
                        </>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/genre/vibe"
          className="group p-6 rounded-xl bg-gradient-to-br from-ink-100 to-ink-50 dark:from-ink-800 dark:to-ink-900 border border-ink-200 dark:border-ink-700 hover:border-vermilion-300 dark:hover:border-vermilion-700 transition-all"
        >
          <h2 className="text-lg font-serif font-semibold text-ink-900 dark:text-ink-100 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors">
            Vibe Writing
          </h2>
          <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">AI 主导写作</p>
        </Link>
        <Link
          to="/genre/my"
          className="group p-6 rounded-xl bg-gradient-to-br from-ink-100 to-ink-50 dark:from-ink-800 dark:to-ink-900 border border-ink-200 dark:border-ink-700 hover:border-vermilion-300 dark:hover:border-vermilion-700 transition-all"
        >
          <h2 className="text-lg font-serif font-semibold text-ink-900 dark:text-ink-100 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors">
            My Writing
          </h2>
          <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">我的原创写作</p>
        </Link>
      </section>

      {columns.length > 0 && (
        <section className="mb-12">
          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-ink-200 dark:border-ink-700" />
            <span className="mx-4 text-sm text-ink-400 dark:text-ink-500 whitespace-nowrap">栏目文章</span>
            <div className="flex-grow border-t border-ink-200 dark:border-ink-700" />
          </div>
          <div className="flex flex-wrap gap-3">
            {columns.map((col) => (
              <Link
                key={col}
                to={`/columns/${col}`}
                className="px-8 py-4 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-vermilion-50 dark:hover:bg-vermilion-950/30 hover:text-vermilion-600 dark:hover:text-vermilion-400 hover:border-vermilion-300 dark:hover:border-vermilion-700 transition-colors text-lg border border-ink-200 dark:border-ink-700"
              >
                {col}
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="text-center">
        <Link
          to="/posts"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-vermilion-50 dark:hover:bg-vermilion-950/30 hover:text-vermilion-600 dark:hover:text-vermilion-400 transition-colors text-sm border border-ink-200 dark:border-ink-700"
        >
          全部文章
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
