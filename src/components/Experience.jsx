import { useRef, useState } from 'react'

const CV_URL = '/assets/Do%20My%20Hanh%20-%20CV.pdf'

const WORK_ENTRIES = [
  {
    date: 'NOV 2025 — NOW',
    role: 'Operation Executive',
    company: 'Ecomobi PTE · Vietnam',
    logo: { src: '/assets/logo-ecomobi.png', alt: 'Ecomobi logo', wide: true },
    bullets: [
      <>Run TikTok Shop GMV Max performance for FMCG clients in three markets — <strong>Unilever</strong> (Vietnam, Singapore), <strong>NIVEA</strong> (Indonesia) and <strong>L’Oréal</strong> — tracking ROAS, CTR and GMV, and choosing which hero SKUs each month’s budget goes behind.</>,
      'Build content-commerce plans from the numbers up, balancing booked creators — who bring 2.5–3x more NMV per video — with commission-only creators for volume: a mix that grows the NMV target 2.2x from July to October while CIR holds at 19%.',
      'Track video and livestream sales for 10+ beauty and personal-care shops, from Kiehl’s and Kérastase to Florasis and Banila Co, in run-rate dashboards that flag mid-month which brands are behind — early enough to act.',
      'Write weekly and monthly key-learning reports with the content and analytics teams: what won, what lost, and what to test next.',
    ],
  },
  {
    date: 'OCT 2024 — JUL 2025',
    role: 'Merchandising Trainee',
    company: 'Li & Fung Vietnam',
    logo: { src: '/assets/logo-lifung.png', alt: 'Li & Fung logo' },
    bullets: [
      <>Sourced and vetted ODM factories to develop and produce goods for <strong>Action</strong>, the Dutch non-food discount retailer and our largest account.</>,
      'Coordinated pre-production with 20+ vendors across Southeast Asia — sampling, costing and on-time delivery for EU and U.S. buyers — and owned sample logistics end to end.',
      'Researched market trends and consumer insights to shape design concepts and product specifications.',
    ],
  },
  {
    date: 'MAY 2023 — JUN 2024',
    role: 'Customer Service Assistant',
    company: 'RMIT Student Connect',
    logo: { src: '/assets/logo-rmit.png', alt: 'RMIT University logo' },
    bullets: [
      'Handled Tier-1 customer service as primary point of contact, managing 20–30 inquiries daily across in-person and phone channels.',
      'Resolved complaints and escalated to line managers when necessary.',
      'Executed clerical and administrative tasks using Microsoft Excel and Genesis software.',
    ],
  },
]

const LEADERSHIP_ENTRIES = [
  {
    date: 'Feb – May 2024',
    title: 'Head of Logistics Operations — NHIET',
    bullets: [
      'Set up a manufacturing partnership in Hoi An to produce a limited collection of 50 handcrafted lantern lights.',
      'Managed direct-to-consumer fulfillment end to end — order receipt, payment, delivery.',
      'NHIET brings Vietnamese culture to Gen Z through oak wood and leather goods handcrafted by Hoi An artisans; all revenue raised is donated to charity.',
    ],
    ig: {
      image: '/assets/nhiet.jpg',
      alt: 'NHIET Instagram',
      handle: '@nhiet.artisan',
      url: 'https://www.instagram.com/nhiet.artisan/',
      meta: '1,000 followers · 100% of revenue to charity',
    },
  },
  {
    date: 'Sep – Dec 2023',
    title: 'Founder — PoKay Hanoi',
    bullets: [
      "My summer project — founded and ran an F&B startup end to end.",
      'Started it to find out whether a business student could turn a classroom idea into something strangers would pay for — not in a case study, but with my own money, suppliers I found myself and customers free to say no.',
      'Used data analysis to cut waste and improve operational efficiency.',
    ],
    ig: {
      image: '/assets/pokay.jpg',
      alt: 'PoKay Hanoi Instagram',
      handle: '@pokay.hn',
      url: 'https://www.instagram.com/pokay.hn',
      meta: '600 organic followers in 1 month',
    },
  },
  {
    date: '2024 – 2025',
    titleNode: (
      <>
        Contributing Member —{' '}
        <a
          href="https://www.rmit.edu.vn/students/campus-life/clubs/hanoi-city-campus-clubs/academic-clubs/business-finance-club"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', borderBottom: '1px dashed var(--text-faint)' }}
        >
          RMIT Business &amp; Finance Hanoi Club
        </a>
      </>
    ),
    bullets: [
      'Active member of a two-time RMIT "Club of the Year" (2024, consecutively since 2022).',
      <>Contributed to FBA Conference 2024 — <em>"Business Analysts in the Digital Transformation Era"</em> — which drew 100+ attendees and industry speakers.</>,
      'Helped secure sponsorship and build connections across 115 universities and 15 journals for a flagship conference reaching 450+ attendees.',
    ],
  },
  {
    date: 'Oct 2022',
    title: 'Organizer — Pacific Ocean Partners Group',
    bullets: [
      'Supported the Vietnamese premiere of "Alice in Wonderland," a Broadway-style English-language musical staged at the Hanoi Opera House.',
      'A co-production between the Vietnam National Drama Theatre, Pacific Ocean Partners Group and the Australian Institute of Music, performed by a largely amateur student cast.',
      'Coordinated live-event logistics from the control area and kept subtitle timing in sync with the cast.',
    ],
  },
]

export default function Experience() {
  const [tab, setTab] = useState('work-exp')
  const [leadSeen, setLeadSeen] = useState(false)   // hint + wiggle stop once Leadership has been opened
  const tabsRef = useRef(null)
  const startups = LEADERSHIP_ENTRIES.filter((e) => e.ig)

  function openTab(id, scrollToTabs = false) {
    setTab(id)
    if (id === 'leadership') setLeadSeen(true)
    if (scrollToTabs) tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="experience">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">02 — experience</div>
          <h2>Where the data work happened.</h2>
          <p>A running log of roles that shaped how I read numbers and manage cross-functional work.</p>
        </div>

        <div className="exp-tabs reveal" ref={tabsRef}>
          <button
            className={`exp-tab${tab === 'work-exp' ? ' active' : ''}`}
            type="button"
            onClick={() => openTab('work-exp')}
          >
            Work Experience
          </button>
          <button
            className={`exp-tab lead-tab${tab === 'leadership' ? ' active' : ''}${leadSeen ? '' : ' nudge'}`}
            type="button"
            onClick={() => openTab('leadership')}
          >
            Leadership &amp; Startups
            <span className="tab-count">{LEADERSHIP_ENTRIES.length}</span>
          </button>
          {!leadSeen && (
            <span className="tab-hint hand" aria-hidden="true">
              <svg viewBox="0 0 64 34" width="46" height="25">
                <path d="M60 26 C 42 34, 20 30, 8 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M3 22 L8 11 L19 15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              psst — {startups.length} startups in here
            </span>
          )}
          {/* right end of the tab row on desktop, its own line on phones */}
          <a href={CV_URL} className="btn btn-primary btn-cv exp-cv" download="Do-My-Hanh-CV.pdf" data-cursor="download">
            Download CV
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v10m0 0-4-4m4 4 4-4M4 16h12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

        <div className={`exp-panel${tab === 'work-exp' ? ' active' : ''}`}>
          <div className="log reveal">
            <div className="log-bar"><span></span><span></span><span></span>experience.log</div>
            {WORK_ENTRIES.map((entry) => (
              <div className="log-entry" key={entry.role}>
                <div className="log-date">
                  <span>{entry.date}</span>
                  {entry.logo && (
                    <img
                      className={`co-logo${entry.logo.wide ? ' wide' : ''}`}
                      src={entry.logo.src}
                      alt={entry.logo.alt}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="log-role">
                  <h3>{entry.role}</h3>
                  <span className="co">{entry.company}</span>
                  <ul>
                    {entry.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* end-of-log teaser: whoever finishes reading the day job gets pointed at the side projects */}
          <button type="button" className="lead-teaser reveal" onClick={() => openTab('leadership', true)}>
            <span className="lt-thumbs" aria-hidden="true">
              {startups.map((s) => <img key={s.ig.handle} src={s.ig.image} alt="" loading="lazy" />)}
            </span>
            <span className="lt-text">
              <span className="lt-kicker">Off the clock</span>
              <span className="lt-title">
                I ran two startups of my own, shipped 50 lanterns for charity and worked backstage at the Hanoi Opera House.
              </span>
            </span>
            <span className="lt-go" aria-hidden="true">→</span>
          </button>
        </div>

        <div className={`exp-panel${tab === 'leadership' ? ' active' : ''}`}>
          <div className="lead-grid reveal">
            {LEADERSHIP_ENTRIES.map((entry, idx) => (
              <div className="lead-card" key={idx}>
                <div className="lc-date">{entry.date}</div>
                <h4>{entry.titleNode ?? entry.title}</h4>
                <ul>
                  {entry.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                {entry.ig && (
                  <div className="lc-ig">
                    <img src={entry.ig.image} alt={entry.ig.alt} loading="lazy" />
                    <div className="ig-meta">
                      <a href={entry.ig.url} target="_blank" rel="noopener noreferrer">{entry.ig.handle}</a>
                      <br />
                      <span className="followers">{entry.ig.meta}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}