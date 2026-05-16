import { useParams, Link } from 'react-router-dom'
import ArticleList from '../components/ArticleList'
import { usePostsByColumn } from '../hooks/usePosts'
import { resolveColumnName } from '../utils/posts'

export default function ColumnPosts() {
  const { name: identifier } = useParams<{ name: string }>()
  const columnName = resolveColumnName(identifier ?? '') ?? ''
  const posts = usePostsByColumn(columnName)

  if (!columnName || posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-ink-400 dark:text-ink-500">栏目未找到</p>
        <Link to="/explore" className="mt-4 inline-block text-sm text-vermilion-500 hover:text-vermilion-600 transition-colors">
          ← 探索
        </Link>
      </div>
    )
  }

  return (
    <div>
      <section className="mb-12">
        <div className="flex items-center gap-2 text-sm mb-4">
          <Link
            to="/"
            className="inline-flex items-center text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            首页
          </Link>
          <span className="text-ink-300 dark:text-ink-600">/</span>
          <Link
            to="/explore"
            className="inline-flex items-center text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors"
          >
            探索
          </Link>
        </div>
        <h1 className="text-2xl font-serif font-semibold text-ink-900 dark:text-ink-100">{columnName}</h1>
        <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">共 {posts.length} 篇 · {posts.some(p => p.meta.series === '后记') ? '完结' : '连载'}</p>
      </section>
      <ArticleList posts={posts} />
    </div>
  )
}
