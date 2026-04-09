import * as React from "react"
import { navigate } from "gatsby"

export default function WritingRedirectPage() {
  React.useEffect(() => {
    navigate("/schreiben", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
