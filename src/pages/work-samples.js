import * as React from "react"
import SiteNav from "../components/SiteNav"
import MarkDownIcon from "../components/MarkDownIcon"
import ContactBadge from "../components/ContactBadge"
import TypewriterTitle from "../components/TypewriterTitle"
import "./work-samples.css"

import morgenpostLogo from "../images/Berlinermorgenpostlogo(1).jpg"
import tagesanzeigerLogo from "../images/tages-anzeiger.jpg"
import eonLogo from "../images/EON_Logo.svg(1).png"
import spiegelLogo from "../images/2000px-Spiegel-Online-Logo.svg.png"
import mattLogo from "../images/matt(1).png"
import insightsLogo from "../images/Screenshot 2026-01-01 203952(1).png"

const items = [
  {
    title: "Schmerz-Studie\nueberrascht",
    href: "https://www.morgenpost.de/ratgeber-wissen/article408336511/natuerliche-alternative-zu-ibu-co-schmerz-studie-ueberrascht.html",
    iconColor: "var(--brand-lilac)",
    logo: {
      src: morgenpostLogo,
      alt: "Berliner Morgenpost",
      className: "isMorgenpost"
    }
  },
  {
    title: "Biomasse als\nAlleskoenner",
    href: "https://unternehmen.tagesanzeiger.ch/energie/wie-funktioniert-biomasse-als-energielieferant",
    iconColor: "rgba(0,0,0,0.92)",
    logo: { src: tagesanzeigerLogo, alt: "Tages-Anzeiger", className: "isTages" }
  },
  {
    title: "UX Writing for the\nE.ON\nWebsite",
    href: "https://www.eon.de/de/pk/hems/comfort-sichern.html?utm_source=google&utm_medium=cpc&utm_campaign=SEA_SMARTHOME_PK_PERF_COMFLEX_EWK_25&mc=0512412001&gad_source=1&gad_campaignid=22896047259&gbraid=0AAAABAqNVExau53NhcySJiDvxDVVoyj9x&gclid=Cj0KCQiA9t3KBhCQARIsAJOcR7zAp-R8EbFZQiAKRreUt3kAIlo8r_DBsiow7IlS2IlY1GFeIIFO1xYaAmZsEALw_wcB",
    iconColor: "var(--brand-lilac)",
    logo: { src: eonLogo, alt: "E.ON", className: "isSmall" }
  },
  {
    title: "Einzelgaenger nach\nCorona Isolation?",
    href: "https://www.spiegel.de/psychologie/coronakrise-kann-man-das-sozialleben-verlernen-a-586c3302-0a91-4063-b528-f34629f7aca0",
    iconColor: "rgba(0,0,0,0.92)",
    logo: { src: spiegelLogo, alt: "SPIEGEL ONLINE", className: "" }
  }
]

export default function WorkSamplesPage() {
  return (
    <main className="workPage">
      <SiteNav />

      <section className="workWrap">
        <TypewriterTitle as="h1" className="workTitle" text="Work samples" />

        <div className="grid">
          {items.map((it) => (
            <article key={it.href} className="card">
              <div className="iconSlot">
                <a
                  href={it.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={it.title.replace(/\n/g, " ")}
                >
                  <MarkDownIcon color={it.iconColor} size={76} />
                </a>
              </div>

              <a href={it.href} target="_blank" rel="noreferrer">
                <h2 className="cardTitle">
                  {it.title.split("\n").map((line, idx, arr) => (
                    <React.Fragment key={idx}>
                      {line}
                      {idx < arr.length - 1 ? <br /> : null}
                    </React.Fragment>
                  ))}
                </h2>
              </a>

              <div className="logoSlot">
                <a href={it.href} target="_blank" rel="noreferrer">
                  <img
                    className={`logoImg ${it.logo.className || ""}`}
                    src={it.logo.src}
                    alt={it.logo.alt}
                    loading="lazy"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="bottomLogos" aria-label="More work">
          <a
            className="bottomLogo bottomLogoMatt"
            href="https://matt.de/"
            target="_blank"
            rel="noreferrer"
            aria-label="MATT"
          >
            <img className="bottomLogoImg isMatt" src={mattLogo} alt="MATT" />
          </a>

          <a
            className="bottomLogo bottomLogoInsights"
            href="https://www.insights.com/de/"
            target="_blank"
            rel="noreferrer"
            aria-label="insights"
          >
            <img
              className="bottomLogoImg isInsights"
              src={insightsLogo}
              alt="insights"
            />
          </a>
        </div>
      </section>

      <ContactBadge floating />
    </main>
  )
}

export const Head = () => <title>Work samples | Camares Amonat</title>
