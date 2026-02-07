import * as React from "react"
import "./TypewriterTitle.css"

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(Boolean(mq.matches))
    onChange()
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])

  return reduced
}

export default function TypewriterTitle({
  as: Tag = "h1",
  text,
  className = "",
  startDelayMs = 180
}) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [shown, setShown] = React.useState("")

  React.useEffect(() => {
    if (!text) return
    if (prefersReducedMotion) {
      setShown(text)
      return
    }

    let cancelled = false
    let t = 0
    const seed = Array.from(text).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
    const rnd = mulberry32(seed || 1)

    setShown("")
    const chars = Array.from(text)
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i]
      const prev = i > 0 ? chars[i - 1] : ""

      // Base human-ish cadence with jitter.
      let dt = 34 + Math.floor(rnd() * 58) // 34..92ms

      // Micro-pause after spaces (breath between words).
      if (prev === " ") dt += 40 + Math.floor(rnd() * 55)

      // Slight pause after punctuation / line breaks.
      if (/[.,:;!?)]/.test(prev)) dt += 110 + Math.floor(rnd() * 110)
      if (prev === "\n") dt += 140 + Math.floor(rnd() * 120)

      // Rare longer pause to avoid "computer perfect" rhythm.
      if (rnd() < 0.035) dt += 160 + Math.floor(rnd() * 240)

      t += dt

      window.setTimeout(() => {
        if (cancelled) return
        setShown(chars.slice(0, i + 1).join(""))
      }, startDelayMs + t)
    }

    return () => {
      cancelled = true
    }
  }, [text, prefersReducedMotion, startDelayMs])

  return (
    <Tag className={`tw ${className}`} aria-label={text}>
      <span className="twGhost" aria-hidden="true">
        {text}
      </span>
      <span className="twText" aria-hidden="true">
        {(() => {
          // If the last typed character is a newline, some browsers will visually place the
          // cursor on the empty next line. Hide the cursor during that moment.
          const endsWithNewline = /\n$/.test(shown)
          return (
            <>
              {shown}
              {endsWithNewline ? null : <span className="twCursor" />}
            </>
          )
        })()}
      </span>
    </Tag>
  )
}
