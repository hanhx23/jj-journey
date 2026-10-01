import { useEffect, useRef } from 'react'

// Writes straight to the bar (no React re-render per scroll event) and uses
// transform instead of width, so it stays smooth on phones.
export default function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    const queue = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    update()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
    }
  }, [])

  return <div id="scrollProgress" ref={bar} aria-hidden="true" />
}
