export type Genre = 'vibe' | 'my'

export interface PostMeta {
  slug: string
  title: string
  date: string
  genre: Genre
  tags: string[]
  column?: string
  series?: string
  order?: number
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

export interface GraphNode {
  id: string
  title: string
  genre: Genre
  tagCount: number
  connectionCount: number
}

export interface GraphEdge {
  source: string
  target: string
  weight: number
  sharedTags: string[]
}
