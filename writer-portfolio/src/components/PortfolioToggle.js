import * as React from "react"
import { playUiToggleSound } from "./TypewriterTitle"
import "./PortfolioToggle.css"

export default function PortfolioToggle({ value, onChange, strings }) {
  const onSelect = React.useCallback(
    (nextValue) => {
      if (nextValue === value) return
      playUiToggleSound(nextValue === "impro" ? 7 : 3)
      onChange(nextValue)
    },
    [onChange, value]
  )

  return (
    <div className="portfolioToggle" role="group" aria-label={strings.label}>
      <div className="portfolioToggleButtons">
        <button
          type="button"
          className={`portfolioToggleButton ${
            value === "writing" ? "isActive" : ""
          }`}
          aria-pressed={value === "writing"}
          onClick={() => onSelect("writing")}
        >
          {strings.writing}
        </button>
        <button
          type="button"
          className={`portfolioToggleButton ${
            value === "impro" ? "isActive" : ""
          }`}
          aria-pressed={value === "impro"}
          onClick={() => onSelect("impro")}
        >
          {strings.impro}
        </button>
      </div>
    </div>
  )
}
