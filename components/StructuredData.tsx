/**
 * JSON-LD structured data for the homepage.
 *
 * Emits a single <script type="application/ld+json"> containing an @graph with
 * three linked nodes:
 *   - SoftwareApplication — the Chrome extension itself (rating, price, store URL)
 *   - Organization        — disambiguates "us" from similarly-named clones via sameAs
 *   - WebSite             — the marketing site (no SearchAction; the site has no search)
 *
 * Honesty note: aggregateRating mirrors the live Chrome Web Store listing and is
 * the SAME point-in-time snapshot shown in `components/landing/hero/cws-badge.tsx`
 * (verified 2026-06-01: 4.1 from 9 ratings). When those numbers change materially,
 * update them in BOTH places. Do not invent an install/user count — the CWS listing
 * does not publicly disclose one.
 */

const SITE_URL = "https://www.wwebcustomizer.com";
const CWS_URL =
  "https://chromewebstore.google.com/detail/whatsapp-web-customizer-%E2%80%93/pnelkhckhbbgaeilofckgeajggipnmkf";

// Single source of truth for the rating snapshot (keep in sync with cws-badge.tsx).
const CWS_RATING_VALUE = "4.1";
const CWS_RATING_COUNT = "9";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "WWeb Customizer",
      url: SITE_URL,
      logo: `${SITE_URL}/logo512x512.png`,
      sameAs: [
        "https://github.com/BaskLash/WhatsApp-Web-Customizer",
        CWS_URL,
        "https://discord.gg/cppbDz4qhn",
        "https://buymeacoffee.com/olivierluethy",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: "WWeb Customizer",
      url: SITE_URL,
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "SoftwareApplication",
      name: "WhatsApp Web Customizer",
      description:
        "A free, open-source browser extension that customizes WhatsApp Web with themes, custom fonts, custom backgrounds, a privacy blur, and quick replies.",
      url: CWS_URL,
      applicationCategory: "BrowserApplication",
      operatingSystem: "Chrome",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: CWS_RATING_VALUE,
        ratingCount: CWS_RATING_COUNT,
      },
      author: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inject; no user-controlled data is included.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
