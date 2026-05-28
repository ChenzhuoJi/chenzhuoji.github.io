import { useGraphData } from '../hooks/usePosts'
import ArticleGraph from '../components/ArticleGraph'

export default function Graph() {
  const { nodes, edges } = useGraphData()

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-2xl font-heading font-semibold text-ink-900 dark:text-ink-100">关系图谱</h1>
        <p className="mt-1 text-sm text-ink-400 dark:text-ink-500">
          每篇文章是一个节点，共享标签的文章之间产生连线
        </p>
      </section>

      {nodes.length === 0 ? (
        <p className="text-ink-400 dark:text-ink-500 text-center py-12">暂无数据</p>
      ) : (
        <ArticleGraph nodes={nodes} edges={edges} />
      )}
    </div>
  )
}
