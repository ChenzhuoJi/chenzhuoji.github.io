import type { Config } from 'tailwindcss'

/**
 * 配色与字体以 src/index.css 中的 CSS 变量为准，
 * 这里只保留旧组件可能用到的同名色阶，数值与新版纸墨色一致。
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#FBFAF6',
          100: '#F3EFE5',
          200: '#E5DFD2',
          300: '#D2CABA',
          400: '#A9A194',
          500: '#827B6E',
          600: '#625C51',
          700: '#46423A',
          800: '#2C2A24',
          900: '#1E1D19',
          950: '#121210',
        },
        paper: {
          DEFAULT: '#F6F3EB',
          100: '#F6F3EB',
          200: '#EFEADF',
        },
        pine: {
          50: '#EEF3EF',
          100: '#DCE6DF',
          200: '#BACDBF',
          300: '#93AE9C',
          400: '#6F8E7B',
          500: '#536F5E',
          600: '#435B4D',
          700: '#364A3F',
          800: '#2C3C33',
          900: '#233029',
          950: '#111A15',
        },
        clay: {
          50: '#FBF3F0',
          100: '#F6E4DE',
          200: '#EBC8BE',
          300: '#DFA797',
          400: '#C78672',
          500: '#B06655',
          600: '#9B4F3F',
          700: '#833D2F',
          800: '#6B3327',
          900: '#582B22',
          950: '#2E130D',
        },
        vermilion: {
          50: '#FBF3F0',
          100: '#F6E4DE',
          200: '#EBC8BE',
          300: '#DFA797',
          400: '#C78672',
          500: '#B06655',
          600: '#9B4F3F',
          700: '#833D2F',
          800: '#6B3327',
          900: '#582B22',
          950: '#2E130D',
        },
        frost: {
          50: '#EEF3EF',
          100: '#DCE6DF',
          200: '#BACDBF',
          300: '#93AE9C',
          400: '#6F8E7B',
          500: '#536F5E',
          600: '#435B4D',
          700: '#364A3F',
          800: '#2C3C33',
          900: '#233029',
          950: '#111A15',
        },
      },
      fontFamily: {
        serif: [
          '"Noto Serif SC"', '"Noto Serif CJK SC"', '"Source Han Serif SC"',
          '"Songti SC"', '"STSong"', '"SimSun"', 'serif',
        ],
        sans: [
          '"Open Sans"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"',
          '"Noto Sans SC"', '"Source Han Sans SC"', '"WenQuanYi Micro Hei"',
          'system-ui', '-apple-system', 'sans-serif',
        ],
        heading: [
          '"Noto Serif SC"', '"Noto Serif CJK SC"', '"Source Han Serif SC"',
          '"Songti SC"', '"STSong"', '"SimSun"', 'serif',
        ],
        body: [
          '"Noto Serif SC"', '"Noto Serif CJK SC"', '"Source Han Serif SC"',
          '"Songti SC"', '"STSong"', '"SimSun"', 'serif',
        ],
        ui: [
          '"Open Sans"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"',
          '"Noto Sans SC"', '"Source Han Sans SC"', '"WenQuanYi Micro Hei"',
          'system-ui', '-apple-system', 'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"', '"Menlo"', '"Consolas"', '"Noto Sans Mono SC"',
          'ui-monospace', 'SFMono-Regular', 'monospace',
        ],
        quote: [
          '"KaiTi"', '"FangSong"', '"STFangsong"', '"FangSong_GB2312"',
          '"Noto Sans SC"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"',
          '"Source Han Sans SC"', '"WenQuanYi Micro Hei"', 'system-ui', 'sans-serif',
        ],
        accent: [
          '"Noto Serif SC"', '"Noto Serif CJK SC"', '"Songti SC"', 'serif',
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            fontFamily: 'var(--font-serif)',
            h1: { fontFamily: 'var(--font-serif)' },
            h2: { fontFamily: 'var(--font-serif)' },
            h3: { fontFamily: 'var(--font-serif)' },
            h4: { fontFamily: 'var(--font-serif)' },
            blockquote: { fontFamily: 'var(--font-quote)', fontStyle: 'normal' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
