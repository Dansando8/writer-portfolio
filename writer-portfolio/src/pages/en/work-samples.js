import * as React from "react"
import { navigate } from "gatsby"

export default function EnglishWorkSamplesRedirectPage() {
  React.useEffect(() => {
    navigate("/en/writing/work-samples", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
