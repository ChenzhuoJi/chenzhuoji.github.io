import matter from 'gray-matter'
import type { Post, PostMeta, Genre, SearchIndex, GraphNode, GraphEdge, Column } from '../types'
import columnSlugs from '../data/columns'

const modules = import.meta.glob('/content/posts/*.md', { query: '?raw', import: 'default', eager: true })

const READING_SPEED = 400

function estimateReadingTime(text: string): number {
  const chars = text.replace(/\s/g, '').length
  return Math.max(1, Math.ceil(chars / READING_SPEED))
}

function slugFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? ''
}

const GENRE_MAP: Record<string, Genre> = { vibe: 'vibe', my: 'my' }

export function getAllPosts(): Post[] {
  const posts: Post[] = []

  for (const [path, raw] of Object.entries(modules)) {
    const { data, content } = matter(raw as string)
    const slug = slugFromPath(path)
    const genreRaw = (data.genre ?? '').toString().toLowerCase()
    const meta: PostMeta = {
      slug,
      title: data.title ?? slug,
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : '0000-00-00',
      genre: GENRE_MAP[genreRaw] ?? 'my',
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      column: data.column ? String(data.column) : undefined,
      series: data.series ? String(data.series) : undefined,
      order: typeof data.order === 'number' ? data.order : undefined,
      description: data.description ?? '',
      draft: data.draft ?? false,
      pin: data.pin === true,
    }
    if (meta.draft) continue
    posts.push({ meta, content, readingTime: estimateReadingTime(content) })
  }

  posts.sort((a, b) => {
    if (a.meta.pin !== b.meta.pin) return a.meta.pin ? -1 : 1
    return b.meta.date.localeCompare(a.meta.date)
  })
  return posts
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.meta.slug === slug)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const post of getAllPosts()) {
    for (const tag of post.meta.tags) {
      tags.add(tag)
    }
  }
  return [...tags].sort()
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.meta.tags.includes(tag))
}

export function getPostsByGenre(genre: Genre): Post[] {
  return getAllPosts().filter((p) => p.meta.genre === genre)
}

function getColumnSlug(name: string): string | undefined {
  return columnSlugs[name]
}

export function getColumnUrl(name: string): string {
  return getColumnSlug(name) ?? name
}

export function resolveColumnName(identifier: string): string | undefined {
  const entry = Object.entries(columnSlugs).find(([, slug]) => slug === identifier)
  if (entry) return entry[0]
  return identifier
}

export function getAllColumns(): Column[] {
  const cols = new Set<string>()
  for (const post of getAllPosts()) {
    if (post.meta.column) cols.add(post.meta.column)
  }
  return [...cols].sort().map(name => ({
    name,
    slug: getColumnSlug(name),
  }))
}

export function getPostsByColumn(column: string): Post[] {
  return getAllPosts().filter((p) => p.meta.column === column).sort((a, b) => {
    const ao = a.meta.order ?? 9999
    const bo = b.meta.order ?? 9999
    if (ao !== bo) return ao - bo
    return a.meta.date.localeCompare(b.meta.date)
  })
}

export function getColumnNav(slug: string): { prev: Post | null; next: Post | null } {
  const post = getPostBySlug(slug)
  if (!post?.meta.column) return { prev: null, next: null }
  const siblings = getPostsByColumn(post.meta.column)
  const idx = siblings.findIndex((p) => p.meta.slug === slug)
  return {
    prev: idx > 0 ? siblings[idx - 1] : null,
    next: idx < siblings.length - 1 ? siblings[idx + 1] : null,
  }
}

export function getPinnedPosts(): Post[] {
  return getAllPosts().filter((p) => p.meta.pin)
}

export function getRecentPosts(count: number = 10): Post[] {
  return getAllPosts().filter((p) => !p.meta.pin).slice(0, count)
}

export function getRelatedPosts(slug: string, limit = 3): Array<{ post: Post; sharedTags: string[] }> {
  const all = getAllPosts()
  const post = all.find((p) => p.meta.slug === slug)
  if (!post) return []

  return all
    .filter((p) => p.meta.slug !== slug)
    .map((p) => ({
      post: p,
      sharedTags: p.meta.tags.filter((t) => post.meta.tags.includes(t)),
    }))
    .filter((p) => p.sharedTags.length > 0)
    .sort((a, b) => b.sharedTags.length - a.sharedTags.length)
    .slice(0, limit)
}

export function getGraphData(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const posts = getAllPosts()
  const nodes: GraphNode[] = posts.map((p) => ({
    id: p.meta.slug,
    title: p.meta.title,
    genre: p.meta.genre,
    tagCount: p.meta.tags.length,
    connectionCount: 0,
  }))

  const edgeMap = new Map<string, { count: number; tags: string[] }>()
  for (let i = 0; i < posts.length; i++) {
    for (let j = i + 1; j < posts.length; j++) {
      const shared = posts[i].meta.tags.filter((t) => posts[j].meta.tags.includes(t))
      if (shared.length > 0) {
        edgeMap.set(`${posts[i].meta.slug}::${posts[j].meta.slug}`, { count: shared.length, tags: shared })
      }
    }
  }

  const edges: GraphEdge[] = [...edgeMap].map(([key, val]) => {
    const [source, target] = key.split('::')
    return { source, target, weight: val.count, sharedTags: val.tags }
  })

  const connCount = new Map<string, number>()
  for (const e of edges) {
    connCount.set(e.source, (connCount.get(e.source) ?? 0) + 1)
    connCount.set(e.target, (connCount.get(e.target) ?? 0) + 1)
  }
  for (const n of nodes) {
    n.connectionCount = connCount.get(n.id) ?? 0
  }

  return { nodes, edges }
}

export function buildSearchIndex(): SearchIndex[] {
  return getAllPosts().map((p) => ({
    slug: p.meta.slug,
    title: p.meta.title,
    description: p.meta.description ?? '',
    tags: p.meta.tags,
    content: p.content.slice(0, 2000),
  }))
}
