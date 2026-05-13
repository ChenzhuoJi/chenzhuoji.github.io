import ArticleList from '../components/ArticleList'
import { usePosts } from '../hooks/usePosts'

export default function Home() {
  const posts = usePosts()

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-2xl font-serif font-semibold text-ink-900 dark:text-ink-100">文章</h1>
        <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">共 {posts.length} 篇</p>
      </section>
      <ArticleList posts={posts} />
    </div>
  )
}
