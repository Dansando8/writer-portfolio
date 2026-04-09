import * as React from "react"
import { navigate } from "gatsby"

export default function WritingEducationRedirectPage() {
  React.useEffect(() => {
    navigate("/schreiben/ausbildung", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
