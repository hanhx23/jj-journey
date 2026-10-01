import { useEffect, useRef } from 'react'
import useMediaQuery from '../hooks/useMediaQuery.js'

const DEFAULT_LABEL = 'YOU'

// Black dot (the cursor) + trailing pill. The pill reads "YOU", or the data-cursor text of
// whatever you're pointing at (the hero stickers use this to say what a click does).
// Mouse/trackpad only: on phones nothing is mounted at all, so iOS Safari doesn't have to
// composite two invisible fixed, blend-mode layers on top of every scroll.
export default function CursorTag() {
  // live check: switching Chrome DevTools to a phone (or a laptop to tablet mode) removes it
  const enabled = useMediaQuery('(hover: hover) and (pointer: fine)')
  const dot = useRef(null)
  const tag = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined
    const root = document.documentElement
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0, shown = false, first = true, label = DEFAULT_LABEL

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
      const t = e.target.closest ? e.target : null
      show(!(t && t.closest('header')))
      const hint = t && t.closest('[data-cursor]')
      const next = hint ? hint.dataset.cursor : DEFAULT_LABEL
      if (next !== label) {
        label = next
        tag.current.textContent = next
        tag.current.classList.toggle('hint', next !== DEFAULT_LABEL)
      }
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
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true"></div>
      <div ref={tag} className="cursor-tag" aria-hidden="true">{DEFAULT_LABEL}</div>
    </>
  )
}
