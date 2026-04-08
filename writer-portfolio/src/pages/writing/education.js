import * as React from "react"
import {
  EducationContent,
  EducationHead
} from "../../components/EducationContent"
import deTranslation from "../../data/translations/de.json"

export default function WritingEducationPage() {
  return <EducationContent translation={deTranslation} forcedVariant="writing" />
}

export const Head = () => (
  <EducationHead translation={deTranslation} forcedVariant="writing" />
)
