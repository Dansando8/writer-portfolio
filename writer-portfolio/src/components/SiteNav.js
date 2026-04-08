import * as React from "react"
import { Link } from "gatsby"
import { navigate } from "gatsby"
import { useLocation } from "@gatsbyjs/reach-router"
import { playTypewriterReturnSound, playUiToggleSound } from "./TypewriterTitle"
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

export default function SiteNav({
  labels = defaultLabels,
  pathPrefix = "",
  locale = "en",
  showEducation = true
}) {
  const educationVisible = showEducation && Boolean(labels?.education)
  const { pathname } = useLocation()
  const [open, setOpen] = React.useState(false)
  const [pendingTo, setPendingTo] = React.useState(null)

  const homePath = pathPrefix || "/"
  const isImproNamespace = homePath.includes("/impro")
  const isWritingNamespace = homePath.includes("/writing")
  const normalizedPathname = stripTrailingSlash(pathname || "") || "/"
  const currentSuffix = normalizedPathname
    .replace(/^\/en/, "")
    .replace(/^\/(writing|impro)/, "") || ""
  const resolveLocalePath = (targetLocale) => {
    const localePrefix = targetLocale === "en" ? "/en" : ""
    const namespacePrefix = isImproNamespace
      ? "/impro"
      : isWritingNamespace
        ? "/writing"
        : ""
    const next = `${localePrefix}${namespacePrefix}${currentSuffix}`
    return stripTrailingSlash(next) || "/"
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

  const resolvePath = (suffix) => `${pathPrefix}${suffix}`
  const getTarget = (suffix) => {
    const raw = resolvePath(suffix)
    return { raw, normalized: stripTrailingSlash(raw) }
  }

  const targets = {
    about: getTarget("/about"),
    work: getTarget("/work-samples"),
    education: getTarget("/education")
  }

  React.useEffect(() => {
    // Close the mobile menu when navigating.
    setOpen(false)
    setPendingTo(null)
  }, [pathname])

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  const ANIM_MS = 420

  const onNavClick = (suffix) => (e) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      return
    }

    const { raw: targetPath, normalized: normalizedTarget } = getTarget(suffix)

    if (normalizedPathname === normalizedTarget) return

    e.preventDefault()
    playUiToggleSound(suffix.length)
    setPendingTo(normalizedTarget)

    window.setTimeout(() => {
      navigate(targetPath)
    }, ANIM_MS)
  }

  const onLanguageClick = (option) => (e) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      return
    }
    if (locale === option.code) return
    playUiToggleSound(option.code === "en" ? 11 : 5)
  }

  const onBackClick = () => {
    playTypewriterReturnSound(4)
  }

  return (
    <nav
      className={`siteNav ${open ? "isMenuOpen" : ""}`}
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
              onClick={onBackClick}
            >
              &lt;
            </Link>
          ) : null}
        </div>

        <div id="siteNavMenu" className="siteNavMenu">
          <ul className="siteNavList">
            <li>
              <Link
                className={`siteNavLink ${
                  pendingTo === targets.about.normalized ? "isPending" : ""
                }`}
                activeClassName="isActive"
                to={targets.about.raw}
                onClick={onNavClick("/about")}
              >
                {labels.about}
              </Link>
            </li>
            <li>
              <Link
                className={`siteNavLink ${
                  pendingTo === targets.work.normalized ? "isPending" : ""
                }`}
                activeClassName="isActive"
                to={targets.work.raw}
                onClick={onNavClick("/work-samples")}
              >
                {labels.work}
              </Link>
            </li>
            {educationVisible ? (
              <li>
                <Link
                  className={`siteNavLink ${
                    pendingTo === targets.education.normalized ? "isPending" : ""
                  }`}
                  activeClassName="isActive"
                  to={targets.education.raw}
                  onClick={onNavClick("/education")}
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
                onClick={onLanguageClick(option)}
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
