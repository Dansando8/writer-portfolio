import * as React from "react"
import SiteNav from "../components/SiteNav"
import TypewriterTitle from "../components/TypewriterTitle"
import "./education.css"

export default function EducationPage() {
  const [titleDone, setTitleDone] = React.useState(false)

  return (
    <main className="educationPage">
      <SiteNav />

      <section className="educationWrap">
        <div className="leftCol">
          <TypewriterTitle
            as="h1"
            className="eduTitle"
            text={"My\nEducation"}
            onDone={() => setTitleDone(true)}
          />

          <div className={`leftFoot reveal ${titleDone ? "isVisible" : ""}`}>
            <div className="leftFootTitle">Arche Medica</div>
            <p className="leftFootText">
              Alternative Practitioner in Psychotherapy
            </p>
          </div>
        </div>

        <ul className={`eduList reveal ${titleDone ? "isVisible" : ""}`}>
          <li>
            <h2 className="eduItemTitle">Humboldt University Berlin</h2>
            <p className="eduItemText">
              {
                "Master\nMedia Studies\nMaster Thesis: The Impact of\nArtificial Intelligence on\nJournalism ( Grade: 1,1)"
              }
            </p>
          </li>

          <li>
            <h2 className="eduItemTitle">Free University Berlin</h2>
            <p className="eduItemText">
              {"Bachelor\nJournalism and\nCommunication Studies and\nFilm Studies"}
            </p>
          </li>

          <li>
            <h2 className="eduItemTitle">
              University of Leeds and University of Chulalongkorn
            </h2>
            <p className="eduItemText">
              {"Exchange Semesters\nCommunication and Film Studies"}
            </p>
          </li>
        </ul>
      </section>
    </main>
  )
}

export const Head = () => <title>Education | Amonat</title>
