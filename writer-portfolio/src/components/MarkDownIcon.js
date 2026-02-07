import * as React from "react"

export default function MarkDownIcon({ color = "var(--brand-lilac)", size = 64 }) {
  const s = typeof size === "number" ? `${size}px` : size
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="32" cy="32" r="28" fill="#fff" />
      <path
        d="M18 23 L32 39 L46 23 L46 32 L32 50 L18 32 Z"
        fill={color}
      />
    </svg>
  )
}

