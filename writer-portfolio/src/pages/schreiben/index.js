import * as React from "react"
import { LandingContent, LandingHead } from "../../components/LandingContent"
import deTranslation from "../../data/translations/de.json"

export default function SchreibenIndexPage() {
  return <LandingContent translation={deTranslation} forcedVariant="writing" />
}

export const Head = () => (
  <LandingHead translation={deTranslation} forcedVariant="writing" />
)
