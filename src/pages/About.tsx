import MarkdownRenderer from '../components/MarkdownRenderer'
import { usePost } from '../hooks/usePosts'

export default function About() {
  const post = usePost('why-vibe')

  if (!post) return null

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-serif font-semibold text-ink-900 dark:text-ink-100 mb-8">关于</h1>
      <MarkdownRenderer content={post.content} />
      <div className="mt-8 pt-8 border-t border-ink-200 dark:border-ink-700">
        <p className="text-sm text-ink-400 dark:text-ink-500">
          GitHub：<a href="https://github.com/chenzhuoji" target="_blank" rel="noopener noreferrer" className="text-vermilion-500 hover:text-vermilion-600 transition-colors">@chenzhuoji</a>
        </p>
      </div>
    </div>
  )
}
