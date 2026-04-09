import * as React from "react"
import { AboutContent, AboutHead } from "../../../components/AboutContent"
import enTranslation from "../../../data/translations/en.json"

export default function EnglishImproAboutPage() {
  return <AboutContent translation={enTranslation} forcedVariant="impro" />
}

export const Head = () => (
  <AboutHead translation={enTranslation} forcedVariant="impro" />
)
