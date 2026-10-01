import { useEffect } from 'react'

/**
 * Adds "in" to every .reveal element once it reaches the screen.
 *
 * Two layers, so content can never get stuck invisible:
 * 1. IntersectionObserver with threshold 0 (the old 0.15 could never fire for blocks
 *    taller than ~6 screens, e.g. long lists on a phone held sideways).
 * 2. A cheap scroll sweep that reveals anything whose top is already on or above the
 *    screen. iOS Safari can drop observer callbacks on fast flicks, jump links and
 *    toolbar resizes; the sweep catches those.
 * Reduced-motion visitors and browsers without IntersectionObserver see everything at once.
 */
export default function useReveal(deps = []) {
  useEffect(() => {
    const pending = () => document.querySelectorAll('.reveal:not(.in)')
    const show = (el) => el.classList.add('in')

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pending().forEach(show)
      return undefined
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -6% 0px' }
    )
    pending().forEach((el) => io.observe(el))

    let raf = 0
    const sweep = () => {
      raf = 0
      const limit = window.innerHeight
      pending().forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.height > 0 && r.top < limit) {   // height 0 = inside a hidden tab panel, wait for it
          show(el)
          io.unobserve(el)
        }
      })
    }
    const queue = () => { if (!raf) raf = requestAnimationFrame(sweep) }

    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    window.addEventListener('load', queue)
    queue()

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
      window.removeEventListener('load', queue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
