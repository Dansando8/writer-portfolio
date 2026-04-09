import * as React from "react"
import { LandingContent, LandingHead } from "../../../components/LandingContent"
import enTranslation from "../../../data/translations/en.json"

export default function EnglishWritingIndexPage() {
  return <LandingContent translation={enTranslation} forcedVariant="writing" />
}

export const Head = () => (
  <LandingHead translation={enTranslation} forcedVariant="writing" />
)
