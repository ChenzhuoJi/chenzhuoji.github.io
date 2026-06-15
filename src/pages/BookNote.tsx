import { useParams, Link } from 'react-router-dom'
import books from '../data/books'
import MarkdownRenderer from '../components/MarkdownRenderer'

export default function BookNote() {
  const { slug } = useParams<{ slug: string }>()
  const book = books.find((b) => b.slug === slug)

  if (!book) {
    return (
      <div className="text-center py-20">
        <p className="text-ink-400 dark:text-ink-500">书籍未找到</p>
        <Link to="/reading" className="mt-4 inline-block text-sm text-vermilion-500 hover:text-vermilion-600 transition-colors">
          ← 返回读书频道
        </Link>
      </div>
    )
  }

  return (
    <article>
      <div className="flex items-center gap-2 text-xs text-ink-400 dark:text-ink-500 mb-8">
        <Link
          to="/"
          className="hover:text-ink-600 dark:hover:text-ink-300 transition-colors"
        >
          首页
        </Link>
        <span>/</span>
        <Link
          to="/reading"
          className="hover:text-ink-600 dark:hover:text-ink-300 transition-colors"
        >
          My Reading
        </Link>
      </div>

      <header className="mb-10">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-40 shrink-0">
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-ink-100 dark:bg-ink-800">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-heading font-medium text-ink-900 dark:text-ink-100 leading-tight">
              {book.title}
            </h1>
            <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">
              {book.author}
            </p>
            {book.description && (
              <p className="mt-3 text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                {book.description}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto">
        <MarkdownRenderer content={book.content} />
      </div>
    </article>
  )
}
