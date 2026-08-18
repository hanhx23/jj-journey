import { useEffect } from 'react'

/**
 * Observes all elements with the "reveal" class and adds "in" once
 * they scroll into view, matching the original vanilla-JS behavior.
 * Re-runs whenever `deps` changes (e.g. after content mounts).
 */
export default function useReveal(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
