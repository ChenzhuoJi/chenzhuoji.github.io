import ThoughtCloud from '../components/ThoughtCloud'
import HandDrawnDoor from '../components/HandDrawnDoor'
import { usePosts } from '../hooks/usePosts'
import artworks from '../data/artworks'

/** 漂浮在页面背景里的小气泡，只是氛围，不参与交互 */
const ambientBubbles = [
  { left: '6%', top: '18%', size: 10, tone: 'border-ink-900/15 dark:border-ink-100/15', delay: '0s', duration: '15s' },
  { left: '14%', top: '72%', size: 16, tone: 'border-vermilion-600/20 dark:border-vermilion-400/20', delay: '2.4s', duration: '19s' },
  { left: '24%', top: '10%', size: 6, tone: 'border-frost-700/20 dark:border-frost-300/20', delay: '5.1s', duration: '13s' },
  { left: '79%', top: '14%', size: 7, tone: 'border-vermilion-600/20 dark:border-vermilion-400/20', delay: '1.2s', duration: '17s' },
  { left: '90%', top: '44%', size: 14, tone: 'border-frost-700/20 dark:border-frost-300/20', delay: '4.3s', duration: '21s' },
  { left: '83%', top: '78%', size: 9, tone: 'border-ink-900/15 dark:border-ink-100/15', delay: '6.6s', duration: '16s' },
  { left: '47%', top: '6%', size: 5, tone: 'border-vermilion-600/20 dark:border-vermilion-400/20', delay: '3.5s', duration: '12s' },
]

export default function Home() {
  const posts = usePosts()
  const myCount = posts.filter((p) => p.meta.genre === 'my').length
  const techCount = posts.filter((p) => p.meta.genre === 'tech').length

  return (
    <div className="relative">
      <section className="relative flex flex-col items-center py-4 sm:py-6">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {ambientBubbles.map((bubble, i) => (
            <span
              key={i}
              className={`bubble-drift absolute rounded-full border ${bubble.tone}`}
              style={{
                left: bubble.left,
                top: bubble.top,
                width: bubble.size,
                height: bubble.size,
                animationDelay: bubble.delay,
                animationDuration: bubble.duration,
              }}
            />
          ))}
        </div>

        <ThoughtCloud myCount={myCount} techCount={techCount} galleryCount={artworks.length} />

        <HandDrawnDoor to="/posts" count={posts.length} className="mt-1 sm:mt-2" />
      </section>
    </div>
  )
}
