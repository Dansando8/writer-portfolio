import * as React from "react"
import { AboutContent, AboutHead } from "../../components/AboutContent"
import enTranslation from "../../data/translations/en.json"

export default function EnglishAboutPage() {
  return <AboutContent translation={enTranslation} />
}

export const Head = () => <AboutHead translation={enTranslation} />
