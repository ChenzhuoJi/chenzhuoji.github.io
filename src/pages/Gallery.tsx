import { useState } from 'react'
import { Link } from 'react-router-dom'
import artworks from '../data/artworks'
import GalleryCard from '../components/GalleryCard'
import GalleryLightbox from '../components/GalleryLightbox'

export default function Gallery() {
  const [selected, setSelected] = useState<typeof artworks[number] | null>(null)

  return (
    <div>
      <section className="mb-10 animate-[fade-up_0.6s_ease-out]">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          首页
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-ink-900 dark:text-ink-100">
          画廊
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-grow border-t border-ink-200 dark:border-ink-700" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-vermilion-500 dark:text-vermilion-400">
            GALLERY
          </span>
          <div className="flex-grow border-t border-ink-200 dark:border-ink-700" />
        </div>
        <p className="mt-4 text-sm text-ink-400 dark:text-ink-500 leading-relaxed">
          日常绘画练习与实验
        </p>
      </section>

      {artworks.length === 0 ? (
        <p className="text-center py-16 text-ink-400 dark:text-ink-500 text-sm">
          暂无作品
        </p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {artworks.map((art, i) => (
            <GalleryCard
              key={art.id}
              artwork={art}
              index={i}
              onSelect={setSelected}
            />
          ))}
        </div>
      )}

      <GalleryLightbox
        artwork={selected}
        artworks={artworks}
        onClose={() => setSelected(null)}
        onSelect={setSelected}
      />
    </div>
  )
}
