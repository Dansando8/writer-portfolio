/**
 * @type {import('gatsby').GatsbyConfig}
 */

const gtagIdsRaw =
  process.env.GATSBY_GTAG_IDS ||
  process.env.GATSBY_GOOGLE_GTAG_TRACKING_IDS ||
  "";

const gtagTrackingIds = gtagIdsRaw
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// sharp/libvips can be finicky on some macOS setups. Default to disabling sharp-dependent
// plugins to keep `gatsby develop` working; opt-in when sharp is healthy.
const enableSharp = process.env.GATSBY_ENABLE_SHARP === "1";

module.exports = {
  siteMetadata: {
    title: `writer-portfolio`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-styled-components",
    ...(gtagTrackingIds.length
      ? [
          {
            resolve: "gatsby-plugin-google-gtag",
            options: {
              trackingIds: gtagTrackingIds,
              gtagConfig: {
                anonymize_ip: true
              },
              pluginConfig: {
                head: true
              }
            }
          }
        ]
      : []),
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    ...(enableSharp
      ? [
          "gatsby-plugin-image",
          {
            resolve: "gatsby-plugin-manifest",
            options: {
              icon: "src/images/icon.png"
            }
          },
          "gatsby-plugin-sharp",
          "gatsby-transformer-sharp"
        ]
      : []),
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/"
      },
      __key: "pages"
    }
  ]
};
