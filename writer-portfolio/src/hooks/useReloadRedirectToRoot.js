import * as React from "react"
import { navigate } from "gatsby"

const stripTrailingSlash = (value) => {
  if (!value) return value
  return value === "/" ? value : value.replace(/\/$/, "")
}

const INITIAL_PATHNAME =
  typeof window === "undefined"
    ? null
    : stripTrailingSlash(window.location.pathname) || "/"

function isReloadNavigation() {
  if (typeof window === "undefined") return false

  const entries =
    typeof window.performance?.getEntriesByType === "function"
      ? window.performance.getEntriesByType("navigation")
      : []
  const entry = entries && entries.length > 0 ? entries[0] : null
  if (entry && entry.type) {
    return entry.type === "reload"
  }

  const legacyType = window.performance?.navigation?.type
  return legacyType === 1
}

export function useReloadRedirectToRoot(rootPath) {
  React.useEffect(() => {
    if (typeof window === "undefined") return
    if (!isReloadNavigation()) return

    const normalizedRoot = stripTrailingSlash(rootPath) || "/"
    const normalizedPath = stripTrailingSlash(window.location.pathname) || "/"
    if (normalizedPath !== INITIAL_PATHNAME) return
    if (normalizedPath === normalizedRoot) return

    navigate(rootPath, { replace: true })
  }, [rootPath])
}
