import * as React from "react"
import { AboutContent, AboutHead } from "../../components/AboutContent"
import deTranslation from "../../data/translations/de.json"

export default function SchreibenUeberMichPage() {
  return <AboutContent translation={deTranslation} forcedVariant="writing" />
}

export const Head = () => (
  <AboutHead translation={deTranslation} forcedVariant="writing" />
)
