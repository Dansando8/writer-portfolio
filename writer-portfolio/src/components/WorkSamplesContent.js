import * as React from "react"
import SiteNav from "./SiteNav"
import MarkDownIcon from "./MarkDownIcon"
import ContactBadge from "./ContactBadge"
import TypewriterTitle from "./TypewriterTitle"
import Disclaimer from "./Disclaimer"
import { usePortfolioVariant } from "../hooks/usePortfolioVariant"
import { resolvePortfolioContent } from "../data/portfolioContent"
import "../pages/work-samples.css"

function renderParagraph(paragraph, paragraphIndex) {
  if (Array.isArray(paragraph)) {
    return (
      <p key={`rich-${paragraphIndex}`}>
        {paragraph.map((segment, segmentIndex) =>
          segment.highlight ? (
            <span key={segmentIndex} className="workHi">
              {segment.text}
            </span>
          ) : (
            <React.Fragment key={segmentIndex}>{segment.text}</React.Fragment>
          )
        )}
      </p>
    )
  }

  return <p key={`plain-${paragraphIndex}`}>{paragraph}</p>
}

export function WorkSamplesContent({ translation, forcedVariant }) {
  const [portfolioVariant] = usePortfolioVariant()
  const activeVariant = forcedVariant || portfolioVariant
  const content = React.useMemo(
    () => resolvePortfolioContent(translation.meta.locale, activeVariant),
    [translation.meta.locale, activeVariant]
  )
  const isSplitLayout = content.work.layout === "split"
  const [titleDone, setTitleDone] = React.useState(false)

  return (
    <main className={`workPage ${isSplitLayout ? "isSplitLayout" : ""}`}>
      <SiteNav
        labels={content.nav}
        pathPrefix={content.meta.basePath}
        locale={content.meta.locale}
          showEducation={Boolean(content.nav?.education)}
        />

      <section className="workWrap">
        {isSplitLayout ? (
          <div className="workSplit">
            <div>
              <TypewriterTitle
                as="h1"
                className="workTitle"
                text={content.work.title}
                onDone={() => setTitleDone(true)}
              />
              <div className={`workIntro reveal ${titleDone ? "isVisible" : ""}`}>
                {content.work.paragraphs.map((paragraph, index) =>
                  renderParagraph(paragraph, index)
                )}
              </div>
            </div>

            <div
              className={`workFeatureImage reveal ${titleDone ? "isVisible" : ""}`}
              aria-hidden="true"
            >
              <img
                src={content.work.image?.src}
                alt={content.work.image?.alt || ""}
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          <>
            <TypewriterTitle
              as="h1"
              className="workTitle"
              text={content.work.title}
              onDone={() => setTitleDone(true)}
            />

            {(content.work.paragraphs || []).length > 0 ? (
              <div className={`workIntro reveal ${titleDone ? "isVisible" : ""}`}>
                {content.work.paragraphs.map((paragraph, index) =>
                  renderParagraph(paragraph, index)
                )}
              </div>
            ) : null}

            <div className={`grid reveal ${titleDone ? "isVisible" : ""}`}>
              {content.work.items.map((it) => (
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

            {(content.work.bottomLogos || []).length > 0 ? (
              <div
                className={`bottomLogos reveal ${titleDone ? "isVisible" : ""}`}
                aria-label="More work"
              >
                {(content.work.bottomLogos || []).map((logo) => (
                  <a
                    key={logo.href}
                    className={`bottomLogo ${logo.wrapperClassName || ""}`}
                    href={logo.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={logo.ariaLabel || logo.alt}
                  >
                    <img
                      className={`bottomLogoImg ${logo.className || ""}`}
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            ) : null}
          </>
        )}
      </section>

      {!isSplitLayout ? (
        <ContactBadge
          floating
          className={`reveal ${titleDone ? "isVisible" : ""}`}
          strings={content.contact}
        />
      ) : null}
      <Disclaimer text={content.disclaimer} />
    </main>
  )
}

export function WorkSamplesHead({ translation, forcedVariant }) {
  const [portfolioVariant] = usePortfolioVariant()
  const activeVariant = forcedVariant || portfolioVariant
  const content = resolvePortfolioContent(translation.meta.locale, activeVariant)
  return <title>{`${content.meta.workTitle} | ${content.meta.landingTitle}`}</title>
}

export default WorkSamplesContent
