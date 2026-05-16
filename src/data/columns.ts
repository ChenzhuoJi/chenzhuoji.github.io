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
    description: '智能如何在计算中涌现',
  },
]

export default columns
