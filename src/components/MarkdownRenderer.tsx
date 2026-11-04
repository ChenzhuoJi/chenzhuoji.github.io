import { useEffect, useMemo, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import Filmstrip, { type FilmstripImage } from './Filmstrip'
import Callout, { type CalloutKind } from './Callout'
import ResponsiveImage from './ResponsiveImage'
import { addCjkSpacing } from '../utils/cjkSpacing'

import 'katex/dist/katex.min.css'

/* ── 定制引用块 ───────────────────────────────────────────────
   两种写法，任选：

   1) 直接写 div（推荐，正文照常用 Markdown）：
        <div class="callout callout--axolotl" data-title="世上无完美恋人">
        正文
        </div>

      短的也可以写成一行：
        <div class="callout--gpt" title="标题">一句话</div>

   2) 块引用 + 标记行：
        > [!axolotl] 世上无完美恋人
        > 正文

   div 形式先在 `expandCalloutDivs` 里改写成块引用（于是正文仍走
   Markdown 解析），再由 remarkCallout 换成带 class 的 div，
   交给下面的 components.div 渲染成 <Callout>。
   ─────────────────────────────────────────────────────────── */

const CALLOUT_KINDS = ['axolotl', 'gpt'] as const

/** 读一个属性，容忍 `class = "x"` 这种等号两边的空格与单双引号 */
function readAttr(attrs: string, name: string): string | undefined {
  const re = new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i')
  const m = attrs.match(re)
  return m ? (m[1] ?? m[2] ?? m[3] ?? '') : undefined
}

/** 从 `<div class="..." data-title="...">` 的属性里认出种类与标题 */
function readCalloutAttrs(
  attrs: string,
): { kind: CalloutKind; title: string; modifiers: string[] } | null {
  const cls = readAttr(attrs, 'class') ?? ''
  const kind = CALLOUT_KINDS.find((k) => cls.includes(k))
  if (!kind) return null
  const title = readAttr(attrs, 'data-title') ?? readAttr(attrs, 'title') ?? ''
  // `callout--small` 这类修饰词原样带到最终节点上
  const modifiers = cls
    .split(/\s+/)
    .filter((c) => c.startsWith('callout--') && c !== `callout--${kind}`)
    .map((c) => c.slice('callout--'.length))
  return { kind, title, modifiers }
}

/**
 * 把 `<div class="callout ...">…</div>` 改写成块引用，好让里面的内容
 * 继续按 Markdown 解析。没被认出来的 div 原样放回去。
 */
function expandCalloutDivs(source: string): string {
  if (!source.includes('<div')) return source

  const lines = source.split('\n')
  const out: string[] = []

  const emit = (kind: CalloutKind, title: string, body: string[], modifiers: string[] = []) => {
    const tag = [kind, ...modifiers].join(' ')
    out.push(`> [!${tag}]${title ? ` ${title}` : ''}`)
    if (body.length) out.push('>')
    for (const line of body) out.push(line.trim() === '' ? '>' : `> ${line}`)
    // 空行收尾：否则紧跟其后的段落会被当成块引用的续行吞进引用块
    out.push('')
  }

  let fence: string | null = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // 代码块里原样保留，免得把示例当引用块吃掉
    const fenceMatch = trimmed.match(/^(`{3,}|~{3,})/)
    if (fenceMatch) {
      const mark = fenceMatch[1][0]
      if (!fence) fence = mark
      else if (fence === mark) fence = null
      out.push(line)
      continue
    }
    if (fence) {
      out.push(line)
      continue
    }

    if (!trimmed.startsWith('<div')) {
      out.push(line)
      continue
    }

    // 一行写完的：<div ...>内容</div>
    const inline = trimmed.match(/^<div\b([^>]*)>([\s\S]*?)<\/div>$/)
    if (inline) {
      const attrs = readCalloutAttrs(inline[1])
      if (attrs) {
        emit(attrs.kind, attrs.title, [inline[2]], attrs.modifiers)
        continue
      }
      out.push(line)
      continue
    }

    // 多行的：开标签单独一行，配对的 </div> 也单独一行
    const open = trimmed.match(/^<div\b([^>]*)>$/)
    const attrs = open ? readCalloutAttrs(open[1]) : null
    if (!attrs) {
      out.push(line)
      continue
    }

    let depth = 1
    let j = i + 1
    let closed = false
    const body: string[] = []

    for (; j < lines.length; j++) {
      const current = lines[j]
      const opens = current.match(/<div\b/g)?.length ?? 0
      const closes = current.match(/<\/div>/g)?.length ?? 0
      depth += opens - closes

      if (depth <= 0) {
        const before = current.slice(0, current.indexOf('</div>')).trimEnd()
        if (before) body.push(before)
        closed = true
        break
      }
      body.push(current)
    }

    if (!closed) {
      out.push(line)
      continue
    }

    emit(attrs.kind, attrs.title, body, attrs.modifiers)
    i = j
  }

  return out.join('\n')
}

const CALLOUT_DEFAULT_TITLES: Record<CalloutKind, string> = {
  axolotl: '美西螈说',
  gpt: 'GPT 回复',
}

const CALLOUT_MARKER = /^\[!(axolotl|gpt)((?:\s+[a-z0-9-]+)*)\](?:[ \t]+([^\n]*))?(?:\n|$)/

interface MdNode {
  type: string
  value?: string
  children?: MdNode[]
  data?: Record<string, unknown>
}

function remarkCallout() {
  return (tree: MdNode) => {
    visitCallouts(tree)
  }
}

function visitCallouts(node: MdNode) {
  if (!node.children) return
  for (const child of node.children) {
    if (child.type === 'blockquote') transformCallout(child)
    visitCallouts(child)
  }
}

function transformCallout(node: MdNode) {
  const blocks = node.children
  if (!blocks?.length) return

  const first = blocks[0]
  if (first.type !== 'paragraph' || !first.children?.length) return

  const text = first.children[0]
  if (text.type !== 'text' || !text.value) return

  const match = CALLOUT_MARKER.exec(text.value)
  if (!match) return

  const kind = match[1] as CalloutKind
  const modifiers = (match[2] ?? '').trim().split(/\s+/).filter(Boolean)
  const title = (match[3] ?? '').trim() || CALLOUT_DEFAULT_TITLES[kind]
  const rest = text.value.slice(match[0].length)

  // 摘掉标记行；整段只有标记时把这个空段落删掉
  if (rest.trim()) {
    text.value = rest
  } else {
    first.children.shift()
    if (first.children[0]?.type === 'break') first.children.shift()
    if (!first.children.length) blocks.shift()
  }

  node.data = {
    hName: 'div',
    hProperties: {
      className: ['callout', `callout--${kind}`, ...modifiers.map((m) => `callout--${m}`)],
      'data-callout-kind': kind,
      'data-callout-title': title,
    },
  }
}

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
  const source = useMemo(() => expandCalloutDivs(content), [content])

  useEffect(() => {
    if (!ref.current) return
    addCjkSpacing(ref.current)

    const hash = window.location.hash
    if (hash) {
      const id = hash.slice(1)
      const el = ref.current.querySelector(`[id="${id}"]`) ?? document.getElementById(id)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [content])

  return (
    <div ref={ref} className="prose-ink">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkCallout]}
        rehypePlugins={[rehypeKatex, rehypeRaw, rehypeHighlight]}
        components={{
          div: ({ node, children, ...props }: any) => {
            const classes = getClassNames(node)
            if (classes.includes('filmstrip')) {
              return <Filmstrip images={imagesFromNode(node)} />
            }
            if (classes.includes('callout')) {
              // hast 会把 data-* 属性转成 camelCase
              const props = node?.properties ?? {}
              const classKind = classes
                .map((c) => c.replace(/^callout--/, ''))
                .find((c) => c === 'axolotl' || c === 'gpt')
              const kind = String(props.dataCalloutKind ?? classKind ?? 'axolotl') as CalloutKind
              const title = String(props.dataCalloutTitle ?? props.dataTitle ?? props.title ?? '')
              const extraClass = classes
                .filter((c) => c.startsWith('callout--') && c !== `callout--${kind}`)
                .join(' ')
              return (
                <Callout kind={kind} title={title} extraClass={extraClass}>
                  {children}
                </Callout>
              )
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
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
          img: ({ alt, src }) => (
            <figure>
              <ResponsiveImage
                src={src ?? ''}
                alt={alt ?? ''}
                sizes="(min-width: 760px) 640px, 100vw"
              />
              {alt && <figcaption>{alt}</figcaption>}
            </figure>
          ),
          table: ({ children, ...props }) => (
            <div className="table-wrap">
              <table {...props}>{children}</table>
            </div>
          ),
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  )
}
