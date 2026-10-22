import { Link } from 'react-router-dom'
// 获取全部文章和指定文章，它们内部用useMemo缓存getAllPosts()等结果，避免每次渲染都重新解析Markdown。
import { usePosts, usePinnedPosts } from '../hooks/usePosts'
// 包裹各板块（头条、门类入口、Tech列表。），利用useInView做进入视口时淡入上移的动画，delay控制错峰出现
import AnimatedSection from '../components/AnimatedSection'
// 用于显示画廊作品数量
import artworks from '../data/artworks'

// 参数d类型为string,?表示可选参数。
// =>表示返回值就是后面的三元表达式
// d ? ... : ''，三元判断，走的是真值判断，:/undefined/''都会得到''
// /-/g是正则，-匹配连字符，g表示全局替换。
// fmtDate('2026-05-13')  // '2026.05.13'
// fmtDate('2026-05')     // '2026.05'
// fmtDate(undefined)     // ''
// fmtDate('')            // ''
const fmtDate = (d?: string) => (d ? d.replace(/-/g, '.') : '')

export default function Home() {
  const posts = usePosts()
  const pinned = usePinnedPosts()
  const techPosts = posts.filter((p) => p.meta.genre === 'tech')

// 用一个数组描述三个入口卡片，然后在 JSX 里 map 循环渲染。
  const sections = [
    {
      // to：点击跳转的路由；en：英文小标题，cn：中文大字体
      to: '/genre/my', en: 'My Writing', cn: '无用', count: posts.filter((p) => p.meta.genre === 'my').length, unit: '篇',
      panel: 'bg-ink-900', // panel等并不是React的特殊属性，真正的效果来自后面的模板字符串拼接
      title: 'text-paper',
      kicker: 'text-ink-400',
      meta: 'text-ink-500',
    },
    {
      to: '/genre/tech', en: 'Tech', cn: '有用', count: techPosts.length, unit: '篇',
      panel: 'bg-vermilion-600',
      title: 'text-white',
      kicker: 'text-white/70',
      meta: 'text-white/60',
    },
    {
      to: '/gallery', en: 'Gallery', cn: '切片', count: artworks.length, unit: '幅',
      panel: 'bg-frost-800 dark:bg-frost-900',
      title: 'text-white',
      kicker: 'text-white/60',
      meta: 'text-white/50',
    },
  ]

  return (
    <div>
      {/* ── 刊头 ── */}
      {/*<AnimatedSection delay={0}>
        <header className="pt-6 pb-8">
          <h1 className="mt-8 font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.98] text-ink-900 dark:text-ink-50">
            乐高玩具
          </h1>
        </header>
      </AnimatedSection>*/}

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
            {/*section的每个属性都在这里有引用，消费端*/}
            {sections.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className={`group flex flex-col items-center justify-center gap-6 px-6 py-12 min-h-[15rem] transition-opacity hover:opacity-90 ${s.panel}`}
              >
                <h3 className={`font-serif text-2xl font-semibold leading-[1.1] tracking-[0.12em] [writing-mode:vertical-rl] [text-orientation:upright] ${s.title}`}>
                  {s.cn}
                </h3>
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
