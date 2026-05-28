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
        <h1 className="text-2xl font-heading font-semibold text-ink-900 dark:text-ink-100">标签</h1>
        <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">共 {tags.length} 个标签</p>
      </section>
      <AnimatedSection delay={0.1}>
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
      </AnimatedSection>
    </div>
  )
}
