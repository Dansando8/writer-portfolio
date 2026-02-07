import * as React from "react"
import "./ContactBadge.css"

export default function ContactBadge({ floating = false }) {
  return (
    <aside
      className={`contactBadge ${floating ? "isFloating" : ""}`}
      aria-label="Contact"
    >
      <div className="contactBadgeShape">
        <div className="contactBubble contactBubbleTitle">Contact</div>
        <div className="contactBubble">Camares Amonat</div>
        <div className="contactBubble">mails@gmail.com</div>
        <div className="contactBubble">+49...phone_number</div>
        <div className="contactStem" aria-hidden="true" />
      </div>
    </aside>
  )
}
