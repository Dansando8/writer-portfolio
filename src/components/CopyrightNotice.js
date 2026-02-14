import * as React from "react"

const CopyrightNotice = () => {
  const year = new Date().getFullYear()

  return (
    <div className="copyrightNotice" aria-hidden="true">
      Rights reserved... C. Amonat {year}
    </div>
  )
}

export default CopyrightNotice
