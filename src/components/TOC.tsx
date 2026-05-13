import { useMemo } from 'react'
import type { Post } from '../types'

interface Props {
  post: Post
}

function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = []
  const regex = /^(#{2,3})\s+(.+)$/gm
  let match: RegExpExecArray | null
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-')
    headings.push({ id, text, level })
  }
  return headings
}

export default function TOC({ post }: Props) {
  const headings = useMemo(() => extractHeadings(post.content), [post.content])

  if (headings.length < 2) return null

  return (
    <nav className="hidden lg:block sticky top-24 w-56 shrink-0">
      <h3 className="text-xs font-medium text-ink-400 dark:text-ink-500 uppercase tracking-wider mb-3">目录</h3>
      <ul className="space-y-1.5 text-sm border-l-2 border-ink-100 dark:border-ink-800 pl-3">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block text-ink-500 dark:text-ink-400 hover:text-vermilion-500 dark:hover:text-vermilion-400 transition-colors ${
                h.level === 3 ? 'pl-3' : ''
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
