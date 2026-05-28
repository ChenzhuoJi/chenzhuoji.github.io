export default function Footer() {
  return (
    <footer className="border-t border-ink-200 dark:border-ink-800 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center text-sm text-ink-400 dark:text-ink-500">
        <p>© {new Date().getFullYear()} Chenzhuo's Blog</p>
      </div>
    </footer>
  )
}
