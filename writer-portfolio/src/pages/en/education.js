import * as React from "react"
import {
  EducationContent,
  EducationHead
} from "../../components/EducationContent"
import enTranslation from "../../data/translations/en.json"

export default function EnglishEducationPage() {
  return <EducationContent translation={enTranslation} />
}

export const Head = () => <EducationHead translation={enTranslation} />
