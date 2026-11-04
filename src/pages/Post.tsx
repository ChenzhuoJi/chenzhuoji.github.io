import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import MarkdownRenderer from '../components/MarkdownRenderer'
import PostEndnote from '../components/PostEndnote'
import PostTimeline from '../components/PostTimeline'
import TOC from '../components/TOC'
import WaveEdge from '../components/WaveEdge'
import { usePost } from '../hooks/usePosts'
import { site } from '../data/site'
import { chineseDate } from '../utils/format'
import { countChars, getColumnUrl } from '../utils/posts'
import { GENRE_LABEL } from '../data/genres'

export default function Post() {
  const { slug } = useParams<{ slug: string }>()
  const post = usePost(slug ?? '')

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
  // 尾注里的「最后更新」取修改记录的最后一条，没有就退回发布日期
  const timelineDates = (post.meta.timeline ?? []).map((entry) => entry.date).sort()
  const updated = timelineDates[timelineDates.length - 1] ?? post.meta.date

  return (
    <article className="article-page">
      <Helmet>
        <title>{`${post.meta.title} · ${site.name}`}</title>
        {post.meta.description && <meta name="description" content={post.meta.description} />}
      </Helmet>

      <header className="post-hero">
        <div className="post-hero__inner">
          <div className="post-hero__top">
            <Link to="/posts" className="back-link">
              ← 笔记
            </Link>
            {post.meta.column && (
              <Link
                to={`/columns/${getColumnUrl(post.meta.column)}`}
                className="back-link"
              >
                栏目 · {post.meta.column}
              </Link>
            )}
          </div>

          <h1 className="post-title">{post.meta.title}</h1>
          {post.meta.description && <p className="post-dek">{post.meta.description}</p>}

          <p className="post-meta">
            <Link to={`/genre/${post.meta.genre}`}>{GENRE_LABEL[post.meta.genre]}</Link>
            {date.valid && (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={post.meta.date}>{post.meta.date.replace(/-/g, '.')}</time>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>
              {chars.toLocaleString('zh-CN')} 字 · 约 {post.readingTime} 分钟
            </span>
          </p>
        </div>

        <WaveEdge />
      </header>

      <div className="post-main">
        <TOC post={post} />

        <div className="post-body">
          <MarkdownRenderer content={post.content} />
        </div>

        <footer className="post-foot">
          <PostEndnote updated={updated} />

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

          {post.meta.timeline && (
            <PostTimeline entries={post.meta.timeline} orientation="horizontal" />
          )}
        </footer>
      </div>
    </article>
  )
}
