import * as React from "react"
import "./ContactBadge.css"

export default function ContactBadge({ floating = false, className = "" }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const panelId = React.useId()

  const email = React.useMemo(
    () =>
      [116, 101, 115, 116].map(String.fromCharCode).join("") +
      "@" +
      [103, 109, 97, 105, 108].map(String.fromCharCode).join("") +
      ".com",
    []
  )

  return (
    <aside
      className={`contactBadge ${floating ? "isFloating" : ""} ${className}`}
      aria-label="Contact"
    >
      <button
        type="button"
        className="contactBadgeToggle"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(open => !open)}
      >
        <span className="contactBadgeTitle">Contact</span>
      </button>
      <div
        id={panelId}
        className={`contactBadgePanel ${isOpen ? "isOpen" : ""}`}
        aria-hidden={!isOpen}
      >
        <a className="contactBadgeLink" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </aside>
  )
}
