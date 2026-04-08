import * as React from "react"
import { navigate } from "gatsby"

export default function IndexRedirectPage() {
  React.useEffect(() => {
    navigate("/writing", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
