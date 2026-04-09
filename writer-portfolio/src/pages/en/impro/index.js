import * as React from "react"
import { LandingContent, LandingHead } from "../../../components/LandingContent"
import enTranslation from "../../../data/translations/en.json"

export default function EnglishImproIndexPage() {
  return <LandingContent translation={enTranslation} forcedVariant="impro" />
}

export const Head = () => (
  <LandingHead translation={enTranslation} forcedVariant="impro" />
)
