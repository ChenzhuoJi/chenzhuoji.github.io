import type { PostTimelineEntry } from '../types'

interface Props {
  entries: PostTimelineEntry[]
  /** 纵向（默认）或横向（放在文章末尾） */
  orientation?: 'vertical' | 'horizontal'
}

export default function PostTimeline({ entries, orientation = 'vertical' }: Props) {
  if (entries.length === 0) return null

  const horizontal = orientation === 'horizontal'

  if (horizontal) {
    return (
      <section
        className="post-timeline post-timeline--horizontal"
        aria-labelledby="post-timeline-title"
      >
        <p className="post-timeline-title" id="post-timeline-title">
          Revision history
        </p>

        {/* 手绘滤镜：把圆点和横线抖出笔触感 */}
        <svg className="revision-defs" aria-hidden="true" focusable="false">
          <filter
            id="revision-rough"
            x="-25%"
            y="-45%"
            width="150%"
            height="190%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.032 0.018"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        <ol className="revision" style={{ ['--count' as string]: entries.length }}>
          {entries.map((entry, index) => (
            <li key={`${entry.date}-${index}`}>
              <time className="revision__date" dateTime={entry.date}>
                {entry.date.split('-').join('.')}
              </time>
              <div className="revision__node">
                <span className="revision__dot" aria-hidden="true" />
              </div>
              <p className="revision__note">{entry.note}</p>
            </li>
          ))}
        </ol>
      </section>
    )
  }

  return (
    <section className="post-timeline" aria-labelledby="post-timeline-title">
      <p className="post-timeline-title" id="post-timeline-title">
        Revision history
      </p>
      <ol className={entries.length === 1 ? 'is-single' : undefined}>
        {entries.map((entry, index) => (
          <li key={`${entry.date}-${index}`}>
            <time dateTime={entry.date}>{entry.date.split('-').join('.')}</time>
            <p>{entry.note}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
