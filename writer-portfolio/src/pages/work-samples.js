import * as React from "react"
import {
  WorkSamplesContent,
  WorkSamplesHead
} from "../components/WorkSamplesContent"
import deTranslation from "../data/translations/de.json"

export default function WorkSamplesPage() {
  return <WorkSamplesContent translation={deTranslation} />
}

export const Head = () => <WorkSamplesHead translation={deTranslation} />
