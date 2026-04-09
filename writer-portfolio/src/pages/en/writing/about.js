import * as React from "react"
import { AboutContent, AboutHead } from "../../../components/AboutContent"
import enTranslation from "../../../data/translations/en.json"

export default function EnglishWritingAboutPage() {
  return <AboutContent translation={enTranslation} forcedVariant="writing" />
}

export const Head = () => (
  <AboutHead translation={enTranslation} forcedVariant="writing" />
)
