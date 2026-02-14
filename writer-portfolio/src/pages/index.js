import * as React from "react"
import { LandingContent, LandingHead } from "../components/LandingContent"
import deTranslation from "../data/translations/de.json"

export default function IndexPage() {
  return <LandingContent translation={deTranslation} />
}

export const Head = () => <LandingHead translation={deTranslation} />
