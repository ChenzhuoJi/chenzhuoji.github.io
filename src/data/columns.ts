export interface ColumnConfig {
  name: string
  slug?: string
  description?: string
}

const columns: ColumnConfig[] = [
  {
    name: '代码的故事',
    slug: 'code-stories',
    description: '天才程序员也是打工人',
  },
  {
    name: '深度学习的故事',
    slug: 'deep-learning-stories',
    description: '计算，为了无法计算的价值',
  },
    {
    name: '掌上的互联网',
    slug: 'mobile',
    description: '十年人间',
  }
]

export default columns
