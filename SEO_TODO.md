# SEO — Open Follow-ups

Tracking SEO tasks that are identified but intentionally deferred. Completed SEO
work is recorded in `PHASE0_CHANGES.md` / `PHASE1_CHANGES.md`.

---

## 1. Add OG / Twitter share image (blocked on asset)

**Status:** Not started — waiting on a properly-designed image asset.
**Why deferred:** No 1200×630 asset is ready. We chose to wait rather than ship a
placeholder. Until this is done, link previews on social and some rich SERP
contexts render with no image, which weakens share CTR.

### What to do once the asset exists

1. **Add the asset** at:
   ```
   public/og-image.png
   ```
   - **Dimensions: 1200 × 630 px** (the standard OG / `summary_large_image` size).

2. **Wire up the metadata** in `app/layout.tsx`. Add an `images` array to BOTH the
   existing `openGraph` block and the `twitter` block (they should mirror each
   other). `metadataBase` is already set to `https://www.wwebcustomizer.com`, so a
   root-relative path resolves to the absolute URL automatically.

   In `openGraph`, add:
   ```ts
   images: [
     {
       url: "/og-image.png",
       width: 1200,
       height: 630,
       alt: "WhatsApp Web Customizer – Free & Open Source Extension",
     },
   ],
   ```

   In `twitter`, add (mirror of the above — `card` is already `summary_large_image`):
   ```ts
   images: ["/og-image.png"],
   ```

3. **Verify** after building:
   ```bash
   npx next build
   grep -oE '<meta property="og:image[^>]*>' .next/server/app/index.html
   grep -oE '<meta name="twitter:image[^>]*>' .next/server/app/index.html
   ```
   Both should now appear (currently they do not).

---

## 2. (Done) Sitemap host normalized

Fixed: `app/sitemap.ts` fallback now uses `https://www.wwebcustomizer.com` (with
`www`), matching `metadataBase`, `robots.ts`, and the canonical tag. Left here only
as a pointer; no further action needed.
