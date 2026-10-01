export default function Credentials() {
  return (
    <section id="credentials">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">06 — credentials</div>
          <h2>Certification &amp; education.</h2>
        </div>

        <div className="cred-grid">
          <div className="cred-card reveal">
            <div className="cc-top">
              <div>
                <h3>Professional Front-End Developer</h3>
                <span className="issuer">CyberSoft — cybersoft.edu.vn</span>
              </div>
              <span className="badge">Excellent</span>
            </div>
            <div className="cred-meta">
              <div><div className="m-lbl">Grade</div><div className="m-val gold">Excellent</div></div>
              <div><div className="m-lbl">Duration</div><div className="m-val">6 months</div></div>
              <div><div className="m-lbl">Issued</div><div className="m-val">22 Jun 2026</div></div>
              <div><div className="m-lbl">Certificate No.</div><div className="m-val">FE/2026/20263149</div></div>
            </div>
          </div>

          <div className="cred-card edu-card reveal">
            <h3>RMIT University</h3>
            <span className="deg">Bachelor of Business (Management) · Minor in Logistics &amp; Supply Chain</span>
            <ul>
              <li>October 2021 — February 2025 · Vietnam</li>
              <li>IELTS 7.5 Certificate</li>
              <li>
                Contributing member,{' '}
                <a
                  href="https://www.rmit.edu.vn/students/campus-life/clubs/hanoi-city-campus-clubs/academic-clubs/business-finance-club"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--gold)' }}
                >
                  RMIT Business &amp; Finance Hanoi Club
                </a>{' '}
                (2024–2025)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
