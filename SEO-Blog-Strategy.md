# WhatsApp Web Customizer — Blog Content Strategy & Writer's Brief

**Version 1.0 — 7 July 2026**
This document is self-contained. Anyone (a human writer, ChatGPT, Claude, or any other model) should be able to read it and produce a blog post that fits our site, our strategy, and our format — without further instructions. If you are an AI, read the whole document before writing anything, and follow the self-reflection instruction in the final section.

---

## PART 1 — WHY WE BLOG (the goal behind every post)

We make **WhatsApp Web Customizer**, a free, open-source Chrome extension that lets people customize WhatsApp Web: **themes, custom backgrounds (static and animated), custom fonts, a privacy blur, and interface controls (Minimal Mode / visibility).** Chrome Web Store ID: `pnelkhckhbbgaeilofckgeajggipnmkf`.

The blog exists for **one primary goal: acquire users who will actually use and value the extension** — and, in time, pay for a premium tier. Every post is judged against that goal.

This means we care about **qualified traffic, not raw traffic.** A post that gets 5,000 impressions from people who will never install the extension is worth *less* to us than a post that gets 500 impressions from people who want to customize their WhatsApp Web. This is the single most important idea in this document.

### The data that drives this (as of July 2026)

From PostHog analysis of real extension usage (776 users, 38k events), we know exactly what our users do. Popup navigation:

- **Themes — 62%** (this is the core of the product)
- Display/Visibility — 11%
- Backgrounds — 9%
- Typography (fonts) — 5%
- Replies — 2.9% (weakest feature)

Active feature engagement, by share of users: Themes 21.6%, Visibility/Minimal 20%, Fonts 17.4%, Privacy Blur 15.5%, Backgrounds 12.4%, Animated Backgrounds 9.7%, Quick Replies 2.4%.

**The hierarchy is therefore: Themes → Backgrounds (incl. animated) → Fonts → Privacy/Visibility.** Content should be weighted toward this hierarchy, because these are the things our actual audience wants.

### The relevance principle (the core lesson)

We spent months writing troubleshooting posts ("WhatsApp Web not working", "keeps logging out", etc.). They earn high impressions — but the traffic is **misaligned with the extension.** Someone whose WhatsApp Web won't load is not in the market for a theme; they want their problem fixed and they leave. High impressions, low CTA clicks, low install intent.

**So: we are de-prioritizing troubleshooting content.** We keep the existing troubleshooting posts live (they build domain authority that lifts everything else), but we are **not writing new ones as a primary strategy.** New posts should be about what the extension *does* — customization — so the reader who arrives is already the person who wants what we offer.

Every new post must pass this test before it's written:

> **"Is the person searching for this query someone who would plausibly want to customize their WhatsApp Web?"**
> If yes → strong candidate. If no (they just want a fix, or an answer, then they leave) → weak candidate, skip it unless there's a specific reason.

---

## PART 2 — THE CONTENT STRATEGY (what to write)

### Tier 1 — Theme-download posts (our highest-value format)

These are the flagship format. A post that showcases specific themes, each with a **downloadable JSON file** the reader imports into the extension in ~10 seconds. Examples: "10 Best WhatsApp Web Themes", "Dark/OLED Themes to Download", "Aesthetic Setups (theme + font + background)".

Why this format wins:
- It targets the 62%-of-clicks core feature (themes).
- It **demonstrates the product instead of describing it** — the reader experiences theme import, which is the "wow" moment that converts.
- It's **measurable**: each download can fire a PostHog event, so we learn which aesthetics people want.
- It **builds product inventory**: the most-downloaded themes become built-in presets, and eventually the seed of a **premium theme tier** (a second revenue path alongside premium animated backgrounds).

Dependency: these posts need real, schema-valid JSON theme files (exported from the extension or generated against `WA_THEME_VAR_KEYS`), or the download links are dead. A theme-download post is not publishable until its files exist.

### Tier 2 — Feature-education posts aligned to the hierarchy

How-to and "best of" posts about the core features: themes, backgrounds (static + animated), fonts, privacy blur, Minimal Mode. Examples: "How to change your WhatsApp Web background", "Best fonts for WhatsApp Web", "Best animated backgrounds". These target people actively looking to customize.

### Tier 3 — Monetization-runway posts

Posts that build demand for what will become the paid tier — chiefly **animated backgrounds**. Written honestly (nothing currently free is gated; premium features that don't exist yet are not promised), using real usage data as social proof ("Water Bubbles is the most-set animation"). These posts warm the audience so that when premium animations/themes launch, demand already exists. Note our audience is **emerging-markets heavy** (Brazil, Indonesia, India, Pakistan, Egypt lead) — so any pricing discussion assumes **PPP / low price points**.

### Tier 4 — Aesthetic-recreation posts

"Make WhatsApp Web look like [iMessage / Telegram / Discord / Slack]" — these target people who explicitly want to change how WhatsApp Web looks, which is perfectly aligned. The iMessage one is a proven strong converter. Each should ideally ship with a downloadable theme file (Tier 1 mechanic).

### What we are NOT writing (unless a specific reason exists)

- **New troubleshooting posts** — misaligned with the extension (see relevance principle).
- **Pure-answer posts** where the reader gets their answer and leaves with no reason to customize (e.g. "what is WhatsApp Web", generic news with no customization angle).
- **Duplicate/cannibalizing posts** — before writing, check the query intent against existing posts. If an existing post already targets that intent, improve it instead of writing a near-duplicate. (We have, for example, already saturated the "fonts" cluster — seven font posts — so additional font posts have diminishing returns.)
- **Fabricated anything** — never invent user numbers, features, testimonials, or press coverage. If a fact isn't verifiable, don't state it.

---

## PART 3 — HOW TO RESEARCH (so the post is accurate and ranks)

Before writing, do this:

1. **Confirm the feature is real.** Only describe extension features that actually exist: themes, static + animated backgrounds, 500+ fonts + Font Manager (upload / load-by-URL), privacy blur, Minimal Mode/visibility, JSON import/export, quick replies (being de-emphasized). If unsure whether a feature exists, do not claim it.
2. **Search the live web** for the topic to ground any factual claims (WhatsApp features, colors, hex codes, how something works). WhatsApp changes often — verify against current sources, prefer official/WABetaInfo/reputable tech press over forums. Never invent hex codes, brand colors, or how a WhatsApp feature behaves.
3. **Check for cannibalization** against our existing posts. Match *search intent*, not just keywords. If it overlaps, narrow the angle or improve the existing post instead.
4. **Identify the real search intent** and write to it. What is the person actually trying to do? The post must deliver that in the first screenful, then go deeper.
5. **For theme/aesthetic posts, specify complete palettes** (background, sidebar, sent bubble, received bubble, accent, text as a minimum) so real JSON files can be generated. Palettes must be accurate to the aesthetic being recreated.

---

## PART 4 — HOW TO WRITE (voice, structure, rules)

### Voice & principles

- **Honest over hype.** Acknowledge limitations. If a competitor does one thing better, say so. If a feature doesn't exist yet, don't imply it does. This honesty is a core brand trait and it builds trust that converts better than overselling.
- **Useful first, product second.** The post must genuinely help the reader even if they never install anything. The extension is presented as the natural solution, not forced.
- **The product bridge comes late and light** — generally in the last 15–20% of the post, framed as "here's the natural tool for this", never as the opening pitch. Exception: pure product posts (theme downloads) where the extension is intrinsic to the how-to.
- **Concrete over generic.** Real hex codes, real font names, real steps, real numbers (only if verifiable). Specificity is what ranks and what earns trust.
- **Plain, confident, friendly.** Short paragraphs. No fluff. No emoji spam (a single arrow ⬇ or 👉 for a CTA is fine).

### Standard post structure

1. **Hook** (2–3 short paragraphs): name the reader's situation/desire, promise the payoff.
2. **Optional quick-answer or "what you'll need"** block for how-to posts.
3. **Body**: the substance — steps, theme list, comparisons, etc. Use `##` and `###` headings, short paragraphs, and lists where they genuinely help.
4. **Product bridge**: the extension as the natural solution (late, honest, light).
5. **Bottom line**: a short summary + soft CTA.
6. **Internal links**: 3–4 links to related existing posts at the end (and inline where natural). This is important for SEO and for keeping readers in our cluster.

### The install CTA (use consistently)

Chrome Web Store link:
`https://chromewebstore.google.com/detail/whatsapp-web-customizer-%E2%80%93/pnelkhckhbbgaeilofckgeajggipnmkf`
Discord (for community/theme-sharing CTAs): `https://discord.gg/cppbDz4qhn`
Trust signal when relevant: "featured by MakeUseOf, TechPP, and other tech publications in 2025–2026" (this is real — do not embellish it).

---

## PART 5 — THE EXACT OUTPUT FORMAT (non-negotiable structure)

Every post is delivered as a single **TypeScript object** in exactly this shape, ready to drop into our blog data file:

```typescript
{
  title: "The Full Post Title (Human-Readable, With Year If Relevant)",
  slug: "url-safe-slug-lowercase-hyphenated-keywords-2026",
  seoIndex: "yes",
  description: "A 150–160 character meta description written for search: what the post delivers + the primary keyword, phrased to earn the click. No fluff, no clickbait.",
  date: "2026-07-08",
  readTime: "7 min",
  content: `# The Post Title (H1, matches title)

Markdown body goes here, inside backticks as a template literal...
`,
},
```

### Field rules

- **`title`**: Human-readable, includes the primary keyword near the front, may include the year. Under ~60 characters where possible for SERP display.
- **`slug`**: lowercase, hyphenated, URL-safe. Built from the primary keywords, not the full title. Include the year if the topic is time-sensitive (`-2026`). No stop-word padding. Example: title "How to Change the Font on WhatsApp Web" → slug `how-to-change-the-font-on-whatsapp-web`. Example: "Dark WhatsApp Web Themes: 5 OLED-Ready Presets to Download" → slug `dark-whatsapp-web-themes-oled-ready-presets-download-2026`.
- **`seoIndex`**: `"yes"` for posts we want indexed and ranking (the default for all real content). `"no"` only if we deliberately want to keep a post out of the sitemap.
- **`description`**: 150–160 characters. This is the meta description shown in search results. Write it to earn the click: state what the reader gets and include the primary keyword. Never duplicate the title verbatim.
- **`date`**: `YYYY-MM-DD`. Use the intended publish date. Stagger publish dates rather than dumping many posts on one date.
- **`readTime`**: honest estimate, `"X min"` (roughly word count ÷ 220, rounded).
- **`content`**: Markdown inside a backtick template literal. Starts with a single `# H1` that matches the title. Uses `##`/`###` for sections. Ends with the internal-links block. Any backticks *inside* the content (for code, hex values, keys) must be escaped or use single backticks carefully so the template literal doesn't break.

### Slug/SEO construction rule (explicit)

The slug IS the SEO URL. Build it from the 3–6 most important keyword tokens a person would search, in natural order, hyphen-separated, lowercase, year appended if time-sensitive. It should read like the search query. Do not stuff extra keywords. Do not change the slug of an already-published post (it breaks the URL).

---

## PART 6 — THIS WEEK'S PLAN (aligned to the strategy)

Two posts per day. The client has decided on this cadence; this document notes (see Part 7) that slower would likely rank better on a young domain, but the plan below follows the two-per-day decision. **Today (7 July) already has its two posts — the plan therefore starts tomorrow, 8 July.**

All posts below are strategy-aligned (Tiers 1–4), not troubleshooting. Theme-download posts are marked ⚠ where they depend on JSON files being generated first.

**Tue 8 July**
1. ⚠ Best WhatsApp Web Themes for Focus & Productivity (Tier 1, theme downloads)
2. How to Change Your WhatsApp Web Background: Static & Animated (Tier 2, backgrounds)

**Wed 9 July**
3. ⚠ Minimalist WhatsApp Web: Themes & Setup to Declutter Your Chat (Tier 1 + Minimal Mode)
4. Best Animated Backgrounds for WhatsApp Web (Tier 3, monetization runway) — *(already drafted)*

**Thu 10 July**
5. ⚠ Aesthetic WhatsApp Web Setups: 7 Complete Looks (Tier 1) — *(already drafted; needs files)*
6. How to Make WhatsApp Web Look Like Notion (Tier 4, aesthetic recreation)

**Fri 11 July**
7. ⚠ 10 Best WhatsApp Web Themes: Free JSON Downloads (Tier 1 flagship) — *(already drafted; needs files)*
8. How to Share WhatsApp Web Themes With Friends (Tier 1 mechanic, growth loop) — *(already drafted; publishable now)*

**Sat 12 July**
9. ⚠ Dark WhatsApp Web Themes: 5 OLED Presets (Tier 1) — *(already drafted; needs files)*
10. Best WhatsApp Web Setup for Students (Tier 2, aligned audience)

**Sun 13 July**
11. ⚠ Colorful & Vibrant WhatsApp Web Themes to Download (Tier 1)
12. How to Back Up & Restore Your WhatsApp Web Customization (Tier 2, uses JSON export)

**Blocking dependency:** six of these are theme-download posts needing JSON files. The single highest-leverage task this week is generating those files (via the extension's export or a Claude Code script against `WA_THEME_VAR_KEYS`) and wiring a `theme_json_downloaded` PostHog event. Until then, ⚠ posts can be written but not published.

---

## PART 7 — SELF-REFLECTION (required reading; the writer must engage with this)

**If you are an AI or a writer using this strategy, do not follow it blindly. You are explicitly asked to push back where you genuinely disagree.** A strategy nobody challenges is how mistakes get locked in. Here are the honest tensions in this very document — engage with them, and raise new ones if you see them:

1. **The two-per-day cadence is probably too fast for a young domain.** High publishing velocity dilutes crawl budget and can look content-farm-like to Google, which can *slow down* the posts already ranking. Fewer, better-spaced posts usually rank better. The client has chosen two-per-day; this document follows that, but a writer who agrees the cadence is too aggressive should say so rather than silently comply. **Writing fast and publishing fast are different levers** — you can write two a day and still publish on a staggered schedule.

2. **De-prioritizing troubleshooting gives up real traffic.** Troubleshooting posts are our biggest traffic source right now. The strategy trades that traffic for *relevance*. This is a defensible bet (qualified traffic converts, unqualified doesn't), but it is a bet. If conversion data later shows troubleshooting posts actually do drive installs, revisit this. Don't treat "troubleshooting is bad" as dogma — it's a hypothesis grounded in the misalignment argument.

3. **The theme-download format is unproven.** It's strategically sound in theory (demonstrates the product, measurable, builds inventory) but we have zero download data yet. The first few posts in this format are a test, not a certainty. Measure `theme_json_downloaded` before committing the whole calendar to it.

4. **Cannibalization is a constant risk** because most of our topics orbit the same few keywords (themes, fonts, WhatsApp Web). Every new post must be checked against existing ones for *intent* overlap, not just keyword overlap. When in doubt, improve an existing ranking post instead of publishing a near-duplicate.

5. **We should be refreshing winners, not only writing new posts.** Our top performer (the font post) *decayed* (16→6 clicks) while we wrote new content. Updating and re-dating a decaying post that already ranks is often higher-ROI than a brand-new post. The calendar should probably include refresh slots, not only new-post slots.

**Instruction to the writer:** when you are handed this strategy and asked to write a specific post, first spend one short paragraph stating whether the requested topic is genuinely strategy-aligned and non-duplicative — and if you have a real objection, voice it before writing. Then write the post in the Part 5 format. Being agreeable is not the job; being right is.

---

*End of strategy. To request a post: give the topic. The writer applies Parts 1–5, sanity-checks against Part 2's "not writing" list and Part 7's self-reflection, and returns a single TypeScript object in the Part 5 format.*