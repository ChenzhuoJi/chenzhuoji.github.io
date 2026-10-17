import { Link } from 'react-router-dom'
import { usePosts, usePinnedPosts } from '../hooks/usePosts'
import AnimatedSection from '../components/AnimatedSection'
import artworks from '../data/artworks'

const fmtDate = (d?: string) => (d ? d.replace(/-/g, '.') : '')

export default function Home() {
  const posts = usePosts()
  const pinned = usePinnedPosts()
  const techPosts = posts.filter((p) => p.meta.genre === 'tech')

  const sections = [
    {
      to: '/genre/my', en: 'My Writing', cn: '我的原创写作', count: posts.filter((p) => p.meta.genre === 'my').length, unit: '篇',
      panel: 'bg-ink-900',
      title: 'text-paper',
      kicker: 'text-ink-400',
      meta: 'text-ink-500',
    },
    {
      to: '/genre/tech', en: 'Tech', cn: '论文与技术学习', count: techPosts.length, unit: '篇',
      panel: 'bg-vermilion-600',
      title: 'text-white',
      kicker: 'text-white/70',
      meta: 'text-white/60',
    },
    {
      to: '/gallery', en: 'Gallery', cn: '绘画练习与实验', count: artworks.length, unit: '幅',
      panel: 'bg-frost-800 dark:bg-frost-900',
      title: 'text-white',
      kicker: 'text-white/60',
      meta: 'text-white/50',
    },
  ]

  return (
    <div>
      {/* ── 刊头 ── */}
      <AnimatedSection delay={0}>
        <header className="pt-6 pb-8">
          <h1 className="mt-8 font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.98] text-ink-900 dark:text-ink-50">
            乐高玩具
          </h1>
        </header>
      </AnimatedSection>

      {/* ── 头条 ── */}
      {pinned.length > 0 && (
        <AnimatedSection delay={0.1}>
          <section className="py-8 rule-heavy">
            <div className="kicker-red mb-5">头条 · Headline</div>
            <div className="space-y-7">
              {pinned.map((post) => (
                <Link key={post.meta.slug} to={`/posts/${post.meta.slug}`} className="group block">
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-ink-900 dark:text-ink-50 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors">
                    {post.meta.title}
                  </h2>
                  <div className="mt-3 flex items-center gap-3 kicker">
                    <span>{fmtDate(post.meta.date)}</span>
                    {post.meta.column && <span className="text-ink-300 dark:text-ink-600">/</span>}
                    {post.meta.column && <span>{post.meta.column}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* ── 版块入口 ── */}
      <AnimatedSection delay={0.2}>
        <section className="rule-heavy">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {sections.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className={`group flex flex-col items-center justify-between gap-6 px-6 py-12 min-h-[15rem] transition-opacity hover:opacity-90 ${s.panel}`}
              >
                <h3 className={`font-serif text-2xl font-semibold leading-[1.1] tracking-[0.12em] [writing-mode:vertical-rl] [text-orientation:upright] ${s.title}`}>
                  {s.cn}
                </h3>
                <div className="flex flex-col items-center gap-1">
                  <span className={`kicker ${s.kicker}`}>{s.en}</span>
                  <span className={`font-mono text-xs ${s.meta}`}>
                    {s.count} {s.unit}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* ── 论文与技术学习 ── */}
      {techPosts.length > 0 && (
        <AnimatedSection delay={0.3}>
          <section className="py-8 rule-heavy">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="font-serif text-2xl font-semibold text-ink-900 dark:text-ink-50">
                论文与技术学习
                <span className="kicker ml-3 align-middle">Tech</span>
              </h2>
              <Link to="/genre/tech" className="kicker hover:text-vermilion-600 dark:hover:text-vermilion-400 transition-colors">
                全部 →
              </Link>
            </div>
            <div>
              {techPosts.slice(0, 5).map((post, i) => (
                <Link
                  key={post.meta.slug}
                  to={`/posts/${post.meta.slug}`}
                  className="group grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-4 py-3 border-b border-ink-200 dark:border-ink-800"
                >
                  <span className="font-mono text-xs text-ink-300 dark:text-ink-600">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-serif text-base sm:text-lg text-ink-800 dark:text-ink-200 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors leading-snug">
                    {post.meta.title}
                  </span>
                  <span className="hidden sm:block font-mono text-xs text-ink-400 dark:text-ink-500">{fmtDate(post.meta.date)}</span>
                </Link>
              ))}
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* ── 全部文章 ── */}
      <AnimatedSection delay={0.5}>
        <div className="py-10 flex flex-col items-center gap-3">
          <span className="kicker">Index</span>
          <Link
            to="/posts"
            className="group font-serif text-2xl font-semibold text-ink-900 dark:text-ink-50 hover:text-vermilion-600 dark:hover:text-vermilion-400 transition-colors"
          >
            全部文章 <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  )
}
