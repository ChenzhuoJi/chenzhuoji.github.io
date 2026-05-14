import { Link } from 'react-router-dom'
import ArticleList from '../components/ArticleList'
import { usePinnedPosts, useRecentPosts, usePosts } from '../hooks/usePosts'

const RECENT_COUNT = 10

export default function Home() {
  const pinned = usePinnedPosts()
  const recent = useRecentPosts(RECENT_COUNT)
  const all = usePosts()
  const hasMore = all.filter((p) => !p.meta.pin).length > RECENT_COUNT

  return (
    <div>
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
                    <div className="text-xs text-ink-400 dark:text-ink-500 mt-0.5">{post.meta.date}</div>
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

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-serif font-semibold text-ink-900 dark:text-ink-100">最新文章</h2>
          {hasMore && (
            <Link
              to="/explore"
              className="text-sm text-vermilion-500 hover:text-vermilion-600 dark:hover:text-vermilion-400 transition-colors"
            >
              浏览更多 →
            </Link>
          )}
        </div>
        <ArticleList posts={recent} />
      </section>
    </div>
  )
}
