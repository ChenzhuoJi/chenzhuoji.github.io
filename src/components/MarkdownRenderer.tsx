import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'

import 'katex/dist/katex.min.css'

function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
}

interface Props {
  content: string
}

export default function MarkdownRenderer({ content }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const hash = window.location.hash
    if (hash) {
      const el = ref.current.querySelector(hash)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [content])

  return (
    <div ref={ref} className="prose prose-ink dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw, rehypeHighlight]}
        components={{
          h2: ({ children, ...props }) => {
            const text = children?.toString() ?? ''
            return <h2 id={headingId(text)} {...props}>{children}</h2>
          },
          h3: ({ children, ...props }) => {
            const text = children?.toString() ?? ''
            return <h3 id={headingId(text)} {...props}>{children}</h3>
          },
          a: ({ href, children, ...props }) => (
            <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" {...props}>
              {children}
            </a>
          ),
          img: ({ alt, src, ...props }) => (
            <figure className="my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} className="rounded-lg mx-auto" loading="lazy" {...props} />
              {alt && <figcaption className="text-center text-sm text-ink-400 mt-2">{alt}</figcaption>}
            </figure>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto">
              <table {...props}>{children}</table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
