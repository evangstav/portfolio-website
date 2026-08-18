# Concert gallery photo update

**Date:** 2026-08-17 · **Status:** approved for implementation

## Goal

Add all six supplied concert photographs to the existing Media photo gallery
without removing its four current images. Preserve the compositions of both
portrait and wide landscape photographs while keeping the page fast and the
English and Greek versions accessible.

## User-confirmed decisions

- Keep the four existing gallery images.
- Add all six supplied concert photographs.
- Use an adaptive gallery presentation rather than forcing every image into the
  existing portrait crop.
- Do not change the homepage or replace its hero image.

## Design

The Media photo gallery will contain ten images. Existing portraits and the new
concert photographs will be arranged in a deliberate sequence that mixes close
conducting views with wider ensemble scenes. Gallery tiles will retain each
image's natural aspect ratio. The existing lightbox, previous/next navigation,
keyboard handling, and responsive layout will remain intact.

The six source files will be copied into `public/images/` with descriptive,
web-safe filenames. Large originals will be resized and compressed to
web-appropriate JPEGs, retaining enough resolution for the full-screen
lightbox. The source files in Downloads will not be modified.

Both conductor data files will receive the same six gallery entries in the same
order. Each entry will have an English or Greek alternative description that
identifies Vaggelis Stavropoulos and the visible concert context without
inventing an event, venue, ensemble, or date.

## Verification

- Confirm all ten image entries resolve in both locales.
- Run the linter and production build.
- Inspect the Media photo gallery and lightbox at desktop and mobile viewport
  widths, checking image crops, order, navigation, and layout stability.
- Confirm the optimized files are substantially smaller than the supplied
  originals and contain no unintended metadata-dependent rotation.

## Out of scope

- Replacing existing photos or changing the homepage imagery.
- Adding event captions, dates, venue names, or ensemble names that were not
  supplied.
- Removing visible photographer watermarks.
- Publishing, committing, or pushing changes without separate authorization.
