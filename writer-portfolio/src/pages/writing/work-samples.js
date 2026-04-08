import * as React from "react"
import {
  WorkSamplesContent,
  WorkSamplesHead
} from "../../components/WorkSamplesContent"
import deTranslation from "../../data/translations/de.json"

export default function WritingWorkSamplesPage() {
  return <WorkSamplesContent translation={deTranslation} forcedVariant="writing" />
}

export const Head = () => (
  <WorkSamplesHead translation={deTranslation} forcedVariant="writing" />
)
