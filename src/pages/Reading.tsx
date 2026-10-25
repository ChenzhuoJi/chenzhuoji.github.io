import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import books from '../data/books'
import { site } from '../data/site'
import { chineseNumber } from '../utils/format'
import ResponsiveImage from '../components/ResponsiveImage'

export default function Reading() {
  return (
    <div className="page">
      <Helmet>
        <title>{`读 · ${site.name}`}</title>
        <meta name="description" content="读过的书，写下的笔记。" />
      </Helmet>

      <div className="spread">
        <aside className="rail">
          <span className="rail-label">读</span>
          <span className="rail-date">
            <span>{chineseNumber(books.length)}册</span>
          </span>
        </aside>

        <div className="spread-main">
          <header className="page-head">
            <h1 className="page-title">读</h1>
            <p className="page-dek">读过的书，写下的笔记。</p>
          </header>

          {books.length === 0 ? (
            <p className="empty">还没有读书笔记。</p>
          ) : (
            books.map((book) => (
              <Link key={book.slug} to={`/reading/${book.slug}`} className="book-row">
                <div className="book-cover">
                  <ResponsiveImage
                    src={book.cover}
                    alt={book.title}
                    sizes="120px"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="book-title">{book.title}</span>
                  <span className="book-author">{book.author}</span>
                  {book.description && <span className="book-desc">{book.description}</span>}
                  <span className="book-link">读笔记 →</span>
                </div>
              </Link>
            ))
          )}

          <div className="section-link-row">
            <Link to="/posts">记</Link>
            <Link to="/gallery">影</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
