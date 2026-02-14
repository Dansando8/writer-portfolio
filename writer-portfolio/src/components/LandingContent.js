import * as React from "react"
import SiteNav from "./SiteNav"
import ContactBadge from "./ContactBadge"
import TypewriterTitle from "./TypewriterTitle"
import Disclaimer from "./Disclaimer"
import bg1600Jpg from "../images/optimized/background_writing_machine-1600.jpg"
import bg2400Jpg from "../images/optimized/background_writing_machine-2400.jpg"
import bg1600Webp from "../images/optimized/background_writing_machine-1600.webp"
import bg2400Webp from "../images/optimized/background_writing_machine-2400.webp"

import "../pages/index.css"

export function LandingContent({ translation }) {
  const [ready, setReady] = React.useState(false)
  const [imgLoaded, setImgLoaded] = React.useState(false)
  const [titleDone, setTitleDone] = React.useState(false)
  const [contentVisible, setContentVisible] = React.useState(false)

  React.useEffect(() => {
    if (ready) return
    const t = window.setTimeout(() => setReady(true), 8000)
    return () => window.clearTimeout(t)
  }, [ready])

  React.useEffect(() => {
    if (!imgLoaded) return
    let cancelled = false

    ;(async () => {
      try {
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

  React.useEffect(() => {
    if (!ready) setTitleDone(false)
  }, [ready])

  React.useEffect(() => {
    if (!titleDone) {
      setContentVisible(false)
      return
    }
    const timer = window.setTimeout(() => setContentVisible(true), 640)
    return () => window.clearTimeout(timer)
  }, [titleDone])

  return (
    <main
      className="hero"
      lang={translation.meta.basePath === "/en" ? "en" : "de"}
      data-locale={translation.meta.basePath === "/en" ? "en" : "de"}
    >
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

      <SiteNav
        labels={translation.nav}
        pathPrefix={translation.meta.basePath}
        locale={translation.meta.locale}
      />

      <section className="content">
        <div className="headlineBlock">
          {ready ? (
            <TypewriterTitle
              as="h1"
              className="name"
              text={translation.hero.title}
              onDone={() => setTitleDone(true)}
            />
          ) : (
            <h1 className="name" style={{ visibility: "hidden" }}>
              {translation.hero.title}
            </h1>
          )}
          <p className={`tagline reveal ${contentVisible ? "isVisible" : ""}`}>
            {translation.hero.taglineLines.map((line, idx) => (
              <React.Fragment key={`${line}-${idx}`}>
                <span>{line}</span>
                {idx < translation.hero.taglineLines.length - 1 ? <br /> : null}
              </React.Fragment>
            ))}
          </p>
        </div>

        <div className="contactSpacer" aria-hidden="true" />

        <ContactBadge
          floating
          className={`reveal ${contentVisible ? "isVisible" : ""}`}
          strings={translation.contact}
        />
        <Disclaimer text={translation.disclaimer} />
      </section>
    </main>
  )
}

export function LandingHead({ translation }) {
  return (
    <>
      <title>{translation.meta.landingTitle}</title>
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
}
