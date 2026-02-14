import * as React from "react"
import { AboutContent, AboutHead } from "../components/AboutContent"
import deTranslation from "../data/translations/de.json"

export default function AboutPage() {
  return <AboutContent translation={deTranslation} />
}

export const Head = () => <AboutHead translation={deTranslation} />
