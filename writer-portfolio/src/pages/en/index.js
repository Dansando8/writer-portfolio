import * as React from "react"
import { navigate } from "gatsby"

export default function EnglishIndexRedirectPage() {
  React.useEffect(() => {
    navigate("/en/writing", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
