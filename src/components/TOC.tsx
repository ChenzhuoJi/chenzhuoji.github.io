import { useMemo } from 'react'
import type { Post } from '../types'

interface Props {
  post: Post
}

function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
}

function extractHeadings(content: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = []
  const lines = content.split('\n')
  let inCodeBlock = false

  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const match = line.match(/^##\s+(.+)$/)
    if (!match) continue
    const text = match[1].trim()
    headings.push({ id: headingId(text), text })
  }

  return headings
}

export default function TOC({ post }: Props) {
  const headings = useMemo(() => extractHeadings(post.content), [post.content])

  if (headings.length < 2) return null

  return (
    <nav className="toc" aria-label="文章目录">
      <p className="toc-title">目录</p>
      <ol>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
