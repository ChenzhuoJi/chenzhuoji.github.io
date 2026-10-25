import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import books from '../data/books'
import { site } from '../data/site'
import MarkdownRenderer from '../components/MarkdownRenderer'
import ResponsiveImage from '../components/ResponsiveImage'

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

      <div className="spread">
        <aside className="rail post-rail">
          <Link to="/reading" className="back-link">
            ← 读
          </Link>
          <div className="rail-block">
            <span className="rail-key">作者</span>
            <span className="rail-value">{book.author}</span>
          </div>
        </aside>

        <div className="spread-main">
          <header className="post-head book-note-head">
            <div className="book-cover">
              <ResponsiveImage src={book.cover} alt={book.title} sizes="120px" />
            </div>
            <div>
              <h1 className="post-title">{book.title}</h1>
              <p className="book-author">{book.author}</p>
              {book.description && <p className="post-dek">{book.description}</p>}
            </div>
          </header>

          <div className="post-body">
            <MarkdownRenderer content={book.content} />
          </div>

          <footer className="post-foot">
            <Link to="/reading" className="back-link">
              ← 回读
            </Link>
          </footer>
        </div>
      </div>
    </article>
  )
}
