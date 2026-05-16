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
          乐高玩具
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

      <section className="mb-12">
        <Link
          to="/genre/my"
          className="group block max-w-sm p-6 rounded-xl bg-gradient-to-br from-ink-100 to-ink-50 dark:from-ink-800 dark:to-ink-900 border border-ink-200 dark:border-ink-700 hover:border-vermilion-300 dark:hover:border-vermilion-700 transition-all"
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
          <div className="flex flex-col items-center md:flex-row md:justify-center gap-6">
            {columns.map((col) => {
              const colPosts = posts
                .filter((p) => p.meta.column === col.name)
                .sort((a, b) => {
                  const ao = a.meta.order ?? 9999
                  const bo = b.meta.order ?? 9999
                  return ao - bo
                })
              const series = [...new Set(colPosts.map((p) => p.meta.series).filter(Boolean))]
              const totalChars = colPosts.reduce((s, p) => s + p.content.replace(/\s/g, '').length, 0)
              const isComplete = colPosts.some((p) => p.meta.series === '后记')
              return (
                <Link
                  key={col.name}
                  to={`/columns/${col.slug ?? col.name}`}
                  className="relative overflow-hidden rounded-xl bg-gradient-to-br from-ink-100 to-ink-50 dark:from-ink-800 dark:to-ink-950 border border-ink-200 dark:border-ink-700 w-full max-w-sm md:w-72 group hover:border-vermilion-300 dark:hover:border-vermilion-700 transition-all"
                >
                  <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-vermilion-500/[0.04] dark:bg-vermilion-500/[0.06] blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-vermilion-500/[0.03] dark:bg-vermilion-500/[0.04] blur-2xl" />

                  <div className="relative p-8 flex flex-col items-center text-center">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-vermilion-500 dark:text-vermilion-400 mb-5">
                      <div className="w-6 h-px bg-vermilion-500/30" />
                      <span>FEATURED</span>
                      {isComplete && <span className="px-1.5 py-0.5 rounded text-[9px] border border-ink-300/50 dark:border-ink-600/50 text-ink-500 dark:text-ink-400 tracking-normal">完结</span>}
                      <div className="w-6 h-px bg-vermilion-500/30" />
                    </div>

                    <h3 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100 mb-3 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors leading-snug">
                      {col.name}
                    </h3>

                    <p className="text-[11px] text-ink-400 dark:text-ink-500 leading-relaxed mb-5 min-h-[1em]">
                      {col.description}
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-5 w-full">
                      <div>
                        <div className="text-lg font-semibold text-ink-900 dark:text-ink-100">{colPosts.length}</div>
                        <div className="text-[10px] text-ink-400">文章</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-ink-900 dark:text-ink-100">{(totalChars / 10000).toFixed(1)}</div>
                        <div className="text-[10px] text-ink-400">万字</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-ink-900 dark:text-ink-100">{series.length}</div>
                        <div className="text-[10px] text-ink-400">系列</div>
                      </div>
                    </div>

                    {series.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                        {series.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-md bg-ink-200/70 dark:bg-ink-700/50 text-[10px] text-ink-600 dark:text-ink-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}


                  </div>
                </Link>
              )
            })}
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
