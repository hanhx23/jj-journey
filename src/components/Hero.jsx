import { useEffect, useRef, useState } from 'react'
import useMediaQuery from '../hooks/useMediaQuery.js'

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

// Stops the "press and hold → full-size photo / Save image" menu on phones, plus right-click and drag on desktop.
const noSave = {
  onContextMenu: (e) => e.preventDefault(),
  onDragStart: (e) => e.preventDefault(),
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

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

/* ---------- hero stickers ----------
   Both notes are real buttons that:
   1. slap onto the canvas on page load (.drop, staggered by --delay)
   2. carry a live detail (a ticking brand line / a typed line with a caret)
   3. do something: click/tap = action; with a mouse they can also be dragged around the stage
      (touch is tap-only so a finger on a sticker still scrolls the page). */
function Sticker({ className, delay, stageRef, onActivate, children, ...rest }) {
  const ref = useRef(null)
  const drag = useRef(null)
  const offset = useRef({ x: 0, y: 0 })
  const skipClick = useRef(false)

  function onPointerDown(e) {
    if (e.pointerType === 'touch' || e.button !== 0 || !stageRef.current) return
    const s = stageRef.current.getBoundingClientRect()
    const r = ref.current.getBoundingClientRect()
    const { x, y } = offset.current
    drag.current = {
      id: e.pointerId, sx: e.clientX, sy: e.clientY, lastX: e.clientX, moved: false, ox: x, oy: y,
      // limits keep the sticker inside the stage
      minX: x + s.left - r.left, maxX: x + s.right - r.right,
      minY: y + s.top - r.top, maxY: y + s.bottom - r.bottom,
    }
  }
  function onPointerMove(e) {
    const d = drag.current
    if (!d || e.pointerId !== d.id) return
    const dx = e.clientX - d.sx
    const dy = e.clientY - d.sy
    if (!d.moved) {
      if (Math.hypot(dx, dy) < 6) return   // still a click
      d.moved = true
      ref.current.setPointerCapture(e.pointerId)
      ref.current.classList.add('dragging')
    }
    const x = clamp(d.ox + dx, d.minX, d.maxX)
    const y = clamp(d.oy + dy, d.minY, d.maxY)
    offset.current = { x, y }
    const st = ref.current.style
    st.setProperty('--dx', `${x}px`)
    st.setProperty('--dy', `${y}px`)
    st.setProperty('--tilt', `${clamp((e.clientX - d.lastX) * 1.6, -16, 16)}deg`)   // leans into the drag
    d.lastX = e.clientX
    clearTimeout(d.settle)
    d.settle = setTimeout(() => st.setProperty('--tilt', '0deg'), 110)
  }
  function endDrag() {
    const d = drag.current
    drag.current = null
    if (!d || !d.moved) return
    clearTimeout(d.settle)
    skipClick.current = true   // the click that follows a drag is not a click
    ref.current.classList.remove('dragging')
    ref.current.style.setProperty('--tilt', '0deg')
  }
  function onClick(e) {
    if (skipClick.current) { skipClick.current = false; return }
    onActivate?.(e)
  }

  return (
    <button
      ref={ref}
      type="button"
      className={`note stk drop ${className}`}
      style={{ '--delay': `${delay}s` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

const BRANDS = ['Unilever', 'NIVEA', "L'Oréal"]

// "Currently at Ecomobi PTE": live dot + a brand line that ticks over like a departures board.
// Click/tap jumps to the Experience log.
function EcomobiNote({ stageRef }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (prefersReduced()) return undefined
    const id = setInterval(() => setI((v) => (v + 1) % BRANDS.length), 2400)
    return () => clearInterval(id)
  }, [])

  function goToWork() {
    document.getElementById('experience')
      ?.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' })
  }

  const prev = (i + BRANDS.length - 1) % BRANDS.length
  return (
    <Sticker
      className="n-co"
      delay={0.55}
      stageRef={stageRef}
      onActivate={goToWork}
      data-cursor="see my work"
      aria-label="Currently at Ecomobi PTE, running GMV Max for Unilever, NIVEA and L'Oréal. Go to my experience."
    >
      <span className="live-dot" aria-hidden="true"></span>
      <span className="n-main" aria-hidden="true">Currently at Ecomobi PTE</span>
      <span className="n-sub" aria-hidden="true">
        GMV Max for{' '}
        <span className="flip">
          {BRANDS.map((b, k) => (
            <span key={b} className={k === i ? 'on' : k === prev ? 'was' : ''}>{b}</span>
          ))}
        </span>
      </span>
    </Sticker>
  )
}

const CODED = 'Yes, I coded this site'

// "Yes, I coded this site": types itself out with a blinking caret.
// Click/tap switches on inspect mode, which outlines the hero like browser dev tools.
function CodedNote({ stageRef, inspect, onToggle, mouse }) {
  const [n, setN] = useState(() => (prefersReduced() ? CODED.length : 0))
  const verb = mouse ? 'click' : 'tap'

  useEffect(() => {
    if (n >= CODED.length) return undefined
    const id = setTimeout(() => setN((v) => v + 1), n === 0 ? 1350 : 55)   // starts as the sticker lands
    return () => clearTimeout(id)
  }, [n])

  return (
    <Sticker
      className={`n-prev${inspect ? ' on' : ''}`}
      delay={0.8}
      stageRef={stageRef}
      onActivate={onToggle}
      aria-pressed={inspect}
      data-cursor={inspect ? 'close' : 'inspect it'}
      aria-label="Yes, I coded this site. Show how the hero is built."
    >
      <span className="n-main type" aria-hidden="true">
        <span className="ghost">{CODED}</span>
        <span className="typed">{CODED.slice(0, n)}<i className="caret"></i></span>
      </span>
      <span className="n-sub swap" aria-hidden="true">
        <span className={inspect ? '' : 'on'}>&lt;/&gt; {verb} to inspect</span>
        <span className={inspect ? 'on' : ''}>inspecting · {verb} to close</span>
      </span>
    </Sticker>
  )
}

// What inspect mode outlines. Text blocks are measured by their text, not their full-width box.
const INSPECT_TARGETS = [
  { sel: null, label: 'div.stage' },
  { sel: '.hand', label: 'span.hand' },
  { sel: '.name', label: 'Unbounded 900', text: true },
  { sel: '.n-co', label: 'button.note' },
  { sel: '.n-prev', label: 'button.note' },
  { sel: '.avail', label: 'div.avail', text: true },
  { sel: '.p-l', label: 'div.pin' },
  { sel: '.p-r', label: 'div.pin' },
  { sel: '.pl-role', label: 'span.pill' },
  { sel: '.pl-city', label: 'span.pill' },
]

function InspectLayer({ stageRef }) {
  const boxes = useRef([])

  useEffect(() => {
    let raf = 0
    const range = document.createRange()
    const tick = () => {
      const stage = stageRef.current
      if (!stage) return
      const s = stage.getBoundingClientRect()
      INSPECT_TARGETS.forEach((t, k) => {
        const box = boxes.current[k]
        const el = t.sel ? stage.querySelector(t.sel) : stage
        if (!box || !el) return
        let r = el.getBoundingClientRect()
        if (t.text) { range.selectNodeContents(el); r = range.getBoundingClientRect() }
        const x = r.left - s.left
        const y = r.top - s.top
        box.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
        box.style.width = `${r.width.toFixed(1)}px`
        box.style.height = `${r.height.toFixed(1)}px`
        box.classList.toggle('below', y < 24)
        const dims = box.querySelector('.ix-dims')
        const txt = `${Math.round(r.width)}×${Math.round(r.height)}`
        if (dims.textContent !== txt) dims.textContent = txt   // live: pills drift, so their numbers do too
      })
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [stageRef])

  return (
    <div className="inspect-layer" aria-hidden="true">
      {INSPECT_TARGETS.map((t, k) => (
        <div
          key={t.label + k}
          className={`ix-box${t.sel ? '' : ' ix-root'}`}
          ref={(el) => { boxes.current[k] = el }}
          style={{ '--d': `${k * 45}ms` }}
        >
          <span className="ix-tag"><b>{t.label}</b> <span className="ix-dims"></span></span>
        </div>
      ))}
    </div>
  )
}

// Black square that follows the mouse around the stage.
// It is really a WHITE square with mix-blend-mode:difference (see index.css), so everything
// underneath flips to its opposite colour: white → black, black → white, cyan → orange, mint → plum…
function useSpotlight(stageRef, spotRef) {
  useEffect(() => {
    const stage = stageRef.current
    const spot = spotRef.current
    const lane = spot.parentElement   // the viewport-wide .spot wrapper the square is positioned inside
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
      const r = lane.getBoundingClientRect()
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

  const [inspect, setInspect] = useState(false)
  const [pin, setPin] = useState(null)      // which avatar bubble is open on touch screens
  const [hello, setHello] = useState(0)     // bumps to replay the name box animation
  const mouse = useMediaQuery('(hover: hover) and (pointer: fine)')

  // a tapped bubble closes itself after a few seconds, so it never sits on top of the pills
  useEffect(() => {
    if (!pin) return undefined
    const id = setTimeout(() => setPin(null), 3200)
    return () => clearTimeout(id)
  }, [pin])

  // inspect mode: Escape closes it, and so does scrolling the hero out of view
  useEffect(() => {
    if (!inspect) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setInspect(false) }
    const io = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) setInspect(false) })
    io.observe(stageRef.current)
    window.addEventListener('keydown', onKey)
    return () => {
      io.disconnect()
      window.removeEventListener('keydown', onKey)
    }
  }, [inspect])

  // logo / footer "back to top": once the page has actually arrived, redraw the name box
  useEffect(() => {
    let raf = 0
    const onHello = () => {
      cancelAnimationFrame(raf)
      const t0 = performance.now()
      const wait = () => {
        if (window.scrollY < 6 || performance.now() - t0 > 2500) setHello((h) => h + 1)
        else raf = requestAnimationFrame(wait)
      }
      raf = requestAnimationFrame(wait)
    }
    window.addEventListener('hero:hello', onHello)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('hero:hello', onHello)
    }
  }, [])

  // avatar bubbles open on hover with a mouse; on phones a tap toggles them (one at a time)
  const pinProps = (id) => {
    const toggle = () => setPin((p) => (p === id ? null : id))
    return {
      role: 'button',
      tabIndex: 0,
      'aria-pressed': pin === id,
      onClick: () => { if (!mouse) toggle() },
      onKeyDown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() }
      },
    }
  }

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <Clock />
        <div className={`stage${inspect ? ' inspecting' : ''}`} ref={stageRef}>
          <div className="frame f-cyan"><div className="box hello" key={hello}><Handles /></div></div>
          <div className="name" role="img" aria-label="Hạnh">HẠNH</div>
          <span className="hand">my name is</span>
          <EcomobiNote stageRef={stageRef} />
          <CodedNote stageRef={stageRef} inspect={inspect} mouse={mouse} onToggle={() => setInspect((v) => !v)} />
          <div className="avail">
            <span className="rd"></span>
            <span className="tx">Open to marketing analytics roles &amp; thoughtful projects</span>
          </div>
          <div className={`pin p-l${pin === 'l' ? ' open' : ''}`} {...noSave} {...pinProps('l')}><span className="pc"><img src="/assets/hanh.jpg" alt="Hạnh" draggable="false" /></span><span className="msg"><span>Nice to meet you!</span></span></div>
          <div className={`pin p-r${pin === 'r' ? ' open' : ''}`} {...noSave} {...pinProps('r')}><span className="pc"><img src="/assets/hanh.jpg" alt="" draggable="false" /></span><span className="msg"><span>Let's make it perform</span></span></div>
          <span className="pill pl-role">Marketing Ops</span>
          <Arrow color="#ECB12D" className="a-role" />
          <span className="pill pl-city">Ho Chi Minh City, Vietnam</span>
          <Arrow color="#E0245E" className="a-city" />
          <div className="spot" aria-hidden="true">
            <div className="block" ref={spotRef}><Handles /></div>
          </div>
          {inspect && <InspectLayer stageRef={stageRef} />}
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
