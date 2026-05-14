import { Link } from 'react-router-dom'
import { useTags } from '../hooks/usePosts'
import { useColumns } from '../hooks/usePosts'

export default function Explore() {
  const tags = useTags()
  const columns = useColumns()

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-2xl font-serif font-semibold text-ink-900 dark:text-ink-100">探索</h1>
        <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">按栏目或标签浏览文章</p>
      </section>

      {columns.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-serif font-medium text-ink-900 dark:text-ink-100 mb-4">栏目</h2>
          <div className="flex flex-wrap gap-3">
            {columns.map((col) => (
              <Link
                key={col}
                to={`/columns/${col}`}
                className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-vermilion-50 dark:hover:bg-vermilion-950/30 hover:text-vermilion-600 dark:hover:text-vermilion-400 transition-colors text-sm"
              >
                {col}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-serif font-medium text-ink-900 dark:text-ink-100 mb-4">标签</h2>
        {tags.length === 0 ? (
          <p className="text-ink-400 dark:text-ink-500 text-sm">暂无标签</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-vermilion-50 dark:hover:bg-vermilion-950/30 hover:text-vermilion-600 dark:hover:text-vermilion-400 transition-colors text-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
