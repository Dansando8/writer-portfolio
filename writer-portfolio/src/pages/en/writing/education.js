import * as React from "react"
import {
  EducationContent,
  EducationHead
} from "../../../components/EducationContent"
import enTranslation from "../../../data/translations/en.json"

export default function EnglishWritingEducationPage() {
  return <EducationContent translation={enTranslation} forcedVariant="writing" />
}

export const Head = () => (
  <EducationHead translation={enTranslation} forcedVariant="writing" />
)
