import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { site } from '../data/site'

export default function NotFound() {
  return (
    <div className="page">
      <Helmet>
        <title>{`找不到这一页 · ${site.name}`}</title>
      </Helmet>

      <div className="spread">
        <aside className="rail">
          <span className="rail-label">无</span>
        </aside>

        <div className="spread-main">
          <header className="page-head">
            <h1 className="page-title">这一页不在</h1>
            <p className="page-dek">也许地址写错了，也许它已经被移走。</p>
          </header>

          <div className="section-link-row">
            <Link to="/">回首页</Link>
            <Link to="/posts">全部文章</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
