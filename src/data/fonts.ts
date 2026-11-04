/**
 * 字体配置 — 与 src/index.css 的 --font-* 变量保持一致。
 *
 * 双黑体方案：展示字 Montserrat Alternates（标题、按钮、导航），
 * 正文字 IBM Plex Sans（阅读内容，转角更利落、不圆）。
 * 中文都退到系统黑体，等宽字体只用于代码。
 */

const SANS_CJK =
  '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", "Noto Sans CJK SC", "Source Han Sans SC", "WenQuanYi Micro Hei"'

const DISPLAY = `"Montserrat Alternates", ${SANS_CJK}, system-ui, -apple-system, sans-serif`
const TEXT = `"IBM Plex Sans", ${SANS_CJK}, system-ui, -apple-system, sans-serif`

export const fonts = {
  /** 标题：展示字 */
  heading: DISPLAY,
  /** 正文：阅读体 */
  body: TEXT,

  /** UI：导航、按钮、标签 */
  ui: DISPLAY,

  /** 等宽：日期、编号、代码 */
  mono:
    '"JetBrains Mono", "Menlo", "Consolas", "Noto Sans Mono CJK SC", ui-monospace, SFMono-Regular, monospace',

  /** 引用与按语：与正文同族，靠奶油底卡片区分，不倾斜 */
  quote: TEXT,

  /** 旧组件别名：按展示字处理 */
  accent: DISPLAY,
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
