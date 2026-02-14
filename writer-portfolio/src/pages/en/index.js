import * as React from "react"
import { LandingContent, LandingHead } from "../../components/LandingContent"
import enTranslation from "../../data/translations/en.json"

export default function EnglishIndexPage() {
  return <LandingContent translation={enTranslation} />
}

export const Head = () => <LandingHead translation={enTranslation} />
