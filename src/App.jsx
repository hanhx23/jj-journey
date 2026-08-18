import ScrollProgress from './components/ScrollProgress.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Credentials from './components/Credentials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import useReveal from './hooks/useReveal.js'

export default function App() {
  // re-observes .reveal elements after the whole tree has mounted
  useReveal([])

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
