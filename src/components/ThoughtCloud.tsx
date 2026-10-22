import type { CSSProperties } from 'react'
import BubbleCircle from './BubbleCircle'

interface Props {
  myCount: number
  techCount: number
  galleryCount: number
}

type Thought = {
  to: string
  label: string
  unit: string
  tone: 'ink' | 'vermilion' | 'frost'
  seed: number
  /** 圆心位置与直径，均为容器边长的百分比 */
  x: number
  y: number
  size: number
  delay: number
  rotate: string
}

const thoughts: Thought[] = [
  {
    to: '/genre/my',
    label: '随笔',
    unit: '篇',
    tone: 'ink',
    seed: 17,
    x: 50,
    y: 25,
    size: 42,
    delay: 0,
    rotate: '-rotate-1',
  },
  {
    to: '/genre/tech',
    label: '有用',
    unit: '篇',
    tone: 'vermilion',
    seed: 42,
    x: 20,
    y: 64,
    size: 36,
    delay: 2.6,
    rotate: 'rotate-1',
  },
  {
    to: '/gallery',
    label: '生活的切片',
    unit: '幅',
    tone: 'frost',
    seed: 73,
    x: 80,
    y: 61,
    size: 34,
    delay: 4.9,
    rotate: '-rotate-1',
  },
]

/** 从门缝里冒出来的小气泡，非交互 */
const puffs = [
  { size: 8, drift: -12, delay: 0, duration: 10, riseTo: '34%' },
  { size: 12, drift: 7, delay: 1.6, duration: 12, riseTo: '44%' },
  { size: 6, drift: -5, delay: 2.4, duration: 9, riseTo: '50%' },
  { size: 10, drift: 18, delay: 3.1, duration: 13, riseTo: '38%' },
  { size: 8, drift: -16, delay: 4.7, duration: 11, riseTo: '58%' },
  { size: 11, drift: -8, delay: 6.3, duration: 12, riseTo: '42%' },
  { size: 13, drift: 3, delay: 7.8, duration: 14, riseTo: '30%' },
]

const ORIGIN = { x: 50, y: 98 }

/** 一条从门缝升起、略带 S 弯的思绪轨迹 */
function smokePath(endX: number, endY: number, seed: number): string {
  const dx = endX - ORIGIN.x
  const dy = endY - ORIGIN.y
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len
  const ny = dx / len
  const bend = seed % 2 === 0 ? 5.5 : -5.5
  const c1x = ORIGIN.x + dx * 0.32 + nx * bend
  const c1y = ORIGIN.y + dy * 0.32 + ny * bend
  const c2x = ORIGIN.x + dx * 0.68 - nx * bend
  const c2y = ORIGIN.y + dy * 0.68 - ny * bend
  return `M ${ORIGIN.x} ${ORIGIN.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`
}

/** 三团从门缝里慢慢冒出来的思绪，用弯曲的烟迹连回门里 */
export default function ThoughtCloud({ myCount, techCount, galleryCount }: Props) {
  const counts = [myCount, techCount, galleryCount]

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[28rem]">
      {/* 门缝里的暖光 */}
      <div
        className="pointer-events-none absolute left-1/2 top-[98%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-vermilion-500/10 blur-2xl dark:bg-vermilion-500/20"
        aria-hidden="true"
      />

      {/* 思绪的烟迹 */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible text-ink-900 dark:text-ink-100"
      >
        {thoughts.map((thought, i) => {
          const endX = thought.x
          const endY = thought.y + thought.size * 0.48
          const d = smokePath(endX, endY, thought.seed)
          return (
            <g key={thought.to}>
              <path
                d={d}
                stroke="currentColor"
                strokeWidth={1.8}
                opacity={0.06}
                style={{ filter: 'blur(2px)' }}
              />
              <path d={d} stroke="currentColor" strokeWidth={0.5} opacity={0.28} />
              <path
                d={d}
                className="thought-trail"
                stroke="currentColor"
                strokeWidth={0.8}
                opacity={0.4}
                style={{ animationDelay: `${i * 1.4}s`, animationDuration: `${6 + i}s` }}
              />
            </g>
          )
        })}

        {/* 门缝那一小缕烟 */}
        <path
          d="M 50 98 Q 47 100.5 50 102.5 Q 53 104.5 50 106.5"
          stroke="currentColor"
          strokeWidth={0.9}
          strokeLinecap="round"
          opacity={0.5}
        />

        {/* 汇合处随手绕的小蝴蝶结 */}
        <g stroke="currentColor" strokeWidth={0.6} strokeLinecap="round" opacity={0.6}>
          <path d="M 50 98 C 47.6 95.6, 45.4 96.8, 47.1 99 C 48.4 100.6, 49.5 99.2, 50 98" />
          <path d="M 50 98 C 52.4 95.6, 54.6 96.8, 52.9 99 C 51.6 100.6, 50.5 99.2, 50 98" />
        </g>
      </svg>

      {/* 门缝处向外漾开的水纹 */}
      {[0, 1].map((i) => (
        <span
          key={i}
          className="thought-ripple pointer-events-none absolute left-1/2 top-[98%] h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-vermilion-600/25 dark:border-vermilion-400/30"
          style={{ animationDelay: `${i * 1.8}s` }}
          aria-hidden="true"
        />
      ))}

      {/* 源源不断往上冒的小气泡 */}
      {puffs.map((puff, i) => (
        <span
          key={i}
          className="thought-puff pointer-events-none absolute left-1/2 rounded-full border border-ink-900/30 bg-paper/50 dark:border-ink-100/25 dark:bg-ink-900/25"
          style={
            {
              width: puff.size,
              height: puff.size,
              '--drift': `${puff.drift}px`,
              '--rise-to': puff.riseTo,
              animationDelay: `${puff.delay}s`,
              animationDuration: `${puff.duration}s`,
            } as CSSProperties
          }
          aria-hidden="true"
        />
      ))}

      {/* 三团主要思绪 */}
      {thoughts.map((thought, i) => (
        <div
          key={thought.to}
          className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${thought.rotate}`}
          style={{ left: `${thought.x}%`, top: `${thought.y}%`, width: `${thought.size}%` }}
        >
          <BubbleCircle
            to={thought.to}
            label={thought.label}
            count={counts[i]}
            unit={thought.unit}
            tone={thought.tone}
            seed={thought.seed}
            dense
            float={false}
            thought
            floatDelay={thought.delay}
            hoverLabel="飘进去 →"
            className="aspect-square w-full"
          />
        </div>
      ))}

      {/* 门缝里的一点红 */}
      <span
        className="thought-ember pointer-events-none absolute left-1/2 top-[98%] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-vermilion-500 shadow-[0_0_10px_rgba(216,56,76,0.6)]"
        aria-hidden="true"
      />
    </div>
  )
}
