import * as React from "react"
import {
  WorkSamplesContent,
  WorkSamplesHead
} from "../../components/WorkSamplesContent"
import deTranslation from "../../data/translations/de.json"

export default function ImproWorkSamplesPage() {
  return <WorkSamplesContent translation={deTranslation} forcedVariant="impro" />
}

export const Head = () => (
  <WorkSamplesHead translation={deTranslation} forcedVariant="impro" />
)
