# Daily Comfort Presell (Static)

## Overview

- Project type: Advertorial presell (static HTML/CSS/JS).
- Target: US readers 55–75, mobile-first, calm editorial layout.
- Goal: Informational article first, then CTA to the official offer.

## Key URLs (Internal)

- Home: `/`
- About: `/about/`
- Editorial Policy: `/about-editorial-policy/`
- Sources & Methodology: `/sources-methodology/`
- Medical Review Policy: `/medical-review-policy/`
- Contact: `/contact/`
- Privacy Policy: `/privacy-policy/`
- Terms: `/terms/`

## Google Ads Sitelinks (Recommended)

Use internal trust pages as sitelinks (not outbound CTAs):

- Editorial Policy → `/about-editorial-policy/`
- Sources & Methodology → `/sources-methodology/`
- Medical Review Policy → `/medical-review-policy/`
- Common Questions (FAQ anchor) → `/#faq`
- Contact → `/contact/`
- Privacy Policy → `/privacy-policy/`
- Terms → `/terms/`
- About This Site → `/about/`

## Google Ads Campaign Draft (TOFU Search)

Goal:

- Drive qualified Google Search traffic into the presell (editorial read-first), then maximize outbound CTA clicks to the official producer page.

Important:

- Replace the placeholder outbound URL before launching: `siteConfig.offerUrl` is still `https://example.com/official-offer`.
- Track the outbound click event (`cta_click`) as the primary conversion for optimization.

### Campaign Settings (Suggested)

- Network: Search
- Location: United States
- Language: English
- Bidding:
  - Start: Maximize Clicks (with CPC cap)
  - After enough conversions: Maximize Conversions
- Landing page (Final URL): `https://dailycomfort.starnixon.com/` (presell)

### Keywords (Max 4)

Ad Group 1 (Joint & Knee Discomfort):

- "knee discomfort cream"
- [joint discomfort cream]

Ad Group 2 (Back & Muscle Discomfort):

- "muscle discomfort cream"
- [back discomfort cream]

Suggested negatives (compliance + quality):

- cure, cures, treat, treatment, arthritis cure, rheumatoid, osteoarthritis
- prescription, opioid, surgery
- scam, fraud, lawsuit

### Ads (2 RSAs)

RSA 1 (Joint/Knee intent) - Headlines:

- Joint or Knee Discomfort?
- Topical Comfort Options
- For Everyday Activities
- Simple Daily Routine Fit
- Read Before You Decide
- Official Info, Not Hype
- Editorial Comfort Guide

RSA 1 (Joint/Knee intent) - Descriptions:

- Many adults research topical options for occasional knee or joint discomfort. Read first, then review official details.
- Calm, plain-language overview. No medical claims. Visit the official site for ingredients, directions, and product info.

RSA 2 (Back/Muscle intent) - Headlines:

- Back or Muscle Discomfort?
- Topical Comfort Research
- Everyday Mobility Support
- Calm Editorial Overview
- No Hype. Just Clarity.
- Review Ingredients & Info

RSA 2 (Back/Muscle intent) - Descriptions:

- Adults comparing topical options for occasional back or muscle discomfort can review this editorial guide first.
- Avoid exaggeration. Verify ingredients and directions on the official website before deciding.

### Assets (From This Presell)

Sitelinks:

- About This Site → `/about/`
- Editorial Policy → `/about-editorial-policy/`
- Sources & Methodology → `/sources-methodology/`
- Medical Review Policy → `/medical-review-policy/`
- Common Questions (FAQ anchor) → `/#faq`
- Contact → `/contact/`

Structured snippet (Suggested):

- Header: Types
- Values: Editorial Guide, FAQ Overview, Official Ingredients Review, Official Directions Review, Topical Comfort Options

Image assets:

- `assets/images/hero.webp`
- `assets/images/knee.webp`
- `assets/images/stairs.webp`
- `assets/images/family.webp`

Call asset:

- Only recommended if a real US phone line is available for compliance and user experience.

## Images (WebP)

Images are stored locally as WebP:

- `assets/images/hero.webp`
- `assets/images/stairs.webp`
- `assets/images/family.webp`
- `assets/images/knee.webp`

Primary image references are configured in:

- `assets/js/content/site-content.js` → `siteConfig.images.*`

Additional note:

- A new editorial knee-discomfort image was added directly in `index.html` between the Hero and the main article stack to better align with search intent around knee and joint discomfort.

## Structured Data (JSON-LD)

The site now ships with static JSON-LD in the HTML for stronger crawlability and richer SEO validation.

Current schema set:

- Organization
- WebPage
- Article
- FAQPage
- BreadcrumbList

Source:

- Static HTML output (`index.html` and legal pages)
- Runtime helpers: `assets/js/lib/schema.js`

Note: Images inside schema are emitted as absolute URLs (required by some parsers) even though the UI uses relative URLs.

## SEO Hardening

Recent SEO updates applied:

- Static per-page metadata in HTML (`title`, `description`, `canonical`)
- `hreflang` tags for `en-US` and `x-default`
- Open Graph and Twitter card metadata
- Static FAQ content in the initial HTML
- `sitemap.xml` updated with `lastmod`
- `llms.txt` updated to markdown-link format for agentic/LLM readability

Validation:

- Lighthouse mobile after updates: `SEO 100`, `Accessibility 100`, `Best Practices 100`, `Performance 99`

## Consent Banner (US) + Tracking Gate

This project includes a lightweight cookie/measurement banner suitable for US traffic.

### Behavior

- On first visit, the banner is shown with:
  - OK (grants consent)
  - Disable (denies consent)
  - Read Privacy Policy (links to `/privacy-policy/`)
- Tracking scripts and tracking events only run after consent is granted.
- Consent is stored in `localStorage` under key `dcj_consent_v1`.

### Implementation

- Banner logic: `assets/js/lib/consent.js`
- Tracking gate: `assets/js/lib/analytics.js`
- Styling: `assets/css/base.css` (search for `.cookie-banner`)

## Analytics & Tag Management (GTM-First)

IDs live in:

- `assets/js/content/site-content.js` → `siteConfig.tracking`

Current values:

- `gtmId: "GTM-T83VG88W"` — active; loaded behind consent gate
- `ga4Id: ""` — intentionally empty; GA4 is managed **inside** GTM (GTM-first model)

GTM-first model rationale:

- Avoids double-counting: if both `gtmId` and `ga4Id` are non-empty, and GTM also fires a GA4 tag, every event is counted twice.
- GA4 Measurement ID `G-1ZKG5S5X52` should be added as a GA4 Configuration tag **inside GTM**, not as `ga4Id` here.

Google Ads tag:

- Add as a separate field `awId` when you have the AW-... ID. Must also go through consent gate.

### Required GTM Container Setup

Inside GTM container `GTM-T83VG88W`, configure:

1. **GA4 Configuration tag** — fires on All Pages; Measurement ID `G-1ZKG5S5X52`
2. **cta_click event tag** — fires on Custom Event `cta_click`; variables: `location`, `destination`, `articleSlug`, `offerVariant`
3. **dataLayer variables** — one Data Layer Variable per payload field above

In GA4 Admin (`G-1ZKG5S5X52`): mark `cta_click` as a **Key event** (conversion).

## Content Optimization (v1.1)

Content was refined to improve visitor qualification and outbound CTR without changing layout, technical SEO, schema strategy, URL structure, or design system.

Highlights:

- Hero headline and subheadline now lean into joint, knee, back, and muscle discomfort search intent
- Additional trust/emotional block added in the pain-point flow
- New topical-approach narrative added after the traditional-solutions section
- Discovery section rewritten with stronger consumer-research framing
- CTA copy updated to be more curiosity-driven and editorially compliant
- FAQ expanded with topical-product and active-lifestyle questions
- Semantic entities such as joint discomfort, knee discomfort, back discomfort, muscle discomfort, daily mobility, and topical comfort formula were distributed more naturally through the page
- A new editorial image was inserted after the Hero to reinforce occasional knee discomfort intent without changing layout structure

Primary config:

- `assets/js/content/site-content.js`
- `index.html`

### CTA A/B Test

CTA label rotation is implemented client-side and persisted per visitor with `localStorage`.

Variants:

- Primary Hero CTA: `Learn More About This Topical Formula`
- Variant A: `See Official Product Details`
- Variant B: `Review Ingredients And Product Information`

Implementation:

- Label config: `assets/js/content/site-content.js`
- Selection logic: `assets/js/pages/home.js` (`hero` uses the primary CTA label, other CTA slots rotate A/B variants)
- Analytics payload field: `offerVariant` in `assets/js/lib/analytics.js`

### Microcopy Conversion Review

A later conversion-focused copy pass refined key microtext without changing layout, components, SEO structure, or technical implementation.

Updated areas:

- Hero kicker now frames the page as an editorial guide for adults researching topical comfort options
- Hero image caption now sounds more editorial and less generic
- Section labels were rewritten to feel more reader-centered and less internal/marketing-oriented
- CTA panel headings were tightened to feel more direct and decision-oriented
- Editorial disclosure was rewritten to sound cleaner and more trustworthy while preserving compliance

Primary file:

- `index.html`

Current microcopy examples:

- Hero kicker: `Editorial guide for adults researching topical comfort options`
- Hero caption: `Editorial image used to illustrate everyday mobility. No medical claims are implied.`
- CTA heading: `Ready to review the official details for this topical formula?`
- CTA heading: `Before deciding, review the official product information directly`
- Disclosure lead: `This page is published in an editorial format and may include affiliate links.`

## Favicon (Cross-Device)

A fully contextual favicon set was created using a leaf mark on brand blue `#2b6cb0`.

Files added:

- `favicon.ico` — 16/32/48 px multi-size ICO (browser tab + legacy)
- `favicon.svg` — vector source, `prefers-color-scheme` aware
- `apple-touch-icon.png` — 180×180 opaque PNG (iOS home screen)
- `assets/icons/icon-192.png` — PWA icon 192×192
- `assets/icons/icon-512.png` — PWA icon 512×512
- `assets/icons/icon-512-maskable.png` — Android adaptive icon (safe-zone padding)
- `site.webmanifest` — name, short_name, theme_color, background_color, icons array

The favicon link block is present in `<head>` on all 8 HTML pages (index + 7 legal pages).

## Images — Metadata & Schema

All 4 editorial images now carry full metadata for SEO, accessibility, and structured data.

### Metadata per image

Configured in `assets/js/content/site-content.js` → `siteConfig.imageAlt`, `siteConfig.imageMeta`:

| key | alt | name (schema) | caption |
|-----|-----|---------------|---------|
| hero | Older woman walking comfortably outdoors on a bright path | Everyday mobility — walking outdoors | Editorial image used to illustrate everyday mobility. No medical claims are implied. |
| knee | Older adult experiencing occasional knee discomfort during daily activities | Occasional knee discomfort at home | Editorial image showing occasional knee discomfort during a familiar daily routine at home. |
| stairs | Mature woman climbing stairs with confidence in a bright home | Climbing stairs with confidence | Readers often focus on comfort during normal tasks like using stairs. |
| family | Older adults spending time with family in a sunny park | Active family time outdoors | Staying active often means continuing to enjoy family routines and social time. |

### ImageObject schema

`assets/js/lib/schema.js` → `buildImageObject(key)` — emits a full `ImageObject` node per image with `url`, `contentUrl`, `name`, `caption`, `description`. All 4 images are included in the `Article` schema `image` array.

### og:image:alt / twitter:image:alt

Both meta tags are now present on all 8 HTML pages for social share accessibility compliance.

## Performance (Lighthouse)

Baseline before this session: Performance 78, CLS 0.412, LCP 2.6s.
**Result after fixes (PageSpeed Insights mobile, 2026-06-10): Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100.**


Fixes applied:

| Issue | Root cause | Fix |
|-------|-----------|-----|
| CLS 0.412 | Header/footer injected by JS into empty `<div data-mount>` | Pre-rendered static header/footer HTML in all 8 pages |
| CLS residual | stairs/family images had wrong width/height attributes (1600×1100 declared, 1216×912 actual) | Corrected to 1000×750; hero to 720×960; knee to 1200×800 |
| LCP / image weight | hero 60 KB; knee 231 KB | Resized and recompressed: hero→36 KB, knee→53 KB; total 412 KB→164 KB |
| No caching | No .htaccess | Added .htaccess: 1-year cache for images/fonts/icons, 7-day for CSS/JS, 1-hour for HTML |
| No compression | No .htaccess | Added mod_deflate (gzip) for HTML/CSS/JS/SVG/JSON |

Image dimensions in HTML (width × height):

- hero.webp: 720 × 960
- knee.webp: 1200 × 800
- stairs.webp: 1000 × 750
- family.webp: 1000 × 750

The JS runtime renderer (`renderers.js`) still injects identical markup at runtime — idempotent with the pre-rendered HTML, no duplicate content.

### Remaining opportunity

4 CSS files are render-blocking (~530ms combined). Merging into 1 file can push Performance to 95+. Not done yet — risk/reward tradeoff for future sprint.

## .htaccess (Apache)

Versioned in the repo root. Applied rules:

- `RedirectMatch 404 /\.git` — hides `.git` directory from public
- `RedirectMatch 404 \.md$` — hides `.md` files (DOCUMENTATION.md, DEPLOY.md, llms.txt if .md)
- `mod_deflate` — gzip on text/html, text/css, text/plain, application/javascript, application/json, image/svg+xml, application/manifest+json
- `mod_expires` — 1 year for webp/png/ico/svg/woff2; 7 days for css/js; 1 hour for html
- `mod_headers` — `Cache-Control` headers matching expires; `X-Content-Type-Options: nosniff`; `Referrer-Policy: strict-origin-when-cross-origin`

**⚠️ First deploy after this change:** The server had an untracked `.htaccess` (created previously via `printf`). Remove it before pulling:

```bash
cd ~/dailycomfort.starnixon.com && rm -f .htaccess && git pull
```

Subsequent deploys use the normal `git pull`.

## Deploy Workflow

See `DEPLOY.md` for full details.

Quick reference:

```powershell
# From the project root (Windows)
./deploy.ps1 -Message "Your commit message"
```

Then on the cPanel SSH terminal:

```bash
cd ~/dailycomfort.starnixon.com && git pull
```

The script stages everything, commits, pushes to `main`, and prints the server command.

## Structured Data — ImageObject (update)

The Article schema in `index.html` (static) and `assets/js/lib/schema.js` (runtime) now includes all 4 images as `ImageObject` nodes:

```json
"image": [
  { "@type": "ImageObject", "url": "...", "contentUrl": "...", "name": "...", "caption": "...", "description": "..." },
  // × 4 (hero, knee, stairs, family)
]
```

The runtime `buildHomeArticleSchema()` also includes the `author` field (Organization) to match the static HTML — a divergence that was caught and fixed.

## Local Preview

Use your existing local server (Vite preview/dev) and open:

- `http://127.0.0.1:4173/`

## UI Notes

### Secondary button hover

The secondary CTA button uses an explicit hover style to preserve contrast (prevents white-on-light hover).

- CSS: `assets/css/base.css` (`.button-link--secondary:hover`)

### Mobile image width

On mobile only, image containers in the hero and visual-pair sections use tighter padding so images can occupy more of the available width without changing the desktop layout.

- CSS: `assets/css/home.css` (`@media (max-width: 600px)`)

### Footer refinement

The footer received an editorial polish pass to feel cleaner and more premium without changing link structure.

Updates include:

- Better spacing between branding and legal links
- More refined type hierarchy in the editorial block
- Legal links styled as softer chips
- Subtle top divider for a more finished footer edge

Files:

- Markup hook: `assets/js/components/renderers.js`
- Styling: `assets/css/base.css`
