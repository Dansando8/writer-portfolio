import * as React from "react"
import "./src/styles/global.css"
import CopyrightNotice from "./src/components/CopyrightNotice"

export const wrapPageElement = ({ element }) => (
  <>
    {element}
    <CopyrightNotice />
  </>
)
