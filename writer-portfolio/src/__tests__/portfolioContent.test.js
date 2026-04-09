import { resolvePortfolioContent } from "../data/portfolioContent"

// Helper: verify a paragraphs array has at least 1 item, each item is an array
// with at least 1 segment that has a non-empty text property.
function assertParagraphs(paragraphs, label) {
  expect(Array.isArray(paragraphs)).toBe(true)
  expect(paragraphs.length).toBeGreaterThanOrEqual(1)
  paragraphs.forEach((para, pi) => {
    expect(Array.isArray(para)).toBe(true)
    expect(para.length).toBeGreaterThanOrEqual(1)
    para.forEach((seg, si) => {
      expect(typeof seg.text).toBe("string")
      expect(seg.text.length).toBeGreaterThan(0)
    })
  })
}

describe("resolvePortfolioContent", () => {
  describe("DE / writing", () => {
    let content
    beforeAll(() => {
      content = resolvePortfolioContent("de", "writing")
    })

    test("hero.title is a non-empty string", () => {
      expect(typeof content.hero.title).toBe("string")
      expect(content.hero.title.length).toBeGreaterThan(0)
    })

    test("hero.taglineLines is a non-empty array of non-empty strings", () => {
      expect(Array.isArray(content.hero.taglineLines)).toBe(true)
      expect(content.hero.taglineLines.length).toBeGreaterThan(0)
      content.hero.taglineLines.forEach((line) => {
        expect(typeof line).toBe("string")
        expect(line.length).toBeGreaterThan(0)
      })
    })

    test("nav.about and nav.work are non-empty strings", () => {
      expect(typeof content.nav.about).toBe("string")
      expect(content.nav.about.length).toBeGreaterThan(0)
      expect(typeof content.nav.work).toBe("string")
      expect(content.nav.work.length).toBeGreaterThan(0)
    })

    test("nav.paths.about and nav.paths.work start with '/'", () => {
      expect(content.nav.paths.about).toMatch(/^\//)
      expect(content.nav.paths.work).toMatch(/^\//)
    })

    test("about.title is non-empty", () => {
      expect(typeof content.about.title).toBe("string")
      expect(content.about.title.length).toBeGreaterThan(0)
    })

    test("about.paragraphs has valid structure", () => {
      assertParagraphs(content.about.paragraphs, "DE writing about")
    })

    test("about.paragraphs has 5 items (writing DE)", () => {
      expect(content.about.paragraphs.length).toBe(5)
    })

    test("work.title is non-empty", () => {
      expect(typeof content.work.title).toBe("string")
      expect(content.work.title.length).toBeGreaterThan(0)
    })

    test("disclaimer is non-empty", () => {
      expect(typeof content.disclaimer).toBe("string")
      expect(content.disclaimer.length).toBeGreaterThan(0)
    })

    test("meta.locale is 'de'", () => {
      expect(content.meta.locale).toBe("de")
    })

    test("meta.basePath starts with '/'", () => {
      expect(content.meta.basePath).toMatch(/^\//)
    })

    test("education section exists with training array of 3 entries", () => {
      expect(content.education).toBeDefined()
      expect(Array.isArray(content.education.training)).toBe(true)
      expect(content.education.training.length).toBe(3)
    })

    test("education.training entries have institution and details", () => {
      content.education.training.forEach((entry) => {
        expect(typeof entry.institution).toBe("string")
        expect(entry.institution.length).toBeGreaterThan(0)
        expect(Array.isArray(entry.details)).toBe(true)
        expect(entry.details.length).toBeGreaterThan(0)
      })
    })
  })

  describe("DE / impro", () => {
    let content
    beforeAll(() => {
      content = resolvePortfolioContent("de", "impro")
    })

    test("hero.title equals 'Impro Theater'", () => {
      expect(content.hero.title).toBe("Impro Theater")
    })

    test("hero.taglineLines is a non-empty array of non-empty strings", () => {
      expect(Array.isArray(content.hero.taglineLines)).toBe(true)
      expect(content.hero.taglineLines.length).toBeGreaterThan(0)
      content.hero.taglineLines.forEach((line) => {
        expect(typeof line).toBe("string")
        expect(line.length).toBeGreaterThan(0)
      })
    })

    test("nav.about is non-empty", () => {
      expect(typeof content.nav.about).toBe("string")
      expect(content.nav.about.length).toBeGreaterThan(0)
    })

    test("nav.work is non-empty", () => {
      expect(typeof content.nav.work).toBe("string")
      expect(content.nav.work.length).toBeGreaterThan(0)
    })

    test("nav.paths.about equals '/ueber-mich'", () => {
      expect(content.nav.paths.about).toBe("/ueber-mich")
    })

    test("nav.paths.work starts with '/'", () => {
      expect(content.nav.paths.work).toMatch(/^\//)
    })

    test("about.title is non-empty", () => {
      expect(typeof content.about.title).toBe("string")
      expect(content.about.title.length).toBeGreaterThan(0)
    })

    test("about.paragraphs has 3 items (impro DE)", () => {
      assertParagraphs(content.about.paragraphs, "DE impro about")
      expect(content.about.paragraphs.length).toBe(3)
    })

    test("work.title is non-empty", () => {
      expect(typeof content.work.title).toBe("string")
      expect(content.work.title.length).toBeGreaterThan(0)
    })

    test("work.paragraphs is non-empty and valid", () => {
      assertParagraphs(content.work.paragraphs, "DE impro work")
    })

    test("disclaimer is non-empty", () => {
      expect(typeof content.disclaimer).toBe("string")
      expect(content.disclaimer.length).toBeGreaterThan(0)
    })

    test("meta.locale is 'de'", () => {
      expect(content.meta.locale).toBe("de")
    })

    test("meta.basePath starts with '/'", () => {
      expect(content.meta.basePath).toMatch(/^\//)
    })

    test("education section exists with training array of 3 entries", () => {
      expect(content.education).toBeDefined()
      expect(Array.isArray(content.education.training)).toBe(true)
      expect(content.education.training.length).toBe(3)
    })

    test("education.training entries have institution and details", () => {
      content.education.training.forEach((entry) => {
        expect(typeof entry.institution).toBe("string")
        expect(entry.institution.length).toBeGreaterThan(0)
        expect(Array.isArray(entry.details)).toBe(true)
        expect(entry.details.length).toBeGreaterThan(0)
      })
    })
  })

  describe("EN / writing", () => {
    let content
    beforeAll(() => {
      content = resolvePortfolioContent("en", "writing")
    })

    test("hero.title is a non-empty string", () => {
      expect(typeof content.hero.title).toBe("string")
      expect(content.hero.title.length).toBeGreaterThan(0)
    })

    test("hero.taglineLines is a non-empty array of non-empty strings", () => {
      expect(Array.isArray(content.hero.taglineLines)).toBe(true)
      expect(content.hero.taglineLines.length).toBeGreaterThan(0)
      content.hero.taglineLines.forEach((line) => {
        expect(typeof line).toBe("string")
        expect(line.length).toBeGreaterThan(0)
      })
    })

    test("nav.about and nav.work are non-empty strings", () => {
      expect(typeof content.nav.about).toBe("string")
      expect(content.nav.about.length).toBeGreaterThan(0)
      expect(typeof content.nav.work).toBe("string")
      expect(content.nav.work.length).toBeGreaterThan(0)
    })

    test("nav.paths.about starts with '/'", () => {
      expect(content.nav.paths.about).toMatch(/^\//)
    })

    test("nav.paths.work starts with '/'", () => {
      expect(content.nav.paths.work).toMatch(/^\//)
    })

    test("about.title is non-empty", () => {
      expect(typeof content.about.title).toBe("string")
      expect(content.about.title.length).toBeGreaterThan(0)
    })

    test("about.paragraphs has valid structure", () => {
      assertParagraphs(content.about.paragraphs, "EN writing about")
    })

    test("work.title is non-empty", () => {
      expect(typeof content.work.title).toBe("string")
      expect(content.work.title.length).toBeGreaterThan(0)
    })

    test("disclaimer is non-empty", () => {
      expect(typeof content.disclaimer).toBe("string")
      expect(content.disclaimer.length).toBeGreaterThan(0)
    })

    test("meta.locale is 'en'", () => {
      expect(content.meta.locale).toBe("en")
    })

    test("meta.basePath starts with '/'", () => {
      expect(content.meta.basePath).toMatch(/^\//)
    })

    test("education section exists with training array", () => {
      expect(content.education).toBeDefined()
      expect(Array.isArray(content.education.training)).toBe(true)
      expect(content.education.training.length).toBeGreaterThan(0)
    })
  })

  describe("EN / impro", () => {
    let content
    beforeAll(() => {
      content = resolvePortfolioContent("en", "impro")
    })

    test("hero.title equals 'Improvisational Theater'", () => {
      expect(content.hero.title).toBe("Improvisational Theater")
    })

    test("hero.taglineLines is a non-empty array of non-empty strings", () => {
      expect(Array.isArray(content.hero.taglineLines)).toBe(true)
      expect(content.hero.taglineLines.length).toBeGreaterThan(0)
      content.hero.taglineLines.forEach((line) => {
        expect(typeof line).toBe("string")
        expect(line.length).toBeGreaterThan(0)
      })
    })

    test("nav.about is non-empty", () => {
      expect(typeof content.nav.about).toBe("string")
      expect(content.nav.about.length).toBeGreaterThan(0)
    })

    test("nav.work is non-empty", () => {
      expect(typeof content.nav.work).toBe("string")
      expect(content.nav.work.length).toBeGreaterThan(0)
    })

    test("nav.paths.about equals '/about'", () => {
      expect(content.nav.paths.about).toBe("/about")
    })

    test("nav.paths.work starts with '/'", () => {
      expect(content.nav.paths.work).toMatch(/^\//)
    })

    test("about.title is non-empty", () => {
      expect(typeof content.about.title).toBe("string")
      expect(content.about.title.length).toBeGreaterThan(0)
    })

    test("about.paragraphs has 3 items (impro EN)", () => {
      assertParagraphs(content.about.paragraphs, "EN impro about")
      expect(content.about.paragraphs.length).toBe(3)
    })

    test("work.title is non-empty", () => {
      expect(typeof content.work.title).toBe("string")
      expect(content.work.title.length).toBeGreaterThan(0)
    })

    test("work.paragraphs is non-empty and valid", () => {
      assertParagraphs(content.work.paragraphs, "EN impro work")
    })

    test("disclaimer is non-empty", () => {
      expect(typeof content.disclaimer).toBe("string")
      expect(content.disclaimer.length).toBeGreaterThan(0)
    })

    test("meta.locale is 'en'", () => {
      expect(content.meta.locale).toBe("en")
    })

    test("meta.basePath starts with '/'", () => {
      expect(content.meta.basePath).toMatch(/^\//)
    })

    test("education section exists with training array of 3 entries", () => {
      expect(content.education).toBeDefined()
      expect(Array.isArray(content.education.training)).toBe(true)
      expect(content.education.training.length).toBe(3)
    })
  })

  describe("locale/variant normalization", () => {
    test("unknown locale falls back to 'de'", () => {
      const c = resolvePortfolioContent("fr", "writing")
      expect(c.meta.locale).toBe("de")
    })

    test("unknown variant falls back to 'writing'", () => {
      const c = resolvePortfolioContent("de", "dance")
      expect(c.meta.basePath).toBe("/schreiben")
    })
  })
})
