import * as React from "react"
import SiteNav from "../components/SiteNav"
import reflectors from "../images/reflectors.jpg"
import TypewriterTitle from "../components/TypewriterTitle"
import "./about.css"

export default function AboutPage() {
  return (
    <main className="aboutPage">
      <SiteNav />

      <section className="aboutWrap">
        <div>
          <TypewriterTitle as="h1" className="aboutTitle" text="About me" />

          <div className="aboutText">
            <p>
              For <span className="hi">more than eight years</span>, I have
              worked in content creation, focusing on clear, well-structured
              texts for different formats and channels.
            </p>
            <p>
              As a journalist, I have written for{" "}
              <span className="hi">
                DIE ZEIT, DER SPIEGEL, DIE WELT and Berliner Morgenpost
              </span>
              , mainly on topics related to psychology and sustainability.
            </p>
            <p>
              As a copywriter, I have supported projects for{" "}
              <span className="hi">
                Bosch Hausgeraete, Matt Optik and Insights
              </span>
              .
            </p>
            <p>
              In UX writing, I worked for companies such as{" "}
              <span className="hi">E.ON</span>.
            </p>
            <p>
              Alongside my writing work, I bring experience in{" "}
              <span className="hi">video production and filmmaking</span>, as
              well as in <span className="hi">acting and moderating</span>, both
              on camera and on stage.
            </p>
          </div>
        </div>

        <div className="rightImage" aria-hidden="true">
          <img src={reflectors} alt="" />
        </div>
      </section>
    </main>
  )
}

export const Head = () => <title>About Me | Camares Amonat</title>
