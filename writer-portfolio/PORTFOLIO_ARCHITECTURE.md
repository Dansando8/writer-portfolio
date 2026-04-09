# Portfolio Variant Architecture

## Goal
Keep one shared component system while serving two content variants:
- `writing` (existing content, kept as canonical baseline)
- `impro` (new Impro Theater content)

The site is bilingual (`de`, `en`) and supports both languages for both variants.

## Non-overwrite Rule
Do not overwrite the original writing content directly in page components.
Variant-specific copy and structure live in the central content registry:
- `src/data/portfolioContent.js`

Writing content remains compatible with `src/data/translations/*.json`.

## Route Model (Current)
Variant is route-driven, not shared-route toggle driven.

Writing namespace:
- `/writing`
- `/writing/about`
- `/writing/work-samples`
- `/writing/education`
- `/en/writing`
- `/en/writing/about`
- `/en/writing/work-samples`
- `/en/writing/education`

Impro namespace:
- `/impro`
- `/impro/about`
- `/impro/work-samples`
- `/en/impro`
- `/en/impro/about`
- `/en/impro/work-samples`

Legacy top-level routes redirect to writing namespace:
- `/` -> `/writing`
- `/about` -> `/writing/about`
- `/work-samples` -> `/writing/work-samples`
- `/education` -> `/writing/education`
- and `/en/*` equivalents.

## Navigation Contract
- `SiteNav` receives `pathPrefix` from `content.meta.basePath`.
- Menu links are generated as `${pathPrefix}/about|work-samples|education`.
- Language switch keeps current page suffix and swaps only locale prefix:
  - example: `/en/impro/work-samples/` -> `/impro/work-samples/`
  - example: `/writing/about/` -> `/en/writing/about/`
- Keep trailing slashes on generated nav targets (current implementation in `SiteNav.js`).

## Translation Contract
All variant labels and copy are localized in the content registry, including:
- hero text
- nav labels (if needed)
- about/work/education sections
- contact/disclaimer
- portfolio toggle labels

## Landing Contract
- Landing component is shared.
- Writing and impro use different hero media.
- Toggle on landing changes route namespace (`writing` <-> `impro`), not just local state.
- Keep contact badge, toggle, and disclaimer visible on landing unless explicitly changed.

## Visual Lock Notes (From Mock Alignment)
These are intentional and should not be casually reverted:
- Writing about page uses fixed desktop two-column composition matched to PDF mock.
- Impro about page uses backdrop layout with boxed inline paragraph backgrounds.
- Impro work page uses split layout with right feature image and widened left text flow.
- Education title sizing differs by locale to prevent overlap (DE has stricter cap).

## Safe Edit Checklist
Before changing routing/nav/layout:
1. Confirm both namespaces (`writing`, `impro`) in both locales still resolve.
2. Verify language switch keeps current page path.
3. Verify menu tabs point to the active namespace.
4. Verify no visual regressions against PDF mock pages.
5. Keep changes scoped (writing-only vs impro-only) in CSS selectors.

## Extending Content Safely
To add or edit a variant:
1. Update `src/data/portfolioContent.js` only.
2. Keep object shape compatible with current components.
3. Avoid UI/layout changes unless explicitly required.
