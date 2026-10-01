import { useEffect, useRef, useState } from 'react'

/* Case study: NIVEA Indonesia's raw tracker sheet -> live run-rate dashboard.
   No client figures anywhere: the sheet photo is blurred, the dashboard is an illustrative
   layout with values redacted, and the metrics below are about the system, not the sales. */

// verb = the move; the same four moves work on any messy dataset
const STEPS = [
  {
    verb: 'explore',
    title: 'Start with the raw sheet',
    text: 'The tracker held plan, actual and run-rate for every ad block plus the shop, one row per day, each block in its own colour band. It was accurate, but answering "are we on track this month?" meant scrolling sideways and doing maths in your head.',
  },
  {
    verb: 'prioritise',
    title: 'Decide what the brand needs to see',
    text: 'Before designing anything I listed the questions the brand asks every week: are we on pace for the month, which days dragged, which products earn their budget, how does this month compare with last. Every view answers one of those. Anything that didn\'t got cut.',
  },
  {
    verb: 'simplify',
    title: 'Make it readable at a glance',
    text: 'One status language everywhere: Ahead, On track, Behind, Off track, from actual ROI against plan. Shop TR is the one metric where lower is better, so its colours flip. The worst pace days are picked from the whole month, so a date filter can never hide them.',
  },
  {
    verb: 'automate',
    title: 'Keep the data private, the dashboard live',
    text: 'Version one was a file I rebuilt by hand. Version two rebuilds itself: client sheets stay private, a script turns them into a small feed of totals every morning, and the page reads that feed when it opens. If it can\'t, it says why in plain words and offers Try again.',
  },
]

const METRICS = [
  { num: '30 → 1', lbl: 'raw data source sheets merged into one shared feed' },
  { num: '11:00', lbl: 'daily auto-refresh, no manual rebuild' },
  { num: '0', lbl: 'times I resend the dashboard when numbers change: it loads fresh data each time it opens' },
  { num: '20+', lbl: 'charts and tables across 5 tabs' },
]

// ----- illustrative dashboard (layout only) -----
const TABS = ['Run-rate cockpit', 'Affiliate Live', 'SKU performance', 'Insights', 'Plan']
const STATUS = { ahead: 'Ahead', on: 'On track', behind: 'Behind', off: 'Off track' }
const KPIS = [
  { label: 'Ad GMV · MTD', w: 7, status: 'on' },
  { label: 'ROI vs plan', w: 4, status: 'behind' },
  { label: 'Shop GMV · MTD', w: 7 },
  { label: 'Shop TR', w: 4, chip: 'Below plan', status: 'ahead' },
]
const BLOCKS = [
  { name: 'Live GMV Max', status: 'behind' },
  { name: 'Brand Live', status: 'on' },
  { name: 'Affiliate Live', status: 'off' },
  { name: 'Product GMV Max', status: 'ahead' },
]
// invented shape for the pace chart; the three lowest bars get flagged like the real thing
const PACE = [62, 74, 70, 81, 66, 92, 88, 71, 58, 77, 84, 69, 73, 95, 90, 64, 52, 79, 86, 72, 68, 83, 97, 91, 61, 49, 76, 80, 87, 74]
const WORST = new Set([...PACE.keys()].sort((a, b) => PACE[a] - PACE[b]).slice(0, 3))

// Hand-drawn loop around the result card, built for its real size so the line stays even.
function loopPath(w, h) {
  const p = (x, y) => `${x.toFixed(1)} ${y.toFixed(1)}`
  return [
    `M ${p(w * 0.07, h * 0.18)}`,
    `C ${p(w * 0.3, 3)} ${p(w * 0.74, 1)} ${p(w - 7, h * 0.1)}`,
    `C ${p(w + 1, h * 0.22)} ${p(w + 2, h * 0.8)} ${p(w - 9, h - 4)}`,
    `C ${p(w * 0.72, h + 2)} ${p(w * 0.24, h + 3)} ${p(7, h - 7)}`,
    `C ${p(-2, h * 0.78)} ${p(-1, h * 0.24)} ${p(w * 0.09, 9)}`,
    `C ${p(w * 0.14, 4)} ${p(w * 0.22, 3)} ${p(w * 0.3, 6)}`,   // overshoot, like a real pen
  ].join(' ')
}

const SPARKS = ['a', 'b', 'c', 'd']

// "The result": waits until card 04 and its arrow have finished, appears once it's on screen,
// then gets circled by hand and sparkles pop around it.
function Outcome() {
  const ref = useRef(null)
  const [go, setGo] = useState(false)
  const [box, setBox] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = ref.current
    const measure = () => setBox({ w: el.offsetWidth + 28, h: el.offsetHeight + 24 })
    measure()
    if (!('ResizeObserver' in window)) return undefined
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    const s4 = document.querySelector('.cs-steps .s4')
    if (!s4 || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGo(true)
      return undefined
    }
    let readyAt = Infinity
    let inView = false
    let timer = 0
    const tryGo = () => {
      if (!inView || readyAt === Infinity) return
      clearTimeout(timer)
      timer = setTimeout(() => setGo(true), Math.max(0, readyAt - performance.now()))
    }
    const markReady = () => {
      if (readyAt !== Infinity || !s4.classList.contains('in')) return
      const d = parseFloat(getComputedStyle(s4).getPropertyValue('--d')) || 0   // 0 on phones
      readyAt = performance.now() + d * 1000 + 1000                              // card + its arrow
      tryGo()
    }
    const mo = new MutationObserver(markReady)
    mo.observe(s4, { attributes: true, attributeFilter: ['class'] })
    markReady()
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { inView = true; tryGo() }
    }, { rootMargin: '0px 0px -10% 0px' })
    io.observe(el)
    return () => {
      mo.disconnect()
      io.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={ref} className={`cs-outcome${go ? ' go' : ''}`}>
      {box.w > 0 && (
        <svg className="cs-loop" viewBox={`0 0 ${box.w} ${box.h}`} aria-hidden="true">
          <path pathLength="1" d={loopPath(box.w, box.h)} />
        </svg>
      )}
      {SPARKS.map((k) => (
        <svg key={k} className={`cs-spark sp-${k}`} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 1C13 9 15 11 23 12C15 13 13 15 12 23C11 15 9 13 1 12C9 11 11 9 12 1Z" />
        </svg>
      ))}
      <span className="hand">The result</span>
      {/* only claims we can stand behind: the feed rebuilds itself 11:00–12:00 (GMT+7) and the file is never resent */}
      <p>Fresh run-rate numbers every day by noon, and nobody has to rebuild or resend a file to get them.</p>
    </div>
  )
}

const Redact = ({ w }) => <i className="rd" style={{ '--w': `${w}ch` }} aria-hidden="true" />

function DashboardMock() {
  return (
    <div className="dm" aria-hidden="true">
      <div className="dm-top">
        <span className="dm-brand">NIVEA Indonesia</span>
        <span className="dm-title">TikTok Shop run-rate</span>
        <span className="dm-ctrls"><span>Sep ▾</span><span>MTD ▾</span></span>
      </div>
      <div className="dm-tabs">
        {TABS.map((t, k) => <span key={t} className={k === 0 ? 'on' : ''}>{t}</span>)}
      </div>
      <div className="dm-body">
        <div className="dm-kpis">
          {KPIS.map((k) => (
            <div className="dm-kpi" key={k.label}>
              <span className="dm-lbl">{k.label}</span>
              <Redact w={k.w} />
              {k.status && <span className={`dm-chip ${k.status}`}>{k.chip ?? STATUS[k.status]}</span>}
            </div>
          ))}
        </div>
        <div className="dm-grid">
          <div className="dm-panel">
            <div className="dm-ph">Plan vs actual by ads block</div>
            <div className="dm-table">
              <span className="dm-th">Block</span><span className="dm-th">Plan</span><span className="dm-th">Actual</span><span className="dm-th">Status</span>
              {BLOCKS.map((b) => (
                <div className="dm-row" key={b.name}>
                  <span>{b.name}</span><Redact w={5} /><Redact w={5} />
                  <span className={`dm-chip ${b.status}`}>{STATUS[b.status]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="dm-panel">
            <div className="dm-ph">Daily pace <span>actual vs plan</span></div>
            <div className="dm-bars">
              {PACE.map((v, i) => <i key={i} style={{ '--h': `${v}%` }} className={WORST.has(i) ? 'low' : ''} />)}
              <span className="dm-plan" />
            </div>
            <div className="dm-legend"><i className="low" /> 3 worst pace days this month</div>
          </div>
        </div>
      </div>
      <div className="dm-live"><span /> Live · feed built 11:04</div>
    </div>
  )
}

export default function CaseStudy() {
  const [front, setFront] = useState('dash')   // which card sits on top in the before/after pair

  const cardProps = (id, label) => ({
    role: 'button',
    tabIndex: 0,
    'aria-pressed': front === id,
    'aria-label': label,
    onClick: () => setFront(id),
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFront(id) }
    },
  })

  return (
    <section id="case-study">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">03 — case study</div>
          <h2>From a wall of raw numbers to a dashboard you can read at a glance.</h2>
          <p>
            NIVEA Indonesia's TikTok Shop performance lived in one Google Sheet: every ad block, every
            day, plan against actual, in dozens of colour-coded columns. Everything was there;
            finding the answer wasn't. I rebuilt it as a live dashboard, starting from one question: what does
            the brand actually need to see?
          </p>
        </div>

        <dl className="cs-meta reveal">
          <div><dt>My role</dt><dd>Analysis, UX and build, end to end</dd></div>
          <div><dt>Tools</dt><dd>Google Sheets, Apps Script, HTML/CSS/JS</dd></div>
          <div><dt>Client</dt><dd>NIVEA Indonesia, TikTok Shop (via Ecomobi)</dd></div>
        </dl>

        <div className={`cs-visual reveal front-${front}`}>
          <figure className="cs-card cs-sheet" data-cursor="before" {...cardProps('sheet', 'Show the original tracker sheet')}>
            <div className="cs-bar"><span className="cs-dot g" />Daily Tracker · Google Sheets</div>
            <img src="/assets/case-sheet-blurred.jpg" alt="The original tracker sheet, blurred so no client numbers are readable" loading="lazy" />
            <figcaption>Before: one tab of the raw tracker</figcaption>
          </figure>
          <figure className="cs-card cs-dash" data-cursor="after" {...cardProps('dash', 'Show the dashboard')}>
            <div className="cs-bar"><span className="cs-dot" /><span className="cs-dot" /><span className="cs-dot" />run-rate dashboard · live</div>
            <DashboardMock />
            <figcaption>After: the cockpit tab, layout shown with values redacted</figcaption>
          </figure>
          <span className="hand cs-scribble" aria-hidden="true">numbers hidden on purpose</span>
        </div>

        <div className="cs-how reveal">
          <h3>How I deep dive into a problem</h3>
          <p>Four moves I use on any messy dataset. Here's how they played out on this one.</p>
        </div>

        {/* Desktop reads as a loop: 01 → 02 ↓ 03 ← 04. Phones read straight down.
            Each card draws its outgoing arrow once it appears. */}
        <ol className="cs-steps">
          {STEPS.map((s, i) => (
            <li className={`cs-step reveal s${i + 1}`} key={s.title} style={{ '--d': `${i * 0.55}s` }}>
              <div className="cs-step-top">
                <span className="cs-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="cs-verb">{s.verb}</span>
              </div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
              {/* every card points to what comes next; 04 points down to the result */}
              {(
                <span className="cs-arrow" aria-hidden="true">
                  <svg viewBox="0 0 64 36">
                    <path className="shaft" pathLength="1" d="M4 20 C 16 8, 30 30, 50 18" />
                    <path className="head" pathLength="1" d="M41 9 L52 17.5 L42 27" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>

        <Outcome />

        <div className="cs-metrics reveal">
          {METRICS.map((m) => (
            <div className="cs-metric" key={m.lbl}>
              <div className="num">{m.num}</div>
              <div className="lbl">{m.lbl}</div>
            </div>
          ))}
        </div>

        <p className="cs-takeaway reveal">
          <span className="hand">What I learned</span>
          The code was the easy part. The real work was deciding what to leave out.
        </p>
      </div>
    </section>
  )
}
