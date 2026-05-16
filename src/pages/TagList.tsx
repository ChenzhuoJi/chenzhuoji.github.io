import { Link } from 'react-router-dom'
import { useTags } from '../hooks/usePosts'
import AnimatedSection from '../components/AnimatedSection'

export default function TagList() {
  const tags = useTags()

  if (tags.length === 0) {
    return <p className="text-ink-400 dark:text-ink-500 text-center py-12">暂无标签</p>
  }

  return (
    <div>
      <section className="mb-12" style={{ animation: 'fade-up 0.4s ease-out' }}>
        <h1 className="text-2xl font-serif font-semibold text-ink-900 dark:text-ink-100">标签</h1>
        <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">共 {tags.length} 个标签</p>
      </section>
      <AnimatedSection delay={0.1}>
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
      </AnimatedSection>
    </div>
  )
}
