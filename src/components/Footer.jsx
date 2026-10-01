import scrollToTop from '../utils/scrollToTop'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="wrap">
        <a href="#top" className="foot-top" onClick={scrollToTop}>
          © {year} Do My Hanh <span aria-hidden="true">↑</span>
        </a>
        <span>Built with React &amp; JSX</span>
      </div>
    </footer>
  )
}
