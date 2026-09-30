import { useEffect, useRef, useState } from 'react'

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

const Handles = () => <>{[0, 1, 2, 3].map((k) => <i key={k} />)}</>

const Arrow = ({ color, className }) => (
  <svg className={`cur ${className}`} width="44" height="44" viewBox="0 0 34 34" aria-hidden="true">
    <path d="M4 4l24 9-10 4-4 11z" fill={color} stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)
const Target = () => (
  <svg className="ico" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="17" fill="none" stroke="#1FA36B" strokeWidth="4" />
    <circle cx="20" cy="20" r="10" fill="none" stroke="#1FA36B" strokeWidth="4" />
    <circle cx="20" cy="20" r="3.5" fill="#1FA36B" />
  </svg>
)
const Flower = () => (
  <svg className="ico" viewBox="0 0 40 40" aria-hidden="true">
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <circle key={a} cx="20" cy="8" r="4.4" fill="#E0245E" transform={`rotate(${a} 20 20)`} />
    ))}
  </svg>
)

const time = () => new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
function Clock() {
  const [t, setT] = useState(time())
  useEffect(() => {
    const id = setInterval(() => setT(time()), 1000)
    return () => clearInterval(id)
  }, [])
  return <div className="clock">{t}</div>
}

// Black square that follows the mouse around the stage.
// It is really a WHITE square with mix-blend-mode:difference (see index.css), so everything
// underneath flips to its opposite colour: white → black, black → white, cyan → orange, mint → plum…
function useSpotlight(stageRef, spotRef) {
  useEffect(() => {
    const stage = stageRef.current
    const spot = spotRef.current
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0

    const place = () => { spot.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)` }
    const step = () => {
      cx += (x - cx) * 0.18
      cy += (y - cy) * 0.18
      place()
      raf = Math.abs(x - cx) > 0.3 || Math.abs(y - cy) > 0.3 ? requestAnimationFrame(step) : 0
    }
    const move = (e) => {
      if (e.pointerType === 'touch') return
      const r = stage.getBoundingClientRect()
      x = e.clientX - r.left
      y = e.clientY - r.top
      if (!stage.classList.contains('hot')) {
        // first frame: appear right under the cursor instead of sliding in from the last spot
        cx = x; cy = y; place()
        stage.classList.add('hot')
      }
      if (!raf) raf = requestAnimationFrame(step)
    }
    const leave = () => stage.classList.remove('hot')

    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerleave', leave)
    return () => {
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [stageRef, spotRef])
}

export default function Hero() {
  const stageRef = useRef(null)
  const spotRef = useRef(null)
  useSpotlight(stageRef, spotRef)
  return (
    <section className="hero">
      <div className="wrap">
        <Clock />
        <div className="stage" ref={stageRef}>
          <div className="frame f-cyan"><div className="box"><Handles /></div></div>
          <div className="name" role="img" aria-label="Hạnh">HẠNH</div>
          <span className="hand">my name is</span>
          <span className="note n-co">Currently at Ecomobi PTE</span>
          <span className="note n-prev">Yes, I coded this site</span>
          <div className="avail">
            <span className="rd"></span>
            <span className="tx">Open to marketing roles &amp; thoughtful projects</span>
          </div>
          <div className="pin p-l"><span className="pc"><img src="/assets/hanh.jpg" alt="Hạnh" /></span><span className="msg"><span>Nice to meet you!</span></span></div>
          <div className="pin p-r"><span className="pc"><img src="/assets/hanh.jpg" alt="" /></span><span className="msg"><span>Let's make it perform</span></span></div>
          <span className="pill pl-role">Marketing Ops</span>
          <Arrow color="#ECB12D" className="a-role" />
          <span className="pill pl-city">Ho Chi Minh City, Vietnam</span>
          <Arrow color="#E0245E" className="a-city" />
          <div className="spot" aria-hidden="true">
            <div className="block" ref={spotRef}><Handles /></div>
          </div>
        </div>

        <h1>
          I keep marketing campaigns running <Target /> on target <Flower />.
        </h1>
        <p className="lede">
          Got a campaign that needs steering, or a project worth obsessing over?
          Let's make it perform and make it clear.
        </p>
        <div className="hero-actions">
          <a href="#experience" className="btn btn-primary">View my experience →</a>
          <a href="#contact" className="btn btn-ghost">Say hi</a>
        </div>
      </div>

      <div className="ticker" aria-hidden="true">
        <TickerTrack />
      </div>
    </section>
  )
}
