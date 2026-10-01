import { useEffect, useState } from 'react'

/**
 * Live media-query match. Unlike a one-off matchMedia() check it updates when the answer
 * changes: rotating a tablet, plugging in a mouse, or flipping Chrome DevTools into a phone.
 */
export default function useMediaQuery(query) {
  const read = () => typeof window !== 'undefined' && window.matchMedia(query).matches
  const [matches, setMatches] = useState(read)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)
    update()
    if (mql.addEventListener) mql.addEventListener('change', update)
    else mql.addListener(update)   // Safari < 14
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', update)
      else mql.removeListener(update)
    }
  }, [query])

  return matches
}
