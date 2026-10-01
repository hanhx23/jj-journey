import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently in view and returns it,
 * so the nav can highlight the matching link.
 * Returns null while the visitor is still above the first section (the hero).
 */
export default function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(null)
  const key = sectionIds.join(',')   // stable dependency: callers pass a fresh array each render

  useEffect(() => {
    const ids = key.split(',')
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          } else if (entry.target.id === ids[0] && entry.boundingClientRect.top > 0) {
            setActiveId(null)   // scrolled back up above the first section
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach((sec) => observer.observe(sec))

    // instant jumps (e.g. the logo link back to the top) can skip the observer entirely
    const onScroll = () => {
      const first = sections[0]
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.6) setActiveId(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [key])

  return activeId
}
