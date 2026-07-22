# FMRXR brand fonts (self-hosted)

The site's typography now uses the brand charter fonts:

- **Headlines** → Monument Extended
- **Body** → Resolve Sans

These are commercial fonts (Pangram Pangram) — **not** on Google Fonts, so they must
be self-hosted here. The `@font-face` rules in `src/app/globals.css` load these exact
filenames. Drop the files in this folder (`public/fonts/`) with these names:

## Monument Extended (headlines)

| File | Weight |
|---|---|
| `MonumentExtended-Regular.woff2` (or `.otf`) | 400 |
| `MonumentExtended-Ultrabold.woff2` (or `.otf`) | 800 / 900 |

## Resolve Sans (body)

| File | Weight |
|---|---|
| `ResolveSans-Regular.woff2` (or `.otf`) | 400 |
| `ResolveSans-Medium.woff2` (or `.otf`) | 500 |
| `ResolveSans-Bold.woff2` (or `.otf`) | 700 |

## Notes

- `.woff2` is preferred (smaller, faster). If you only have `.otf`/`.ttf`, keep the
  same base names — the `@font-face` rules already list an `.otf` fallback source.
- To convert `.otf` → `.woff2`: `pip install fonttools brotli` then
  `fonttools ttLib.woff2 compress MonumentExtended-Regular.otf`.
- Until the files are added, the site renders with graceful fallbacks
  (Space Grotesk / Geist), so nothing breaks in the meantime.
- Filenames are **case-sensitive** on the Netlify host — match them exactly.
