import { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import { sortPostsByDate } from '../utils/posts'
import { site } from '../data/site'
import { chineseNumber, chineseYear, shortDate } from '../utils/format'
import { GENRE_LABEL } from '../data/genres'

export default function AllPosts() {
  const posts = usePosts()

  const sorted = useMemo(() => sortPostsByDate(posts), [posts])

  const years = useMemo(() => {
    const groups = new Map<string, typeof sorted>()
    for (const post of sorted) {
      const key = post.meta.date.slice(0, 4)
      const list = groups.get(key) ?? []
      list.push(post)
      groups.set(key, list)
    }
    return [...groups.entries()]
  }, [sorted])

  const firstYear = sorted[sorted.length - 1]?.meta.date.slice(0, 4)

  return (
    <div className="page">
      <Helmet>
        <title>{`记 · ${site.name}`}</title>
        <meta name="description" content={`${site.name} 的全部文章，按时间排列。`} />
      </Helmet>

      <div className="spread">
        <aside className="rail">
          <span className="rail-label">全部</span>
          <span className="rail-date">
            <span>{chineseNumber(posts.length)}篇</span>
            {firstYear && <span>始于{chineseYear(Number(firstYear))}</span>}
          </span>
        </aside>

        <div className="spread-main">
          <header className="page-head">
            <h1 className="page-title">记</h1>
            <p className="page-dek">按时间，从近到远。</p>
          </header>

          {years.map(([year, list]) => (
            <section className="year-block" key={year}>
              <div className="year-head">
                <h2>{chineseYear(Number(year))}</h2>
                <span>{chineseNumber(list.length)}篇</span>
              </div>

              {list.map((post) => (
                <Link key={post.meta.slug} to={`/posts/${post.meta.slug}`} className="archive-row">
                  <time dateTime={post.meta.date}>{shortDate(post.meta.date)}</time>
                  <span className="archive-title">{post.meta.title}</span>
                  <span className="archive-genre">{GENRE_LABEL[post.meta.genre]}</span>
                </Link>
              ))}
            </section>
          ))}

          {posts.length === 0 && <p className="empty">还没有文章。</p>}

          <div className="section-link-row">
            <Link to="/gallery">影</Link>
            <Link to="/reading">读</Link>
            <Link to="/tags">索引</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
