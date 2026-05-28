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
          50: '#FFFFFF',
          100: '#F6F7F9',
          200: '#E6E8EC',
          300: '#D0D3D9',
          400: '#A8ADB7',
          500: '#838996',
          600: '#636A78',
          700: '#4A5160',
          800: '#323949',
          900: '#1C2230',
          950: '#0C0F16',
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
        frost: {
          50: '#F0F5FF',
          100: '#E3EBFA',
          200: '#C7D6F0',
          300: '#A5BAE0',
          400: '#809BC9',
          500: '#5F7DB0',
          600: '#4A6395',
          700: '#3A4E7A',
          800: '#2D3B5E',
          900: '#1F2A45',
          950: '#12192E',
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
        /** 装饰/引用/描述: 霞鹜文楷 + 思源宋体 */
        accent: [
          '"LXGW WenKai"', '"Noto Serif CJK SC"', '"Noto Serif SC"', '"KaiTi"',
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
