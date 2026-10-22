/** 小而可复现的随机数，用来生成手绘线条的轻微抖动 */
export function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const fmt = (n: number) => Number(n.toFixed(2))

/** 用 Catmull-Rom 曲线把一圈点连成闭合曲线 */
function closedSpline(points: ReadonlyArray<readonly [number, number]>): string {
  let d = `M ${fmt(points[0][0])} ${fmt(points[0][1])}`

  for (let i = 0; i < points.length; i++) {
    const p0 = points[(i - 1 + points.length) % points.length]
    const p1 = points[i]
    const p2 = points[(i + 1) % points.length]
    const p3 = points[(i + 2) % points.length]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${fmt(c1x)} ${fmt(c1y)}, ${fmt(c2x)} ${fmt(c2y)}, ${fmt(p2[0])} ${fmt(p2[1])}`
  }

  return `${d} Z`
}

/** 近似圆形、但略带手绘歪斜的闭合路径 */
export function roughCircle(seed: number, radius = 94, wobble = 2.4, segments = 11): string {
  const rand = mulberry32(seed)
  const points = Array.from({ length: segments }, (_, i) => {
    const angle = (i / segments) * Math.PI * 2 + (rand() - 0.5) * 0.14
    const r = radius + (rand() - 0.5) * wobble * 2
    return [100 + Math.cos(angle) * r, 100 + Math.sin(angle) * r] as const
  })

  return closedSpline(points)
}

/** 四条微微弯曲、端点稍微对不齐的边，拼成一只歪歪扭扭的手绘矩形 */
export function roughRect(
  seed: number,
  x = 8,
  y = 8,
  width = 184,
  height = 284,
  jitter = 1.4,
): string {
  const rand = mulberry32(seed)
  const r = (amount = 1) => (rand() - 0.5) * jitter * 2 * amount

  const corners = [
    [x + r(), y + r()],
    [x + width + r(), y + r()],
    [x + width + r(), y + height + r()],
    [x + r(), y + height + r()],
  ] as const

  return corners
    .map(([ax, ay], i) => {
      const [bx, by] = corners[(i + 1) % 4]
      const mx = (ax + bx) / 2 + r(0.7)
      const my = (ay + by) / 2 + r(0.7)
      return `M ${fmt(ax)} ${fmt(ay)} Q ${fmt(mx)} ${fmt(my)} ${fmt(bx)} ${fmt(by)}`
    })
    .join(' ')
}

/** 一段轻微起伏的手绘直线 */
export function roughLine(seed: number, x1: number, y1: number, x2: number, y2: number, bow = 1.5): string {
  const rand = mulberry32(seed)
  const mx = (x1 + x2) / 2 + (rand() - 0.5) * bow * 2
  const my = (y1 + y2) / 2 + (rand() - 0.5) * bow * 2
  return `M ${fmt(x1)} ${fmt(y1)} Q ${fmt(mx)} ${fmt(my)} ${fmt(x2)} ${fmt(y2)}`
}
