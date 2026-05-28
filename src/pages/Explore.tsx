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
          <h1 className="text-2xl font-heading font-semibold text-ink-900 dark:text-ink-100">探索</h1>
          <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">按栏目或标签浏览文章</p>
        </section>
      </AnimatedSection>

      {columns.length > 0 && (
        <AnimatedSection delay={0.1}>
          <section className="mb-12">
            <h2 className="text-lg font-heading font-medium text-ink-900 dark:text-ink-100 mb-4">栏目</h2>
            <div className="space-y-2">
              {columns.map((col) => (
                <Link
                  key={col.name}
                  to={`/columns/${col.slug ?? col.name}`}
                  className="block text-sm text-ink-600 dark:text-ink-400 hover:text-vermilion-500 dark:hover:text-vermilion-400 transition-colors"
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
          <h2 className="text-lg font-heading font-medium text-ink-900 dark:text-ink-100 mb-4">关系图谱</h2>
          <Link
            to="/graph"
            className="text-sm text-ink-600 dark:text-ink-400 hover:text-vermilion-500 dark:hover:text-vermilion-400 transition-colors"
          >
            浏览文章关系图谱 →
          </Link>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <section>
          <h2 className="text-lg font-heading font-medium text-ink-900 dark:text-ink-100 mb-4">标签</h2>
          {tags.length === 0 ? (
            <p className="text-ink-400 dark:text-ink-500 text-sm">暂无标签</p>
          ) : (
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/tags/${tag}`}
                  className="tag"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </section>
      </AnimatedSection>
    </div>
  )
}
