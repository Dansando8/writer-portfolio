import * as React from "react"
import bg from "../images/background_writing_machine.jpg"
import SiteNav from "../components/SiteNav"
import ContactBadge from "../components/ContactBadge"
import TypewriterTitle from "../components/TypewriterTitle"
import "./index.css"

const IndexPage = () => {
  return (
    <main className="hero">
      <div className="heroBg" style={{ backgroundImage: `url(${bg})` }} />
      <div className="heroTopBlur" aria-hidden="true" />
      <div className="heroShade" />

      <SiteNav />

      <section className="content">
        <div className="headlineBlock">
          <TypewriterTitle as="h1" className="name" text="Camares Amonat" />
          <p className="tagline">
            <span>Journalism, Copywriting</span>
            <br />
            <span>&amp; UX Writing</span>
          </p>
        </div>

        <div className="contactWrap">
          <ContactBadge />
        </div>
      </section>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Camares Amonat</title>
