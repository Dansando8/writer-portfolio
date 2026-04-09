import * as React from "react"
import { navigate } from "gatsby"

export default function ImproAboutRedirectPage() {
  React.useEffect(() => {
    navigate("/impro/ueber-mich", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
