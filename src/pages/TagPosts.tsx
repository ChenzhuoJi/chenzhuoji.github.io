import { useParams, Link } from 'react-router-dom'
import ArticleList from '../components/ArticleList'
import { usePostsByTag } from '../hooks/usePosts'

export default function TagPosts() {
  const { tag } = useParams<{ tag: string }>()
  const posts = usePostsByTag(tag ?? '')

  return (
    <div>
      <section className="mb-12">
        <Link
          to="/tags"
          className="inline-block text-sm text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors mb-4"
        >
          ← 所有标签
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-ink-900 dark:text-ink-100">#{tag}</h1>
        <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">共 {posts.length} 篇</p>
      </section>
      <ArticleList posts={posts} />
    </div>
  )
}
