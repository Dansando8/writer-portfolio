import * as React from "react"
import {
  WorkSamplesContent,
  WorkSamplesHead
} from "../../../components/WorkSamplesContent"
import enTranslation from "../../../data/translations/en.json"

export default function EnglishImproWorkSamplesPage() {
  return <WorkSamplesContent translation={enTranslation} forcedVariant="impro" />
}

export const Head = () => (
  <WorkSamplesHead translation={enTranslation} forcedVariant="impro" />
)
