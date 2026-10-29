import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <p className="footer-name">美西螈大王</p>
            <p className="footer-note">文字与照片，除注明外均为原创。</p>
          </div>

          <nav className="footer-links" aria-label="页脚">
            <Link to="/posts">全部文章</Link>
            <a href="https://github.com/ChenzhuoJi/chenzhuoji.github.io" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
        </div>

      </div>
    </footer>
  )
}
