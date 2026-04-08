import * as React from "react"
import { navigate } from "gatsby"

export default function EducationRedirectPage() {
  React.useEffect(() => {
    navigate("/writing/education", { replace: true })
  }, [])
  return null
}

export const Head = () => <title>Amonat</title>
