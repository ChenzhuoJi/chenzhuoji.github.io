import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, resolve } from 'path'
import matter from 'gray-matter'

const contentDir = resolve(process.cwd(), 'content/posts')
const distDir = resolve(process.cwd(), 'dist')

const posts = []

for (const file of readdirSync(contentDir).filter((f) => f.endsWith('.md'))) {
  const raw = readFileSync(join(contentDir, file), 'utf-8')
  const { data } = matter(raw)
  if (data.draft) continue
  const slug = file.replace(/\.md$/, '')
  posts.push({
    title: data.title || slug,
    slug,
    description: data.description || '',
    date: data.date ? new Date(data.date).toISOString() : '',
    order: typeof data.order === 'number' ? data.order : Number.POSITIVE_INFINITY,
  })
}

posts.sort((a, b) => {
  const byDate = b.date.localeCompare(a.date)
  if (byDate !== 0) return byDate
  if (a.order !== b.order) return a.order - b.order
  return a.slug.localeCompare(b.slug)
})

const siteUrl = 'https://chenzhuoji.github.io'
const title = 'ChenzhuoJi'
const description = 'ChenzhuoJi：文章与照片。'

const items = posts
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${siteUrl}/posts/${p.slug}</link>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <guid>${siteUrl}/posts/${p.slug}</guid>
    </item>`,
  )
  .join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(description)}</description>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

writeFileSync(join(distDir, 'rss.xml'), rss, 'utf-8')
console.log('✓ dist/rss.xml generated')

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
