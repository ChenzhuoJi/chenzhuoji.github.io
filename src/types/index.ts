export type Genre = 'vibe' | 'my'

export interface PostMeta {
  slug: string
  title: string
  date: string
  genre: Genre
  tags: string[]
  column?: string
  description?: string
  draft?: boolean
  pin?: boolean
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
