import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { site } from '../data/site'

export default function NotFound() {
  return (
    <div className="page">
      <Helmet>
        <title>{`找不到这一页 · ${site.name}`}</title>
      </Helmet>

      <div className="page-body">
          <header className="page-head">
            <p className="error-code" aria-hidden="true">
              404
              <svg className="error-sparkle" viewBox="0 0 40 40" fill="currentColor">
                <path d="M20 0c1.6 9.4 5 14.8 20 20-15 5.2-18.4 10.6-20 20-1.6-9.4-5-14.8-20-20C15 14.8 18.4 9.4 20 0Z" />
              </svg>
            </p>
            <h1 className="page-title">这一页不在</h1>
            <p className="page-dek">也许地址写错了，也许它已经被移走。</p>
          </header>

          <div className="section-link-row">
            <Link to="/">回首页</Link>
            <Link to="/posts">全部文章</Link>
          </div>
      </div>
    </div>
  )
}
