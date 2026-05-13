import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-serif font-semibold text-ink-900 dark:text-ink-100 mb-8">关于</h1>
      <div className="prose prose-ink dark:prose-invert">
        <p>这里是 Chenzhuo 的个人博客，记录技术思考与生活感悟。</p>
        <h2>技术栈</h2>
        <ul>
          <li>框架：React + TypeScript</li>
          <li>构建：Vite</li>
          <li>样式：Tailwind CSS</li>
          <li>内容：Markdown</li>
        </ul>
        <h2>联系</h2>
        <p>
          GitHub：<Link to="https://github.com/chenzhuoji" target="_blank">@chenzhuoji</Link>
        </p>
      </div>
    </div>
  )
}
