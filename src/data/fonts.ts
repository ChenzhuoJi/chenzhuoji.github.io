/**
 * 字体配置 — 修改此处即可全局更换字体
 *
 * 每条 font stack 中：
 *   西文字体放在前面（浏览器优先匹配）
 *   中文字体放在后面（西文不支持时自动回退）
 *   最后放通用 fallback（serif / sans-serif / monospace）
 *
 * 字体来源：
 *   英文（Open Sans / JetBrains Mono）→ 自托管于 public/fonts/，声明见 src/fonts.css
 *   中文                                → 使用系统字体（PingFang SC / 微软雅黑 / 思源宋体等）
 *   已移除 Google Fonts 外链（见 index.html）
 * 添加/更换英文字体后，同步更新 src/fonts.css 与 public/fonts/
 *
 * 当前配置：
 *   标题 → Open Sans（西文）+ 系统黑体（中文）
 *   正文 → 系统宋体（中+西）
 *   UI   → Open Sans（西文）+ 系统黑体（中文）
 *   等宽 → JetBrains Mono
 */

const SANS_CJK =
  '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", "WenQuanYi Micro Hei"'
const SERIF_CJK =
  '"Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", "STSong", "SimSun", "PingFang SC", "Microsoft YaHei"'
const ACCENT_CJK = '"Kaiti SC", "STKaiti", "KaiTi", "Noto Serif CJK SC", "Songti SC"'

export const fonts = {
  /** 标题：文章标题 h1–h4，西文 Open Sans + 系统黑体 */
  heading: `"Open Sans", ${SANS_CJK}, system-ui, -apple-system, sans-serif`,

  /** 正文：文章段落长文阅读，系统宋体（衬线） */
  body: `${SERIF_CJK}, Georgia, serif`,

  /** UI：导航、按钮、标签，西文 Open Sans + 系统黑体 */
  ui: `"Open Sans", ${SANS_CJK}, system-ui, -apple-system, sans-serif`,

  /** 等宽：代码块、数字 */
  mono:
    '"JetBrains Mono", "Menlo", "Consolas", "Noto Sans Mono CJK SC", ui-monospace, SFMono-Regular, monospace',

  /** 装饰：引用块、特殊强调，系统楷体 */
  accent: `"LXGW WenKai", ${ACCENT_CJK}, serif`,
} as const

/** Tailwind fontFamily 的 theme.extend 格式 */
export const tailwindFonts = {
  sans: fonts.heading.split(', '),
  serif: fonts.body.split(', '),
  heading: fonts.heading.split(', '),
  body: fonts.body.split(', '),
  ui: fonts.ui.split(', '),
  mono: fonts.mono.split(', '),
  accent: fonts.accent.split(', '),
}
