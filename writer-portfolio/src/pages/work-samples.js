import * as React from "react"
import { navigate } from "gatsby"

export default function WorkSamplesRedirectPage() {
  React.useEffect(() => {
    navigate("/writing/work-samples", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
