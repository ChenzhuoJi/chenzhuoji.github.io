/**
 * 字体配置 — 修改此处即可全局更换字体
 *
 * 每条 font stack 中：
 *   西文字体放在前面（浏览器优先匹配）
 *   中文字体放在后面（西文不支持时自动回退）
 *   最后放通用 fallback（serif / sans-serif / monospace）
 *
 * Google Fonts 加载地址见 index.html 中的 <link> 标签
 * 添加/更换字体后，同步更新 index.html 中的 Google Fonts 链接
 *
 * 当前配置：
 *   标题 → Open Sans（西文）+ 思源黑体（中文）
 *   正文 → 思源宋体（中+西）
 *   UI   → Open Sans（西文）+ 思源黑体（中文）
 *   等宽 → JetBrains Mono
 */

export const fonts = {
  /** 标题：文章标题 h1–h4，西文 Open Sans + 中文 思源黑体 */
  heading:
    '"Open Sans", "Noto Sans CJK SC", "Noto Sans SC", "Noto Sans JP", system-ui, -apple-system, sans-serif',

  /** 正文：文章段落长文阅读，思源宋体（衬线） */
  body:
    '"Noto Serif CJK SC", "Noto Serif SC", "Noto Serif JP", "Source Han Serif SC", "STSong", Georgia, serif',

  /** UI：导航、按钮、标签，西文 Open Sans + 中文 思源黑体 */
  ui:
    '"Open Sans", "Noto Sans CJK SC", "Noto Sans SC", "Noto Sans JP", system-ui, -apple-system, sans-serif',

  /** 等宽：代码块、数字 */
  mono:
    '"JetBrains Mono", "Noto Sans Mono SC", "Fira Code", ui-monospace, SFMono-Regular, monospace',

  /** 装饰：引用块、特殊强调 */
  accent:
    '"Noto Serif CJK SC", "Noto Serif SC", "LXGW WenKai", "KaiTi", serif',
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
