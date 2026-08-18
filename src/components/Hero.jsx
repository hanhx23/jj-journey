const TICKER_ITEMS = [
  { text: 'ROAS', suffix: '▲ tracked weekly', className: 'up' },
  { text: 'GMV', suffix: 'Max reporting' },
  { text: 'CTR / CIR', suffix: 'campaign QA' },
  { text: 'HTML5', suffix: 'semantic markup', className: 'code' },
  { text: 'CSS3', suffix: 'responsive layouts', className: 'code' },
  { text: 'JavaScript', suffix: 'interactivity', className: 'code' },
  { text: 'Excel & Sheets', suffix: 'dashboards' },
  { text: 'Git', suffix: 'version control', className: 'code' },
  { text: 'Cross-functional', suffix: 'collaboration' },
]

function TickerTrack() {
  // rendered twice back-to-back for a seamless CSS scroll loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="ticker-track">
      {items.map((item, i) => (
        <span key={i} className={item.className ?? ''}>
          {item.text} <b className={item.className === 'up' ? 'up' : ''}>{item.suffix}</b>
        </span>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">marketing operations executive</div>
            <h1>
              I keep marketing campaigns<br />
              running <span className="hl-blue">on target</span>.
            </h1>
            <div className="status-badge">
              <span className="pulse-dot"></span>Open to Marketing Operations roles
            </div>
            <p className="lede">
              I'm Hanh, a Business Management graduate based in Ho Chi Minh City, working in
              marketing operations — tracking ROAS, CTR and GMV, building the reports that keep
              campaign take rate on target, and translating performance data into insights teams
              can act on. As a self-taught front-end developer on the side, I also understand how
              the dashboards and websites I work with are actually built.
            </p>
            <div className="hero-actions">
              <a href="#experience" className="btn btn-primary">View my experience →</a>
              <a href="#contact" className="btn btn-ghost">Get in touch</a>
            </div>
          </div>

          <div className="hero-card reveal">
            <div className="hc-head"><span></span><span></span><span></span></div>
            <div className="field"><span className="k">target_role</span><span className="v gold">Marketing Operations Executive</span></div>
            <div className="field"><span className="k">current_role</span><span className="v">Operation Executive</span></div>
            <div className="field"><span className="k">company</span><span className="v blue">Ecomobi PTE</span></div>
            <div className="field"><span className="k">focus</span><span className="v">TikTok Ads Performance</span></div>
            <div className="field"><span className="k">based_in</span><span className="v">Ho Chi Minh City, VN</span></div>
            <div className="field"><span className="k">education</span><span className="v">RMIT University</span></div>
            <div className="field"><span className="k">languages</span><span className="v">IELTS 7.5</span></div>
            <div className="field"><span className="k">status</span><span className="v green">● open to opportunities</span></div>
          </div>
        </div>
      </div>

      <div className="ticker" aria-hidden="true">
        <TickerTrack />
      </div>
    </section>
  )
}
