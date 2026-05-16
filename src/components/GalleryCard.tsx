import type { Artwork } from '../types'
import { useInView } from '../hooks/useInView'

interface Props {
  artwork: Artwork
  index: number
  onSelect: (artwork: Artwork) => void
}

export default function GalleryCard({ artwork, index, onSelect }: Props) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 0.08}s` }}
      className={`mb-4 break-inside-avoid transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <button
        onClick={() => onSelect(artwork)}
        className="group relative overflow-hidden rounded-xl w-full text-left"
      >
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
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
