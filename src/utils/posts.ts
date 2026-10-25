import matter from 'gray-matter'
import type { Post, PostMeta, Genre, SearchIndex } from '../types'
import columnsConfig from '../data/columns'

const modules = import.meta.glob('/content/posts/**/*.md', { query: '?raw', import: 'default', eager: true })

const READING_SPEED = 400

function estimateReadingTime(text: string): number {
  const chars = text.replace(/\s/g, '').length
  return Math.max(1, Math.ceil(chars / READING_SPEED))
}

/** 粗略统计正文字数：汉字按字算，英文/数字按词算，跳过代码和公式 */
export function countChars(text: string): number {
  const plain = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$]*\$/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')

  const cjk = plain.match(/[\u3400-\u9fff]/g)?.length ?? 0
  const words = plain.match(/[A-Za-z0-9]+/g)?.length ?? 0
  return cjk + words
}

function slugFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? ''
}

const GENRE_MAP: Record<string, Genre> = { vibe: 'vibe', my: 'my', tech: 'tech' }

/** 没写 order 的文章，排在同一天已编号的文章之后。 */
function orderValue(post: Post): number {
  return typeof post.meta.order === 'number' ? post.meta.order : Number.POSITIVE_INFINITY
}

/**
 * 站点统一的「从近到远」顺序。
 * 日期仍是最主要的依据；同一天再由 order 升序决定先后，
 * 没写 order 的排在后面，最后以 slug 兜底，保证每次构建一致。
 */
export function comparePostsByDateDesc(a: Post, b: Post): number {
  const byDate = b.meta.date.localeCompare(a.meta.date)
  if (byDate !== 0) return byDate

  const aOrder = orderValue(a)
  const bOrder = orderValue(b)
  if (aOrder !== bOrder) return aOrder < bOrder ? -1 : 1

  return a.meta.slug.localeCompare(b.meta.slug)
}

/** 按日期与同日 order 排序，返回新数组。 */
export function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort(comparePostsByDateDesc)
}

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
    return comparePostsByDateDesc(a, b)
  })
  return posts
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.meta.slug === slug)
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.meta.tags.includes(tag))
}

export function getPostsByGenre(genre: Genre): Post[] {
  return getAllPosts().filter((p) => p.meta.genre === genre)
}

const slugMap = new Map<string, string>()
const nameBySlug = new Map<string, string>()
for (const col of columnsConfig) {
  if (col.slug) {
    slugMap.set(col.name, col.slug)
    nameBySlug.set(col.slug, col.name)
  }
}

function getColumnSlug(name: string): string | undefined {
  return slugMap.get(name)
}

export function getColumnUrl(name: string): string {
  return getColumnSlug(name) ?? name
}

export function resolveColumnName(identifier: string): string | undefined {
  return nameBySlug.get(identifier) ?? identifier
}

export function getPostsByColumn(column: string): Post[] {
  return getAllPosts().filter((p) => p.meta.column === column).sort((a, b) => {
    const ao = a.meta.order ?? 9999
    const bo = b.meta.order ?? 9999
    if (ao !== bo) return ao - bo
    return a.meta.date.localeCompare(b.meta.date)
  })
}

export function buildSearchIndex(): SearchIndex[] {
  return getAllPosts().map((p) => ({
    slug: p.meta.slug,
    title: p.meta.title,
    date: p.meta.date,
    description: p.meta.description ?? '',
    tags: p.meta.tags,
    content: p.content.slice(0, 2000),
  }))
}
