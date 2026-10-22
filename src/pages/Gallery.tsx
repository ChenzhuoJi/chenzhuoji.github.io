import { useState } from 'react'
import { Link } from 'react-router-dom'
import artworks from '../data/artworks'
import GalleryCard from '../components/GalleryCard'
import GalleryLightbox from '../components/GalleryLightbox'

export default function Gallery() {
  const [selected, setSelected] = useState<typeof artworks[number] | null>(null)

  return (
    <div>
      <header className="relative mb-14 animate-[fade-up_0.6s_ease-out] sm:mb-20">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-accent text-sm tracking-[0.16em] text-ink-400 transition-colors hover:text-vermilion-600 dark:text-ink-500 dark:hover:text-vermilion-400"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          首页
        </Link>

        <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-2">
          <span className="relative inline-block pb-3">
            <h1 className="font-accent text-6xl leading-[0.95] text-ink-900 dark:text-ink-50 sm:text-7xl lg:text-[5.5rem]">
              画廊
            </h1>

            {/* 手绘下划线 */}
            <svg
              viewBox="0 0 200 12"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-3 w-full text-vermilion-500/70 dark:text-vermilion-400/60"
            >
              <path
                d="M3 8 Q 49 3 96 7 T 197 5"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M12 11 Q 57 7 102 10 T 188 8"
                stroke="currentColor"
                strokeWidth={0.8}
                strokeLinecap="round"
                opacity={0.35}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>

          <span className="mb-3 inline-block -rotate-6 border-2 border-double border-vermilion-500/40 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.3em] text-vermilion-600/70 dark:border-vermilion-400/30 dark:text-vermilion-400/60 sm:text-[9px]">
            Gallery
          </span>
        </div>

        {/*<p className="mt-5 max-w-xl font-accent text-base leading-relaxed tracking-[0.08em] text-ink-400 dark:text-ink-500 sm:text-lg">
          画、照片，和一些随手写下的字
        </p>*/}

        {/*<p className="absolute bottom-2 right-0 hidden max-w-[10rem] -rotate-3 text-right font-accent text-sm leading-relaxed text-ink-400 dark:text-ink-500 lg:block">
          不分门类，
          <br />
          慢慢看。
        </p>*/}
      </header>

      {artworks.length === 0 ? (
        <p className="py-16 text-center font-accent text-sm tracking-wide text-ink-400 dark:text-ink-500">
          还没有挂上作品
        </p>
      ) : (
        <>
          <div className="columns-1 gap-8 sm:columns-2 sm:gap-10 lg:gap-14">
            {artworks.map((art, index) => (
              <GalleryCard
                key={art.id}
                artwork={art}
                index={index}
                onSelect={setSelected}
              />
            ))}
          </div>

          {/* 画廊结束的小句号 */}
          <div className="mt-6 flex flex-col items-center gap-2 text-ink-400 dark:text-ink-500 sm:mt-10">
            <svg
              viewBox="0 0 44 28"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              strokeLinecap="round"
              aria-hidden="true"
              className="h-7 w-11"
            >
              <path d="M6 18c-2-8 8-13 15-11 8 2 11 10 5 14-5 3-12-1-10-7 1-4 7-6 11-3 4 2 6 6 6 10" />
              <circle cx="33" cy="21" r="1.6" fill="currentColor" stroke="none" />
            </svg>
          </div>
        </>
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
