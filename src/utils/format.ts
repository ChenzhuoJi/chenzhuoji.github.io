const CN_DIGITS = '〇一二三四五六七八九'

/** 2026 → 二〇二六（逐位读，用于年份） */
export function chineseYear(year: number): string {
  return String(year)
    .split('')
    .map((d) => CN_DIGITS[Number(d)] ?? d)
    .join('')
}

/** 1 → 一，10 → 十，22 → 二十二 */
export function chineseNumber(n: number): string {
  if (n <= 0) return CN_DIGITS[0]
  if (n < 10) return CN_DIGITS[n]
  if (n === 10) return '十'
  if (n < 20) return `十${CN_DIGITS[n % 10]}`
  if (n < 100) {
    const tens = Math.floor(n / 10)
    const ones = n % 10
    return `${CN_DIGITS[tens]}十${ones ? CN_DIGITS[ones] : ''}`
  }
  return String(n)
}

export interface ChineseDate {
  year: string
  monthDay: string
  full: string
  short: string
  valid: boolean
}

export function chineseDate(iso: string): ChineseDate {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) {
    return { year: '', monthDay: '', full: '', short: '', valid: false }
  }
  const year = chineseYear(y)
  const monthDay = `${chineseNumber(m)}月${chineseNumber(d)}日`
  return {
    year,
    monthDay,
    full: `${year}年${monthDay}`,
    short: `${String(m).padStart(2, '0')}.${String(d).padStart(2, '0')}`,
    valid: true,
  }
}

export function shortDate(iso: string): string {
  return chineseDate(iso).short || iso
}

/** 此刻在天津。返回已经拆好的日期和时辰。 */
export function getClock(timeZone = 'Asia/Shanghai') {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0'
  const year = Number(get('year'))
  const month = Number(get('month'))
  const day = Number(get('day'))
  const hour = Number(get('hour'))
  const minute = get('minute')

  return {
    year,
    month,
    day,
    hour,
    minute,
    iso: `${year}-${get('month')}-${get('day')}`,
    time: `${String(hour).padStart(2, '0')}:${minute}`,
    yearLabel: chineseYear(year),
    monthDayLabel: `${chineseNumber(month)}月${chineseNumber(day)}日`,
    phase: phaseOfDay(hour),
  }
}

export function phaseOfDay(hour: number): string {
  if (hour < 5) return '夜深'
  if (hour < 7) return '天将亮'
  if (hour < 9) return '清晨'
  if (hour < 11) return '上午'
  if (hour < 13) return '日影正中'
  if (hour < 16) return '午后'
  if (hour < 18) return '日影偏西'
  if (hour < 20) return '日暮'
  if (hour < 23) return '入夜'
  return '夜深'
}

/** 去掉 Markdown 里的壳，只留下能读的字。 */
export function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<div[\s\S]*?<\/div>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$]*\$/g, ' ')
    .replace(/^\s*\|.*\|\s*$/gm, ' ')
    .replace(/^\s*[-:| ]{3,}\s*$/gm, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_~`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** 截一段，尽量停在标点后面。 */
export function excerpt(markdown: string, max = 96): string {
  const text = toPlainText(markdown)
  if (!text) return ''
  if (text.length <= max) return text

  const slice = text.slice(0, max)
  const stop = Math.max(
    slice.lastIndexOf('。'),
    slice.lastIndexOf('！'),
    slice.lastIndexOf('？'),
    slice.lastIndexOf('；'),
    slice.lastIndexOf('，'),
  )
  return stop > max * 0.45 ? slice.slice(0, stop + 1) : `${slice}…`
}
