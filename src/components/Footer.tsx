import { Link } from 'react-router-dom'
import { PwaInstallLink } from './PwaPrompts'
import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <p className="footer-name">{site.name}</p>
            <p className="footer-note">文字与照片，除注明外均为原创。</p>
          </div>

          <nav className="footer-links" aria-label="页脚">
            <Link to="/posts">全部文章</Link>
            <Link to="/tags">索引</Link>
            <a href="/rss.xml">RSS</a>
            <a href="https://github.com/ChenzhuoJi/chenzhuoji.github.io" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <PwaInstallLink />
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© 2026 {site.name}</span>
          <span>{site.place} · 以宋体排字</span>
        </div>
      </div>
    </footer>
  )
}
