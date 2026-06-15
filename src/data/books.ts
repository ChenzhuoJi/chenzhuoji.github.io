import type { Book } from '../types'

const books: Book[] = [
  {
    slug: 'refactoring-ui',
    title: 'Refactoring UI',
    author: 'Adam Wathan & Steve Schoger',
    cover: '/images/refactoring-ui-cover.png',
    description: '从开发者视角学习如何设计漂亮的用户界面。50 个可视化章节，涵盖布局、色彩、排版、深度等主题。',
    content: `## 关于本书

《Refactoring UI》是由 Tailwind CSS 的创作者 Adam Wathan 和 Steve Schoger 合著的一本 UI 设计书。它专门面向那些「知道自己做得丑，但不知道丑在哪」的开发者。

全书包含 50 个短小精悍的章节，每一个章节都是一个具体、可落地的设计技巧。它不是那种讲「色彩理论」和「字体排印学」的大部头，而是像「少用边框」、「不要用灰色文字放在彩色背景上」这样马上就能用的战术。

## 核心收获

### 1. 从小处着手

**Start with a feature, not a layout.**

不要一开始就纠结整体布局，先专注于一个核心功能。从单个元素开始设计，逐步构建。

### 2. 层次结构就是一切

**Not all elements are equal.**

通过大小、颜色、对比度来建立清晰的视觉层次。不要给所有元素同等权重。

### 3. 少用边框

**Use fewer borders.**

用阴影、背景色或间距来替代边框，界面会立马变得干净清爽。

### 4. 颜色系统

**Ditch hex for HSL.**

用 HSL 而不是十六进制来处理颜色。先定义色相，再调整饱和度和亮度，这样更容易保持颜色的一致性。

### 5. 间距系统

**Establish a spacing and sizing system.**

建立一套间距和尺寸系统（如 4px 为基准的递增），而不是凭感觉随意设置。

## 书摘

> "Most design courses focus on high level principles like color theory and typography which, while important, never helped me make instant improvements like specific tactics."

> "It doesn't take any talent to make changes like this — once you know the tactic you just need to notice the problem and apply the solution."

> "Every sentence is highlight-worthy."

## 适合人群

- 前端开发者，想自己搞定 UI 设计
- 独立开发者，没有设计师搭档
- 任何想让产品「看起来更专业」的人
`,
  },
]

export default books
