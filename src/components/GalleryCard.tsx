import type { CSSProperties } from 'react'
import type { Artwork } from '../types'
import ResponsiveImage from './ResponsiveImage'

interface Props {
  artwork: Artwork
  index: number
  onSelect: (artwork: Artwork) => void
}

type Decoration = 'tape-left' | 'tape-right' | 'tape-center' | 'pin'

const LAYOUTS: {
  width: string
  offset: string
  tilt: string
  decoration: Decoration
}[] = [
  { width: 'sm:w-full', offset: '', tilt: '-0.6deg', decoration: 'tape-left' },
  { width: 'sm:w-[88%]', offset: 'sm:ml-auto sm:mt-10', tilt: '0.7deg', decoration: 'pin' },
  { width: 'sm:w-[86%]', offset: 'sm:mr-auto sm:mt-2', tilt: '-0.35deg', decoration: 'tape-right' },
  { width: 'sm:w-[82%]', offset: 'sm:ml-auto sm:mt-12', tilt: '0.8deg', decoration: 'pin' },
  { width: 'sm:w-[90%]', offset: 'sm:mt-5', tilt: '-0.5deg', decoration: 'tape-center' },
  { width: 'sm:w-[90%]', offset: 'sm:mr-auto sm:mt-8', tilt: '0.6deg', decoration: 'tape-left' },
]

function PinOrTape({ kind }: { kind: Decoration }) {
  if (kind === 'pin') {
    return (
      <span
        aria-hidden="true"
        className="gallery-pin -top-1.5 left-1/2 -translate-x-1/2"
      />
    )
  }

  if (kind === 'tape-right') {
    return (
      <span
        aria-hidden="true"
        className="gallery-tape -top-2.5 right-6 rotate-6"
      />
    )
  }

  if (kind === 'tape-center') {
    return (
      <span
        aria-hidden="true"
        className="gallery-tape -top-3 left-1/2 -translate-x-1/2 -rotate-1"
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className="gallery-tape -top-2.5 left-6 -rotate-6"
    />
  )
}

export default function GalleryCard({ artwork, index, onSelect }: Props) {
  const layout = LAYOUTS[index % LAYOUTS.length]

  return (
    <figure
      className={`gallery-piece group relative mb-8 break-inside-avoid sm:mb-12 ${layout.width} ${layout.offset}`}
      style={{ '--tilt': layout.tilt } as CSSProperties}
    >
      <button
        type="button"
        onClick={() => onSelect(artwork)}
        aria-label={`查看作品：${artwork.title}`}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-vermilion-500/70 focus-visible:ring-offset-4 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-ink-950"
      >
        <span className="relative block">
          <ResponsiveImage
            src={artwork.image}
            alt={artwork.title}
            sizes="(min-width: 640px) 48vw, 96vw"
            loading={index < 2 ? 'eager' : 'lazy'}
            className="gallery-photo block h-auto w-full select-none rounded-none"
          />
          <PinOrTape kind={layout.decoration} />
        </span>

        <span className="mt-3 block px-1">
          <span className="flex items-baseline justify-between gap-3">
            <span className="gallery-title font-accent text-base leading-snug text-ink-600 transition-colors duration-300 group-hover:text-ink-900 dark:text-ink-300 dark:group-hover:text-ink-50 sm:text-lg">
              {artwork.title}
            </span>
            <span className="shrink-0 font-mono text-[10px] tracking-wider text-ink-400 dark:text-ink-500">
              {artwork.date}
            </span>
          </span>
          <span className="mt-0.5 block font-accent text-xs tracking-wide text-ink-400 dark:text-ink-500">
            {artwork.medium}
          </span>
        </span>
      </button>
    </figure>
  )
}
