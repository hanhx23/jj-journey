import { useState } from 'react'

const WORK_ENTRIES = [
  {
    date: 'NOV 2025 — NOW',
    role: 'Operation Executive',
    company: 'Ecomobi PTE · Vietnam',
    bullets: [
      'Monitor and analyze TikTok Ads performance for an FMCG brand, extracting data from TikTok GMV Max and Business Center to evaluate ROAS, CTR, GMV and other key metrics.',
      'Consolidate large-scale advertising datasets into standardized performance reports and dashboards for continuous tracking.',
      'Produce weekly and monthly campaign reports with the Content and Analytics teams to improve GMV and advertising effectiveness.',
    ],
  },
  {
    date: 'OCT 2024 — JUL 2025',
    role: 'Merchandising Trainee',
    company: 'Li & Fung Vietnam',
    bullets: [
      'Managed pre-production coordination with 20+ vendors across Southeast Asia — sourcing, sampling, cost efficiency and on-time delivery for EU and U.S. buyers.',
      'Researched market trends and consumer insights to shape design concepts and product specifications.',
      'Owned end-to-end sample logistics: documentation, submission tracking, and client follow-ups.',
    ],
  },
  {
    date: 'MAY 2023 — JUN 2024',
    role: 'Customer Service Assistant',
    company: 'RMIT Student Connect',
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
      'Owned inventory, supply chain and distribution.',
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

  return (
    <section id="experience">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">02 — experience</div>
          <h2>Where the data work happened.</h2>
          <p>A running log of roles that shaped how I read numbers and manage cross-functional work.</p>
        </div>

        <div className="exp-tabs reveal">
          <button
            className={`exp-tab${tab === 'work-exp' ? ' active' : ''}`}
            type="button"
            onClick={() => setTab('work-exp')}
          >
            Work Experience
          </button>
          <button
            className={`exp-tab${tab === 'leadership' ? ' active' : ''}`}
            type="button"
            onClick={() => setTab('leadership')}
          >
            Leadership &amp; Startups
          </button>
        </div>

        <div className={`exp-panel${tab === 'work-exp' ? ' active' : ''}`}>
          <div className="log reveal">
            <div className="log-bar"><span></span><span></span><span></span>experience.log</div>
            {WORK_ENTRIES.map((entry) => (
              <div className="log-entry" key={entry.role}>
                <div className="log-date">{entry.date}</div>
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
