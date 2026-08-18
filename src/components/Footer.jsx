export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="wrap">
        <span>© {year} Do My Hanh</span>
        <span>Built with React &amp; JSX</span>
      </div>
    </footer>
  )
}
