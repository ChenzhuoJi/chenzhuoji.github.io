/**
 * 首页 top 的手绘笔触（马克笔感）。
 *
 * 只在大字左右、头像附近和页面两侧各点几笔：黑、黄两色，
 * 元素只有三种——弧线/短划、四角星、十字。线条偏粗、端头圆、
 * 带一点抖动和倾斜，刻意不对称。纯装饰，`aria-hidden`，不吃鼠标事件。
 */
export default function TopDoodles() {
  return (
    <div className="landing-doodles" aria-hidden="true">
      {/* 大字左侧：黑色双弧 */}
      <svg className="doodle doodle--left-title" viewBox="0 0 68 60" fill="none">
        <path d="M8 40c4-19 22-32 44-30" strokeWidth="4.5" />
        <path d="M6 52c10-18 26-27 44-27" strokeWidth="3" />
      </svg>

      {/* 大字右侧：黄色两道短划 */}
      <svg className="doodle doodle--right-title doodle--yellow" viewBox="0 0 52 42" fill="none">
        <path d="M6 30 42 8" strokeWidth="6" />
        <path d="M12 40 48 18" strokeWidth="4" />
      </svg>

      {/* 左下：黑色一钩 */}
      <svg className="doodle doodle--left-low" viewBox="0 0 60 56" fill="none">
        <path d="M52 6C26 10 8 26 8 44c0 6 5 9 10 7 6-3 5-12-2-14" strokeWidth="4.5" />
      </svg>

      {/* 左上：黄色折线 */}
      <svg className="doodle doodle--left-high doodle--yellow" viewBox="0 0 56 44" fill="none">
        <path d="M4 38 16 8l12 22L42 6" strokeWidth="5" />
      </svg>

      {/* 右上：黑色两道短线（像批注的强调） */}
      <svg className="doodle doodle--right-high" viewBox="0 0 44 34" fill="none">
        <path d="M4 26 18 6" strokeWidth="4.5" />
        <path d="M24 30 38 10" strokeWidth="4.5" />
      </svg>

      {/* 右下：黄色一抹横线 */}
      <svg className="doodle doodle--right-low doodle--yellow" viewBox="0 0 76 30" fill="none">
        <path d="M6 22c22-8 44-12 62-14" strokeWidth="7" />
        <path d="M4 30c20-6 40-9 56-10" strokeWidth="3" />
      </svg>

      {/* 头像右上：实心黄色四角星 */}
      <svg className="doodle doodle--star-a doodle--yellow" viewBox="0 0 40 40">
        <path
          d="M20 0c1.6 9.4 5 14.8 20 20-15 5.2-18.4 10.6-20 20-1.6-9.4-5-14.8-20-20C15 14.8 18.4 9.4 20 0Z"
          fill="currentColor"
        />
      </svg>

      {/* 头像左侧：描边的小星 */}
      <svg className="doodle doodle--star-b" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 2c1.5 8.7 4.6 13.7 18 18-13.4 4.3-16.5 9.3-18 18-1.5-8.7-4.6-13.7-18-18C15.4 15.7 18.5 10.7 20 2Z"
          strokeWidth="3"
        />
      </svg>

      {/* 大字左下：黄色十字 */}
      <svg className="doodle doodle--plus doodle--yellow" viewBox="0 0 32 32" fill="none">
        <path d="M4 16h24" strokeWidth="5" />
        <path d="M16 4v24" strokeWidth="5" />
      </svg>

      {/* 大字右下：一道短横线 */}
      <svg className="doodle doodle--line" viewBox="0 0 60 12" fill="none">
        <path d="M3 8c16-3 34-4 54-3" strokeWidth="4.5" />
      </svg>
    </div>
  )
}
