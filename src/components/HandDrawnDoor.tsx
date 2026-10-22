import { useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { roughLine, roughRect } from '../utils/rough'

interface Props {
  to: string
  /** 门打开后从门里浮出来的字 */
  label?: string
  /** 仅用于无障碍描述，不显示在门上 */
  count?: number
  hint?: string
  className?: string
}

/** 手绘木门：悬停 / 键盘聚焦时门板向左打开，露出里面的文字；点击推门进入 */
export default function HandDrawnDoor({
  to,
  label = '全部文章',
  count,
  hint = '',
  className = '',
}: Props) {
  const navigate = useNavigate()
  const [opening, setOpening] = useState(false)
  const timer = useRef<number | null>(null)

  const paths = useMemo(
    () => ({
      lintel: roughLine(5, 2, 24, 198, 23, 1.6),
      lintelGhost: roughLine(41, 0, 20, 200, 19, 2.4),
      jambLeft: roughLine(9, 10, 24, 12, 294, 1.4),
      jambRight: roughLine(13, 190, 24, 188, 294, 1.4),
      floor: roughLine(97, 0, 297, 200, 296, 1.2),
      panel: roughRect(59, 4, 4, 192, 292, 2.2),
      panelGhost: roughRect(83, 7, 7, 186, 286, 3.2),
      panelTop: roughRect(61, 28, 24, 144, 106, 1.4),
      panelBottom: roughRect(89, 28, 152, 144, 120, 1.4),
    }),
    [],
  )

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      navigate(to)
      return
    }

    setOpening(true)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => navigate(to), 520)
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      aria-label={count ? `${label}，共 ${count} 篇` : label}
      data-open={opening ? 'true' : undefined}
      className={`group relative flex select-none flex-col items-center outline-none ${className}`}
    >
      <span className="door-scene relative block h-[13.5rem] w-36 -rotate-1 sm:h-60 sm:w-40">
        {/* 门洞：在门板后面，像一间暗下来的屋子 */}
        <span
          className="absolute bottom-[2%] left-[8%] right-[8%] top-[8%] bg-ink-100/70 dark:bg-ink-950/80"
          aria-hidden="true"
        />

        {/* 门缝里透出来的光 */}
        <span
          className="door-glow absolute inset-[6%] rounded-full bg-[radial-gradient(ellipse_at_50%_55%,rgba(216,56,76,0.26),rgba(216,56,76,0.07)_45%,transparent_70%)] blur-xl dark:bg-[radial-gradient(ellipse_at_50%_55%,rgba(234,101,114,0.3),rgba(234,101,114,0.08)_45%,transparent_70%)]"
          aria-hidden="true"
        />

        {/* 门里的四个字 */}
        <span className="absolute inset-[13%] flex items-center justify-center" aria-hidden="true">
          <span className="door-label whitespace-nowrap font-heading text-xl font-semibold tracking-[0.22em] text-ink-900 [writing-mode:vertical-rl] dark:text-ink-50 sm:text-2xl">
            {label}
          </span>
        </span>

        {/* 门楣、两侧门框和地面 */}
        <svg
          viewBox="0 0 200 300"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible text-ink-900 dark:text-ink-100"
        >
          <path d={paths.lintel} stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" />
          <path d={paths.lintelGhost} stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" opacity={0.3} />
          <path d={paths.jambLeft} stroke="currentColor" strokeWidth={3.2} strokeLinecap="round" />
          <path d={paths.jambRight} stroke="currentColor" strokeWidth={3.2} strokeLinecap="round" />
          <path d={paths.floor} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" opacity={0.4} />
        </svg>

        {/* 门板，绕左侧门轴转开 */}
        <span className="door-panel absolute bottom-[2%] left-[8%] right-[8%] top-[8%] z-10 bg-gradient-to-br from-paper to-paper-200 shadow-[8px_14px_28px_-20px_rgba(28,34,48,0.55)] dark:from-ink-900 dark:to-ink-950 dark:shadow-[8px_14px_28px_-18px_rgba(0,0,0,0.9)]">
          <svg
            viewBox="0 0 200 300"
            fill="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full overflow-visible text-ink-900 dark:text-ink-100"
          >
            <path d={paths.panel} stroke="currentColor" strokeWidth={3.2} strokeLinecap="round" />
            <path d={paths.panelGhost} stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" opacity={0.25} />
            <path d={paths.panelTop} stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" opacity={0.55} />
            <path d={paths.panelBottom} stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" opacity={0.55} />
          </svg>
          <span
            className="absolute right-[15%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-vermilion-500 ring-2 ring-paper/70 transition-colors duration-300 group-hover:bg-vermilion-400 dark:ring-ink-900/70 sm:h-3 sm:w-3"
            aria-hidden="true"
          />
        </span>
      </span>

      <span className="mt-4 text-[0.65rem] tracking-[0.3em] text-ink-400 transition-colors duration-300 group-hover:text-vermilion-600 dark:text-ink-500 dark:group-hover:text-vermilion-400">
        {hint}
      </span>
    </Link>
  )
}
