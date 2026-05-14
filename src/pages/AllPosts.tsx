import { Link } from 'react-router-dom'
import ArticleList from '../components/ArticleList'
import { usePosts } from '../hooks/usePosts'

export default function AllPosts() {
  const posts = usePosts()

  return (
    <div>
      <section className="mb-12">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          首页
        </Link>
        <h1 className="text-2xl font-serif font-semibold text-ink-900 dark:text-ink-100">全部文章</h1>
        <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">共 {posts.length} 篇</p>
      </section>
      <ArticleList posts={posts} />
    </div>
  )
}
