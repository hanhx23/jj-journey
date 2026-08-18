import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently in view and returns it,
 * so the nav can highlight the matching link.
 */
export default function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null)

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach((sec) => observer.observe(sec))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
