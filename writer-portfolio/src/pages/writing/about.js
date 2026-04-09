import * as React from "react"
import { navigate } from "gatsby"

export default function WritingAboutRedirectPage() {
  React.useEffect(() => {
    navigate("/schreiben/ueber-mich", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
