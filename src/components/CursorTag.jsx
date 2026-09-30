import { useEffect, useRef } from 'react'

// Black dot (the cursor) + trailing "YOU" pill. Hidden over the header and on touch devices.
export default function CursorTag() {
  const dot = useRef(null)
  const tag = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const root = document.documentElement
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0, shown = false, first = true

    const show = (v) => {
      if (v === shown) return
      shown = v
      dot.current.classList.toggle('show', v)
      tag.current.classList.toggle('show', v)
      root.classList.toggle('cursor-hide', v)
    }
    const tick = () => {
      cx += (x - cx) * 0.2
      cy += (y - cy) * 0.2
      tag.current.style.transform = `translate3d(${cx + 9}px, ${cy + 7}px, 0)`
      raf = Math.abs(x - cx) > 0.3 || Math.abs(y - cy) > 0.3 ? requestAnimationFrame(tick) : 0
    }
    const onMove = (e) => {
      x = e.clientX; y = e.clientY
      if (first) { cx = x; cy = y; first = false }
      dot.current.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`
      show(!(e.target.closest && e.target.closest('header')))
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => show(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    root.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      root.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
      root.classList.remove('cursor-hide')
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true"></div>
      <div ref={tag} className="cursor-tag" aria-hidden="true">YOU</div>
    </>
  )
}
