import * as React from "react"
import SiteNav from "../components/SiteNav"
import ContactBadge from "../components/ContactBadge"
import TypewriterTitle from "../components/TypewriterTitle"
import "./index.css"

import bg1600Jpg from "../images/optimized/background_writing_machine-1600.jpg"
import bg2400Jpg from "../images/optimized/background_writing_machine-2400.jpg"
import bg1600Webp from "../images/optimized/background_writing_machine-1600.webp"
import bg2400Webp from "../images/optimized/background_writing_machine-2400.webp"

const DEFAULT_LOADER_DELAY_MS = 2500

const getLoaderDelay = () => {
  if (typeof window === "undefined") return DEFAULT_LOADER_DELAY_MS
  return new URLSearchParams(window.location.search).get("debugLoader") === "1"
    ? 120000
    : DEFAULT_LOADER_DELAY_MS
}

const isLoaderDebug = () => getLoaderDelay() === 120000

const IndexPage = () => {
  const heroImgRef = React.useRef(null)
  const [ready, setReady] = React.useState(false)
  const [imgLoaded, setImgLoaded] = React.useState(false)
  const [titleDone, setTitleDone] = React.useState(false)

  React.useEffect(() => {
    // Avoid an infinite loader if the image fails to load for any reason.
    if (ready) return
    const delay = getLoaderDelay()
    const t = window.setTimeout(() => setReady(true), delay)
    return () => window.clearTimeout(t)
  }, [ready])

  React.useEffect(() => {
    if (!imgLoaded || isLoaderDebug()) return
    setReady(true)
  }, [imgLoaded])

  React.useEffect(() => {
    if (!ready) setTitleDone(false)
  }, [ready])

  React.useEffect(() => {
    const node = heroImgRef.current
    if (node && node.complete) {
      setImgLoaded(true)
    }
  }, [])

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
            ref={heroImgRef}
            className="heroImg"
            src={bg1600Jpg}
            srcSet={`${bg1600Jpg} 1600w, ${bg2400Jpg} 2400w`}
            sizes="100vw"
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(true)}
          />
        </picture>
      </div>
      <div className="heroTopBlur" aria-hidden="true" />
      <div className="heroShade" />

      {ready ? <SiteNav /> : null}

      <section className="content">
        <div className="headlineBlock">
          {ready ? (
            <TypewriterTitle
              as="h1"
              className="name"
              text="Amonat"
              onDone={() => setTitleDone(true)}
            />
          ) : (
            <h1 className="name" style={{ visibility: "hidden" }}>
              Amonat
            </h1>
          )}
          <p className={`tagline reveal ${titleDone ? "isVisible" : ""}`}>
            <span>Journalism, Copywriting</span>
            <br />
            <span>&amp; UX Writing</span>
          </p>
        </div>

        {/* Spacer keeps the headline vertically positioned like the mock while the contact card floats. */}
        <div className="contactSpacer" aria-hidden="true" />

        <ContactBadge
          floating
          className={`reveal ${titleDone ? "isVisible" : ""}`}
        />
      </section>
    </main>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>Amonat</title>
    <link
      rel="preload"
      as="image"
      href={bg1600Webp}
      type="image/webp"
      imagesrcset={`${bg1600Webp} 1600w, ${bg2400Webp} 2400w`}
      imagesizes="100vw"
    />
  </>
)
