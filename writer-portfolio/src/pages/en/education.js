import * as React from "react"
import { navigate } from "gatsby"

export default function EnglishEducationRedirectPage() {
  React.useEffect(() => {
    navigate("/en/writing/education", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
