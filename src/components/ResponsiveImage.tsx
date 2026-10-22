import type { ImgHTMLAttributes } from 'react'
import manifest from '../data/image-manifest.json'

type Variant = { w: number; h: number; src: string }
type Entry = { width: number; height: number; variants: Variant[] }

// 由 scripts/optimize-images.mjs 在 dev/build 前生成
const images = manifest as Record<string, Entry>

function lookup(src: string): Entry | undefined {
  if (!src.startsWith('/images/')) return undefined
  return images[src.split(/[?#]/)[0]]
}

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes'> {
  src: string
  sizes?: string
}

/**
 * 响应式图片：用构建期生成的 WebP 变体替换原图。
 * 清单里没有的地址（外链、SVG 等）原样输出。
 */
export default function ResponsiveImage({
  src,
  alt = '',
  sizes = '(min-width: 768px) 768px, 100vw',
  loading = 'lazy',
  decoding = 'async',
  ...rest
}: Props) {
  const entry = lookup(src)

  if (!entry || entry.variants.length === 0) {
    return <img src={src} alt={alt} sizes={sizes} loading={loading} decoding={decoding} {...rest} />
  }

  const largest = entry.variants[entry.variants.length - 1]

  return (
    <img
      {...rest}
      src={largest.src}
      srcSet={entry.variants.map((v) => `${v.src} ${v.w}w`).join(', ')}
      sizes={sizes}
      width={rest.width ?? entry.width}
      height={rest.height ?? entry.height}
      alt={alt}
      loading={loading}
      decoding={decoding}
    />
  )
}
