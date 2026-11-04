interface Props {
  /** 最后更新日期，YYYY-MM-DD */
  updated: string
}

/**
 * 文章尾注：只放「最后更新」。
 *
 * 阅读次数依赖后端统计，站点还没有，所以先不显示；
 * 以后接了接口可以在右侧补一块，布局留了位置。
 */
export default function PostEndnote({ updated }: Props) {
  return (
    <div className="post-endnote">
      <p className="post-endnote__item">
        <span className="post-endnote__label">Last updated</span>
        <time className="post-endnote__value" dateTime={updated}>
          {updated.split('-').join('.')}
        </time>
      </p>
    </div>
  )
}
