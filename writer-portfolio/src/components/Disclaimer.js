import * as React from "react"
import "./Disclaimer.css"

export default function Disclaimer({ text = "" }) {
  if (!text) return null
  return <div className="disclaimer">{text}</div>
}
