import * as React from "react"
import SiteNav from "../components/SiteNav"
import ContactBadge from "../components/ContactBadge"
import TypewriterTitle from "../components/TypewriterTitle"
import "./index.css"

import bg1600Jpg from "../images/optimized/background_writing_machine-1600.jpg"
import bg2400Jpg from "../images/optimized/background_writing_machine-2400.jpg"
import bg1600Webp from "../images/optimized/background_writing_machine-1600.webp"
import bg2400Webp from "../images/optimized/background_writing_machine-2400.webp"

const IndexPage = () => {
  const [ready, setReady] = React.useState(false)
  const [imgLoaded, setImgLoaded] = React.useState(false)

  React.useEffect(() => {
    // Avoid an infinite loader if the image fails to load for any reason.
    if (ready) return
    const t = window.setTimeout(() => setReady(true), 8000)
    return () => window.clearTimeout(t)
  }, [ready])

  React.useEffect(() => {
    if (!imgLoaded) return
    let cancelled = false

    ;(async () => {
      try {
        // Wait for fonts to avoid swapping during typewriter animation.
        if (typeof document !== "undefined" && document.fonts?.ready) {
          await document.fonts.ready
        }
      } catch {
        // Ignore
      }
      if (!cancelled) setReady(true)
    })()

    return () => {
      cancelled = true
    }
  }, [imgLoaded])

  return (
    <main className="hero">
      {!ready ? (
        <div className="loaderOverlay" role="status" aria-live="polite">
          <div className="loaderInner">
            <span className="loaderTextTyped">Loading</span>
            <span className="loaderCaret" aria-hidden="true" />
          </div>
        </div>
      ) : null}

      <div className="heroMedia" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet={`${bg1600Webp} 1600w, ${bg2400Webp} 2400w`}
            sizes="100vw"
          />
          <img
            className="heroImg"
            src={bg2400Jpg}
            srcSet={`${bg1600Jpg} 1600w, ${bg2400Jpg} 2400w`}
            sizes="100vw"
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onLoad={() => setImgLoaded(true)}
          />
        </picture>
      </div>
      <div className="heroTopBlur" aria-hidden="true" />
      <div className="heroShade" />

      <SiteNav />

      <section className="content">
        <div className="headlineBlock">
          {ready ? (
            <TypewriterTitle as="h1" className="name" text="Camares Amonat" />
          ) : (
            <h1 className="name" style={{ visibility: "hidden" }}>
              Camares Amonat
            </h1>
          )}
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

export const Head = () => (
  <>
    <title>Camares Amonat</title>
    <link
      rel="preload"
      as="image"
      href={bg2400Webp}
      type="image/webp"
      imagesrcset={`${bg1600Webp} 1600w, ${bg2400Webp} 2400w`}
      imagesizes="100vw"
    />
  </>
)
