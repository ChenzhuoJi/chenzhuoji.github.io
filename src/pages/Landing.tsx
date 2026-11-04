import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import '../landing.css'

/**
 * Pod of Cast 落地页。
 *
 * 版式、文案与配色来自 Pixso 设计稿 O1xIodDQDy-ub_WFPFIsPA 的 Landing 画板
 * （1440×10300，九个区块）。设计稿里的位图封面无法从远程 MCP 导出，
 * 这里用同色系的排版封面 `CoverArt` 代替，其余结构、字号、间距按稿还原。
 */

type Tone = 'red' | 'ink' | 'pewter' | 'cream' | 'olive' | 'plum'

const NAV = [
  { label: 'Episodes', href: '#episodes' },
  { label: 'About', href: '#about' },
  { label: 'More', href: '#pricing', chevron: true },
]

const FEATURES = [
  {
    icon: 'mic',
    title: 'Topic by Request',
    text: 'Lorem ipsum dolor sit amet consectet pis cing elit, sed do eiusmod tempor.',
  },
  {
    icon: 'lock',
    title: 'Exclusive Content',
    text: 'Lorem ipsum dolor sit amet consectet pis cing elit, sed do eiusmod tempor.',
  },
  {
    icon: 'users',
    title: 'Join the Community',
    text: 'Lorem ipsum dolor sit amet consectet pis cing elit, sed do eiusmod tempor.',
  },
  {
    icon: 'live',
    title: 'Livestreaming Access',
    text: 'Lorem ipsum dolor sit amet consectet pis cing elit, sed do eiusmod tempor.',
  },
  {
    icon: 'gift',
    title: 'Exclusive Episodes & Merch',
    text: 'Lorem ipsum dolor sit amet consectet pis cing elit, sed do eiusmod tempor.',
  },
  {
    icon: 'plus',
    title: 'And much more!',
    text: 'Lorem ipsum dolor sit amet consectet pis cing elit, sed do eiusmod tempor.',
  },
] as const

const TESTIMONIALS = [
  {
    quote:
      'Lorem ipsum dolor sit amet consectet piscing elit, sed do eiusmod tempor incidi ut labore et dolore magna aliqua.',
    name: 'Luna lovegood,',
    platform: 'Spotify',
  },
  {
    quote:
      'Lorem ipsum dolor sit amet consectet piscing elit, sed do eiusmod tempor incidi ut labore et dolore magna aliqua.',
    name: 'Emily Blunt,',
    platform: 'Google Podcast',
  },
  {
    quote:
      'Lorem ipsum dolor sit amet consectet piscing elit, sed do eiusmod tempor incidi ut labore et dolore magna aliqua.',
    name: 'Mia Winters,',
    platform: 'Apple Podcast',
  },
]

const EPISODES = [
  {
    no: 'Eps. 6',
    title: 'Pandemic Becoming Endemic',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ultrices odio.',
    tags: ['covid-19', 'health'],
    tone: 'ink' as Tone,
  },
  {
    no: 'Eps. 5',
    guest: true,
    title: 'Tesla Autopilot Controversy',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ultrices odio.',
    tags: ['automation', 'tech'],
    tone: 'red' as Tone,
  },
  {
    no: 'Eps. 3',
    title: 'How to Deal with Self–Confidence',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ultrices odio.',
    tags: ['self-esteem', 'health'],
    tone: 'pewter' as Tone,
  },
  {
    no: 'Eps. 4',
    guest: true,
    title: "Women's Rights? Is it alright?",
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ultrices odio.',
    tags: ["women's rights"],
    tone: 'olive' as Tone,
  },
  {
    no: 'Eps. 2',
    title: 'Type of Social Classes of People',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tags: ['social class', 'wealth'],
    tone: 'cream' as Tone,
  },
  {
    no: 'Eps. 1',
    guest: true,
    title: 'Are you a Perplexed Mind Person?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ultrices odio.',
    tags: ['mind-behaviour', 'health'],
    tone: 'plum' as Tone,
  },
]

const TIERS = [
  {
    name: 'Member',
    price: '$9.99',
    included: [
      'Exclusive Content',
      '5% Discount on Merch',
      'Join the Community',
      'Livestreaming Access',
    ],
  },
  {
    name: 'Family',
    price: '$14.99',
    popular: true,
    included: [
      'Everything in Tier 1',
      'Free tickets to Events',
      'Limited Edition Merch',
      'Promote your Product',
      'Request Topic',
    ],
  },
  {
    name: 'Official',
    price: '$29.99',
    included: [
      'Everything in Tier 2',
      'Exclusive Badge on Livestreaming',
      'Become an Official Sponsor',
      'Early Access to All Episodes',
      'Free Stikers and Merch',
    ],
  },
]

const POSTS = [
  {
    category: 'Podcast',
    title: 'Setup your own podcast',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris...',
    tags: ['business', 'startup'],
    date: 'Sep 14, 2021',
    tone: 'red' as Tone,
  },
  {
    category: 'Tips & Trick',
    title: 'Doodle artwork 101',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimvel iam, quis nostrud exercitation ullamco laboris...',
    tags: ['art', 'creative', 'tips and trick'],
    date: 'Sep 12, 2021',
    tone: 'ink' as Tone,
  },
]

const FOOTER_MENU = [
  {
    title: 'Explore',
    links: ['About', 'Testimonials', 'Features'],
  },
  {
    title: 'Episodes',
    links: ['Episodes', 'Pricing', 'Blog'],
  },
]

/* ── 装饰与图标 ─────────────────────────────────────────────────── */

function Swirl() {
  return (
    <svg
      className="hero__swirl"
      viewBox="0 0 520 420"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M74 336c-34-96 22-206 120-252 92-43 210-14 246 66 33 74-24 152-118 168-84 14-158-30-176-96-16-60 24-118 92-132 60-12 118 12 142 56"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Scribble({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 24" fill="none" aria-hidden="true">
      <path
        d="M3 17c14-9 26 3 39-3 12-6 20 4 33-2 12-6 22 5 35-1 10-5 20 2 47-6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="m3 5.5 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="currentColor" aria-hidden="true">
      <path d="M12 8.5 26 17l-14 8.5V8.5Z" />
    </svg>
  )
}

const ICON_PATHS: Record<string, string> = {
  mic: 'M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3Zm7 8a7 7 0 0 1-14 0M12 18v3m-4 3h8',
  lock: 'M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5V11Z',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9c0-3 2.7-5 6-5s6 2 6 5m3-13a3 3 0 0 1 0 6m3 7c0-2.5-1.6-4.2-4-4.8',
  live: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-7 4a7 7 0 0 1 14 0M3 12a9 9 0 0 1 18 0',
  gift: 'M4 11h16v9H4v-9Zm0-4h16v4H4V7Zm8-3v16M8 7a2.5 2.5 0 1 1 4-2 2.5 2.5 0 1 1 4 2',
  plus: 'M12 5v14M5 12h14',
}

function FeatureIcon({ name }: { name: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={ICON_PATHS[name] ?? ICON_PATHS.plus}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlatformMark({ kind }: { kind: 'spotify' | 'apple' | 'google' }) {
  if (kind === 'spotify') {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="12" fill="#1DB954" />
        <path
          d="M7 10.4c4.2-1.2 9.1-.8 12.4 1.2M8 13.6c3.5-1 7.5-.7 10.4 1M9 16.7c2.8-.8 6-.6 8.3.8"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (kind === 'apple') {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="12" fill="#8B5CF6" />
        <circle cx="13" cy="14" r="2.6" fill="#fff" />
        <path d="M13 11.4V6l4.6-1.2v5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="12" fill="#4285F4" />
      <path d="M12.4 13.6h5.9c0 3.2-2.3 5.6-5.9 5.6a5.2 5.2 0 1 1 0-10.4c1.7 0 3.1.6 4.1 1.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CoverArt({
  tone,
  label,
  title,
}: {
  tone: Tone
  label: string
  title: string
}) {
  return (
    <div className={`coverart coverart--${tone}`}>
      <span className="coverart__no">{label}</span>
      <span className="coverart__title">{title}</span>
    </div>
  )
}

/* ── 页面 ───────────────────────────────────────────────────────── */

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="land">
      <Helmet>
        <title>Pod of Cast — Your Daily Podcast</title>
        <meta
          name="description"
          content="We cover all kinds of categories and a weekly special guest."
        />
      </Helmet>

      {/* ───────── Hero ───────── */}
      <header className="masthead">
        <div className="wrap">
          <nav className="nav" aria-label="主导航">
            <Link className="brand" to="/" aria-label="Pod of Cast 首页">
              <span className="brand__mark">
                Pod
                <br />
                of
                <br />
                Cast
              </span>
              <span className="brand__name">Pod of Cast</span>
            </Link>

            <ul className={`nav__links${menuOpen ? ' is-open' : ''}`}>
              {NAV.map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={() => setMenuOpen(false)}>
                    {item.label}
                    {item.chevron && (
                      <>
                        {' '}
                        <Chevron />
                      </>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div className="nav__actions">
              <a className="btn btn--outline" href="#episodes">
                Recent episodes
              </a>
              <a className="btn btn--solid" href="#pricing">
                Subscribe
              </a>
              <button
                className="nav__toggle"
                type="button"
                aria-label="打开菜单"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </nav>

          <div className="hero">
            <h1 className="display hero__title">
              <Swirl />
              <span>
                Your Daily
                <br />
                Podcast
              </span>
            </h1>
            <p className="hero__sub">
              We cover all kinds of categories and a weekly special guest.
            </p>
            <div className="hero__cta">
              <a className="btn btn--solid" href="#pricing">
                Subscribe
              </a>
            </div>

            <div className="hero__covers" aria-hidden="true">
              {[
                { tone: 'red' as Tone, title: 'Tesla Autopilot', no: 'Eps. 5' },
                { tone: 'ink' as Tone, title: 'Self–confidence', no: 'Eps. 3' },
                { tone: 'pewter' as Tone, title: 'Perplexed Mind', no: 'Eps. 1' },
                { tone: 'cream' as Tone, title: "Women's Rights", no: 'Eps. 4' },
                { tone: 'olive' as Tone, title: 'Social Class', no: 'Eps. 2' },
              ].map((cover) => (
                <div className="hero__cover" key={cover.title}>
                  <CoverArt tone={cover.tone} label={cover.no} title={cover.title} />
                </div>
              ))}
            </div>

            <div className="hero__supported">
              <span>Supported by:</span>
              <span className="badge">
                <PlatformMark kind="spotify" /> Spotify
              </span>
              <span className="badge">
                <PlatformMark kind="google" /> Google Podcasts
              </span>
              <span className="badge">
                <PlatformMark kind="apple" /> Apple Podcasts
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ───────── About ───────── */}
      <section className="about" id="about">
        <div className="wrap">
          <figure className="quote-card">
            <span className="quote-card__mark" aria-hidden="true">
              “
            </span>
            <blockquote>
              One of the best daily podcasts that
              <br />
              covers every topic on Spotify.
            </blockquote>
            <figcaption>John Smith, Social Community Manager</figcaption>
          </figure>

          <div className="about__grid">
            <div className="about__art" aria-hidden="true">
              <svg viewBox="0 0 380 380" fill="none">
                <circle cx="190" cy="190" r="150" stroke="#F7EDE8" strokeWidth="40" />
                <circle cx="190" cy="190" r="92" fill="#F7EDE8" />
                <circle cx="190" cy="190" r="58" fill="#CD4631" />
                <path
                  d="M132 208c8 44 34 70 58 70s50-26 58-70"
                  stroke="#CD4631"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="190" cy="190" r="12" fill="#F7EDE8" />
                <path
                  d="M320 74c-26 4-46 22-52 48M60 306c24-4 42-20 48-44"
                  stroke="#81ADC8"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="about__copy">
              <h2 className="h2">
                Talk. Listen. Get inspired by every minute of it.
              </h2>
              <p className="body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                ac ultrices odio. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
              <a className="btn btn--outline" href="#episodes">
                Listen now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Testimonials ───────── */}
      <section className="testimonials">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">What our listeners say</h2>
            <p className="lead">Their experience throughout every platform</p>
          </div>

          <div className="cards">
            {TESTIMONIALS.map((item) => (
              <article className="card" key={item.name}>
                <span className="card__mark" aria-hidden="true">
                  “
                </span>
                <blockquote>{item.quote}</blockquote>
                <p className="card__meta">
                  {item.name} {item.platform}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Features ───────── */}
      <section className="features" id="features">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">Membership benefits</h2>
            <p className="lead">Become our sponsor and get all benefits</p>
          </div>

          <div className="features__grid">
            {FEATURES.map((item) => (
              <article className="feature" key={item.title}>
                <span className="feature__icon">
                  <FeatureIcon name={item.icon} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="features__cta">
            <a className="btn btn--solid" href="#pricing">
              See pricing
            </a>
          </div>
        </div>
      </section>

      {/* ───────── Episodes ───────── */}
      <section className="episodes" id="episodes">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">Recent Episodes</h2>
            <p className="lead">Available on your favorite platform</p>
          </div>

          <div className="episodes__list">
            {EPISODES.map((ep) => (
              <article className="episode" key={ep.no}>
                <div className="episode__cover">
                  <CoverArt tone={ep.tone} label={ep.no} title={ep.title} />
                </div>
                <div>
                  <p className="episode__no">
                    {ep.no}
                    {ep.guest && <span className="episode__guest"> · Special guest</span>}
                  </p>
                  <h3>{ep.title}</h3>
                  <p>{ep.text}</p>
                  <div className="episode__tags">
                    {ep.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                    <span className="host">Hosted by: Porter</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="episodes__cta">
            <a className="btn btn--outline" href="#episodes">
              Browse all episodes
            </a>
          </div>
        </div>
      </section>

      {/* ───────── Pricing ───────── */}
      <section className="pricing" id="pricing">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">Become our sponsor</h2>
            <p className="lead">Get exclusive episodes, merch and more</p>
          </div>

          <div className="pricing__grid">
            {TIERS.map((tier) => (
              <article
                className={`tier${tier.popular ? ' tier--popular' : ''}`}
                key={tier.name}
              >
                {tier.popular && <span className="tier__flag">Most popular</span>}
                <h3 className="h3">{tier.name}</h3>
                <p className="tier__price">
                  {tier.price}
                  <small>/month</small>
                </p>
                <a
                  className={`btn ${tier.popular ? 'btn--red' : 'btn--solid'}`}
                  href="#pricing"
                >
                  Subscribe
                </a>
                <p className="tier__included">What’s included:</p>
                <ul className="tier__list">
                  {tier.included.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── App ───────── */}
      <section className="app">
        <div className="wrap app__grid">
          <div className="app__copy">
            <span className="app__beta">Beta</span>
            <h2 className="h2">
              Available now
              <br />
              Pod of Cast App
            </h2>
            <p className="lead">We just launched our podcast app!</p>

            <div className="app__actions">
              <a className="btn btn--solid" href="#pricing">
                Download now
              </a>
              <div className="app__platforms">
                <span>Content also available on:</span>
                <span className="dot">
                  <PlatformMark kind="spotify" />
                </span>
                <span className="dot">
                  <PlatformMark kind="apple" />
                </span>
                <span className="dot">
                  <PlatformMark kind="google" />
                </span>
              </div>
            </div>
          </div>

          <div className="phones" aria-hidden="true">
            <div className="phone">
              <div className="phone__screen">
                <span className="phone__label">Trending</span>
                <span className="phone__title">In this week</span>
                <div className="phone__row">
                  <div style={{ width: 34, height: 34, borderRadius: 8, overflow: 'hidden' }}>
                    <CoverArt tone="pewter" label="" title="" />
                  </div>
                  <span>COVID-19 Endemic</span>
                </div>
                <div className="phone__row">
                  <div style={{ width: 34, height: 34, borderRadius: 8, overflow: 'hidden' }}>
                    <CoverArt tone="red" label="" title="" />
                  </div>
                  <span>Women’s Rights</span>
                </div>
                <div className="phone__play">
                  <PlayIcon />
                </div>
              </div>
            </div>

            <div className="phone">
              <div className="phone__screen">
                <span className="phone__label">Now playing</span>
                <span className="phone__title">How to deal with Self–Confidence</span>
                <div className="phone__bar phone__bar--fill" />
                <div className="phone__bar" />
                <div className="phone__play">
                  <PlayIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Blog ───────── */}
      <section className="blog" id="blog">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">Article and News</h2>
            <p className="lead">News, tips, tricks and more</p>
          </div>

          <div className="blog__grid">
            {POSTS.map((post) => (
              <article className="post" key={post.title}>
                <div className="post__art">
                  <CoverArt tone={post.tone} label={post.category} title={post.title} />
                </div>
                <div className="post__body">
                  <span className="eyebrow">{post.category}</span>
                  <h3 className="h3">{post.title}</h3>
                  <p className="body">{post.text}</p>
                  <div className="post__meta">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                    <span className="date">{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="blog__cta">
            <a className="btn btn--outline" href="#blog">
              Browse all
            </a>
          </div>
        </div>
      </section>

      {/* ───────── Footer ───────── */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer__top">
            <div className="footer__brand">
              <span className="brand__mark" aria-hidden="true">
                Pod
                <br />
                of
                <br />
                Cast
              </span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p className="tiny">©2021.</p>
              <Scribble className="footer__scribble" />
            </div>

            {FOOTER_MENU.map((col) => (
              <nav className="footer__col" key={col.title} aria-label={col.title}>
                <h3>{col.title}</h3>
                <ul>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#episodes">{link}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="footer__col">
              <h3>App available on:</h3>
              <ul>
                <li>
                  <a href="#pricing">App Store</a>
                </li>
                <li>
                  <a href="#pricing">Google Play</a>
                </li>
              </ul>
              <h3 style={{ marginTop: 24 }}>Listen to episodes on your fav platform:</h3>
              <div className="app__platforms" style={{ marginTop: 12 }}>
                <span className="dot">
                  <PlatformMark kind="spotify" />
                </span>
                <span className="dot">
                  <PlatformMark kind="apple" />
                </span>
                <span className="dot">
                  <PlatformMark kind="google" />
                </span>
              </div>
            </div>
          </div>

          <div className="footer__rule" />

          <div className="footer__bottom">
            <span>©2022. All Rights Reserved. Pod of Cast</span>
            <span className="footer__legal">
              <a href="#blog">Terms</a>
              <span aria-hidden="true">•</span>
              <a href="#blog">Privacy</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
