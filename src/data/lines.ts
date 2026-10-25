export interface Line {
  text: string
  source: string
  slug: string
}

/** 从正文里拣出来的句子，首页「摘」用。 */
const lines: Line[] = [
  {
    text: '河流日夜，我却轻轻地颠倒。',
    source: '《轻轻的我》',
    slug: 'da-shi-jie',
  },
  {
    text: '对句生于散词，其中的精神更为凝聚。',
    source: '《一段惬意的时光》',
    slug: 'da-si',
  },
  {
    text: '人间自然了一分钟，我便可以感受这一分钟。',
    source: '《一段惬意的时光》',
    slug: 'da-si',
  },
]

export default lines
