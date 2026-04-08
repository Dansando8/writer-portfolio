import * as React from "react"

export const DEFAULT_PORTFOLIO_VARIANT = "writing"
export const PORTFOLIO_VARIANTS = ["writing", "impro"]
const STORAGE_KEY = "portfolioVariant"
const CUSTOM_EVENT = "portfolio-variant-change"

const normalizeVariant = (value) =>
  PORTFOLIO_VARIANTS.includes(value) ? value : DEFAULT_PORTFOLIO_VARIANT

const readQueryVariant = () => {
  if (typeof window === "undefined") return null
  const value = new URLSearchParams(window.location.search).get("portfolio")
  return value ? normalizeVariant(value) : null
}

const readStoredVariant = () => {
  if (typeof window === "undefined") return DEFAULT_PORTFOLIO_VARIANT

  const queryVariant = readQueryVariant()
  if (queryVariant) return queryVariant

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return normalizeVariant(raw)
  } catch {
    return DEFAULT_PORTFOLIO_VARIANT
  }
}

const persistVariant = (variant) => {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, normalizeVariant(variant))
  } catch {
    // Ignore storage errors.
  }
}

export function usePortfolioVariant() {
  const [variant, setVariant] = React.useState(DEFAULT_PORTFOLIO_VARIANT)

  React.useEffect(() => {
    const resolved = readStoredVariant()
    setVariant(resolved)
    persistVariant(resolved)
  }, [])

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const onStorage = (event) => {
      if (event.key !== STORAGE_KEY) return
      setVariant(normalizeVariant(event.newValue))
    }

    const onCustomEvent = (event) => {
      const next = normalizeVariant(event?.detail)
      setVariant(next)
    }

    window.addEventListener("storage", onStorage)
    window.addEventListener(CUSTOM_EVENT, onCustomEvent)

    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener(CUSTOM_EVENT, onCustomEvent)
    }
  }, [])

  const updateVariant = React.useCallback((nextVariant) => {
    const normalized = normalizeVariant(nextVariant)
    setVariant(normalized)
    persistVariant(normalized)

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(CUSTOM_EVENT, { detail: normalized }))
    }
  }, [])

  return [variant, updateVariant]
}
