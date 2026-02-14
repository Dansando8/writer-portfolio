import * as React from "react"
import { EducationContent, EducationHead } from "../components/EducationContent"
import deTranslation from "../data/translations/de.json"

export default function EducationPage() {
  return <EducationContent translation={deTranslation} />
}

export const Head = () => <EducationHead translation={deTranslation} />
