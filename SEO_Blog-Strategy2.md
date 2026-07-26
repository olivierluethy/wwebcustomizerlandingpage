# WhatsApp Web Customizer — SEO & Blog Strategy v2.0

**Version 2.0 — 26 July 2026** (supersedes v1.0 of 7 July 2026)
**Covering period: 26 July – 15 August 2026 (21 days, 2 pieces published per day)**

This document is self-contained. A human writer or any AI model should be able to read it and produce a publish-ready blog post without further instructions. If you are an AI: read the whole document, then follow Part 9.

---

## PART 0 — WHAT CHANGED SINCE v1.0, AND WHY

v1.0 was written from **product usage data** (PostHog: what people click inside the extension). It concluded: stop writing troubleshooting, write customization.

We now have **three months of real search data**. That data says v1.0 was **half right and half wrong**, and the half that was wrong is costing us most of our potential traffic.

Read Part 1 before you accept any recommendation in this document.

---

## PART 1 — THE DATA (Google Search Console + Vercel, as of 26 July 2026)

### 1.1 Top pages, last 3 months (Search Console)

| Page | Clicks | Impressions | CTR |
|---|---|---|---|
| whatsapp-web-keeps-logging-out-fixes-for-2026 | 269 | 43,359 | **0.62%** |
| whatsapp-web-calls-not-working-how-to-fix-voice-video-issues | 95 | 18,706 | **0.51%** |
| how-to-change-the-font-on-whatsapp-web | 55 | 4,257 | **1.29%** |
| whatsapp-web-notifications-not-working-complete-fix-guide | 49 | 11,470 | **0.43%** |
| how-to-read-whatsapp-messages-without-showing-online-blue-ticks | 48 | 7,427 | **0.65%** |
| Homepage `/` | 41 | 2,085 | **1.97%** |
| whatsapp-web-not-working-10-fixes-that-actually-work | 35 | 13,449 | **0.26%** |
| whatsapp-web-not-loading-fixes-that-actually-work | 33 | 8,857 | **0.37%** |
| whatsapp-web-keyboard-shortcuts-the-complete-2026-list | 29 | 12,428 | **0.23%** |
| how-to-change-whatsapp-web-background-wallpaper | 25 | 2,969 | **0.84%** |

**Top 10 combined: ~679 clicks from ~125,000 impressions → blended CTR ≈ 0.54%.**

### 1.2 Momentum (same pages, shorter windows)

| Page | 3 months | 28 days | 7 days |
|---|---|---|---|
| keeps-logging-out | 269 | 243 | 76 |
| calls-not-working | 95 | 86 | 18 |
| not-loading | 33 | 33 | 13 |
| keyboard-shortcuts | 29 | 19 | 15 |

**Almost all of our 3-month traffic happened in the last 28 days.** The domain is warming up fast. This is the single most encouraging number in the dataset — we are not stagnating, we are early on a rising curve.

### 1.3 Vercel (actual visitors on site)

`keeps-logging-out` = **391 visitors, 18% of all site traffic**. Homepage = 171 (8%). `calls-not-working` = 155. Then a long tail. Notably present in Vercel but weak in GSC: `notification-sound` (94), `whatsapp-web-vs-whatsapp-desktop` (79), `is-whatsapp-web-safe` (68) — these get traffic from sources beyond Google.

### 1.4 The four conclusions that drive this strategy

**1. We do not have a demand problem. We have a POSITION problem.**
125,000 impressions in three months is real demand. A 0.54% CTR is not a "bad title" problem — a CTR that low means we are sitting around **position 15–30**, i.e. page 2 and 3. Google is showing us; nobody scrolls that far.

> A page at 43,359 impressions and 0.62% CTR that moves from ~position 18 to ~position 6 does not double. It goes to roughly 8–10% CTR — that is **~3,500 clicks instead of 269**, from the same query demand, with zero new posts.

**This is the highest-leverage fact in the document.** Twelve new posts cannot generate what fixing our existing top five can.

**2. v1.0 was right about conversion and wrong about abandonment.**
Troubleshooting readers convert worse — that remains true and is still our belief. But troubleshooting is **the only cluster that has achieved ranking at scale**, it is 80%+ of our traffic, and it is what Google currently believes this domain is about. Killing it does not make customization rank; it just removes the authority that would let customization rank. The correct model is not *replace*, it is **capture → route → convert**.

**3. Our customization posts have 2–4× better CTR than our troubleshooting posts, on a fraction of the impressions.**
Font post: 1.29%. Background post: 0.84%. Homepage: 1.97%. Troubleshooting posts: 0.23–0.62%. Customization queries are **less competitive, more specific, and more aligned**. The cluster is under-built, not under-performing. This is where the growth is.

**4. Concentration risk is high.** One post is 18% of site traffic. One Google update, one WhatsApp fix that makes "keeps logging out" stop happening, and 18% evaporates. We need three or four load-bearing clusters, not one load-bearing post.

---

## PART 2 — THE STRATEGY: CAPTURE → ROUTE → CONVERT

Three jobs, three kinds of content. Every post must know which job it is doing.

```
CAPTURE            →   ROUTE               →   CONVERT
Troubleshooting        Privacy / power-user     Themes, backgrounds,
& news posts           / "make it nicer"        fonts, dark mode,
(huge volume,          bridge posts             aesthetic recreations
low intent)            (volume + intent)        (low volume, high intent)
```

- **Capture** posts exist to win impressions and authority. They are *not* judged on installs. They are judged on rankings, and on how many readers they hand off.
- **Route** posts are the bridge. Privacy and power-user topics have troubleshooting-scale search volume *and* map directly to real extension features (privacy blur, Minimal Mode, visibility controls). **This is the most under-exploited opportunity we have** and the biggest structural change in v2.0.
- **Convert** posts are where installs happen. They are small-volume by nature. They only work if capture and route posts feed them.

### 2.1 The Routing Module (mandatory in every capture post)

Every troubleshooting or news post must contain a routing block — **not** a hard product pitch — placed after the reader's problem is solved:

> ### Now that it works — make it yours
> One short paragraph acknowledging the fix is done, then 2–3 internal links into the Convert cluster, phrased as reader value, not product value.
> *Example:* "While you're in here: most people never change WhatsApp Web's default green. If you want a true black OLED look for night use, here's how →"

Rule: the routing module goes **after** the answer, never before it. If a reader has to scroll past a pitch to fix their problem, we lose the ranking and the reader.

### 2.2 Content pillars and their weight

| Pillar | Job | Share of new posts | Why |
|---|---|---|---|
| **P1 — Appearance & Customization** | Convert | **40%** | Best CTR, core product, under-built |
| **P2 — Privacy & Discretion** | Route | **25%** | Big volume + maps to privacy blur (15.5% feature engagement) |
| **P3 — Power-user & Productivity** | Route | **15%** | Shortcuts post proves demand (12.4k impressions); maps to Minimal Mode |
| **P4 — Troubleshooting** | Capture | **10% new / all refreshes** | Proven ranker. New posts only where volume is huge or a 2026 change gives us a freshness edge |
| **P5 — News & feature explainers** | Capture | **10%** | Usernames, Meta AI, calls on Web — freshness beats authority on new topics |

### 2.3 The refresh program (do not skip this)

**Refreshing an existing ranker beats writing a new post, most days.** v1.0 already flagged this and we did not act on it — the font post decayed while we published elsewhere.

A refresh is not a re-date. A refresh means:

1. **Rewrite the title and meta description for CTR** (Part 6.3 formulas). This is the single fastest win on pages sitting at 0.2–0.6%.
2. **Add genuine new depth** — 2026-specific causes, new WhatsApp behaviour, a comparison table, a decision tree.
3. **Add FAQ structured data** for the 4–6 "People also ask" style questions the post already answers.
4. **Add the Routing Module** and 3–4 fresh internal links.
5. **Add a 40-word answer box** directly under the H1 for the exact query (wins featured snippets and lifts CTR).
6. **Update the `date` field.** Keep the slug unchanged — never break a ranking URL.

---

## PART 3 — WHAT WE ARE NOT WRITING

- **New troubleshooting posts outside the approved list in Part 7.** The cluster is broad enough; depth on existing pages beats breadth now.
- **Additional font posts.** Seven already exist. That cluster is saturated — refresh the winner instead.
- **Near-duplicates.** Before writing, check *search intent* overlap against existing posts, not keyword overlap. If an existing post targets that intent, improve it.
- **Pure-answer posts** where the reader gets one fact and leaves with no reason to customize.
- **Fabricated anything.** Never invent user counts, features, testimonials, press coverage, hex codes, or WhatsApp behaviour. If it is not verifiable, it does not go in.
- **Claims about premium features that do not exist yet.** Nothing currently free may be described as gated.

---

## PART 4 — WHAT THE PRODUCT ACTUALLY DOES (features you may describe)

Free, open-source Chrome extension. CWS ID `pnelkhckhbbgaeilofckgeajggipnmkf`.

- **Themes** — full colour theming, JSON import/export
- **Backgrounds** — static images and animated backgrounds
- **Typography** — 500+ fonts, Font Manager (upload / load by URL)
- **Privacy blur** — blur message content and/or contact names
- **Visibility & Minimal Mode** — hide interface elements, declutter
- **Quick replies** — exists, being de-emphasised (2.4% engagement)

Nothing else. If you are unsure a feature exists, do not claim it.

**Trust signal (real, do not embellish):** "featured by MakeUseOf, TechPP, and other tech publications in 2025–2026."

**Install CTA:** `https://chromewebstore.google.com/detail/whatsapp-web-customizer-%E2%80%93/pnelkhckhbbgaeilofckgeajggipnmkf`
**Community CTA:** `https://discord.gg/cppbDz4qhn`

---

## PART 5 — HOW TO RESEARCH BEFORE WRITING

1. **Verify the feature is real** — ours (Part 4) and WhatsApp's.
2. **Search the live web.** WhatsApp changes constantly. Prefer official sources, WABetaInfo, and reputable tech press over forums. Never invent hex codes, brand colours, or WhatsApp behaviour.
3. **Known 2026 context worth using:** usernames rolling out globally; Meta AI (chat, `/imagine`, Writing Help, expanded with suggested replies in March 2026, and it can be disabled); voice and video calling arrived on WhatsApp Web — significant for Linux users, with group calling still maturing; linking via 8-character code instead of QR since February 2026; multiple accounts on iOS; WhatsApp requires iOS 15.5+ from 30 November 2026. **Re-verify each of these before stating it** — this list is a research starting point, not a source.
4. **Check cannibalization** against existing posts by intent.
5. **Identify the exact search intent** and answer it in the first screenful.
6. **For theme/aesthetic posts, specify a complete palette** — background, sidebar, sent bubble, received bubble, accent, text — so a real JSON file can be generated.

---

## PART 6 — HOW TO WRITE

### 6.1 Voice

- **Honest over hype.** Name limitations. If a competitor does something better, say so.
- **Useful first, product second.** The post must help even if nobody installs anything.
- **Concrete over generic.** Real hex codes, real font names, real steps.
- **Plain, confident, friendly.** Short paragraphs. No fluff. No emoji spam (a single ⬇ or 👉 on a CTA is fine).

### 6.2 Standard structure

1. **H1** matching the title.
2. **Answer box** — 40–60 words directly under the H1 that answer the query outright. Non-negotiable for capture posts; strongly recommended everywhere. This is our featured-snippet and CTR play.
3. **Hook** — 2–3 short paragraphs naming the reader's situation.
4. **Body** — the substance. `##` / `###` headings, short paragraphs, lists where they genuinely help, tables for comparisons.
5. **FAQ section** — 4–6 real questions, each answered in 40–60 words (feeds FAQ schema).
6. **Routing module or product bridge** — late, light, honest. Last 15–20% of the post.
7. **Bottom line** — short summary + soft CTA.
8. **Internal links** — 3–4 to related posts, at least one crossing from capture into convert.

### 6.3 Title & meta formulas (this is our CTR fix)

Our current titles are descriptive. Descriptive titles lose to specific ones. Use one of these:

- **Number + outcome + year:** "7 WhatsApp Web Themes That Actually Look Good (2026)"
- **Query mirror + differentiator:** "WhatsApp Web Keeps Logging Out? The 3 Causes Nobody Fixes"
- **Negative/curiosity edge:** "WhatsApp Web Dark Mode Isn't Really Dark — Here's How to Fix It"
- **Time promise:** "Change Your WhatsApp Web Background in Under 60 Seconds"

Rules: primary keyword in the **first 5 words**; under ~60 characters; the year only when the topic is genuinely time-sensitive; never two of our own titles competing for one intent.

Meta description: 150–160 characters, states what the reader gets, contains the primary keyword, never duplicates the title.

---

## PART 7 — THE OUTPUT FORMAT (non-negotiable)

Every post is delivered as a single TypeScript object, ready to drop into the blog data file:

```typescript
{
  title: "The Full Post Title (Human-Readable, With Year If Relevant)",
  slug: "url-safe-slug-lowercase-hyphenated-keywords-2026",
  seoIndex: "yes",
  description: "A 150–160 character meta description written for search: what the post delivers + the primary keyword, phrased to earn the click. No fluff, no clickbait.",
  date: "2026-07-26",
  readTime: "7 min",
  content: `# The Post Title (H1, matches title)

Markdown body goes here, inside backticks as a template literal...
`,
},
```

**Field rules**

- `title` — keyword in the first 5 words, under ~60 characters, formula from 6.3.
- `slug` — lowercase, hyphenated, built from the 3–6 most important query tokens in natural order. Year appended only if time-sensitive. **Never change the slug of a published post.**
- `seoIndex` — `"yes"` by default.
- `description` — 150–160 characters.
- `date` — `YYYY-MM-DD`, the publish date from the calendar below.
- `readTime` — word count ÷ 220, rounded, as `"X min"`.
- `content` — Markdown in a template literal, starting with one `# H1` matching the title, ending with the internal-links block. Escape any backticks inside the content.

**For a refresh:** return the same object shape with the **original slug unchanged**, a new `title`, new `description`, updated `date`, and the full rewritten `content`. Mark it in your reply as a refresh so it replaces rather than adds.

---

## PART 8 — THE CALENDAR: 26 JULY – 15 AUGUST 2026

Two pieces per day. **Slot A is always a new post. Slot B is a refresh or a second new post.** ⚠ marks posts that need theme JSON files generated before publishing.

The refreshes are deliberately front-loaded into week 1, because they act on the pages that already have 125,000 impressions. If anything in this calendar slips, **let a new post slip, not a refresh.**

### Week 1 — 26 July to 1 August (refresh-heavy: fix what already ranks)

| Date | Slot A — New post | Slot B — Refresh |
|---|---|---|
| **Sun 26 Jul** | **WhatsApp Web Dark Mode Isn't Really Dark — Here's How to Fix It** · P1 · `whatsapp-web-true-dark-mode-oled-2026` · Intent: "whatsapp web dark mode" (huge volume, perfectly aligned) | **`whatsapp-web-keeps-logging-out-fixes-for-2026`** — our 43k-impression page. New title, answer box, FAQ schema, routing module. Highest-value single task in this plan. |
| **Mon 27 Jul** | **How to Change Chat Bubble Colours on WhatsApp Web** · P1 · `whatsapp-web-chat-bubble-colours-2026` | **`whatsapp-web-keyboard-shortcuts-the-complete-2026-list`** — 12,428 impressions at 0.23% CTR, our worst ratio. Retitle, add 2026 shortcuts, route to Minimal Mode. |
| **Tue 28 Jul** | **How to Hide Chats and Contact Names on WhatsApp Web** · P2 · `hide-chats-contact-names-whatsapp-web-2026` · Direct map to privacy blur | **`whatsapp-web-not-working-10-fixes-that-actually-work-2026`** — 13,449 impressions at 0.26%. |
| **Wed 29 Jul** | **How to Make WhatsApp Web Text Bigger and Easier to Read** · P1 · `whatsapp-web-text-size-bigger-font-2026` | **`whatsapp-web-calls-not-working-how-to-fix-voice-video-issues-2026`** — update for calling on Web / Linux angle / group calling status. |
| **Thu 30 Jul** | **Using WhatsApp Web on a Work Computer: How to Keep It Discreet** · P2 · `whatsapp-web-work-computer-discreet-2026` | **`how-to-get-dark-mode-on-whatsapp-web-beyond-the-default`** — full rebuild. This is a money keyword sitting at ~61 impressions/day. Should be a pillar page. |
| **Fri 31 Jul** | **WhatsApp Web Themes: Install, Export and Share Custom Themes** · P1 · `whatsapp-web-themes-install-export-share-2026` · Growth loop, no JSON dependency | **`how-to-change-the-font-on-whatsapp-web`** — our decaying winner (16→6 clicks). Re-date, expand, make it the fonts hub for all seven font posts. |
| **Sat 1 Aug** | **How to Make WhatsApp Web Look Like Telegram** · P1 · `whatsapp-web-look-like-telegram-2026` · Full palette required | **`how-to-change-whatsapp-web-background-wallpaper-2026`** — expand into the backgrounds pillar hub. |

### Week 2 — 2 to 8 August (build the Route pillar)

| Date | Slot A — New post | Slot B |
|---|---|---|
| **Sun 2 Aug** | **WhatsApp Usernames: What Actually Changes for You** · P5 · `whatsapp-usernames-explained-2026` · Verify rollout status before writing | **New:** WhatsApp Web QR Code Not Working? Use the New 8-Digit Code Instead · P4 · `whatsapp-web-qr-code-not-working-8-digit-code-2026` · One of the few approved new troubleshooting posts — huge volume plus a Feb 2026 change gives us a freshness edge |
| **Mon 3 Aug** | **Best WhatsApp Web Extensions in 2026 (Honest Comparison)** · P1 · `best-whatsapp-web-extensions-2026` · Must genuinely credit competitors | **New:** How to Customise the WhatsApp Web Sidebar and Chat List · P1 · `whatsapp-web-sidebar-chat-list-customise-2026` |
| **Tue 4 Aug** | **WhatsApp Web Minimal Mode: Declutter the Interface** · P3 · `whatsapp-web-minimal-mode-declutter-2026` | **Refresh:** `whatsapp-web-notifications-not-working-complete-fix-guide-2026` (11,470 impressions, 0.43%) |
| **Wed 5 Aug** | **How to Use Two WhatsApp Accounts on WhatsApp Web** · P3 · `two-whatsapp-accounts-whatsapp-web-2026` | **New:** WhatsApp Web on Linux: The Best Setup in 2026 · P3 · `whatsapp-web-linux-setup-2026` |
| **Thu 6 Aug** | **Meta AI on WhatsApp Web: How to Use It — or Hide It** · P5+P1 · `meta-ai-whatsapp-web-hide-disable-2026` · Strong: "hide the AI button" is a visibility-feature intent | **Refresh:** `whatsapp-web-not-loading-fixes-that-actually-work-2026` (8,857 impressions, 0.37%) |
| **Fri 7 Aug** | ⚠ **Aesthetic WhatsApp Web: 7 Complete Looks** · P1 Tier-1 · `aesthetic-whatsapp-web-setups-2026` · Already drafted; needs JSON | **New:** How to Pin, Archive and Organise Chats on WhatsApp Web · P3 · `pin-archive-organise-chats-whatsapp-web-2026` |
| **Sat 8 Aug** | **WhatsApp Web for Students: The Focus Setup That Cuts Distractions** · P3 · `whatsapp-web-focus-setup-students-2026` | **Refresh:** `how-to-read-whatsapp-messages-without-showing-online-blue-ticks-2026` — expand into the privacy pillar hub. |

### Week 3 — 9 to 15 August (Convert cluster + theme downloads)

| Date | Slot A — New post | Slot B |
|---|---|---|
| **Sun 9 Aug** | ⚠ **10 Best WhatsApp Web Themes: Free JSON Downloads** · P1 Tier-1 flagship · `best-whatsapp-web-themes-free-downloads-2026` | **New:** How to Change WhatsApp Web's Green Accent Colour · P1 · `change-whatsapp-web-accent-colour-2026` |
| **Mon 10 Aug** | ⚠ **Dark WhatsApp Web Themes: 5 OLED-Ready Presets** · P1 Tier-1 · `dark-whatsapp-web-themes-oled-presets-download-2026` | **New:** How to Make WhatsApp Web Look Like Notion · P1 · `whatsapp-web-look-like-notion-2026` |
| **Tue 11 Aug** | **How to Hide Your Online Status and Last Seen on WhatsApp Web** · P2 · `hide-online-status-last-seen-whatsapp-web-2026` · Narrow the angle away from the blue-ticks post | **Refresh:** `is-whatsapp-web-safe-privacy-and-security-explained-2026` — add the open-source / auditable-extension angle. |
| **Wed 12 Aug** | **How to Make WhatsApp Web Look Like Discord** · P1 · `whatsapp-web-look-like-discord-2026` | **New:** How to Reduce Eye Strain on WhatsApp Web (Warm, Low-Contrast Setups) · P1 · `whatsapp-web-eye-strain-warm-theme-2026` |
| **Thu 13 Aug** | **Screenshots and Screen Sharing on WhatsApp Web: Hide What You Don't Want Seen** · P2 · `whatsapp-web-screenshot-screen-share-privacy-2026` · Strong remote-work intent, direct privacy-blur map | **Refresh:** `whatsapp-web-vs-whatsapp-desktop-which-should-you-use-2026` — good Vercel traffic, weak search presence. |
| **Fri 14 Aug** | ⚠ **Colourful and Vibrant WhatsApp Web Themes to Download** · P1 Tier-1 · `colourful-whatsapp-web-themes-download-2026` | ⚠ **New:** WhatsApp Web Themes for Focus and Productivity · P1 Tier-1 · `whatsapp-web-themes-focus-productivity-2026` |
| **Sat 15 Aug** | **How to Back Up and Restore Your WhatsApp Web Customization** · P1 · `backup-restore-whatsapp-web-customization-2026` | **Refresh:** `whatsapp-web-in-2026-every-feature-update-and-change-you-should-know` — re-date with usernames, calling on Web, 8-digit linking. |

**Totals:** 29 new posts, 13 refreshes, 42 published pieces.

### 8.1 Blocking dependency

Five ⚠ posts need schema-valid JSON theme files (exported from the extension or generated against `WA_THEME_VAR_KEYS`) plus a `theme_json_downloaded` PostHog event. **These files are the single highest-leverage engineering task in this period.** If they are not ready by 6 August, swap those Slot A entries for the P2 privacy topics listed in 8.2 rather than publishing dead download links.

### 8.2 Standby topics (use if a slot is blocked)

- How to Turn Off Read Receipts on WhatsApp Web · P2
- WhatsApp Web Notification Sounds: How to Change or Silence Them · P4 (94 Vercel visitors already — under-served)
- Best WhatsApp Web Setup for a Second Monitor · P3
- How to Make WhatsApp Web Look Like Slack · P1
- WhatsApp Web Privacy Checklist for Shared Computers · P2

---

## PART 9 — MEASUREMENT (what we check, and when)

**Weekly (every Sunday):**
- Impressions and average position for the 13 refreshed pages. **Position is the primary KPI, not clicks.** A page moving from 22 to 14 is working, even before the clicks arrive.
- CTR of refreshed pages vs their pre-refresh baseline. Target: **every refreshed page above 1.0% within 3 weeks.**
- Clicks by pillar (P1–P5), so we can see whether the Convert cluster is growing as a share of traffic.

**Every two weeks:**
- CWS installs vs blog sessions — our crude conversion proxy.
- `theme_json_downloaded` events, once wired. **This decides whether the theme-download format is worth continuing.** No data by 20 August = drop the format back to two posts a month until it proves itself.

**Targets for 15 August:**
- Blended CTR on top-10 pages: 0.54% → **1.2%**
- Convert-pillar clicks: currently ~80/month → **250/month**
- No single page above **12%** of total traffic (concentration risk down from 18%)

**A note on the user numbers:** ~800–900 PostHog actives vs ~3,000 shown on the Chrome Web Store are measuring different things (weekly-active-by-Google's-definition vs users who actually opened the popup with analytics consented). Do not treat either as "the" number, and **never publish either number in a blog post** — see Part 3.

---

## PART 10 — HOW TO REQUEST A POST FROM AN AI

Paste this document, then send:

> Write the post for **[DATE], Slot [A/B]** from the calendar in Part 8.
> Apply Parts 1–7. Verify anything factual against the live web before stating it.
> Before writing, give me one short paragraph on whether this topic is genuinely strategy-aligned and non-duplicative, and raise any objection you actually have.
> Then return exactly one TypeScript object in the Part 7 format. Nothing else after it.

For a refresh, add: *"This is a refresh — keep the slug unchanged, rewrite title, description and content, update the date."*

---

## PART 11 — SELF-REFLECTION (required reading; push back rather than comply)

**A strategy nobody challenges is how mistakes get locked in.** Here are the honest tensions in this document. Engage with them and raise new ones.

**1. Two posts a day for three weeks is still probably too fast for this domain — and now I can show it with our own data.**
Our problem is that 125,000 impressions convert to 679 clicks. That is a *position* problem. Publishing 29 more pages does not move the position of the pages we already have; it splits crawl budget and internal link equity across more URLs. If I could change one thing about this plan, it would be: **one new post per day plus one refresh per day**, or even one piece per day at double the depth. The compromise in this calendar — 13 of the 42 slots given to refreshes, all front-loaded — is me getting as close to that as the two-per-day decision allows. **Write two a day if you want, but consider publishing on a staggered schedule.** Writing velocity and publishing velocity are different levers.

**2. Reversing v1.0 on troubleshooting is a real reversal, and I want it on the record.**
v1.0 said stop. This document says keep, refresh, and route. The reason is that the data arrived: troubleshooting is the only thing ranking, and authority is not transferable if you delete the thing generating it. But v1.0's *underlying* claim — that troubleshooting readers do not install — is still untested. We have no attribution data linking blog sessions to installs. Until we do, both v1.0 and v2.0 are running on assumption. **Wiring even crude attribution (a UTM-tagged CTA per pillar) is worth more than any five posts in this calendar.**

**3. The theme-download format is still unproven, and it is now blocking five slots.**
Zero download data exists. I have kept it because the logic is sound, but I have deliberately scheduled all five in week 3 so the JSON dependency has time to clear and so we are not betting the front of the calendar on an untested format.

**4. The Privacy pillar is my biggest bet in this document and it could be wrong.**
The argument — privacy queries have troubleshooting-scale volume *and* map to a real feature — is strong on paper. The evidence is thin: one blue-ticks post at 48 clicks and a blur post that is rising. If by 8 August the privacy posts are performing like troubleshooting posts (high impressions, sub-0.5% CTR, no installs), cut the pillar back to 10% and move the weight to P1.

**5. Cannibalization is now a serious risk, not a theoretical one.**
This calendar contains a dark-mode post, an OLED-themes post, a Discord post and an eye-strain post — four pages orbiting "dark WhatsApp Web". They are separable by intent, but only if each one is written narrowly to its own intent. If any two start ranking for the same query, merge them and 301 the loser.

**6. What I would cut if forced.**
The Linux post, the two-accounts post, and the students post are the weakest in the calendar — plausible volume, weak product alignment. If a week runs short, drop those three first.

**Instruction to the writer:** when handed this strategy and a topic, first state in one short paragraph whether the topic is genuinely aligned and non-duplicative, and voice any real objection *before* writing. Then write the post in the Part 7 format. Being agreeable is not the job; being right is.

---

*End of strategy v2.0. Next review: 16 August 2026, against the Part 9 targets.*