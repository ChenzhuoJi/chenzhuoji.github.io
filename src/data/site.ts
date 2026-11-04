export const site = {
  name: 'ChenzhuoJi',
  place: '天津',
  since: 2026,
  timeZone: 'Asia/Shanghai',
  description: 'ChenzhuoJi：文章与照片。',

  /** 首页头像：换成自己的图只改这一行，建议 1:1 正方形 */
  avatar: '/images/avatar.svg',

  /** 首页头像下的链接 */
  social: [
    {
      label: 'GitHub',
      href: 'https://github.com/ChenzhuoJi/chenzhuoji.github.io',
    },
    { label: 'RSS', href: '/rss.xml' },
  ],
} as const
