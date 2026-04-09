import * as React from "react"
import { navigate } from "gatsby"
import SiteNav from "./SiteNav"
import TypewriterTitle from "./TypewriterTitle"
import Disclaimer from "./Disclaimer"
import Seo from "./Seo"
import { usePortfolioVariant } from "../hooks/usePortfolioVariant"
import { useReloadRedirectToRoot } from "../hooks/useReloadRedirectToRoot"
import { resolvePortfolioContent } from "../data/portfolioContent"
import "../pages/education.css"

export function EducationContent({ translation, forcedVariant }) {
  const [portfolioVariant] = usePortfolioVariant()
  const activeVariant = forcedVariant || portfolioVariant
  const content = React.useMemo(
    () => resolvePortfolioContent(translation.meta.locale, activeVariant),
    [translation.meta.locale, activeVariant]
  )
  const educationEnabled = Boolean(content.nav?.education)
  const [titleDone, setTitleDone] = React.useState(false)

  useReloadRedirectToRoot(content.meta.basePath)

  React.useEffect(() => {
    if (educationEnabled) return
    if (typeof window === "undefined") return
    navigate(`${content.meta.basePath}/about`)
  }, [educationEnabled, content.meta.basePath])

  if (!educationEnabled) return null

  return (
    <main className="educationPage" data-locale={content.meta.locale}>
      <SiteNav
        labels={content.nav}
        pathPrefix={content.meta.basePath}
        locale={content.meta.locale}
          showEducation={Boolean(content.nav?.education)}
        />

      <section className="educationWrap">
        <div className="leftCol">
          <TypewriterTitle
            as="h1"
            className="eduTitle"
            text={content.education.title}
            onDone={() => setTitleDone(true)}
          />

          <div className={`leftFoot reveal ${titleDone ? "isVisible" : ""}`}>
            <div className="leftFootTitle">{content.education.footer.title}</div>
            <p className="leftFootText">
              {content.education.footer.description}
            </p>
          </div>
        </div>

        <ul className={`eduList reveal ${titleDone ? "isVisible" : ""}`}>
          {content.education.training.map((item) => (
            <li key={item.institution}>
              <h2 className="eduItemTitle">{item.institution}</h2>
              <p className="eduItemText">{item.details.join("\n")}</p>
            </li>
          ))}
        </ul>
      </section>
      <Disclaimer text={content.disclaimer} />
    </main>
  )
}

export function EducationHead({ translation, forcedVariant }) {
  const activeVariant = forcedVariant || "writing"
  const content = resolvePortfolioContent(translation.meta.locale, activeVariant)
  const path = `${content.meta.basePath}${content.nav.paths.education || "/education"}`
  const alternateLocale = content.meta.locale === "en" ? "de" : "en"
  const alternateContent = resolvePortfolioContent(alternateLocale, activeVariant)
  const description = [
    content.education.footer?.description,
    ...(content.education.training || []).map((item) => item.institution)
  ]
    .filter(Boolean)
    .join(" ")
  const schema = {
    "@context": "https://schema.org",
    "@type": activeVariant === "impro" ? "Course" : "EducationalOccupationalCredential",
    name: content.meta.educationTitle,
    url: path,
    inLanguage: content.meta.locale,
    description
  }

  return (
    <Seo
      title={`${content.meta.educationTitle} | ${content.meta.landingTitle}`}
      description={description}
      pathname={path}
      locale={content.meta.locale}
      image={content.about?.image?.src}
      imageAlt={content.meta.educationTitle}
      alternates={[
        { hrefLang: content.meta.locale, href: path },
        {
          hrefLang: alternateLocale,
          href: `${alternateContent.meta.basePath}${alternateContent.nav.paths.education || "/education"}`
        },
        { hrefLang: "x-default", href: "/writing/education" }
      ]}
      schema={schema}
    />
  )
}
