import * as React from "react"
import { navigate } from "gatsby"
import SiteNav from "./SiteNav"
import ContactBadge from "./ContactBadge"
import TypewriterTitle from "./TypewriterTitle"
import { requestTypewriterAudioUnlock } from "./TypewriterTitle"
import Disclaimer from "./Disclaimer"
import PortfolioToggle from "./PortfolioToggle"
import bg1600Jpg from "../images/optimized/background_writing_machine-1600.jpg"
import bg2400Jpg from "../images/optimized/background_writing_machine-2400.jpg"
import bg1600Webp from "../images/optimized/background_writing_machine-1600.webp"
import bg2400Webp from "../images/optimized/background_writing_machine-2400.webp"
import theater1600Webp from "../images/optimized/theater-1600.webp"
import { usePortfolioVariant } from "../hooks/usePortfolioVariant"
import { resolvePortfolioContent } from "../data/portfolioContent"

import "../pages/index.css"

const DEFAULT_LOADER_DELAY_MS = 2500

const getLoaderDelay = () => {
  if (typeof window === "undefined") return DEFAULT_LOADER_DELAY_MS
  return new URLSearchParams(window.location.search).get("debugLoader") === "1"
    ? 120000
    : DEFAULT_LOADER_DELAY_MS
}

const isLoaderDebug = () => getLoaderDelay() === 120000

const HOME_PATHS = {
  de: { writing: "/writing", impro: "/impro" },
  en: { writing: "/en/writing", impro: "/en/impro" }
}

export function LandingContent({ translation, forcedVariant }) {
  const [storedVariant, setStoredVariant] = usePortfolioVariant()
  const portfolioVariant = forcedVariant || storedVariant
  const localeKey = translation.meta.locale === "en" ? "en" : "de"
  const content = React.useMemo(
    () => resolvePortfolioContent(translation.meta.locale, portfolioVariant),
    [translation.meta.locale, portfolioVariant]
  )
  const resolveHomePath = React.useCallback(
    (variant) => HOME_PATHS[localeKey][variant === "impro" ? "impro" : "writing"],
    [localeKey]
  )
  const setPortfolioVariant = React.useCallback(
    (nextVariant) => {
      const normalized = nextVariant === "impro" ? "impro" : "writing"
      setStoredVariant(normalized)
      const targetPath = resolveHomePath(normalized)
      if (typeof window !== "undefined" && window.location.pathname !== targetPath) {
        navigate(targetPath)
      }
    },
    [resolveHomePath, setStoredVariant]
  )

  const heroSources = React.useMemo(() => {
    if (portfolioVariant === "impro") {
      return {
        sourceType: "image/webp",
        sourceSet: `${theater1600Webp} 1600w`,
        imgSrc: theater1600Webp,
        imgSet: `${theater1600Webp} 1600w`
      }
    }
    return {
      sourceType: "image/webp",
      sourceSet: `${bg1600Webp} 1600w, ${bg2400Webp} 2400w`,
      imgSrc: bg1600Jpg,
      imgSet: `${bg1600Jpg} 1600w, ${bg2400Jpg} 2400w`
    }
  }, [portfolioVariant])
  const heroImgRef = React.useRef(null)
  const [ready, setReady] = React.useState(false)
  const [entered, setEntered] = React.useState(false)
  const [imgLoaded, setImgLoaded] = React.useState(false)
  const [titleDone, setTitleDone] = React.useState(false)
  const [contentVisible, setContentVisible] = React.useState(false)
  const enterLabel = translation.meta.locale === "en" ? "Enter" : "Eintreten"

  React.useEffect(() => {
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
    if (!ready || !entered) setTitleDone(false)
  }, [ready, entered])

  React.useEffect(() => {
    const node = heroImgRef.current
    if (node && node.complete) {
      setImgLoaded(true)
    }
  }, [])

  React.useEffect(() => {
    if (!entered || !titleDone) {
      setContentVisible(false)
      return
    }
    const timer = window.setTimeout(() => setContentVisible(true), 640)
    return () => window.clearTimeout(timer)
  }, [entered, titleDone])

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const onEarlyInteraction = () => requestTypewriterAudioUnlock()
    window.addEventListener("pointerdown", onEarlyInteraction, { passive: true })
    window.addEventListener("touchstart", onEarlyInteraction, { passive: true })
    window.addEventListener("keydown", onEarlyInteraction)
    window.addEventListener("wheel", onEarlyInteraction, { passive: true })
    return () => {
      window.removeEventListener("pointerdown", onEarlyInteraction)
      window.removeEventListener("touchstart", onEarlyInteraction)
      window.removeEventListener("keydown", onEarlyInteraction)
      window.removeEventListener("wheel", onEarlyInteraction)
    }
  }, [])

  return (
    <main
      className="hero"
      lang={translation.meta.locale === "en" ? "en" : "de"}
      data-locale={translation.meta.locale === "en" ? "en" : "de"}
    >
      {!ready ? (
        <div className="loaderOverlay" role="status" aria-live="polite">
          <div className="loaderInner">
            <span className="loaderTextTyped">Loading</span>
            <span className="loaderCaret" aria-hidden="true" />
          </div>
        </div>
      ) : !entered ? (
        <div className="loaderOverlay isEnterGate" role="dialog" aria-modal="true">
          <div className="loaderGateInner">
            <button
              type="button"
              className="loaderEnterButton"
              onClick={() => {
                requestTypewriterAudioUnlock()
                setEntered(true)
              }}
            >
              {enterLabel}
            </button>
          </div>
        </div>
      ) : null}

      <div className="heroMedia" aria-hidden="true">
        <picture>
          <source
            type={heroSources.sourceType}
            srcSet={heroSources.sourceSet}
            sizes="100vw"
          />
          <img
            ref={heroImgRef}
            className="heroImg"
            src={heroSources.imgSrc}
            srcSet={heroSources.imgSet}
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

      {ready && entered ? (
        <SiteNav
          labels={content.nav}
          pathPrefix={content.meta.basePath}
          locale={content.meta.locale}
          showEducation={Boolean(content.nav?.education)}
        />
      ) : null}

      <section className="content">
        <div className="headlineBlock">
          {ready && entered ? (
            <TypewriterTitle
              as="h1"
              className="name"
              text={content.hero.title}
              onDone={() => setTitleDone(true)}
            />
          ) : (
            <h1 className="name" style={{ visibility: "hidden" }}>
              {content.hero.title}
            </h1>
          )}
          <p className={`tagline reveal ${contentVisible ? "isVisible" : ""}`}>
            {content.hero.taglineLines.map((line, idx) => (
              <React.Fragment key={`${line}-${idx}`}>
                <span>{line}</span>
                {idx < content.hero.taglineLines.length - 1 ? <br /> : null}
              </React.Fragment>
            ))}
          </p>
        </div>

        <div className="contactSpacer" aria-hidden="true" />

        <ContactBadge
          floating
          className={`reveal ${contentVisible ? "isVisible" : ""}`}
          strings={content.contact}
        />
        <div className={`portfolioToggleDock reveal ${contentVisible ? "isVisible" : ""}`}>
          <PortfolioToggle
            value={portfolioVariant}
            onChange={setPortfolioVariant}
            strings={content.portfolioSwitch}
          />
        </div>
        <Disclaimer text={content.disclaimer} />
      </section>
    </main>
  )
}

export function LandingHead({ translation, forcedVariant }) {
  const [portfolioVariant] = usePortfolioVariant()
  const activeVariant = forcedVariant || portfolioVariant
  const content = resolvePortfolioContent(translation.meta.locale, activeVariant)
  const preloadHref =
    activeVariant === "impro" ? theater1600Webp : bg1600Webp
  const preloadSet =
    activeVariant === "impro"
      ? `${theater1600Webp} 1600w`
      : `${bg1600Webp} 1600w, ${bg2400Webp} 2400w`

  return (
    <>
      <title>{content.meta.landingTitle}</title>
      <link
        rel="preload"
        as="image"
        href={preloadHref}
        type="image/webp"
        imagesrcset={preloadSet}
        imagesizes="100vw"
      />
    </>
  )
}
