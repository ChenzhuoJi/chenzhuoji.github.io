import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { usePosts } from '../hooks/usePosts'
import { sortPostsByDate } from '../utils/posts'
import { excerpt, shortDate } from '../utils/format'
import { GENRE_LABEL } from '../data/genres'
import { site } from '../data/site'
import TopDoodles from '../components/TopDoodles'
import type { Genre } from '../types'

type Tab = 'all' | Genre

const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'my', label: GENRE_LABEL.my },
  { key: 'tech', label: GENRE_LABEL.tech },
  { key: 'vibe', label: GENRE_LABEL.vibe },
]

export default function Home() {
  const posts = usePosts()
  const [tab, setTab] = useState<Tab>('all')

  const sorted = useMemo(() => sortPostsByDate(posts), [posts])
  const list = useMemo(
    () => (tab === 'all' ? sorted : sorted.filter((post) => post.meta.genre === tab)),
    [sorted, tab],
  )

  const nameLead = site.name.slice(0, -2)
  const nameTail = site.name.slice(-2)

  return (
    <>
      <Helmet>
        <title>{site.name} · 文章与照片</title>
        <meta name="description" content={site.description} />
      </Helmet>

      {/* top：占满首屏的粉底区 */}
      <section className="landing-top">
        <TopDoodles />

        <div className="landing-top__inner">
          <h1 className="landing-title">
            {nameLead}
            <em>{nameTail}</em>
            <svg
              className="landing-scribble"
              viewBox="0 0 240 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 13c22-9 40 4 61-3 19-6 32 5 52-2 18-6 34 6 52-1 16-6 30 2 67-6"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </h1>

          <div className="profile">
            <img
              className="profile__avatar"
              src={site.avatar}
              alt={`${site.name} 的头像`}
              width="140"
              height="140"
            />
            <ul className="profile__links">
              {site.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a className="scroll-hint" href="#latest">
          向下看笔记 <span aria-hidden="true">↓</span>
        </a>
      </section>

      {/* body：向下滚动才出现的纯白区域 */}
      <section className="landing-body" id="latest">
        <div className="shell">
          <div className="section-big-wrap">
            <h2 className="section-big">最新笔记</h2>
          </div>

          <nav className="genre-tabs" aria-label="按门类筛选">
            {TABS.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={tab === item.key}
                onClick={() => setTab(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {list.length === 0 ? (
            <p className="empty">这个门类下还没有文章。</p>
          ) : (
            <div className="post-grid">
              {list.map((post) => {
                const summary = post.meta.description || excerpt(post.content, 96)

                return (
                  <Link
                    key={post.meta.slug}
                    to={`/posts/${post.meta.slug}`}
                    className="post-card"
                  >
                    <time className="post-card__date" dateTime={post.meta.date}>
                      {shortDate(post.meta.date)}
                    </time>
                    <h3 className="post-card__title">{post.meta.title}</h3>
                    {summary && (
                      <>
                        <span className="post-card__rule" aria-hidden="true" />
                        <p className="post-card__excerpt">{summary}</p>
                      </>
                    )}
                    <div className="post-card__foot">
                      <span className="tag-chip">{GENRE_LABEL[post.meta.genre]}</span>
                      <span className="post-card__more" aria-hidden="true">
                        阅读 →
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          <div className="landing-more">
            <Link to="/posts" className="btn btn--outline">
              全部 {posts.length} 篇
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
