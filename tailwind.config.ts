import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f8f7f4',
          100: '#efede8',
          200: '#ddd9cf',
          300: '#c4bca9',
          400: '#aba082',
          500: '#9b8d6d',
          600: '#8d7d5f',
          700: '#756651',
          800: '#5f5346',
          900: '#4e453b',
          950: '#2a2520',
        },
        vermilion: {
          50: '#fef3ee',
          100: '#fde4d7',
          200: '#fac5ae',
          300: '#f69e7b',
          400: '#f17147',
          500: '#ed5529',
          600: '#de3d1a',
          700: '#b82d16',
          800: '#932718',
          900: '#772317',
          950: '#400f0a',
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"', '"Noto Sans JP"', '"Hiragino Sans GB"',
          '"Microsoft YaHei"', 'system-ui', '-apple-system', 'sans-serif',
        ],
        serif: [
          '"Noto Serif SC"', '"Noto Serif JP"', '"Source Han Serif SC"',
          '"STSong"', 'Georgia', 'serif',
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
