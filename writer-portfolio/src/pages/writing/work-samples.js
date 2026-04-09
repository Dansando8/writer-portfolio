import * as React from "react"
import { navigate } from "gatsby"

export default function WritingWorkSamplesRedirectPage() {
  React.useEffect(() => {
    navigate("/schreiben/arbeitsproben", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
