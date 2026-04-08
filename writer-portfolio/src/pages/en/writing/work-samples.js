import * as React from "react"
import {
  WorkSamplesContent,
  WorkSamplesHead
} from "../../../components/WorkSamplesContent"
import enTranslation from "../../../data/translations/en.json"

export default function EnglishWritingWorkSamplesPage() {
  return <WorkSamplesContent translation={enTranslation} forcedVariant="writing" />
}

export const Head = () => (
  <WorkSamplesHead translation={enTranslation} forcedVariant="writing" />
)
