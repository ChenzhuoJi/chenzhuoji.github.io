import matter from 'gray-matter'
import type { Post, PostMeta, Genre, SearchIndex } from '../types'

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

export function getAllColumns(): string[] {
  const cols = new Set<string>()
  for (const post of getAllPosts()) {
    if (post.meta.column) cols.add(post.meta.column)
  }
  return [...cols].sort()
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

export function buildSearchIndex(): SearchIndex[] {
  return getAllPosts().map((p) => ({
    slug: p.meta.slug,
    title: p.meta.title,
    description: p.meta.description ?? '',
    tags: p.meta.tags,
    content: p.content.slice(0, 2000),
  }))
}
