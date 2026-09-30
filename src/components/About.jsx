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
            <p>
              <strong>I'm a Business Management graduate (minor in Logistics &amp; Supply Chain)</strong> from
              RMIT University, currently working as an Operation Executive analyzing TikTok Ads
              performance for an FMCG brand — pulling data from GMV Max and Business Center to
              track ROAS, CTR and GMV, then turning it into reports the content and analytics
              teams can act on.
            </p>
            <p>
              Before that, I coordinated production for 20+ vendors across Southeast Asia at Li &amp;
              Fung, and ran founder-level operations for two of my own startup projects. Along the
              way I picked up a habit: whatever the dataset or the deliverable, my job is to make
              it easy for someone else to understand and use.
            </p>
            <p>
              That same instinct pulled me toward the front end — but the real root of it is
              curiosity. I've always wanted to understand how the things around me actually work,
              and I went looking for that in an era where AI can build a working interface in a
              single second. I wanted to know what was happening underneath, not just prompt for
              it. So in 2026, I completed CyberSoft's <strong>Professional Front-End Developer</strong>{' '}
              program, graduating with an Excellent grade, and combined with real life experience, now I build the kind of clean,
              responsive interfaces I always wished my dashboards looked like.
            </p>
            <div className="stat-grid">
              <div className="stat"><div className="num">3</div><div className="lbl">roles across marketing, merchandising &amp; ops</div></div>
              <div className="stat"><div className="num">20+</div><div className="lbl">vendors coordinated across SE Asia</div></div>
              <div className="stat"><div className="num">Excellent</div><div className="lbl">CyberSoft Front-End graduation grade</div></div>
              <div className="stat"><div className="num">7.5</div><div className="lbl">IELTS band score</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
