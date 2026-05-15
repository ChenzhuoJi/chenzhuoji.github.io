import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from 'd3-force'
import type { GraphNode, GraphEdge } from '../types'

const VIBE_COLOR = '#f17147'
const MY_COLOR = '#aba082'
const NODE_STROKE = '#fff'
const EDGE_COLOR = '#c4bca9'
const LABEL_COLOR_LIGHT = '#4e453b'
const LABEL_COLOR_DARK = '#efede8'
const MIN_RADIUS = 10
const MAX_RADIUS = 28

function nodeRadius(n: GraphNode): number {
  return Math.min(MAX_RADIUS, MIN_RADIUS + n.connectionCount * 4)
}

interface Props {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

type DragState =
  | { type: 'node'; id: string; sx: number; sy: number; nx: number; ny: number }
  | { type: 'bg'; sx: number; sy: number; tx: number; ty: number }

export default function ArticleGraph({ nodes: rawNodes, edges: rawEdges }: Props) {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [dim, setDim] = useState({ width: 800, height: 500 })
  const [positions, setPositions] = useState<Map<string, { x: number; y: number }>>(new Map())
  const [hovered, setHovered] = useState<string | null>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 })
  const dragRef = useRef<DragState | null>(null)
  const posRef = useRef(positions)
  posRef.current = positions
  const transformRef = useRef(transform)
  transformRef.current = transform

  useEffect(() => {
    if (!containerRef.current) return
    const { width } = containerRef.current.getBoundingClientRect()
    setDim({ width, height: Math.max(400, width * 0.55) })
  }, [])

  useEffect(() => {
    const simNodes = rawNodes.map((n) => ({
      ...n,
      x: dim.width / 2 + (Math.random() - 0.5) * dim.width * 0.4,
      y: dim.height / 2 + (Math.random() - 0.5) * dim.height * 0.4,
    }))
    const nodeMap = new Map(simNodes.map((n) => [n.id, n]))
    const linkData = rawEdges.map((e) => ({
      source: nodeMap.get(e.source)!,
      target: nodeMap.get(e.target)!,
      weight: e.weight,
    }))
    const getRadius = (d: GraphNode) => nodeRadius(d)

    const sim = forceSimulation(simNodes)
      .force(
        'link',
        forceLink(linkData)
          .id((d: any) => d.id)
          .distance(200)
          .strength((d: any) => d.weight * 0.4),
      )
      .force('charge', forceManyBody().strength(-400))
      .force('center', forceCenter(dim.width / 2, dim.height / 2))
      .force('collide', forceCollide().radius((d: any) => getRadius(d) + 10))
      .stop()

    for (let i = 0; i < 300; i++) sim.tick()

    setPositions(new Map(simNodes.map((n) => [n.id, { x: n.x, y: n.y }])))
  }, [rawNodes, rawEdges, dim.width, dim.height])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      const factor = e.deltaY > 0 ? 0.9 : 1.1
      setTransform((t) => ({ ...t, k: Math.max(0.3, Math.min(4, t.k * factor)) }))
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const drag = dragRef.current
      if (!drag) return
      const t = transformRef.current
      if (drag.type === 'node') {
        const dx = (e.clientX - drag.sx) / t.k
        const dy = (e.clientY - drag.sy) / t.k
        setPositions((prev) => {
          const next = new Map(prev)
          next.set(drag.id, { x: drag.nx + dx, y: drag.ny + dy })
          return next
        })
      } else {
        const dx = e.clientX - drag.sx
        const dy = e.clientY - drag.sy
        setTransform({ x: drag.tx + dx, y: drag.ty + dy, k: t.k })
      }
    }
    const onUp = () => { dragRef.current = null }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  const handleNodeMouseDown = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const p = posRef.current.get(id)
    if (!p) return
    dragRef.current = { type: 'node', id, sx: e.clientX, sy: e.clientY, nx: p.x, ny: p.y }
  }, [])

  const handleBgMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return
    const t = transformRef.current
    dragRef.current = { type: 'bg', sx: e.clientX, sy: e.clientY, tx: t.x, ty: t.y }
  }, [])

  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  const labelColor = isDark ? LABEL_COLOR_DARK : LABEL_COLOR_LIGHT

  return (
    <div
      ref={containerRef}
      className="w-full bg-ink-50/50 dark:bg-ink-900/30 rounded-xl overflow-hidden border border-ink-200 dark:border-ink-700"
    >
      <svg
        width={dim.width}
        height={dim.height}
        onMouseDown={handleBgMouseDown}
        className="cursor-grab active:cursor-grabbing"
      >
        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
          {rawEdges.map((e) => {
            const s = positions.get(e.source)
            const t = positions.get(e.target)
            if (!s || !t) return null
            return (
              <line
                key={`${e.source}-${e.target}`}
                x1={s.x}
                y1={s.y}
                x2={t.x}
                y2={t.y}
                stroke={EDGE_COLOR}
                strokeWidth={Math.max(0.5, e.weight * 1.2)}
                opacity={0.3 + e.weight * 0.15}
                className="dark:opacity-40"
              />
            )
          })}

          {rawNodes.map((n) => {
            const p = positions.get(n.id)
            if (!p) return null
            const r = nodeRadius(n)
            const isHovered = hovered === n.id
            return (
              <g key={n.id}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? r + 3 : r}
                  fill={n.genre === 'vibe' ? VIBE_COLOR : MY_COLOR}
                  stroke={isHovered ? VIBE_COLOR : NODE_STROKE}
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-100 cursor-pointer"
                  style={{ filter: isHovered ? 'brightness(1.15)' : undefined }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onMouseDown={(e) => handleNodeMouseDown(n.id, e)}
                  onClick={() => navigate(`/posts/${n.id}`)}
                />
                <text
                  x={p.x}
                  y={p.y + r + 14}
                  textAnchor="middle"
                  fill={labelColor}
                  fontSize={isHovered ? 12 : 11}
                  fontWeight={isHovered ? '600' : '400'}
                  className="pointer-events-none select-none"
                  style={{ fontFamily: '"Noto Sans SC", system-ui, sans-serif' }}
                >
                  {n.title.length > 10 ? n.title.slice(0, 10) + '…' : n.title}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
      <div className="px-4 pb-3 flex items-center gap-4 text-xs text-ink-400 dark:text-ink-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: VIBE_COLOR }} />
          Vibe Writing
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: MY_COLOR }} />
          My Writing
        </div>
        <span className="ml-auto">{rawNodes.length} 篇文章 · {rawEdges.length} 条关联</span>
      </div>
    </div>
  )
}
