const MARKETING_SKILLS = [
  'Marketing Analytics (CTR, CIR, ROAS, GMV)',
  'Data Analysis (Excel, Google Sheets)',
  'Campaign Reporting & Dashboarding',
  'Creative Performance Analysis',
  'Cross-functional Collaboration',
  'Logistics & Vendor Coordination',
]

const DEV_SKILLS = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'React.js',
  'Responsive Web Design',
  'Git & GitHub',
  'Astro & Tailwind CSS',
]

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">04 — skills</div>
          <h2>What I bring to a team.</h2>
        </div>

        <div className="skills-grid reveal">
          <div className="skill-col data">
            <div className="sc-head"><span className="sq"></span><h3>MARKETING &amp; ANALYTICS</h3></div>
            <div className="skill-tags">
              {MARKETING_SKILLS.map((s) => <span className="chip" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="skill-col dev">
            <div className="sc-head"><span className="sq"></span><h3>FRONT-END DEVELOPMENT</h3></div>
            <div className="skill-tags">
              {DEV_SKILLS.map((s) => <span className="chip" key={s}>{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
