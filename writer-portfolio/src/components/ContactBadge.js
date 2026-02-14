import * as React from "react"
import "./ContactBadge.css"

export default function ContactBadge({
  floating = false,
  className = "",
  strings = {}
}) {
  const { title = "Contact", email = "amonatwriting@gmail.com" } = strings
  const [isOpen, setIsOpen] = React.useState(false)
  const panelId = React.useId()

  return (
    <aside
      className={`contactBadge ${floating ? "isFloating" : ""} ${className}`}
      aria-label={title}
    >
      <button
        type="button"
        className="contactBadgeToggle"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="contactBadgeTitle">{title}</span>
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
