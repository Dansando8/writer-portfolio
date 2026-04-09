import * as React from "react"
import { navigate } from "gatsby"

export default function ImproWorkSamplesRedirectPage() {
  React.useEffect(() => {
    navigate("/impro/impro-kurse", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
