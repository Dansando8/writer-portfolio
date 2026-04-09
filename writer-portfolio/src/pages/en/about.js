import * as React from "react"
import { navigate } from "gatsby"

export default function EnglishAboutRedirectPage() {
  React.useEffect(() => {
    navigate("/en/writing/about", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
