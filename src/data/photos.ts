export interface Photo {
  src: string
  alt: string
  caption: string
  place: string
  date: string
}

/**
 * 首页与「影」使用的照片。
 * 图注只写看见的东西，不替照片抒情。
 */
const photos: Photo[] = [
  {
    src: '/images/original/IMG_7595.JPG',
    alt: '黄昏的光落在树干和草地上',
    caption: '黄昏落在树干上',
    place: '南开园',
    date: '二〇二六年十月',
  },
  {
    src: '/images/original/IMG_7604.JPG',
    alt: '树干上挂着一块榆树的蓝色名牌',
    caption: '榆树的名牌',
    place: '南开园',
    date: '二〇二六年十月',
  },
  {
    src: '/images/original/IMG_7538.JPG',
    alt: '一整面墙爬满红黄相间的秋叶',
    caption: '爬墙的秋色',
    place: '南开园',
    date: '二〇二六年十月',
  },
  {
    src: '/images/original/IMG_7502.JPG',
    alt: '一只三花猫沿着红砖路走远',
    caption: '不与人打招呼的猫',
    place: '南开园',
    date: '二〇二六年十月',
  },
  {
    src: '/images/original/IMG_7525.JPG',
    alt: '夕照和树影落在物美超市的红砖墙上',
    caption: '物美超市，树影',
    place: '南开园',
    date: '二〇二六年十月',
  },
  {
    src: '/images/original/IMG_7535.JPG',
    alt: '红砖上有人划下过字迹',
    caption: '砖上写过的字',
    place: '南开园',
    date: '二〇二六年十月',
  },
]

export default photos
