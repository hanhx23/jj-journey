const PROJECTS = [
  {
    url: 'https://air-bn-b-capstone-pro.vercel.app/',
    urlLabel: 'air-bn-b-capstone-pro.vercel.app',
    image: '/assets/airbnb.jpg',
    alt: 'Airbnb clone listings page screenshot',
    title: 'Airbnb Clone',
    description:
      "A front-end capstone recreating Airbnb's booking experience — built with React.js, with a componentized listings grid, property detail views, and a fully responsive layout.",
    stack: ['React.js', 'HTML5', 'CSS3', 'Responsive UI'],
  },
  {
    url: 'https://capstone-do-my-hanh.vercel.app/',
    urlLabel: 'capstone-do-my-hanh.vercel.app',
    image: '/assets/astroship.jpg',
    alt: 'Astroship Pro landing page screenshot',
    title: 'Astroship Pro Landing Page',
    description:
      'A premium SaaS landing page rebuilt with Astro and Tailwind CSS — pixel-close to the source design, with reusable sections and full mobile responsiveness.',
    stack: ['Astro', 'Tailwind CSS', 'Component Design'],
  },
]

export default function Projects() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">03 — projects</div>
          <h2>Front-end builds.</h2>
          <p>Capstone projects from my CyberSoft training — built to practice responsive layout, component structure and clean interaction design.</p>
        </div>

        <div className="proj-grid">
          {PROJECTS.map((p) => (
            <div className="proj-card reveal" key={p.title}>
              <div className="browser-bar">
                <div className="browser-dots"><span></span><span></span><span></span></div>
                <div className="browser-url">{p.urlLabel}</div>
              </div>
              <div className="proj-preview">
                <span className="tag">capstone</span>
                <img src={p.image} alt={p.alt} loading="lazy" />
              </div>
              <div className="proj-body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="proj-stack">
                  {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
                </div>
                <a className="proj-link" href={p.url} target="_blank" rel="noopener noreferrer">
                  View live site →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
