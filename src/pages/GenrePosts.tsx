import { useParams, Link } from 'react-router-dom'
import ArticleList from '../components/ArticleList'
import { usePostsByGenre } from '../hooks/usePosts'
import type { Genre } from '../types'

const GENRE_LABEL: Record<Genre, string> = { vibe: 'Vibe Writing', my: 'My Writing', tech: 'Tech' }

export default function GenrePosts() {
  const { name } = useParams<{ name: string }>()
  const genre: Genre = name === 'vibe' ? 'vibe' : name === 'tech' ? 'tech' : 'my'
  const posts = usePostsByGenre(genre)

  return (
    <div>
      <section className="mb-12">
        <Link
          to="/"
          className="inline-block text-sm text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors mb-4"
        >
          ← 首页
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-ink-900 dark:text-ink-100">{GENRE_LABEL[genre]}</h1>
        <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">共 {posts.length} 篇</p>
      </section>
      <ArticleList posts={posts} />
    </div>
  )
}
