import type { Artwork } from '../types'
import ResponsiveImage from './ResponsiveImage'

interface Props {
  artwork: Artwork
  onSelect: (artwork: Artwork) => void
}

export default function GalleryCard({ artwork, onSelect }: Props) {
  return (
    <div className="mb-4 break-inside-avoid">
      <button
        onClick={() => onSelect(artwork)}
        className="group relative overflow-hidden rounded-md w-full text-left"
      >
        <ResponsiveImage
          src={artwork.image}
          alt={artwork.title}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 92vw"
          className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-sm font-medium">{artwork.title}</h3>
            <p className="text-white/60 text-xs mt-0.5">{artwork.medium} · {artwork.date}</p>
          </div>
        </div>
      </button>
    </div>
  )
}
