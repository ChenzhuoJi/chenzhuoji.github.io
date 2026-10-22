import type { Config } from 'tailwindcss'

/**
 * ═══════════════════════════════════════════════════════════════
 * 字体配置入口：src/data/fonts.ts
 * 修改字体后请同步更新：
 *   1. tailwind.config.ts  fontFamily  ↓  此处
 *   2. src/index.css       --font-* CSS 变量
 *   3. src/fonts.css       自托管英文字体 @font-face
 * ═══════════════════════════════════════════════════════════════
 *
 * 英文自托管于 public/fonts/，中文使用系统字体，无 Google Fonts 外链。
 *
 * 当前映射：
 *   font-heading → Open Sans（自托管西文）+ 系统黑体（中文）
 *   font-body    → 系统宋体（正文阅读）
 *   font-sans    → Open Sans + 系统黑体（通用无衬线）
 *   font-serif   → 系统宋体（通用衬线）
 *   font-mono    → JetBrains Mono（自托管）
 *   font-ui      → Open Sans + 系统黑体（界面元素）
 *   font-accent  → 系统楷体 + 霞鹜文楷（装饰）
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
          50: '#FEF2F3',
          100: '#FDE2E4',
          200: '#FAC6CA',
          300: '#F39AA1',
          400: '#EA6572',
          500: '#D8384C',
          600: '#C8102E',
          700: '#A60E27',
          800: '#891023',
          900: '#731122',
          950: '#40060E',
        },
        paper: {
          DEFAULT: '#FBFAF7',
          100: '#FBFAF7',
          200: '#F3F1EC',
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
        /** 通用无衬线: Open Sans（自托管）+ 系统中文字体 */
        sans: [
          '"Open Sans"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"',
          '"Noto Sans SC"', '"Source Han Sans SC"', '"WenQuanYi Micro Hei"',
          'system-ui', '-apple-system', 'sans-serif',
        ],
        /** 通用衬线: 系统中文字体 */
        serif: [
          '"Noto Serif SC"', '"Source Han Serif SC"', '"Songti SC"',
          '"STSong"', '"SimSun"', '"PingFang SC"', '"Microsoft YaHei"',
          'Georgia', 'serif',
        ],
        /** 标题: Open Sans（自托管）+ 系统中文字体 */
        heading: [
          '"Open Sans"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"',
          '"Noto Sans CJK SC"', '"Source Han Sans SC"', '"WenQuanYi Micro Hei"',
          'system-ui', '-apple-system', 'sans-serif',
        ],
        /** 正文: 系统中文字体 */
        body: [
          '"Noto Serif CJK SC"', '"Source Han Serif SC"', '"Songti SC"',
          '"STSong"', '"SimSun"', '"PingFang SC"', '"Microsoft YaHei"',
          'Georgia', 'serif',
        ],
        /** UI 元素: Open Sans（自托管）+ 系统中文字体 */
        ui: [
          '"Open Sans"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"',
          '"Noto Sans SC"', '"Source Han Sans SC"', '"WenQuanYi Micro Hei"',
          'system-ui', '-apple-system', 'sans-serif',
        ],
        /** 等宽: JetBrains Mono（自托管） */
        mono: [
          '"JetBrains Mono"', '"Menlo"', '"Consolas"', '"Noto Sans Mono SC"',
          'ui-monospace', 'SFMono-Regular', 'monospace',
        ],
        /** 装饰/引用/描述: 系统楷体 */
        accent: [
          '"LXGW WenKai"', '"Kaiti SC"', '"STKaiti"', '"KaiTi"',
          '"Noto Serif SC"', '"Songti SC"', 'serif',
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            fontSize: '1.3rem',
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
