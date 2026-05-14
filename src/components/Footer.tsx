export default function Footer() {
  return (
    <footer className="border-t border-ink-100 dark:border-ink-800 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex items-center justify-between text-sm text-ink-400 dark:text-ink-500">
        <p>© {new Date().getFullYear()} Chenzhuo's Blog</p>
        <p>
          Powered by{' '}
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="hover:text-ink-600 dark:hover:text-ink-300 transition-colors">
            React
          </a>
        </p>
      </div>
    </footer>
  )
}
