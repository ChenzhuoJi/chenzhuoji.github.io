import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PwaPrompts from '../components/PwaPrompts'

export default function BaseLayout() {
  const { pathname } = useLocation()
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return (
    <div className="page-shell">
      <a className="skip-link" href="#main">
        跳到正文
      </a>
      <Header />
      <main id="main" className="shell">
        <Outlet />
      </main>
      <Footer />
      <PwaPrompts />
    </div>
  )
}
