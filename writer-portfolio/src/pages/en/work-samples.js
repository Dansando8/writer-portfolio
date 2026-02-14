import * as React from "react"
import {
  WorkSamplesContent,
  WorkSamplesHead
} from "../../components/WorkSamplesContent"
import enTranslation from "../../data/translations/en.json"

export default function EnglishWorkSamplesPage() {
  return <WorkSamplesContent translation={enTranslation} />
}

export const Head = () => <WorkSamplesHead translation={enTranslation} />
