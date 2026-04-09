import React from "react"
import { render, screen } from "@testing-library/react"
import SiteNav from "../components/SiteNav"

jest.mock("@gatsbyjs/reach-router", () => ({
  useLocation: () => ({ pathname: "/" }),
}))

// gatsby mock is auto-loaded from __mocks__/gatsby.js

describe("SiteNav", () => {
  test("renders without crashing with no props", () => {
    render(<SiteNav />)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
  })

  test("renders 'About Me' and 'Work samples' nav links by default", () => {
    render(<SiteNav />)
    expect(screen.getByText("About Me")).toBeInTheDocument()
    expect(screen.getByText("Work samples")).toBeInTheDocument()
  })

  test("renders custom labels passed as props", () => {
    const labels = {
      about: "Über mich",
      work: "Arbeitsproben",
      education: "Ausbildung",
      paths: { about: "/ueber-mich", work: "/arbeitsproben", education: "/ausbildung" },
    }
    render(<SiteNav labels={labels} locale="de" pathPrefix="/schreiben" />)
    expect(screen.getByText("Über mich")).toBeInTheDocument()
    expect(screen.getByText("Arbeitsproben")).toBeInTheDocument()
    expect(screen.getByText("Ausbildung")).toBeInTheDocument()
  })

  test("DE impro: about link href is '/impro/ueber-mich/'", () => {
    const labels = {
      about: "Über mich",
      work: "Impro Kurse",
      paths: { about: "/ueber-mich", work: "/impro-kurse" },
    }
    render(
      <SiteNav
        labels={labels}
        locale="de"
        pathPrefix="/impro"
        showEducation={false}
      />
    )
    const aboutLink = screen.getByText("Über mich")
    expect(aboutLink.getAttribute("href")).toBe("/impro/ueber-mich/")
  })

  test("DE impro: work link href is '/impro/impro-kurse/'", () => {
    const labels = {
      about: "Über mich",
      work: "Impro Kurse",
      paths: { about: "/ueber-mich", work: "/impro-kurse" },
    }
    render(
      <SiteNav
        labels={labels}
        locale="de"
        pathPrefix="/impro"
        showEducation={false}
      />
    )
    const workLink = screen.getByText("Impro Kurse")
    expect(workLink.getAttribute("href")).toBe("/impro/impro-kurse/")
  })

  test("EN impro: about link href is '/en/impro/about/'", () => {
    const labels = {
      about: "About Me",
      work: "Impro Classes",
      paths: { about: "/about", work: "/work-samples" },
    }
    render(
      <SiteNav
        labels={labels}
        locale="en"
        pathPrefix="/en/impro"
        showEducation={false}
      />
    )
    const aboutLink = screen.getByText("About Me")
    expect(aboutLink.getAttribute("href")).toBe("/en/impro/about/")
  })

  test("EN impro: work link href is '/en/impro/work-samples/'", () => {
    const labels = {
      about: "About Me",
      work: "Impro Classes",
      paths: { about: "/about", work: "/work-samples" },
    }
    render(
      <SiteNav
        labels={labels}
        locale="en"
        pathPrefix="/en/impro"
        showEducation={false}
      />
    )
    const workLink = screen.getByText("Impro Classes")
    expect(workLink.getAttribute("href")).toBe("/en/impro/work-samples/")
  })

  test("className prop is applied to the nav element", () => {
    render(<SiteNav className="myCustomClass" />)
    const nav = screen.getByRole("navigation")
    expect(nav.className).toContain("myCustomClass")
    expect(nav.className).toContain("siteNav")
  })

  test("showEducation=false hides education link", () => {
    const labels = {
      about: "About Me",
      work: "Work samples",
      education: "Education",
      paths: { about: "/about", work: "/work-samples", education: "/education" },
    }
    render(<SiteNav labels={labels} showEducation={false} />)
    expect(screen.queryByText("Education")).not.toBeInTheDocument()
  })

  test("showEducation=true and education label shows education link", () => {
    const labels = {
      about: "About Me",
      work: "Work samples",
      education: "Education",
      paths: { about: "/about", work: "/work-samples", education: "/education" },
    }
    render(<SiteNav labels={labels} showEducation={true} />)
    expect(screen.getByText("Education")).toBeInTheDocument()
  })

  test("language switcher renders DE and EN links", () => {
    render(<SiteNav locale="de" />)
    expect(screen.getByText("DE")).toBeInTheDocument()
    expect(screen.getByText("EN")).toBeInTheDocument()
  })

  test("active locale link has 'isActive' class", () => {
    render(<SiteNav locale="en" />)
    const enLink = screen.getByText("EN")
    expect(enLink.className).toContain("isActive")
  })

  test("inactive locale link does not have 'isActive' class", () => {
    render(<SiteNav locale="en" />)
    const deLink = screen.getByText("DE")
    expect(deLink.className).not.toContain("isActive")
  })
})
