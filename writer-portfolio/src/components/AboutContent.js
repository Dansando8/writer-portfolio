import * as React from "react"
import SiteNav from "./SiteNav"
import TypewriterTitle from "./TypewriterTitle"
import Disclaimer from "./Disclaimer"
import Seo, { flattenRichParagraphs } from "./Seo"
import { usePortfolioVariant } from "../hooks/usePortfolioVariant"
import { useReloadRedirectToRoot } from "../hooks/useReloadRedirectToRoot"
import { resolvePortfolioContent } from "../data/portfolioContent"
import "../pages/about.css"

export function AboutContent({ translation, forcedVariant }) {
  const [portfolioVariant] = usePortfolioVariant()
  const activeVariant = forcedVariant || portfolioVariant
  const content = React.useMemo(
    () => resolvePortfolioContent(translation.meta.locale, activeVariant),
    [translation.meta.locale, activeVariant]
  )
  const isBackdropLayout = content.about.layout === "backdrop"
  const [titleDone, setTitleDone] = React.useState(false)

  useReloadRedirectToRoot(content.meta.basePath)

  return (
    <main
      className={`aboutPage ${isBackdropLayout ? "aboutPageBackdrop" : ""}`}
      data-locale={content.meta.locale}
    >
      {isBackdropLayout ? (
        <div
          className="aboutBackdrop"
          style={{ backgroundImage: `url(${content.about.image?.src})` }}
          aria-hidden="true"
        />
      ) : null}
      <SiteNav
        labels={content.nav}
        pathPrefix={content.meta.basePath}
        locale={content.meta.locale}
          showEducation={Boolean(content.nav?.education)}
        />

      <section className={`aboutWrap ${isBackdropLayout ? "isBackdrop" : ""}`}>
        <div className="aboutLeftCol">
          <TypewriterTitle
            as="h1"
            className="aboutTitle"
            text={content.about.title}
            onDone={() => setTitleDone(true)}
          />
        </div>

        <div className={`aboutText reveal ${titleDone ? "isVisible" : ""}`}>
          {content.about.paragraphs.map((paragraph, pIdx) => (
            <div key={pIdx} className="aboutParagraph">
              <p>
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
            </div>
          ))}
        </div>

        {!isBackdropLayout ? (
          <div
            className={`rightImage reveal ${titleDone ? "isVisible" : ""}`}
            aria-hidden="true"
          >
            <img
              src={content.about.image?.src}
              alt={content.about.image?.alt || ""}
              loading="lazy"
            />
          </div>
        ) : null}
      </section>
      <Disclaimer text={content.disclaimer} />
    </main>
  )
}

export function AboutHead({ translation, forcedVariant }) {
  const activeVariant = forcedVariant || "writing"
  const content = resolvePortfolioContent(translation.meta.locale, activeVariant)
  const path = `${content.meta.basePath}${content.nav.paths.about}`
  const alternateLocale = content.meta.locale === "en" ? "de" : "en"
  const alternateContent = resolvePortfolioContent(alternateLocale, activeVariant)
  const description = flattenRichParagraphs(content.about.paragraphs)
  const schema = {
    "@context": "https://schema.org",
    "@type": activeVariant === "impro" ? "ProfessionalService" : "Person",
    name: content.contact?.name || "Amonat",
    url: path,
    inLanguage: content.meta.locale,
    description
  }

  return (
    <Seo
      title={`${content.meta.aboutTitle} | ${content.meta.landingTitle}`}
      description={description}
      pathname={path}
      locale={content.meta.locale}
      image={content.about.image?.src}
      imageAlt={content.meta.aboutTitle}
      alternates={[
        { hrefLang: content.meta.locale, href: path },
        { hrefLang: alternateLocale, href: `${alternateContent.meta.basePath}${alternateContent.nav.paths.about}` },
        { hrefLang: "x-default", href: "/writing/about" }
      ]}
      schema={schema}
    />
  )
}
