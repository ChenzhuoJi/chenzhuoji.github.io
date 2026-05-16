import { Link } from 'react-router-dom'
import { useTags } from '../hooks/usePosts'
import { useColumns } from '../hooks/usePosts'
import AnimatedSection from '../components/AnimatedSection'

export default function Explore() {
  const tags = useTags()
  const columns = useColumns()

  return (
    <div>
      <AnimatedSection delay={0}>
        <section className="mb-12">
          <h1 className="text-2xl font-serif font-semibold text-ink-900 dark:text-ink-100">探索</h1>
          <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">按栏目或标签浏览文章</p>
        </section>
      </AnimatedSection>

      {columns.length > 0 && (
        <AnimatedSection delay={0.1}>
          <section className="mb-12">
            <h2 className="text-lg font-serif font-medium text-ink-900 dark:text-ink-100 mb-4">栏目</h2>
            <div className="flex flex-wrap gap-3">
              {columns.map((col) => (
                <Link
                  key={col.name}
                  to={`/columns/${col.slug ?? col.name}`}
                  className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-vermilion-50 dark:hover:bg-vermilion-950/30 hover:text-vermilion-600 dark:hover:text-vermilion-400 transition-colors text-sm"
                >
                  {col.name}
                </Link>
              ))}
            </div>
          </section>
        </AnimatedSection>
      )}

      <AnimatedSection delay={0.2}>
        <section className="mb-12">
          <h2 className="text-lg font-serif font-medium text-ink-900 dark:text-ink-100 mb-4">关系图谱</h2>
          <Link
            to="/graph"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-vermilion-50 dark:hover:bg-vermilion-950/30 hover:text-vermilion-600 dark:hover:text-vermilion-400 transition-colors text-sm"
          >
            浏览文章关系图谱 →
          </Link>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
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
      </AnimatedSection>
    </div>
  )
}
