import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import Filmstrip, { type FilmstripImage } from './Filmstrip'
import ResponsiveImage from './ResponsiveImage'

import 'katex/dist/katex.min.css'

function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
}

function getClassNames(node: any): string[] {
  const c = node?.properties?.className
  if (Array.isArray(c)) return c.map(String)
  if (typeof c === 'string') return c.split(/\s+/)
  return []
}

function imagesFromNode(node: any): FilmstripImage[] {
  const nodes = node?.children ?? []
  return nodes
    .filter((n: any) => n.type === 'element' && n.tagName === 'img')
    .map((n: any) => ({
      src: String(n.properties?.src ?? ''),
      alt: n.properties?.alt != null ? String(n.properties.alt) : undefined,
    }))
    .filter((i: FilmstripImage) => i.src)
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
      const id = hash.slice(1)
      const el = ref.current.querySelector(`[id="${id}"]`) ?? document.getElementById(id)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [content])

  return (
    <div ref={ref} className="prose prose-ink dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw, rehypeHighlight]}
        components={{
          div: ({ node, children, ...props }: any) => {
            if (getClassNames(node).includes('filmstrip')) {
              return <Filmstrip images={imagesFromNode(node)} />
            }
            return <div {...props}>{children}</div>
          },
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
          img: ({ alt, src }) => (
            <figure className="my-8">
              <ResponsiveImage
                src={src ?? ''}
                alt={alt ?? ''}
                className="rounded-md mx-auto w-full max-w-full h-auto"
                sizes="(min-width: 768px) 768px, 100vw"
              />
              {alt && <figcaption className="text-center text-[1.5rem] text-ink-400 mt-3 font-accent">{alt}</figcaption>}
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
