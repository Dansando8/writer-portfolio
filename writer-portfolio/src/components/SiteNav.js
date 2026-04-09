import * as React from "react"
import { Link } from "gatsby"
import { useLocation } from "@gatsbyjs/reach-router"
import "./SiteNav.css"

const defaultLabels = {
  about: "About Me",
  work: "Work samples",
  education: "Education"
}

const stripTrailingSlash = (value) => {
  if (!value) return value
  return value === "/" ? value : value.replace(/\/$/, "")
}

const withTrailingSlash = (value) => {
  const normalized = stripTrailingSlash(value)
  if (!normalized || normalized === "/") return "/"
  return `${normalized}/`
}

export default function SiteNav({
  labels = defaultLabels,
  pathPrefix = "",
  locale = "en",
  showEducation = true,
  className = ""
}) {
  const educationVisible = showEducation && Boolean(labels?.education)
  const { pathname } = useLocation()
  const [open, setOpen] = React.useState(false)

  const homePath = pathPrefix || "/"
  const isImproNamespace = homePath.includes("/impro")
  const isWritingNamespace =
    homePath.includes("/writing") || homePath.includes("/schreiben")
  const normalizedPathname = stripTrailingSlash(pathname || "") || "/"
  const currentSuffix =
    normalizedPathname
      .replace(/^\/en/, "")
      .replace(/^\/(writing|impro|schreiben)/, "") || ""

  // Maps between DE and EN page suffixes for the language switcher
  const DE_TO_EN = {
    "/ueber-mich": "/about",
    "/arbeitsproben": "/work-samples",
    "/ausbildung": "/education",
    "/impro-kurse": "/work-samples"
  }
  const EN_TO_DE_WRITING = {
    "/about": "/ueber-mich",
    "/work-samples": "/arbeitsproben",
    "/education": "/ausbildung"
  }
  const EN_TO_DE_IMPRO = {
    "/about": "/ueber-mich",
    "/work-samples": "/impro-kurse"
  }

  const resolveLocalePath = (targetLocale) => {
    const localePrefix = targetLocale === "en" ? "/en" : ""
    const namespacePrefix = isImproNamespace
      ? "/impro"
      : isWritingNamespace
        ? targetLocale === "en" ? "/writing" : "/schreiben"
        : ""
    let mappedSuffix = currentSuffix
    if (targetLocale === "en" && locale === "de") {
      mappedSuffix = DE_TO_EN[currentSuffix] ?? currentSuffix
    } else if (targetLocale === "de" && locale === "en") {
      const map = isImproNamespace ? EN_TO_DE_IMPRO : EN_TO_DE_WRITING
      mappedSuffix = map[currentSuffix] ?? currentSuffix
    }
    const next = `${localePrefix}${namespacePrefix}${mappedSuffix}`
    return withTrailingSlash(next)
  }
  const languageOptions = [
    { code: "de", label: "DE", path: resolveLocalePath("de") },
    { code: "en", label: "EN", path: resolveLocalePath("en") }
  ]
  const normalizedHome = stripTrailingSlash(homePath)
  const showBack =
    pathname &&
    normalizedPathname !== normalizedHome &&
    normalizedPathname !== ""

  const resolvePath = (suffix) => withTrailingSlash(`${pathPrefix}${suffix}`)
  const getTarget = (suffix) => {
    const raw = resolvePath(suffix)
    return { raw, normalized: stripTrailingSlash(raw) }
  }

  const pathSuffixes = labels?.paths || {
    about: "/about",
    work: "/work-samples",
    education: "/education"
  }
  const targets = {
    about: getTarget(pathSuffixes.about),
    work: getTarget(pathSuffixes.work),
    education: getTarget(pathSuffixes.education ?? "/education")
  }

  React.useEffect(() => {
    // Close the mobile menu when navigating.
    setOpen(false)
  }, [pathname])

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <nav
      className={`siteNav ${open ? "isMenuOpen" : ""} ${className}`.trim()}
      aria-label="Primary"
    >
      {open ? (
        <button
          className="siteNavBackdrop"
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="siteNavGrid">
        <div className="siteNavLeft">
          {showBack ? (
            <Link
              className="siteNavBack"
              to={homePath}
              aria-label="Back to landing page"
            >
              &lt;
            </Link>
          ) : null}
        </div>

        <div id="siteNavMenu" className="siteNavMenu">
          <ul className="siteNavList">
            <li>
              <Link
                className="siteNavLink"
                activeClassName="isActive"
                to={targets.about.raw}
              >
                {labels.about}
              </Link>
            </li>
            <li>
              <Link
                className="siteNavLink"
                activeClassName="isActive"
                to={targets.work.raw}
              >
                {labels.work}
              </Link>
            </li>
            {educationVisible ? (
              <li>
                <Link
                  className="siteNavLink"
                  activeClassName="isActive"
                  to={targets.education.raw}
                >
                  {labels.education}
                </Link>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="siteNavRight">
          <div className="siteNavLang" role="presentation">
            {languageOptions.map((option) => (
              <Link
                key={option.code}
                className={`siteNavLangLink ${
                  locale === option.code ? "isActive" : ""
                }`}
                to={option.path}
                aria-current={locale === option.code ? "page" : undefined}
              >
                {option.label}
              </Link>
            ))}
          </div>
          <button
            className="siteNavToggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="siteNavMenu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="siteNavToggleBars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
