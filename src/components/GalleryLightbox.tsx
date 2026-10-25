import { useEffect, useCallback } from 'react'
import type { Artwork } from '../types'
import ResponsiveImage from './ResponsiveImage'

interface Props {
  artwork: Artwork | null
  items: Artwork[]
  onClose: () => void
  onSelect: (artwork: Artwork) => void
}

export default function GalleryLightbox({ artwork, items, onClose, onSelect }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (!artwork) return
      const index = items.findIndex((item) => item.id === artwork.id)
      if (e.key === 'ArrowLeft' && index > 0) onSelect(items[index - 1])
      if (e.key === 'ArrowRight' && index < items.length - 1) onSelect(items[index + 1])
    },
    [artwork, items, onClose, onSelect],
  )

  useEffect(() => {
    if (!artwork) return
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [artwork, handleKey])

  if (!artwork) return null

  const index = items.findIndex((item) => item.id === artwork.id)
  const hasPrev = index > 0
  const hasNext = index < items.length - 1

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={artwork.title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="lightbox-bar">
        <span>
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button type="button" onClick={onClose}>
          关闭
        </button>
      </div>

      <div className="lightbox-stage">
        <ResponsiveImage
          src={artwork.image}
          alt={artwork.title}
          sizes="94vw"
          loading="eager"
        />
      </div>

      <div className="lightbox-foot">
        <div>
          <p className="lightbox-caption">{artwork.title}</p>
          <p className="lightbox-meta">
            {artwork.medium} · {artwork.date}
          </p>
        </div>
        <div className="lightbox-nav">
          <button
            type="button"
            onClick={() => hasPrev && onSelect(items[index - 1])}
            disabled={!hasPrev}
          >
            ← 上一帧
          </button>
          <button
            type="button"
            onClick={() => hasNext && onSelect(items[index + 1])}
            disabled={!hasNext}
          >
            下一帧 →
          </button>
        </div>
      </div>
    </div>
  )
}
