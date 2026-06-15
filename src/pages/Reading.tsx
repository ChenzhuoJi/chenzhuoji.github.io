import { Link } from 'react-router-dom'
import books from '../data/books'

export default function Reading() {
  return (
    <div>
      <section className="mb-10 animate-[fade-up_0.6s_ease-out]">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          首页
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-ink-900 dark:text-ink-100">
          My Reading
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-grow border-t border-ink-200 dark:border-ink-700" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-vermilion-500 dark:text-vermilion-400">
            READING
          </span>
          <div className="flex-grow border-t border-ink-200 dark:border-ink-700" />
        </div>
        <p className="mt-4 text-sm text-ink-400 dark:text-ink-500 leading-relaxed">
          读书笔记与思考
        </p>
      </section>

      {books.length === 0 ? (
        <p className="text-center py-16 text-ink-400 dark:text-ink-500 text-sm">
          暂无记录
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, i) => (
            <Link
              key={book.slug}
              to={`/reading/${book.slug}`}
              className="group block"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm bg-ink-100 dark:bg-ink-800">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-3 text-sm font-medium text-ink-900 dark:text-ink-100 group-hover:text-vermilion-600 dark:group-hover:text-vermilion-400 transition-colors">
                {book.title}
              </h3>
              <p className="mt-0.5 text-xs text-ink-400 dark:text-ink-500">
                {book.author}
              </p>
              {book.description && (
                <p className="mt-1 text-xs text-ink-500 dark:text-ink-400 line-clamp-2 leading-relaxed">
                  {book.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
