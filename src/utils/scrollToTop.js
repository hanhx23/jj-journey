/**
 * Smooth-scrolls back to the hero, clears any #section from the address bar
 * (so a refresh also lands on the hero) and tells the hero to say hello once it arrives.
 * Use as an onClick handler: <a href="#top" onClick={scrollToTop}>
 */
export default function scrollToTop(e) {
  e?.preventDefault?.()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }
  window.dispatchEvent(new CustomEvent('hero:hello'))
}
