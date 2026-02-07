import * as React from "react"
import "./ContactBadge.css"

export default function ContactBadge({ floating = false, className = "" }) {
  return (
    <aside
      className={`contactBadge ${floating ? "isFloating" : ""} ${className}`}
      aria-label="Contact"
    >
      <span className="contactBadgeTitle">Contact</span>
      <div>Camares Amonat</div>
      <div>test@gmail.com</div>
      <div>+49...873982</div>
    </aside>
  )
}
