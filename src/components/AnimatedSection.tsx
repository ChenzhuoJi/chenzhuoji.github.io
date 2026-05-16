import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
}

export default function AnimatedSection({ children, className = '', delay = 0, threshold = 0.1 }: Props) {
  const { ref, inView } = useInView(threshold)

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  )
}
