import { Link } from 'react-router-dom'
import { usePosts, usePinnedPosts, useColumns } from '../hooks/usePosts'
import AnimatedSection from '../components/AnimatedSection'
import artworks from '../data/artworks'
import books from '../data/books'

export default function Home() {
  const posts = usePosts()
  const pinned = usePinnedPosts()
  const columns = useColumns()
  const techPosts = posts.filter((p) => p.meta.genre === 'tech')

  const totalChars = posts.reduce((s, p) => s + p.content.replace(/\s/g, '').length, 0)

  return (
    <div>
      <AnimatedSection delay={0}>
        <section className="mb-12">
          <p className="font-accent text-sm text-ink-500 dark:text-ink-400 leading-relaxed">
            乐高玩具
          </p>
          <div className="mt-2 flex gap-4 text-xs text-ink-400 dark:text-ink-500">
            <span>共 {posts.length} 篇</span>
            <span>约 {(totalChars / 10000).toFixed(1)} 万字</span>
          </div>
        </section>
      </AnimatedSection>

      {pinned.length > 0 && (
        <AnimatedSection delay={0.1}>
          <section className="mb-10">
            <div className="text-xs text-ink-400 dark:text-ink-500 mb-3 tracking-wide">置顶</div>
            <div className="space-y-2">
              {pinned.map((post) => (
                <Link
                  key={post.meta.slug}
                  to={`/posts/${post.meta.slug}`}
                  className="group flex items-center gap-3 py-2 border-l-2 border-vermilion-500/50 pl-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-ink-900 dark:text-ink-100 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors truncate">
                      {post.meta.title}
                    </div>
                  </div>
                  <time className="text-xs text-ink-400 dark:text-ink-500 shrink-0 font-mono">{post.meta.date}</time>
                </Link>
              ))}
            </div>
          </section>
        </AnimatedSection>
      )}

      <AnimatedSection delay={0.2}>
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row gap-8">
            <Link
              to="/genre/my"
              className="group block flex-1"
            >
              <h2 className="text-lg font-heading font-semibold text-ink-900 dark:text-ink-100 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors text-center">
                My Writing
              </h2>
              <p className="mt-1 font-accent text-sm text-ink-400 dark:text-ink-500 leading-relaxed text-center">我的原创写作</p>
              <div className="mt-2 w-12 h-0.5 bg-vermilion-500/50 group-hover:bg-vermilion-500 transition-colors mx-auto" />
            </Link>
            <Link
              to="/genre/tech"
              className="group block flex-1"
            >
              <h2 className="text-lg font-heading font-semibold text-ink-900 dark:text-ink-100 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors text-center">
                Tech
              </h2>
              <p className="mt-1 font-accent text-sm text-ink-400 dark:text-ink-500 leading-relaxed text-center">论文与技术学习</p>
              <div className="mt-2 w-12 h-0.5 bg-vermilion-500/50 group-hover:bg-vermilion-500 transition-colors mx-auto" />
            </Link>
            <Link
              to="/gallery"
              className="group block flex-1"
            >
              <h2 className="text-lg font-heading font-semibold text-ink-900 dark:text-ink-100 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors text-center">
                Gallery
              </h2>
              <p className="mt-1 font-accent text-sm text-ink-400 dark:text-ink-500 leading-relaxed text-center">
                {artworks.length > 0 ? `共 ${artworks.length} 幅作品` : '日常绘画练习与实验'}
              </p>
              <div className="mt-2 w-12 h-0.5 bg-vermilion-500/50 group-hover:bg-vermilion-500 transition-colors mx-auto" />
            </Link>
          </div>
        </section>
      </AnimatedSection>

      {techPosts.length > 0 && (
        <AnimatedSection delay={0.3}>
          <section className="mb-12">
            <div className="divider mb-6" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-ink-400 dark:text-ink-500 tracking-wide">论文与技术学习</span>
              <Link
                to="/genre/tech"
                className="text-xs text-vermilion-500 hover:text-vermilion-600 transition-colors"
              >
                全部 →
              </Link>
            </div>
            <div className="space-y-2">
              {techPosts.slice(0, 5).map((post) => (
                <Link
                  key={post.meta.slug}
                  to={`/posts/${post.meta.slug}`}
                  className="group flex items-center gap-3 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-ink-900 dark:text-ink-100 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors truncate">
                      {post.meta.title}
                    </div>
                  </div>
                  <time className="text-xs text-ink-400 dark:text-ink-500 shrink-0 font-mono">{post.meta.date}</time>
                </Link>
              ))}
            </div>
          </section>
        </AnimatedSection>
      )}

      {columns.length > 0 && (
        <AnimatedSection delay={0.4}>
          <section className="mb-12">
            <div className="divider mb-6" />
            <div className="text-sm text-ink-400 dark:text-ink-500 mb-4 tracking-wide">栏目文章</div>
            <div className="space-y-8">
              {columns.map((col) => {
                const colPosts = posts
                  .filter((p) => p.meta.column === col.name)
                  .sort((a, b) => {
                    const ao = a.meta.order ?? 9999
                    const bo = b.meta.order ?? 9999
                    return ao - bo
                  })
                const series = [...new Set(colPosts.map((p) => p.meta.series).filter(Boolean))]
                const colTotalChars = colPosts.reduce((s, p) => s + p.content.replace(/\s/g, '').length, 0)

                return (
                  <Link
                    key={col.name}
                    to={`/columns/${col.slug ?? col.name}`}
                    className="group block hover:border-vermilion-500/50 transition-colors"
                  >
                    <h3 className="text-lg font-heading font-medium text-ink-900 dark:text-ink-100 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors">
                      {col.name}
                    </h3>
                    <p className="text-sm text-ink-400 dark:text-ink-500 mt-1 font-accent">{col.description}</p>
                    <p className="text-xs text-ink-400 dark:text-ink-500 mt-2">
                      共 {colPosts.length} 篇
                      {series.length > 0 && <span> · {series.length} 个系列</span>}
                      <span> · 约 {(colTotalChars / 10000).toFixed(1)} 万字</span>
                    </p>
                  </Link>
                )
              })}
            </div>
          </section>
        </AnimatedSection>
      )}

      {books.length > 0 && (
      <AnimatedSection delay={0.6}>
          <section className="mb-12">
            <div className="divider mb-6" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-ink-400 dark:text-ink-500 tracking-wide">My Reading</span>
              <Link
                to="/reading"
                className="text-xs text-vermilion-500 hover:text-vermilion-600 transition-colors"
              >
                全部 →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {books.map((book) => (
                <Link
                  key={book.slug}
                  to={`/reading/${book.slug}`}
                  className="group block"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-sm bg-ink-100 dark:bg-ink-800">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-ink-900 dark:text-ink-100 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors truncate">
                    {book.title}
                  </h3>
                  <p className="text-xs text-ink-400 dark:text-ink-500 truncate">{book.author}</p>
                </Link>
              ))}
            </div>
          </section>
        </AnimatedSection>
      )}

      <AnimatedSection delay={0.5}>
        <div className="border-t border-ink-200 dark:border-ink-800 pt-8 text-center">
          <Link
            to="/posts"
            className="btn-ghost text-sm"
          >
            全部文章
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  )
}
