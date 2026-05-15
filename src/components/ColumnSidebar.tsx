import { Link } from 'react-router-dom'
import { usePostsByColumn } from '../hooks/usePosts'

interface Props {
  column: string
  currentSlug: string
}

export default function ColumnSidebar({ column, currentSlug }: Props) {
  const posts = usePostsByColumn(column)

  if (posts.length < 2) return null

  return (
    <div>
      <h3 className="text-xs font-medium text-ink-400 dark:text-ink-500 uppercase tracking-wider mb-3">{column}</h3>
      <ul className="space-y-1.5 text-sm border-l-2 border-ink-100 dark:border-ink-800 pl-3">
        {posts.map((p) => (
          <li key={p.meta.slug}>
            <Link
              to={`/posts/${p.meta.slug}`}
              className={`block transition-colors ${
                p.meta.slug === currentSlug
                  ? 'text-vermilion-600 dark:text-vermilion-400 font-semibold'
                  : 'text-ink-500 dark:text-ink-400 hover:text-vermilion-500 dark:hover:text-vermilion-400'
              }`}
            >
              {p.meta.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
