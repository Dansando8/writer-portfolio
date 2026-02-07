import * as React from "react"
import { Link } from "gatsby"
import { navigate } from "gatsby"
import { useLocation } from "@gatsbyjs/reach-router"
import "./SiteNav.css"

export default function SiteNav() {
  const { pathname } = useLocation()
  const showBack = pathname && pathname !== "/"
  const [open, setOpen] = React.useState(false)
  const [pendingTo, setPendingTo] = React.useState(null)

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

  const onNavClick = (to) => (e) => {
    // Let the browser handle new-tab/middle click/etc.
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

    // Already on that route.
    if (pathname === to || (to !== "/" && pathname === `${to}/`)) return

    e.preventDefault()
    setPendingTo(to)

    window.setTimeout(() => {
      navigate(to)
    }, ANIM_MS)
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
              to="/"
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
                className={`siteNavLink ${
                  pendingTo === "/about" ? "isPending" : ""
                }`}
                activeClassName="isActive"
                to="/about"
                onClick={onNavClick("/about")}
              >
                About Me
              </Link>
            </li>
            <li>
              <Link
                className={`siteNavLink ${
                  pendingTo === "/work-samples" ? "isPending" : ""
                }`}
                activeClassName="isActive"
                to="/work-samples"
                onClick={onNavClick("/work-samples")}
              >
                Work samples
              </Link>
            </li>
            <li>
              <Link
                className={`siteNavLink ${
                  pendingTo === "/education" ? "isPending" : ""
                }`}
                activeClassName="isActive"
                to="/education"
                onClick={onNavClick("/education")}
              >
                Education
              </Link>
            </li>
          </ul>
        </div>

        <div className="siteNavRight">
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
