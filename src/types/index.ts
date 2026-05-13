export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  description?: string
  draft?: boolean
}

export interface Post {
  meta: PostMeta
  content: string
  readingTime: number
}

export interface SearchIndex {
  slug: string
  title: string
  description: string
  tags: string[]
  content: string
}
