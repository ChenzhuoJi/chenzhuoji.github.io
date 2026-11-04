import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import artworks from '../data/artworks'
import photos from '../data/photos'
import { site } from '../data/site'
import ResponsiveImage from '../components/ResponsiveImage'
import GalleryLightbox from '../components/GalleryLightbox'
import type { Artwork } from '../types'

const photoItems: Artwork[] = photos.map((photo, index) => ({
  id: `photo-${index + 1}`,
  title: photo.caption,
  image: photo.src,
  medium: photo.place,
  date: photo.date,
}))

export default function Gallery() {
  const [selected, setSelected] = useState<Artwork | null>(null)

  const items = useMemo(() => [...photoItems, ...artworks], [])
  const photoCount = photos.length
  const artCount = artworks.length

  return (
    <div className="page">
      <Helmet>
        <title>{`Gallery · ${site.name}`}</title>
        <meta name="description" content="照片与画。摄影也许有两个目的，一个是捕捉瞬间，一个是记录日常。" />
      </Helmet>

      <div className="page-body">
          <header className="page-head">
            <h1 className="page-title">Gallery</h1>
          </header>

          <section className="gallery-section">
            <div className="gallery-section-head">
              <h2>照片</h2>
              <span>
                {photoCount} 帧 · 2026.10 · 南开园
              </span>
            </div>

            <div className="photo-grid">
              {photos.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  className="photo-item"
                  onClick={() => setSelected(photoItems[index])}
                  aria-label={`查看照片：${photo.caption}`}
                >
                  <ResponsiveImage
                    src={photo.src}
                    alt={photo.alt}
                    sizes="(min-width: 900px) 340px, (min-width: 640px) 44vw, 100vw"
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                  <span className="photo-caption">
                    <span>
                      <span className="idx">{String(index + 1).padStart(2, '0')}</span>
                      　{photo.caption}
                    </span>
                    <span className="photo-place">{photo.place}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="gallery-section">
            <div className="gallery-section-head">
              <h2>画</h2>
              <span>{artCount} 幅</span>
            </div>

            <div className="art-grid">
              {artworks.map((art, index) => (
                <button
                  key={art.id}
                  type="button"
                  className="art-item"
                  onClick={() => setSelected(art)}
                  aria-label={`查看画作：${art.title}`}
                >
                  <ResponsiveImage
                    src={art.image}
                    alt={art.title}
                    sizes="(min-width: 900px) 340px, (min-width: 640px) 44vw, 100vw"
                    loading="lazy"
                  />
                  <span className="art-caption">
                    <span>
                      <span className="idx">{String(index + 1).padStart(2, '0')}</span>
                      　{art.title}
                    </span>
                    <span>{art.medium}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <div className="section-link-row">
            <Link to="/posts">笔记</Link>
            <Link to="/reading">阅读</Link>
          </div>
      </div>

      <GalleryLightbox
        items={items}
        artwork={selected}
        onClose={() => setSelected(null)}
        onSelect={setSelected}
      />
    </div>
  )
}
