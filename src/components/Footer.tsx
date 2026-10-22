import { PwaInstallLink } from '../components/PwaPrompts'

export default function Footer() {
  return (
    <footer className="safe-bottom border-t-2 border-ink-900 dark:border-ink-100 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col items-center gap-2 text-ink-400 dark:text-ink-500">
        <span className="kicker">Chenzhuo's Blog</span>
        <p className="font-mono text-xs tracking-wider">© {new Date().getFullYear()} · All rights reserved</p>
        <PwaInstallLink />
      </div>
    </footer>
  )
}
