import { useEffect, useRef, useState } from 'react'
import scrollToTop from '../utils/scrollToTop.js'

// Floating "back to top" button. Shows up once you're past the hero, hides again over the footer
// (the footer has its own "Do My Hanh ↑" link), and its ring fills as you scroll down the page.
export default function BackToTop() {
  const [show, setShow] = useState(false)
  const ring = useRef(null)

  useEffect(() => {
    let raf = 0
    let footerInView = false
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (ring.current) ring.current.style.strokeDashoffset = String(1 - p)
      setShow(window.scrollY > window.innerHeight * 0.9 && !footerInView)
    }
    const queue = () => { if (!raf) raf = requestAnimationFrame(update) }

    const footer = document.querySelector('footer')
    const io = footer
      ? new IntersectionObserver(([entry]) => { footerInView = entry.isIntersecting; queue() })
      : null
    if (io) io.observe(footer)

    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    update()
    return () => {
      cancelAnimationFrame(raf)
      if (io) io.disconnect()
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
    }
  }, [])

  return (
    <a
      href="#top"
      className={`to-top${show ? ' show' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      data-cursor="back to top"
    >
      <svg className="to-top-ring" viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r="20" pathLength="1" ref={ring} />
      </svg>
      <svg className="to-top-arrow" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 16V4m0 0-5 5m5-5 5 5" />
      </svg>
    </a>
  )
}
