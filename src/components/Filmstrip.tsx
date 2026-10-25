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
    const step = frame ? frame.offsetWidth + 10 : el.clientWidth * 0.6
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  useEffect(() => {
    if (open === null) return
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') {
        setOpen((i) => (i === null ? i : Math.min(images.length - 1, i + 1)))
      }
      if (e.key === 'ArrowLeft') {
        setOpen((i) => (i === null ? i : Math.max(0, i - 1)))
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, images.length])

  if (images.length === 0) return null

  return (
    <div className="strip">
      <div className="strip-head">
        <span>
          照片 · {String(images.length).padStart(2, '0')}
        </span>
        {images.length > 1 && (
          <span className="strip-buttons">
            <button type="button" onClick={() => scrollByFrame(-1)} aria-label="上一张">
              ←
            </button>
            <button type="button" onClick={() => scrollByFrame(1)} aria-label="下一张">
              →
            </button>
          </span>
        )}
      </div>

      <div ref={scrollRef} className="strip-track">
        {images.map((img, index) => (
          <button
            key={`${img.src}-${index}`}
            data-frame
            type="button"
            className="strip-frame"
            onClick={() => setOpen(index)}
            aria-label={img.alt ? `查看照片：${img.alt}` : '查看照片'}
          >
            <ResponsiveImage
              src={img.src}
              alt={img.alt ?? ''}
              sizes="(min-width: 760px) 300px, (min-width: 480px) 46vw, 78vw"
            />
            <figcaption>
              {String(index + 1).padStart(2, '0')}
              {img.alt ? `　${img.alt}` : ''}
            </figcaption>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="查看照片"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(null)
          }}
        >
          <div className="lightbox-bar">
            <span>
              {String(open + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={() => setOpen(null)}>
              关闭
            </button>
          </div>

          <div className="lightbox-stage">
            <ResponsiveImage
              src={images[open].src}
              alt={images[open].alt ?? ''}
              sizes="94vw"
              loading="eager"
            />
          </div>

          <div className="lightbox-foot">
            <div>
              <p className="lightbox-caption">{images[open].alt ?? ''}</p>
              <p className="lightbox-meta">文章配图</p>
            </div>
            <div className="lightbox-nav">
              <button
                type="button"
                onClick={() => setOpen((i) => (i === null ? i : Math.max(0, i - 1)))}
                disabled={open === 0}
              >
                ← 上一张
              </button>
              <button
                type="button"
                onClick={() =>
                  setOpen((i) => (i === null ? i : Math.min(images.length - 1, i + 1)))
                }
                disabled={open === images.length - 1}
              >
                下一张 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
