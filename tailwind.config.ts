import type { Config } from 'tailwindcss'

/**
 * ═══════════════════════════════════════════════════════════════
 * 字体配置入口：src/data/fonts.ts
 * 修改字体后请同步更新：
 *   1. tailwind.config.ts  fontFamily  ↓  此处
 *   2. index.html           Google Fonts <link> 标签
 * ═══════════════════════════════════════════════════════════════
 *
 * 当前映射：
 *   font-heading → Open Sans（西文）+ 思源黑体（中文）
 *   font-body    → 思源宋体（正文阅读）
 *   font-sans    → Open Sans + 思源黑体（通用无衬线）
 *   font-serif   → 思源宋体（通用衬线）
 *   font-mono    → JetBrains Mono
 *   font-ui      → Open Sans + 思源黑体（界面元素）
 *   font-accent  → 思源宋体 + 霞鹜文楷（装饰）
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#FAFAF8',
          100: '#F0EFEA',
          200: '#E0DDD4',
          300: '#C5BFAF',
          400: '#A59D88',
          500: '#8B826C',
          600: '#736A56',
          700: '#5C5443',
          800: '#484132',
          900: '#332E22',
          950: '#1A1812',
        },
        vermilion: {
          50: '#FEF3EE',
          100: '#FDE4D7',
          200: '#FAC5AE',
          300: '#F69E7B',
          400: '#F0805C',
          500: '#E0603A',
          600: '#C04A28',
          700: '#B82D16',
          800: '#932718',
          900: '#772317',
          950: '#400F0A',
        },
      },
      fontFamily: {
        /** 通用无衬线: Open Sans + 思源黑体 */
        sans: [
          '"Open Sans"', '"Noto Sans CJK SC"', '"Noto Sans SC"', '"Noto Sans JP"',
          'system-ui', '-apple-system', 'sans-serif',
        ],
        /** 通用衬线: 思源宋体 */
        serif: [
          '"Noto Serif CJK SC"', '"Noto Serif SC"', '"Noto Serif JP"',
          '"Source Han Serif SC"', '"STSong"', 'Georgia', 'serif',
        ],
        /** 标题: Open Sans + 思源黑体（用于文章标题 h1–h4） */
        heading: [
          '"Open Sans"', '"Noto Sans CJK SC"', '"Noto Sans SC"', '"Noto Sans JP"',
          'system-ui', '-apple-system', 'sans-serif',
        ],
        /** 正文: 思源宋体（用于文章内容区） */
        body: [
          '"Noto Serif CJK SC"', '"Noto Serif SC"', '"Noto Serif JP"',
          '"Source Han Serif SC"', '"STSong"', 'Georgia', 'serif',
        ],
        /** UI 元素: Open Sans + 思源黑体 */
        ui: [
          '"Open Sans"', '"Noto Sans CJK SC"', '"Noto Sans SC"', '"Noto Sans JP"',
          'system-ui', '-apple-system', 'sans-serif',
        ],
        /** 等宽: JetBrains Mono */
        mono: [
          '"JetBrains Mono"', '"Noto Sans Mono SC"', '"Fira Code"',
          'ui-monospace', 'SFMono-Regular', 'monospace',
        ],
        /** 装饰/引用: 思源宋体 + 霞鹜文楷 */
        accent: [
          '"Noto Serif CJK SC"', '"Noto Serif SC"', '"LXGW WenKai"', '"KaiTi"',
          'serif',
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            fontFamily: 'var(--font-body)',
            h1: { fontFamily: 'var(--font-heading)' },
            h2: { fontFamily: 'var(--font-heading)' },
            h3: { fontFamily: 'var(--font-heading)' },
            h4: { fontFamily: 'var(--font-heading)' },
            blockquote: { fontFamily: 'var(--font-accent)' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
