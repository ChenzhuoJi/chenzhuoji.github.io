/**
 * 字体配置 — 与 src/index.css 的 --font-* 变量保持一致。
 *
 * 宋体负责标题与正文，仿宋负责引用与按语（缺字退到黑体），
 * 黑体用于导航、日期和按钮，等宽字体负责所有数字与边注。
 */

const SANS_CJK =
  '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", "Noto Sans CJK SC", "Source Han Sans SC", "WenQuanYi Micro Hei"'
const SERIF_CJK =
  '"Noto Serif SC", "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", "STSong", "SimSun"'

const SANS = `"Open Sans", ${SANS_CJK}, system-ui, -apple-system, sans-serif`
const QUOTE_CJK =
  '"FangSong", "STFangsong", "FangSong_GB2312", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Source Han Sans SC", "WenQuanYi Micro Hei"'

export const fonts = {
  /** 标题与正文：宋体 */
  heading: `${SERIF_CJK}, serif`,
  body: `${SERIF_CJK}, serif`,

  /** UI：导航、按钮、标签 */
  ui: SANS,

  /** 等宽：日期、编号、代码 */
  mono:
    '"JetBrains Mono", "Menlo", "Consolas", "Noto Sans Mono CJK SC", ui-monospace, SFMono-Regular, monospace',

  /**
   * 引用与按语：仿宋优先；系统没有仿宋时退到黑体，
   * 无论哪种情况都不会和正文宋体混同。不做倾斜。
   */
  quote: `"Open Sans", ${QUOTE_CJK}, system-ui, sans-serif`,

  /** 旧组件别名：仍按宋体处理 */
  accent: `${SERIF_CJK}, serif`,
} as const

/** Tailwind fontFamily 的 theme.extend 格式 */
export const tailwindFonts = {
  sans: fonts.ui.split(', '),
  serif: fonts.body.split(', '),
  heading: fonts.heading.split(', '),
  body: fonts.body.split(', '),
  ui: fonts.ui.split(', '),
  mono: fonts.mono.split(', '),
  quote: fonts.quote.split(', '),
  accent: fonts.accent.split(', '),
}
