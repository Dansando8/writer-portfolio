import * as React from "react"
import SiteNav from "./SiteNav"
import TypewriterTitle from "./TypewriterTitle"
import Disclaimer from "./Disclaimer"
import reflectors from "../images/reflectors.jpg"
import "../pages/about.css"

export function AboutContent({ translation }) {
  const [titleDone, setTitleDone] = React.useState(false)

  return (
    <main className="aboutPage">
      <SiteNav
        labels={translation.nav}
        pathPrefix={translation.meta.basePath}
        locale={translation.meta.locale}
      />

      <section className="aboutWrap">
        <div>
          <TypewriterTitle
            as="h1"
            className="aboutTitle"
            text={translation.about.title}
            onDone={() => setTitleDone(true)}
          />

          <div className={`aboutText reveal ${titleDone ? "isVisible" : ""}`}>
            {translation.about.paragraphs.map((paragraph, pIdx) => (
              <p key={pIdx}>
                {paragraph.map((segment, sIdx) =>
                  segment.highlight ? (
                    <span key={sIdx} className="hi">
                      {segment.text}
                    </span>
                  ) : (
                    <React.Fragment key={sIdx}>{segment.text}</React.Fragment>
                  )
                )}
              </p>
            ))}
          </div>
        </div>

        <div
          className={`rightImage reveal ${titleDone ? "isVisible" : ""}`}
          aria-hidden="true"
        >
          <img src={reflectors} alt="" />
        </div>
      </section>
      <Disclaimer text={translation.disclaimer} />
    </main>
  )
}

export function AboutHead({ translation }) {
  return <title>{`${translation.meta.aboutTitle} | Amonat`}</title>
}
