import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { usePosts } from '../hooks/usePosts'
import { sortPostsByDate } from '../utils/posts'
import ResponsiveImage from '../components/ResponsiveImage'
import photos from '../data/photos'
import { site } from '../data/site'
import {
  chineseNumber,
  excerpt,
  getClock,
  shortDate,
} from '../utils/format'
import { GENRE_LABEL } from '../data/genres'

export default function Home() {
  const posts = usePosts()
  const [clock, setClock] = useState(() => getClock(site.timeZone))

  useEffect(() => {
    const timer = window.setInterval(() => setClock(getClock(site.timeZone)), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const chronological = useMemo(
    () => sortPostsByDate(posts),
    [posts],
  )

  // 首页不由技术笔记领读：优先取最近一篇生活记录。
  const lead = useMemo(
    () =>
      chronological.find((p) => p.meta.genre === 'my' && p.content.trim().length > 80) ??
      chronological[0],
    [chronological],
  )

  const rest = useMemo(
    () => chronological.filter((p) => p.meta.slug !== lead?.meta.slug).slice(0, 3),
    [chronological, lead],
  )

  const photo = photos[0]
  const count = posts.length

  return (
    <>
      <Helmet>
        <title>{site.name} · 文章与照片</title>
        <meta name="description" content={site.description} />
      </Helmet>

      <h1 className="sr-only">{site.name}</h1>

      <section className="home-hero">
        <div className="spread">
          <div className="rail">
            <time className="rail-date" dateTime={clock.iso}>
              <span>{clock.yearLabel}</span>
              <span>{clock.monthDayLabel}</span>
            </time>
            <span className="rail-note">
              {clock.phase} · {clock.time}
            </span>
          </div>

          <div className="spread-main">
            <blockquote className="epigraph">
              在白塔倾颓之前，
              <br />
              留住安静等候某某的它。
            </blockquote>
            <p className="epigraph-source">
              <Link to={`/posts/${site.epigraph.slug}`}>{site.epigraph.source}</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="spread">
          <aside className="rail section-rail">
            <h2>笔记</h2>
            <p>{chineseNumber(count)}篇</p>
          </aside>

          <div className="spread-main">
            {lead && (
              <Link to={`/posts/${lead.meta.slug}`} className="lead-entry">
                <div className="entry-meta">
                  <time dateTime={lead.meta.date}>{shortDate(lead.meta.date)}</time>
                  <span className="sep">/</span>
                  <span>{GENRE_LABEL[lead.meta.genre]}</span>
                </div>
                <h3 className="lead-title">{lead.meta.title}</h3>
                <p className="lead-excerpt">
                  {excerpt(lead.content, 118) || lead.meta.description}
                </p>
              </Link>
            )}

            {rest.map((post) => (
              <Link key={post.meta.slug} to={`/posts/${post.meta.slug}`} className="entry">
                <time dateTime={post.meta.date}>{shortDate(post.meta.date)}</time>
                <span>
                  <span className="entry-title">{post.meta.title}</span>
                  {(post.meta.description || post.content) && (
                    <span className="entry-desc">
                      {post.meta.description || excerpt(post.content, 62)}
                    </span>
                  )}
                </span>
                <span className="entry-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}

            <Link to="/posts" className="more-link">
              全部{chineseNumber(count)}篇 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="spread">
          <aside className="rail section-rail">
            <h2>Gallery</h2>
            <p>{chineseNumber(photos.length)}帧</p>
          </aside>

          <div className="spread-main">
            <figure className="home-photo">
              <Link to="/gallery" aria-label="查看全部照片">
                <ResponsiveImage
                  src={photo.src}
                  alt={photo.alt}
                  sizes="(min-width: 1200px) 704px, (min-width: 760px) 62vw, 100vw"
                />
              </Link>
              <figcaption>
                <span>
                  <span className="photo-index">01</span>　{photo.caption} · {photo.place}
                </span>
                <Link to="/gallery" className="photo-link">
                  还有{chineseNumber(photos.length - 1)}帧 →
                </Link>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  )
}
