import matter from 'gray-matter'
import type { Post, PostMeta, SearchIndex } from '../types'

const modules = import.meta.glob('/content/posts/*.md', { query: '?raw', import: 'default', eager: true })

const READING_SPEED = 400

function estimateReadingTime(text: string): number {
  const chars = text.replace(/\s/g, '').length
  return Math.max(1, Math.ceil(chars / READING_SPEED))
}

function slugFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? ''
}

export function getAllPosts(): Post[] {
  const posts: Post[] = []

  for (const [path, raw] of Object.entries(modules)) {
    const { data, content } = matter(raw as string)
    const slug = slugFromPath(path)
    const meta: PostMeta = {
      slug,
      title: data.title ?? slug,
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : '0000-00-00',
      tags: data.tags ?? [],
      description: data.description ?? '',
      draft: data.draft ?? false,
    }
    if (meta.draft) continue
    posts.push({ meta, content, readingTime: estimateReadingTime(content) })
  }

  posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date))
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

export function buildSearchIndex(): SearchIndex[] {
  return getAllPosts().map((p) => ({
    slug: p.meta.slug,
    title: p.meta.title,
    description: p.meta.description ?? '',
    tags: p.meta.tags,
    content: p.content.slice(0, 2000),
  }))
}
