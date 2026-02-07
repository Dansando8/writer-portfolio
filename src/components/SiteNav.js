import * as React from "react"
import { Link } from "gatsby"
import { useLocation } from "@gatsbyjs/reach-router"
import "./SiteNav.css"

export default function SiteNav() {
  const { pathname } = useLocation()
  const showBack = pathname && pathname !== "/"

  return (
    <nav className="siteNav" aria-label="Primary">
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

        <ul className="siteNavList">
          <li>
            <Link className="siteNavLink" activeClassName="isActive" to="/about">
              About Me
            </Link>
          </li>
          <li>
            <Link
              className="siteNavLink"
              activeClassName="isActive"
              to="/work-samples"
            >
              Work samples
            </Link>
          </li>
          <li>
            <Link
              className="siteNavLink"
              activeClassName="isActive"
              to="/education"
            >
              Education
            </Link>
          </li>
        </ul>

        <div className="siteNavRight" aria-hidden="true" />
      </div>
    </nav>
  )
}
