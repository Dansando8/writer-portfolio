import * as React from "react"
import SiteNav from "./SiteNav"
import TypewriterTitle from "./TypewriterTitle"
import Disclaimer from "./Disclaimer"
import "../pages/education.css"

export function EducationContent({ translation }) {
  const [titleDone, setTitleDone] = React.useState(false)

  return (
    <main className="educationPage">
      <SiteNav
        labels={translation.nav}
        pathPrefix={translation.meta.basePath}
        locale={translation.meta.locale}
      />

      <section className="educationWrap">
        <div className="leftCol">
          <TypewriterTitle
            as="h1"
            className="eduTitle"
            text={translation.education.title}
            onDone={() => setTitleDone(true)}
          />

          <div className={`leftFoot reveal ${titleDone ? "isVisible" : ""}`}>
            <div className="leftFootTitle">
              {translation.education.footer.title}
            </div>
            <p className="leftFootText">
              {translation.education.footer.description}
            </p>
          </div>
        </div>

        <ul className={`eduList reveal ${titleDone ? "isVisible" : ""}`}>
          {translation.education.training.map((item) => (
            <li key={item.institution}>
              <h2 className="eduItemTitle">{item.institution}</h2>
              <p className="eduItemText">{item.details.join("\n")}</p>
            </li>
          ))}
        </ul>
      </section>
      <Disclaimer text={translation.disclaimer} />
    </main>
  )
}

export function EducationHead({ translation }) {
  return <title>{`${translation.meta.educationTitle} | Amonat`}</title>
}
