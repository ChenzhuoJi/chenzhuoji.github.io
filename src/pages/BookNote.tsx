import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import books from '../data/books'
import { site } from '../data/site'
import MarkdownRenderer from '../components/MarkdownRenderer'
import ResponsiveImage from '../components/ResponsiveImage'
import WaveEdge from '../components/WaveEdge'

export default function BookNote() {
  const { slug } = useParams<{ slug: string }>()
  const book = books.find((b) => b.slug === slug)

  if (!book) {
    return (
      <div className="page">
        <p className="empty">书籍未找到。</p>
        <Link to="/reading" className="back-link">
          ← 读
        </Link>
      </div>
    )
  }

  return (
    <article className="article-page">
      <Helmet>
        <title>{`${book.title} · 读 · ${site.name}`}</title>
        <meta name="description" content={book.description} />
      </Helmet>

      <header className="post-hero">
        <div className="post-hero__inner">
          <div className="post-hero__top">
            <Link to="/reading" className="back-link">
              ← 阅读
            </Link>
          </div>

          <div className="book-hero">
            <div className="book-hero__cover">
              <ResponsiveImage src={book.cover} alt={book.title} sizes="132px" />
            </div>
            <div>
              <h1 className="post-title">{book.title}</h1>
              <p className="post-meta">{book.author}</p>
            </div>
          </div>

          {book.description && <p className="post-dek">{book.description}</p>}
        </div>

        <WaveEdge />
      </header>

      <div className="post-main">
        <div className="post-body">
          <MarkdownRenderer content={book.content} />
        </div>

        <footer className="post-foot">
          <Link to="/reading" className="back-link">
            ← 返回阅读
          </Link>
        </footer>
      </div>
    </article>
  )
}
