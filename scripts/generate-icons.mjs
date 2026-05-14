import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { deflateSync } from 'zlib'

function createPNG(size, r, g, b) {
  const rawData = Buffer.alloc(size * (size * 4 + 1))
  for (let y = 0; y < size; y++) {
    const rowOffset = y * (size * 4 + 1)
    rawData[rowOffset] = 0
    for (let x = 0; x < size; x++) {
      const po = rowOffset + 1 + x * 4
      rawData[po] = r
      rawData[po + 1] = g
      rawData[po + 2] = b
      rawData[po + 3] = 255
    }
  }

  const compressed = deflateSync(rawData)
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
    const t = Buffer.from(type, 'ascii')
    const crcInput = Buffer.concat([t, data])
    let crc = 0xFFFFFFFF
    for (let i = 0; i < crcInput.length; i++) {
      crc ^= crcInput[i]
      for (let j = 0; j < 8; j++) crc = crc & 1 ? (crc >>> 1) ^ 0xEDB88320 : crc >>> 1
    }
    const crcB = Buffer.alloc(4); crcB.writeUInt32BE((crc ^ 0xFFFFFFFF) >>> 0)
    return Buffer.concat([len, t, data, crcB])
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8; ihdr[9] = 6

  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', compressed), chunk('IEND', Buffer.alloc(0))])
}

const outDir = 'public'
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const themeColor = { r: 42, g: 37, b: 32 }

writeFileSync(`${outDir}/pwa-192x192.png`, createPNG(192, themeColor.r, themeColor.g, themeColor.b))
writeFileSync(`${outDir}/pwa-512x512.png`, createPNG(512, themeColor.r, themeColor.g, themeColor.b))

console.log('Icons generated successfully!')
