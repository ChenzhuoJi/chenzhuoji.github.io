import MarkdownRenderer from '../components/MarkdownRenderer'

const content = `## About Me

一个普通的大学生。

## 感谢

感谢 [TRAE](https://www.trae.ai/)，字节的产品都很好，希望不断进步。

感谢 [Codex](https://github.com/openai/codex)，让我学会了珍惜 token。

感谢 [Opencode](https://opencode.ai/)，这是一个很优秀的项目。[GitHub](https://github.com/anomalyco/opencode)

最后感谢 [DeepSeek](https://www.deepseek.com/)，让我不用担心余额和上下文。[API 平台](https://platform.deepseek.com/)

## 不太感谢

不太感谢 [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview)，因为它定义和发扬了 Agent，让我感觉找工作会变得困难。`

export default function About() {
  return (
    <div className="max-w-2xl mx-auto" style={{ animation: 'fade-up 0.5s ease-out' }}>
      <h1 className="text-2xl font-serif font-semibold text-ink-900 dark:text-ink-100 mb-8">关于</h1>
      <MarkdownRenderer content={content} />
      <div className="mt-8 pt-8 border-t border-ink-200 dark:border-ink-700 space-y-1">
        <p className="text-sm text-ink-400 dark:text-ink-500">
          GitHub：<a href="https://github.com/chenzhuoji" target="_blank" rel="noopener noreferrer" className="text-vermilion-500 hover:text-vermilion-600 transition-colors">@chenzhuoji</a>
        </p>
        <p className="text-sm text-ink-400 dark:text-ink-500">
          小红书：<a href="https://xhslink.com/m/6nF5qdtdPPk" target="_blank" rel="noopener noreferrer" className="text-vermilion-500 hover:text-vermilion-600 transition-colors">@23统计校园卡</a>
        </p>
        <p className="text-sm text-ink-400 dark:text-ink-500">
          抖音：<a href="https://v.douyin.com/g4gzsXDXl28/" target="_blank" rel="noopener noreferrer" className="text-vermilion-500 hover:text-vermilion-600 transition-colors">@校园卡</a>
        </p>
        <p className="text-sm text-ink-400 dark:text-ink-500">
          小宇宙：<span className="text-ink-500">HJCZ</span>
        </p>
      </div>
    </div>
  )
}
