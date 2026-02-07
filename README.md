# Camares Amonat Portfolio

Personal portfolio site for **Camares Amonat** (Journalism, Copywriting, and UX Writing).

## Requirements

- Node.js `20` (see `netlify.toml`)

## Local Development

```sh
npm install
npm run develop
```

Then open `http://localhost:8000`.

## Production Build

```sh
npm run build
npm run serve
```

## Configuration

- `GATSBY_GTAG_IDS`: Comma-separated Google tag IDs (enables analytics plugin when set)
- `GATSBY_ENABLE_SHARP=1`: Enables image/sharp-dependent plugins (optional; can be flaky on some macOS setups)

## Deployment

Netlify uses:

- Build command: `npm run build`
- Publish directory: `public`
