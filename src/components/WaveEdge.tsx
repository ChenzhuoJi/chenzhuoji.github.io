/**
 * 首页/文章页顶部的波浪下缘。
 *
 * 两层曲线：浅一层在前、深一层在后，收住粉底区块。
 * `preserveAspectRatio="none"` 让它随宽度拉伸，高度由 CSS 控制。
 */
export default function WaveEdge({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`wave-edge ${className}`.trim()}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 54c110-34 220-34 330 0s220 34 330 0 220-34 330 0 220 34 450 0v66H0Z"
        fill="var(--pink-2)"
        opacity="0.6"
      />
      <path
        d="M0 78c120-36 240-36 360 0s240 36 360 0 240-36 360 0 240 36 360 0v42H0Z"
        fill="var(--body-bg)"
      />
    </svg>
  )
}
