const React = require("react")
const gatsby = jest.requireActual("gatsby")

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    ({ children, to, activeClassName, partiallyActive, ...rest }) =>
      React.createElement("a", { href: to, ...rest }, children)
  ),
  navigate: jest.fn(),
  useStaticQuery: jest.fn(),
}
