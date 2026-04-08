import * as React from "react"
import { LandingContent, LandingHead } from "../../components/LandingContent"
import deTranslation from "../../data/translations/de.json"

export default function ImproIndexPage() {
  return <LandingContent translation={deTranslation} forcedVariant="impro" />
}

export const Head = () => (
  <LandingHead translation={deTranslation} forcedVariant="impro" />
)
