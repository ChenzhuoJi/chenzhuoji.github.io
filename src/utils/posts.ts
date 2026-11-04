import matter from 'gray-matter'
import type { Post, PostMeta, Genre, SearchIndex, PostTimelineEntry } from '../types'
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

const pad2 = (n: number) => String(n).padStart(2, '0')

/** 把年月日拼成 ISO 日期；2 月 30 日这种不存在的日子返回 undefined。 */
function isoDate(year: number, month: number, day: number): string | undefined {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return undefined
  if (month < 1 || month > 12 || day < 1 || day > 31) return undefined

  const probe = new Date(Date.UTC(year, month - 1, day))
  if (
    probe.getUTCFullYear() !== year ||
    probe.getUTCMonth() !== month - 1 ||
    probe.getUTCDate() !== day
  ) {
    return undefined
  }
  return `${year}-${pad2(month)}-${pad2(day)}`
}

const DATE_PREFIX = /^(\d{4})\s*[-./年]\s*(\d{1,2})\s*[-./月]\s*(\d{1,2})\s*日?/

function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return undefined
    return isoDate(value.getUTCFullYear(), value.getUTCMonth() + 1, value.getUTCDate())
  }

  const text = String(value ?? '').trim()

  const match = text.match(DATE_PREFIX)
  if (match) return isoDate(Number(match[1]), Number(match[2]), Number(match[3]))

  // YAML 会把 `- 2026-11-01: 概要` 解析成 { [Date.toString()]: '概要' }，
  // 这种键也认。
  const parsed = new Date(text)
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10)

  return undefined
}

/**
 * frontmatter 里的 timeline：只取日期与一句概要，按日期升序。
 * 两种写法都认：
 *   - 2026-10-24：正式下笔
 *   - { date: 2026-10-24, note: 正式下笔 }
 */
function parseTimeline(value: unknown, slug: string): PostTimelineEntry[] | undefined {
  if (value === undefined || value === null) return undefined

  if (!Array.isArray(value)) {
    console.warn(`[timeline] ${slug}: timeline 应当是一组「- 日期：概要」，已忽略。`)
    return undefined
  }

  const entries: PostTimelineEntry[] = []

  for (const item of value) {
    let date: string | undefined
    let note = ''

    if (typeof item === 'string') {
      const text = item.trim()
      const match = text.match(DATE_PREFIX)
      if (match) {
        date = isoDate(Number(match[1]), Number(match[2]), Number(match[3]))
        note = text.slice(match[0].length).replace(/^[\s:：,，、|｜—–-]+/, '').trim()
      }
    } else if (item && typeof item === 'object') {
      const record = item as Record<string, unknown>
      const keys = Object.keys(record)

      if (record.date !== undefined || record.note !== undefined) {
        date = toIsoDate(record.date)
        note = String(record.note ?? '').trim()
      } else if (keys.length === 1) {
        // `- 2026-10-24: 正式下笔` 会被 YAML 当成单键映射
        date = toIsoDate(keys[0])
        note = String(record[keys[0]] ?? '').trim()
      }
    }

    if (!date || !note) {
      console.warn(`[timeline] ${slug}: 这一条缺少有效日期或概要，已跳过 → ${JSON.stringify(item)}`)
      continue
    }

    entries.push({ date, note })
  }

  if (entries.length === 0) return undefined
  return entries.sort((a, b) => a.date.localeCompare(b.date))
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

function readPost(raw: string, slug: string) {
  try {
    return matter(raw)
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    throw new Error(`content/posts/${slug}.md 的 frontmatter 无法解析：${reason}`)
  }
}

export function getAllPosts(): Post[] {
  const posts: Post[] = []

  for (const [path, raw] of Object.entries(modules)) {
    const slug = slugFromPath(path)
    const { data, content } = readPost(raw as string, slug)
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
      timeline: parseTimeline(data.timeline, slug),
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
