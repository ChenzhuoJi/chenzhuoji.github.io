import type { Post } from '../types'
import PostCard from './ArticleCard'

interface Props {
  posts: Post[]
}

export default function ArticleList({ posts }: Props) {
  if (posts.length === 0) {
    return <p className="text-ink-400 dark:text-ink-500 text-center py-12">暂无文章</p>
  }

  return (
    <div className="space-y-10">
      {posts.map((post, i) => (
        <PostCard key={post.meta.slug} post={post.meta} index={i} />
      ))}
    </div>
  )
}
