// My path in four steps. Each one taught a different skill; together they explain how I work.
const JOURNEY = [
  {
    when: 'Oct 2021 – Feb 2025',
    role: 'Business Management graduate',
    where: 'RMIT University · minor in Logistics & Supply Chain',
    tag: 'learning',
    edu: true,
    text: 'Business fundamentals plus a supply-chain minor: how goods, money and information move, and where they get stuck. Graduated in 2025.',
  },
  {
    when: 'May 2023 – Jun 2024',
    role: 'Customer Service Assistant',
    where: 'RMIT Student Connect',
    tag: 'listening',
    text: '20–30 inquiries a day, in person and by phone. It taught me to hear what someone actually needs behind what they ask.',
  },
  {
    when: 'Oct 2024 – Jul 2025',
    role: 'Merchandising Trainee',
    where: 'Li & Fung Vietnam',
    tag: 'delivering',
    text: 'Coordinated 20+ vendors across Southeast Asia so samples, costs and deliveries held up for EU and U.S. buyers.',
  },
  {
    when: 'Nov 2025 – now',
    role: 'Operation Executive',
    where: 'Ecomobi PTE',
    tag: 'deciding',
    now: true,
    text: 'Track ROAS, CTR and GMV for TikTok Shop FMCG brands, then turn the numbers into what to do next.',
  },
]

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="about-body">
          <div className="reveal about-sticky">
            <div className="eyebrow">01 — about</div>
            <h2 style={{ marginTop: 14, fontSize: 'clamp(26px,3vw,34px)' }}>
              Two disciplines, one habit: making things legible.
            </h2>
            <div className="face-swap">
              <img className="face face-a" src="/assets/face-a.png" alt="" />
              <img className="face face-b" src="/assets/face-b.png" alt="" />
            </div>
          </div>
          <div className="reveal">
            <p className="about-lede">
              I'm <strong>curious by default</strong>: I want to know how things actually work, and I
              won't hand something over until the next person can understand it too.{' '}
              <strong>Degree in hand since 2025</strong> (RMIT, Business Management, minor in
              Logistics &amp; Supply Chain), and that habit has already clocked in at three very
              different jobs.
            </p>

            <ol className="journey">
              {JOURNEY.map((j) => (
                <li key={j.role} className={[j.now && 'now', j.edu && 'edu'].filter(Boolean).join(' ')}>
                  <div className="j-when">{j.when}</div>
                  <h3 className="j-role">
                    {j.role}
                    <span>{j.where}</span>
                  </h3>
                  <p>
                    <span className="j-tag">{j.tag}</span>
                    {j.text}
                  </p>
                </li>
              ))}
            </ol>

            <p className="about-close">
              Different industries, same job: understand it, then make it clear. The same curiosity
              pushed me to learn front-end properly rather than just prompt for it. In 2026 I
              finished CyberSoft's <strong>Professional Front-End Developer</strong> program with an
              Excellent grade, and I built this site myself.
            </p>

            <div className="stat-grid">
              {/* ratios and counts only: no client revenue or spend figures */}
              <div className="stat"><div className="num">2.2x</div><div className="lbl">NMV target growth, Jul → Oct, with cost ratio held flat</div></div>
              <div className="stat"><div className="num">2.5–3x</div><div className="lbl">more NMV per video from booked vs commission-only creators</div></div>
              <div className="stat"><div className="num">10+</div><div className="lbl">beauty &amp; personal-care shops tracked in run-rate dashboards</div></div>
              <div className="stat"><div className="num">3</div><div className="lbl">TikTok Shop markets: Vietnam, Singapore, Indonesia</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
