import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import MarkdownRenderer from '../components/MarkdownRenderer'
import TOC from '../components/TOC'
import { usePost, usePosts } from '../hooks/usePosts'
import { site } from '../data/site'
import { chineseDate } from '../utils/format'
import { countChars, getColumnUrl, sortPostsByDate } from '../utils/posts'
import { GENRE_LABEL } from '../data/genres'

export default function Post() {
  const { slug } = useParams<{ slug: string }>()
  const post = usePost(slug ?? '')
  const posts = usePosts()

  const sorted = useMemo(() => sortPostsByDate(posts), [posts])

  if (!post) {
    return (
      <div className="page">
        <p className="empty">文章未找到。</p>
        <Link to="/posts" className="back-link">
          ← 回记
        </Link>
      </div>
    )
  }

  const date = chineseDate(post.meta.date)
  const chars = countChars(post.content)
  const index = sorted.findIndex((p) => p.meta.slug === post.meta.slug)
  const newer = index > 0 ? sorted[index - 1] : null
  const older = index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null

  return (
    <article className="article-page">
      <Helmet>
        <title>{`${post.meta.title} · ${site.name}`}</title>
        {post.meta.description && <meta name="description" content={post.meta.description} />}
      </Helmet>

      <div className="spread">
        <aside className="rail post-rail-wrap">
          <div className="post-rail">
            <Link to="/posts" className="back-link">
              ← 记
            </Link>

            {date.valid && (
              <div className="rail-block">
                <span className="rail-key">日期</span>
                <time className="rail-value" dateTime={post.meta.date}>
                  <span>{date.year}年</span>
                  <span>{date.monthDay}</span>
                </time>
              </div>
            )}

            <div className="rail-block">
              <span className="rail-key">类别</span>
              <Link to={`/genre/${post.meta.genre}`} className="rail-value">
                {GENRE_LABEL[post.meta.genre]}
              </Link>
            </div>

            <div className="rail-block">
              <span className="rail-key">篇幅</span>
              <span className="rail-value">
                {chars.toLocaleString('zh-CN')} 字
                <br />
                约 {post.readingTime} 分钟
              </span>
            </div>

            {post.meta.column && (
              <div className="rail-block">
                <span className="rail-key">栏目</span>
                <Link to={`/columns/${getColumnUrl(post.meta.column)}`} className="rail-value">
                  {post.meta.column}
                </Link>
              </div>
            )}

            <TOC post={post} />
          </div>
        </aside>

        <div className="spread-main">
          <header className="post-head">
            <h1 className="post-title">{post.meta.title}</h1>
            {post.meta.description && <p className="post-dek">{post.meta.description}</p>}
          </header>

          <div className="post-body">
            <MarkdownRenderer content={post.content} />
          </div>

          <footer className="post-foot">
            {post.meta.tags.length > 0 && (
              <div className="post-tags">
                <span className="rail-key">标签</span>
                {post.meta.tags.map((tag) => (
                  <Link key={tag} to={`/tags/${tag}`}>
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {(older || newer) && (
              <nav className="post-nav" aria-label="前后文章">
                <div>
                  {older && (
                    <Link to={`/posts/${older.meta.slug}`}>
                      <span className="post-nav-label">前一篇</span>
                      {older.meta.title}
                    </Link>
                  )}
                </div>
                <div className="next">
                  {newer && (
                    <Link to={`/posts/${newer.meta.slug}`}>
                      <span className="post-nav-label">后一篇</span>
                      {newer.meta.title}
                    </Link>
                  )}
                </div>
              </nav>
            )}
          </footer>
        </div>
      </div>
    </article>
  )
}
