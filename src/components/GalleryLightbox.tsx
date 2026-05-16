import { useEffect, useCallback } from 'react'
import type { Artwork } from '../types'

interface Props {
  artwork: Artwork | null
  artworks: Artwork[]
  onClose: () => void
  onSelect: (artwork: Artwork) => void
}

export default function GalleryLightbox({ artwork, artworks, onClose, onSelect }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (!artwork) return
      const idx = artworks.findIndex((a) => a.id === artwork.id)
      if (e.key === 'ArrowLeft' && idx > 0) onSelect(artworks[idx - 1])
      if (e.key === 'ArrowRight' && idx < artworks.length - 1) onSelect(artworks[idx + 1])
    },
    [artwork, artworks, onClose, onSelect],
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

  const idx = artworks.findIndex((a) => a.id === artwork.id)
  const hasPrev = idx > 0
  const hasNext = idx < artworks.length - 1

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-[fade-in_0.2s_ease-out]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl" />

      <div
        className="relative flex items-center justify-center w-full h-full p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-ink-900/60 text-white/80 hover:bg-ink-900 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {hasPrev && (
          <button
            onClick={() => onSelect(artworks[idx - 1])}
            className="absolute left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-ink-900/60 text-white/80 hover:bg-ink-900 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {hasNext && (
          <button
            onClick={() => onSelect(artworks[idx + 1])}
            className="absolute right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-ink-900/60 text-white/80 hover:bg-ink-900 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <img
          src={artwork.image}
          alt={artwork.title}
          className="max-h-[85vh] max-w-full object-contain rounded-lg animate-[scale-in_0.3s_ease-out]"
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-ink-950/60 backdrop-blur-sm border border-ink-700/30">
            <span className="text-white text-sm font-medium">{artwork.title}</span>
            <span className="text-white/50 mx-2">·</span>
            <span className="text-white/60 text-xs">{artwork.medium}</span>
            <span className="text-white/30 mx-1.5">·</span>
            <span className="text-white/50 text-xs">{artwork.date}</span>
            <span className="text-white/30 mx-2">·</span>
            <span className="text-white/40 text-xs">{idx + 1} / {artworks.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
