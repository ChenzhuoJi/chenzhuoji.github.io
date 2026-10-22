#!/usr/bin/env node
/**
 * 图片优化：把 public/images 下的原始照片转成多尺寸 WebP
 *
 * 用法：
 *   node scripts/optimize-images.mjs            # 生成/更新变体 + 清单
 *   node scripts/optimize-images.mjs --prune    # 构建后从 dist 删除原始大图
 *
 * 设计：
 * - Markdown 里仍然写 /images/original/xxx.JPG，渲染时由 ResponsiveImage 查清单换成变体
 * - 变体输出到 public/images/opt/，文件名带内容哈希，改图即换名，缓存自然失效
 * - 清单是生成产物（src/data/image-manifest.json），记录原图尺寸与可用变体
 * - 只处理比目标尺寸大的图，不放大；EXIF 方向会摆正，元数据（含 GPS）默认剥除
 */
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { readdir, readFile, writeFile, mkdir, unlink, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const IMAGES_DIR = path.join(ROOT, 'public/images')
const OUT_DIR = path.join(IMAGES_DIR, 'opt')
const OUT_URL = '/images/opt'
const MANIFEST_FILE = path.join(ROOT, 'src/data/image-manifest.json')
const WIDTHS = [480, 960, 1600, 2048]
const MAX_WIDTH = WIDTHS[WIDTHS.length - 1]
const QUALITY = 78
const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

const prune = process.argv.includes('--prune')

function mb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function toSlug(relative) {
  return relative
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

async function walk(dir, base = dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    const rel = path.relative(base, full)
    if (entry.isDirectory()) {
      if (rel === 'opt') continue
      await walk(full, base, out)
    } else {
      out.push({ file: full, rel: rel.split(path.sep).join('/') })
    }
  }
  return out
}

async function isEmptyDir(dir) {
  try {
    return (await readdir(dir)).length === 0
  } catch {
    return false
  }
}

async function pruneDist(manifest) {
  const distImages = path.join(ROOT, 'dist/images')
  if (!existsSync(distImages)) {
    console.warn('[images] 没有 dist/images，跳过清理')
    return
  }

  let removed = 0
  let freed = 0
  for (const url of Object.keys(manifest)) {
    const file = path.join(ROOT, 'dist', url.replace(/^\//, ''))
    if (!existsSync(file)) continue
    freed += (await stat(file)).size
    await unlink(file)
    removed++
  }

  // 自底向上清理空目录（保留 opt）
  const dirs = []
  async function collect(dir) {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const full = path.join(dir, entry.name)
        if (path.relative(distImages, full) === 'opt') continue
        dirs.push(full)
        await collect(full)
      }
    }
  }
  await collect(distImages)
  for (const dir of dirs.reverse()) {
    if (await isEmptyDir(dir)) await rm(dir, { recursive: true, force: true })
  }

  console.log(`[images] 已从 dist 移除 ${removed} 张原图，节省 ${mb(freed)}（页面改用 WebP 变体）`)
}

async function main() {
  if (prune) {
    const manifest = JSON.parse(await readFile(MANIFEST_FILE, 'utf8'))
    await pruneDist(manifest)
    return
  }

  if (!existsSync(IMAGES_DIR)) {
    console.log('[images] 没有 public/images，跳过')
    return
  }

  await mkdir(OUT_DIR, { recursive: true })
  await mkdir(path.dirname(MANIFEST_FILE), { recursive: true })

  const files = (await walk(IMAGES_DIR)).filter(({ rel }) =>
    SUPPORTED.has(path.extname(rel).toLowerCase()),
  )

  const manifest = {}
  const expected = new Set()
  let encoded = 0
  let skipped = 0
  let sourceBytes = 0
  let outputBytes = 0
  let failed = 0

  for (const { file, rel } of files) {
    const url = `/images/${rel}`
    const buffer = await readFile(file)

    // Git LFS 指针文件（未执行 git lfs pull）会被当成图片解析失败
    if (buffer.length < 512 && buffer.toString('utf8').includes('git-lfs')) {
      console.warn(`[images] ${rel} 是 Git LFS 指针，请先执行 git lfs pull`)
      failed++
      continue
    }

    let meta
    try {
      meta = await sharp(buffer).metadata()
    } catch (error) {
      console.warn(`[images] 无法解析 ${rel}: ${error.message}`)
      failed++
      continue
    }

    const oriented = [5, 6, 7, 8].includes(meta.orientation ?? 1)
    const width = oriented ? meta.height : meta.width
    const height = oriented ? meta.width : meta.height
    if (!width || !height) {
      console.warn(`[images] ${rel} 缺少尺寸信息，跳过`)
      failed++
      continue
    }

    const hash = createHash('sha1').update(buffer).digest('hex').slice(0, 8)
    const slug = toSlug(rel)
    const targets = [...new Set([...WIDTHS.filter((w) => w < width), Math.min(width, MAX_WIDTH)])]
      .sort((a, b) => a - b)

    const variants = []
    for (const target of targets) {
      const name = `${slug}-${hash}-${target}.webp`
      const outFile = path.join(OUT_DIR, name)
      expected.add(name)

      let info
      if (existsSync(outFile)) {
        info = await sharp(outFile).metadata()
        skipped++
      } else {
        info = await sharp(buffer)
          .rotate()
          .resize({ width: target, withoutEnlargement: true })
          .webp({ quality: QUALITY, effort: 4 })
          .toFile(outFile)
        encoded++
      }

      variants.push({ w: info.width, h: info.height, src: `${OUT_URL}/${name}` })
      outputBytes += (await stat(outFile)).size
    }

    sourceBytes += buffer.length
    manifest[url] = { width, height, variants }
  }

  // 删除已不再需要的旧变体
  const existing = await readdir(OUT_DIR)
  let removed = 0
  for (const name of existing) {
    if (expected.has(name)) continue
    await unlink(path.join(OUT_DIR, name))
    removed++
  }

  const ordered = Object.fromEntries(Object.keys(manifest).sort().map((key) => [key, manifest[key]]))
  const json = `${JSON.stringify(ordered, null, 2)}\n`
  const previous = existsSync(MANIFEST_FILE) ? await readFile(MANIFEST_FILE, 'utf8') : ''
  if (previous !== json) await writeFile(MANIFEST_FILE, json)

  console.log(
    `[images] ${files.length} 张原图 · 新增/更新 ${encoded} 个变体 · 复用 ${skipped} 个` +
      (removed ? ` · 清理 ${removed} 个旧文件` : '') +
      (failed ? ` · 失败 ${failed} 张` : ''),
  )
  console.log(`[images] 原图 ${mb(sourceBytes)} → WebP 变体合计 ${mb(outputBytes)}`)
}

main().catch((error) => {
  console.error('[images] 优化失败:', error)
  process.exitCode = 1
})
