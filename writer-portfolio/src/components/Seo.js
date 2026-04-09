import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

const stripTrailingSlash = (value) => {
  if (!value) return value
  return value === "/" ? value : value.replace(/\/$/, "")
}

const absoluteUrl = (siteUrl, path = "") => {
  const normalizedSiteUrl = stripTrailingSlash(siteUrl || "")
  if (!path) return normalizedSiteUrl
  if (/^https?:\/\//.test(path)) return path
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${normalizedSiteUrl}${normalizedPath}`
}

export function flattenRichParagraphs(paragraphs = []) {
  return paragraphs
    .map((paragraph) => {
      if (!Array.isArray(paragraph)) return paragraph
      return paragraph.map((segment) => segment.text || "").join("")
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
}

const truncate = (value, maxLength = 160) => {
  if (!value || value.length <= maxLength) return value
  return `${value.slice(0, maxLength - 1).trim()}…`
}

const normalizeSchema = (schema, siteUrl) => {
  if (!schema) return null
  const next = { ...schema }
  if (typeof next.url === "string") {
    next.url = absoluteUrl(siteUrl, next.url)
  }
  if (typeof next.image === "string") {
    next.image = absoluteUrl(siteUrl, next.image)
  }
  return next
}

export default function Seo({
  title,
  description,
  pathname,
  locale = "de",
  image,
  imageAlt,
  type = "website",
  alternates = [],
  schema
}) {
  const { site } = useStaticQuery(graphql`
    query SeoMetadataQuery {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          siteUrl
          siteLanguage
          author
        }
      }
    }
  `)

  const siteMetadata = site.siteMetadata
  const seoTitle = title || siteMetadata.title
  const seoDescription = truncate(description || siteMetadata.description)
  const canonicalUrl = absoluteUrl(siteMetadata.siteUrl, pathname)
  const imageUrl = image ? absoluteUrl(siteMetadata.siteUrl, image) : null
  const normalizedSchema = normalizeSchema(schema, siteMetadata.siteUrl)
  const normalizedAlternates = alternates
    .filter((entry) => entry?.href && entry?.hrefLang)
    .map((entry) => ({
      hrefLang: entry.hrefLang,
      href: absoluteUrl(siteMetadata.siteUrl, entry.href)
    }))

  return (
    <>
      <html lang={locale || siteMetadata.siteLanguage || "de"} />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="author" content={siteMetadata.author} />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:locale" content={locale === "en" ? "en_US" : "de_DE"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
      {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}
      {imageAlt ? <meta property="og:image:alt" content={imageAlt} /> : null}
      {imageAlt ? <meta name="twitter:image:alt" content={imageAlt} /> : null}
      {normalizedAlternates.map((entry) => (
        <link
          key={`${entry.hrefLang}-${entry.href}`}
          rel="alternate"
          hrefLang={entry.hrefLang}
          href={entry.href}
        />
      ))}
      {normalizedSchema ? (
        <script type="application/ld+json">
          {JSON.stringify(normalizedSchema)}
        </script>
      ) : null}
    </>
  )
}
