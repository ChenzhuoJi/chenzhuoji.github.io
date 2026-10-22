import { useEffect, useRef, useState } from 'react'
import ResponsiveImage from './ResponsiveImage'

export interface FilmstripImage {
  src: string
  alt?: string
}

interface Props {
  images: FilmstripImage[]
}

export default function Filmstrip({ images }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<number | null>(null)

  const scrollByFrame = (dir: number) => {
    const el = scrollRef.current
    if (!el) return
    const frame = el.querySelector<HTMLElement>('[data-frame]')
    const step = frame ? frame.offsetWidth + 12 : el.clientWidth * 0.6
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : Math.min(images.length - 1, i + 1)))
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : Math.max(0, i - 1)))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, images.length])

  // 悬停时纵向滚轮 → 胶片横向滑动；到边界则放行，交还页面滚动
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return // 本来就是横向手势，不接管
      if (el.scrollWidth <= el.clientWidth) return // 内容没溢出，不接管
      const atStart = el.scrollLeft <= 0
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
      const goingRight = e.deltaY > 0
      if ((goingRight && atEnd) || (!goingRight && atStart)) return // 到边界，交还页面
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <div className="not-prose my-8">
      {/* 胶片条 */}
      <div className="relative overflow-hidden rounded-md bg-ink-950 px-2 py-8">
        <div className="film-perf absolute inset-x-3 top-2.5" />
        <div className="film-perf absolute inset-x-3 bottom-2.5" />

        <div
          ref={scrollRef}
          className="scrollbar-thin overscroll-x-contain flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-2"
        >
          {images.map((img, i) => (
            <button
              key={i}
              data-frame
              type="button"
              onClick={() => setOpen(i)}
              className="group w-[80%] shrink-0 snap-start text-left sm:w-[46%] md:w-[32%]"
            >
              <div className="overflow-hidden rounded-sm ring-1 ring-paper/15">
                <ResponsiveImage
                  src={img.src}
                  alt={img.alt ?? ''}
                  sizes="(min-width: 768px) 30vw, (min-width: 640px) 44vw, 78vw"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              {img.alt && (
                <div className="mt-2 truncate px-0.5 font-accent text-sm text-paper/60">
                  {img.alt}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* 胶片颗粒 */}
        <div className="film-grain pointer-events-none absolute inset-0" />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollByFrame(-1)}
              aria-label="上一张"
              className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 p-2 text-ink-900 shadow transition hover:bg-paper sm:flex"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByFrame(1)}
              aria-label="下一张"
              className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 p-2 text-ink-900 shadow transition hover:bg-paper sm:flex"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* 全屏查看 */}
      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink-950/95 p-4"
        >
          <ResponsiveImage
            src={images[open].src}
            alt={images[open].alt ?? ''}
            onClick={(e) => e.stopPropagation()}
            sizes="92vw"
            loading="eager"
            className="max-h-[85dvh] max-w-[92vw] rounded-md object-contain"
          />
          {images[open].alt && (
            <div className="mt-4 font-accent text-sm text-paper/70">{images[open].alt}</div>
          )}
          <button
            type="button"
            aria-label="关闭"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] rounded-full bg-paper/10 p-2 text-paper/80 transition hover:bg-paper/20"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
