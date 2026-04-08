import * as React from "react"
import { navigate } from "gatsby"

export default function AboutRedirectPage() {
  React.useEffect(() => {
    navigate("/writing/about", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
