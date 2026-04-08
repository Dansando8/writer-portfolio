# Portfolio Variant Architecture

## Goal
Keep one shared site UI and routing, while serving two content variants:
- `writing` (existing content, kept as canonical baseline)
- `impro` (new Theater Impro content)

The site remains bilingual (`de`, `en`) and supports both languages for both portfolio variants.

## Non-overwrite Rule
Do not overwrite the original writing content directly in page components.
All variant-specific changes must be made in the central content registry:
- `src/data/portfolioContent.js`

The writing variant should stay structurally compatible with the existing translation JSON files.

## Runtime Selection
Portfolio variant is selected at runtime and persisted in `localStorage`:
- key: `portfolioVariant`
- allowed values: `writing`, `impro`

Selection can also be initialized from URL query string on entry:
- `?portfolio=writing`
- `?portfolio=impro`

## Shared UI Contract
The following pages keep one shared layout/UI and only swap content:
- Landing (`/`, `/en`)
- About (`/about`, `/en/about`)
- Work Samples (`/work-samples`, `/en/work-samples`)
- Education (`/education`, `/en/education`)

## Root Toggle Contract
A toggle on the landing page selects the active portfolio variant.
After selection, navigation keeps the same variant across pages in the same browser.

## Translation Contract
All variant labels and copy are localized in the content registry, including:
- hero text
- nav labels (if needed)
- about/work/education sections
- contact/disclaimer
- portfolio toggle labels

## Extending Content Safely
To add or edit a variant:
1. Update `src/data/portfolioContent.js` only.
2. Keep object shape compatible with current components.
3. Avoid UI/layout changes unless explicitly required.
