import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { roughCircle } from '../utils/rough'

type Tone = 'ink' | 'vermilion' | 'frost'

interface Props {
  to: string
  label: string
  count: number
  unit: string
  tone: Tone
  /** 手绘圆形的随机种子，同一个种子每次渲染形状一致 */
  seed: number
  /** 控制尺寸与位置，例如 "h-44 w-44 sm:h-60 sm:w-60" */
  className?: string
  /** 漂浮动画的起始延迟，让几个气泡不同步 */
  floatDelay?: number
  /** 气泡静止时的轻微倾斜 */
  tilt?: number
  /** 更小的字号与内边距，用于门上方的小气球 */
  dense?: boolean
  /** 是否自行漂浮；系在钉子上的气球由整串一起摇摆 */
  float?: boolean
  /** 悬停时替换计数的小字 */
  hoverLabel?: string
  /** 画成一团半透明的思绪：边缘扭曲、带线头，缓缓上浮 */
  thought?: boolean
}

const TONES: Record<
  Tone,
  {
    fill: string
    stroke: string
    label: string
    sub: string
    ring: string
    speck: string
    glow: string
    highlight: string
    thoughtFill: string
  }
> = {
  ink: {
    fill: 'bg-paper/85 dark:bg-ink-900/70',
    stroke: 'text-ink-900 dark:text-ink-100',
    label: 'text-ink-900 dark:text-ink-50',
    sub: 'text-ink-500 dark:text-ink-400',
    ring: 'border-ink-900/35 dark:border-ink-100/35',
    speck: 'bg-ink-900/55 dark:bg-ink-100/55',
    glow:
      'group-hover:shadow-[0_30px_60px_-30px_rgba(28,34,48,0.55)] dark:group-hover:shadow-[0_30px_60px_-28px_rgba(0,0,0,0.85)]',
    highlight: 'stroke-ink-400/40 dark:stroke-white/15',
    thoughtFill: 'bg-paper/40 dark:bg-ink-900/30',
  },
  vermilion: {
    fill: 'bg-vermilion-50/90 dark:bg-vermilion-950/45',
    stroke: 'text-vermilion-600 dark:text-vermilion-400',
    label: 'text-vermilion-700 dark:text-vermilion-300',
    sub: 'text-vermilion-500/80 dark:text-vermilion-400/70',
    ring: 'border-vermilion-600/40 dark:border-vermilion-400/40',
    speck: 'bg-vermilion-600/55 dark:bg-vermilion-400/55',
    glow:
      'group-hover:shadow-[0_30px_60px_-28px_rgba(200,16,46,0.45)] dark:group-hover:shadow-[0_30px_60px_-26px_rgba(234,101,114,0.4)]',
    highlight: 'stroke-white/70 dark:stroke-white/25',
    thoughtFill: 'bg-vermilion-100/45 dark:bg-vermilion-950/30',
  },
  frost: {
    fill: 'bg-frost-50/90 dark:bg-frost-950/50',
    stroke: 'text-frost-700 dark:text-frost-300',
    label: 'text-frost-800 dark:text-frost-200',
    sub: 'text-frost-600/80 dark:text-frost-400/70',
    ring: 'border-frost-700/40 dark:border-frost-400/35',
    speck: 'bg-frost-700/50 dark:bg-frost-300/50',
    glow:
      'group-hover:shadow-[0_30px_60px_-28px_rgba(31,42,69,0.5)] dark:group-hover:shadow-[0_30px_60px_-26px_rgba(165,186,224,0.35)]',
    highlight: 'stroke-white/80 dark:stroke-white/25',
    thoughtFill: 'bg-frost-100/45 dark:bg-frost-950/30',
  },
}

/** 首页的手绘气泡入口：漂浮、悬停展开、点击水泡四溅 */
export default function BubbleCircle({
  to,
  label,
  count,
  unit,
  tone,
  seed,
  className = '',
  floatDelay = 0,
  tilt = 0,
  dense = false,
  float = true,
  hoverLabel = '推门进去 →',
  thought = false,
}: Props) {
  const navigate = useNavigate()
  const [popping, setPopping] = useState(false)
  const [burst, setBurst] = useState(0)
  const timers = useRef<number[]>([])

  const t = TONES[tone]
  const compact = label.length > 2

  const paths = useMemo(
    () =>
      thought
        ? {
            main: roughCircle(seed, 92, 5.5, 12),
            ghost: roughCircle(seed + 101, 88, 4.5, 13),
          }
        : { main: roughCircle(seed), ghost: roughCircle(seed + 101, 90, 3.4) },
    [seed, thought],
  )

  // 点击时朝四周溅开的小水泡
  const specks = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2 + (seed % 7) * 0.12
        const distance = 58 + ((i * 37 + seed) % 38)
        return {
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          delay: (i % 4) * 20,
          size: i % 4 === 0 ? 8 : 5,
          hollow: i % 3 === 0,
        }
      }),
    [seed],
  )

  useEffect(() => {
    const list = timers.current
    return () => list.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // 保留 Cmd/Ctrl/Shift + 点击、中键等原生行为
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()

    setPopping(true)
    setBurst((value) => value + 1)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timers.current.push(window.setTimeout(() => setPopping(false), 520))
    timers.current.push(window.setTimeout(() => navigate(to), reduceMotion ? 0 : 380))
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      aria-label={`${label}，共 ${count} ${unit}`}
              className={`group relative flex shrink-0 select-none items-center justify-center rounded-full outline-none transition-transform duration-300 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] ${
        float ? 'hover:-translate-y-2' : 'hover:scale-[1.04]'
      } active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-vermilion-500 focus-visible:ring-offset-4 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-ink-950 ${t.glow} ${popping ? 'bubble-pop' : ''} ${className}`}
    >
      <span
        className={`${thought ? 'thought-float ' : float ? 'bubble-float ' : ''}absolute inset-0 flex flex-col items-center justify-center`}
        style={
          {
            '--tilt': `${tilt}deg`,
            animationDelay: `${floatDelay}s`,
            animationDuration: thought ? `${10 + (seed % 5)}s` : undefined,
          } as CSSProperties
        }
      >
        <span
          className={`absolute backdrop-blur-[1.5px] ${thought ? t.thoughtFill : t.fill} ${
            thought ? 'inset-[4%] thought-blob' : 'inset-[2%] rounded-full'
          }`}
          style={thought ? { animationDelay: `${(seed % 4) * 0.8}s` } : undefined}
          aria-hidden="true"
        />
        <span className="absolute inset-0" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none" className={`h-full w-full overflow-visible ${t.stroke}`}>
            <path d={paths.main} stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" />
            <path
              d={paths.ghost}
              stroke="currentColor"
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeDasharray={thought ? '90 340' : '130 420'}
              opacity={0.32}
            />
            {thought && (
              <>
                {/* 气球打结的小凸起和一截线头 */}
                <path
                  d="M 93 191 Q 100 202 107 191"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                />
                <path
                  d="M 95.5 191.5 Q 100 195 104.5 191.5"
                  stroke="currentColor"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  opacity={0.4}
                />
                <path
                  d="M 100 196.5 Q 99 200 100 205"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  opacity={0.6}
                />
                {/* 一点玻璃反光 */}
                <path
                  d="M 45 78 Q 34 96 41 114"
                  className={t.highlight}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <path
                  d="M 154 148 Q 170 134 174 112"
                  className={t.highlight}
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  opacity={0.55}
                />
              </>
            )}
          </svg>
        </span>

        <span
          className={`relative z-10 flex flex-col items-center gap-1.5 text-center ${
            dense ? 'px-2 sm:px-3' : 'px-3 sm:px-5'
          }`}
        >
          <span
            className={`whitespace-nowrap font-heading font-semibold transition-all duration-300 ease-out ${t.label} ${
              dense
                ? compact
                  ? 'text-base tracking-[0.05em] group-hover:tracking-[0.1em] sm:text-xl'
                  : 'text-2xl tracking-[0.12em] group-hover:tracking-[0.18em] sm:text-3xl'
                : compact
                  ? 'text-lg tracking-[0.08em] group-hover:tracking-[0.15em] sm:text-2xl'
                  : 'text-3xl tracking-[0.16em] group-hover:tracking-[0.24em] sm:text-4xl'
            }`}
          >
            {label}
          </span>
          <span className={`relative block h-4 overflow-hidden text-[0.65rem] tracking-[0.18em] ${t.sub}`}>
            <span className="block leading-4 transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">
              {count === 0 ? '虚位以待' : `${count} ${unit}`}
            </span>
            <span className="block leading-4 opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-100">
              {hoverLabel}
            </span>
          </span>
        </span>
      </span>

      {burst > 0 && (
        <span key={burst} className="pointer-events-none absolute inset-0" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={`ripple-${i}`}
              className={`bubble-ripple absolute inset-0 rounded-full border ${t.ring}`}
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
          {specks.map((speck, i) => (
            <span
              key={`speck-${i}`}
              className={`bubble-speck absolute left-1/2 top-1/2 rounded-full ${
                speck.hollow ? `border bg-transparent ${t.ring}` : t.speck
              }`}
              style={
                {
                  width: speck.size,
                  height: speck.size,
                  '--dx': `${speck.dx}px`,
                  '--dy': `${speck.dy}px`,
                  animationDelay: `${speck.delay}ms`,
                } as CSSProperties
              }
            />
          ))}
        </span>
      )}
    </Link>
  )
}
