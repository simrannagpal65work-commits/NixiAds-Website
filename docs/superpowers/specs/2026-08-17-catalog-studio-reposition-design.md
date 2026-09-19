# Nixi Website Repositioning: Ads Studio + Catalog Studio — Design (brainstorm output)

Status: design agreed in chat, NOT YET WRITTEN TO A FORMAL SPEC FILE, NOT IMPLEMENTED.
This file is a handoff note so a fresh session can resume without re-deriving the discussion.
Next step when resuming: confirm this summary with the user, then either write the full
spec (`superpowers:brainstorming` architectural path) or go straight to implementation if
the user just wants to proceed — ask them.

## Why this exists

We (NixiAds-Website repo) are adding marketing/site support for **Catalog Studio**, a
second major product that already exists and ships in `C:\HE-ONE\Simran\creative-engine`
(the app at app.nixiads.com). The website currently only markets "Nixi = AI ad generator".
Mid-conversation we realized this isn't just "add a page" — it's a full repositioning of
the site's messaging, because Nixi is now two products, not one.

## What Catalog Studio actually is (confirmed from creative-engine code/docs)

Read `creative-engine/docs/catalog-feature-map.md` and `catalog-video-feature-map.md` for
full technical detail. Summary:

- AI photoshoot generator. User uploads a product photo, picks/uploads a **model**, **pose**,
  **scene/background** (plus secondary: footwear, pair-with items), and Nixi generates
  realistic on-model / lifestyle product photos. Fashion/apparel-first. Comparable reference
  (not to copy): https://www.getayna.com/
- **Catalog Video** = image→video extension (Kling 3.0 based, last-frame-chaining for videos
  >15s). Important: confirmed the video flow accepts **any uploaded image, not just a Nixi
  Catalog Studio-generated shot** (`VideoCatalogNew.jsx` — "upload an image or pick a
  completed shoot", gated only on `brandProfileId`). This fact changed our page-structure
  decision (see below).
- Live app pages already exist: `CatalogHome`, `CatalogNew → CatalogKit → CatalogModel →
  CatalogStyling → CatalogScene → CatalogPose → CatalogGenerate` flow, `MyCatalogPage`,
  `MyShootsPage`, video flow `VideoCatalogNew.jsx` → `VideoCatalogConcept.jsx`.

## Product naming (decided)

- **Ads Studio** — image-only today. Video for ads does NOT exist yet (future).
- **Catalog Studio** — has BOTH images and videos today (Catalog Video is the video half of
  Catalog Studio, not a separate third product).
- Plain names, no invented brand names — matches internal code naming (`CatalogHome` etc.)
  so marketing language stays consistent with what users see after signup.

## Key decision: Catalog Video gets a SECTION, not its own page

We flip-flopped on this — final answer is **section inside `catalog-studio.html`**, not a
standalone `catalog-video.html`. Reasoning trail (useful if it gets re-litigated):
- First instinct: video is downstream of a catalog shot → put it as a feature section.
- User pushed back: video accepts ANY uploaded image, independent of Catalog Studio →
  that's a real independent flow, briefly considered a standalone page.
- Final resolution: it's still not a separate *product* — it's the video capability of the
  Catalog Studio product (which itself = images + videos). Naming it as a third product
  would be wrong per the "Product naming" section above. So: one page, two sections —
  "Catalog Photos" and "Catalog Videos" — one hero, one FAQ, one CTA.
- How the format gap is communicated on site: icon-based. Ads Studio card/nav shows an
  image icon only. Catalog Studio card/nav shows image + video icons. When Ads Studio ships
  video later, just add the icon there — no restructure needed.

## Site structure (decided)

**Existing site today:** static HTML, no build step. `index.html` (homepage, currently 100%
ads-pitch content — hero, live-gen demo, how-it-works, ad clone teaser, brand-sense
explainer, FAQ, pricing, testimonials, footer). `clone.html` (Ad Clone feature landing page —
use this as the structural TEMPLATE for the new pages: meta/OG/canonical pattern, FAQ
JSON-LD pattern). `pages/` folder holds legal pages. `blogs/` folder. Nav today: logo, a
"Features" dropdown (currently has one item + `clone.html`), `#brandsense` `#faq` `#pricing`
anchors, CTA buttons to `app.nixiads.com`.

**Target structure (full rebuild, symmetric):**

1. **`index.html` (rebuilt, slim umbrella homepage)**
   - Headline reframed from ad-only to umbrella brand: something like *"Your brand's AI
     creative engine."* Subhead names both pillars: ad creatives for Meta/Instagram, and
     product photoshoots — generated from one brand profile.
   - New two-pillar section: **Ads Studio** card (image icon) + **Catalog Studio** card
     (image + video icons), each 2-3 line pitch + CTA linking to its own page.
   - Keep (trimmed/reworded to brand-level, not duplicated in full on every page):
     brand-sense explainer, testimonials, pricing, FAQ, footer.
   - Title tag / meta description / OG / Twitter / JSON-LD (`SoftwareApplication.featureList`)
     updated to umbrella framing covering both pillars.
   - Nav: two direct links — **Ads Studio**, **Catalog Studio** (dropdown likely removed/
     simplified since each is now a full page rather than a menu of sub-features — exact nav
     mechanics still to be decided during implementation).

2. **`ads-studio.html` (new)** — migrate today's homepage ad-generation content here: hero,
   live-gen demo, "how it works," ad clone teaser (links to existing `clone.html`, which
   stays as-is, just re-linked from here instead of from root nav), pricing tie-in,
   ads-specific FAQ. Image-only messaging (no video mentioned here).

3. **`catalog-studio.html` (new)** — photoshoot-replacement angle, hero e.g. "Skip the
   studio, skip the models, skip the photographer." Two sections: **Catalog Photos**
   (model/pose/scene picker, sample tiles) and **Catalog Videos** (turn any product shot —
   Nixi-generated or your own upload — into video). FAQ with JSON-LD (same pattern as
   `clone.html`). CTA → `app.nixiads.com` (generic link, matches existing pattern — no deep
   link into a specific app route; user confirmed this is fine).

**Explicitly out of scope (confirmed with user):**
- No pricing page restructure.
- No marketing detail on footwear/pair-with/proof-shot mechanics (too internal, not
  headline-worthy).
- No CTA deep-linking into specific app routes.
- No rewrite of `clone.html` itself — only its nav placement/linking changes.

## Design/visual pass — NOT YET DONE

Content/IA is settled (above). Visual design (layout, components, actual look) has not
started. User wants to do a design pass BEFORE implementation, using taste/frontend skills.

Mid-conversation we installed tooling to support this:
- Ran `npx skills add Leonxlnx/taste-skill` in the website repo — installed 13 skills to
  `.agents\skills\` (symlinked for Claude Code), including `design-taste-frontend`,
  `imagegen-frontend-web`, `high-end-visual-design`, `minimalist-ui`,
  `industrial-brutalist-ui`, `stitch-design-taste`, `brandkit`, `gpt-taste`,
  `image-to-code`, `redesign-existing-projects`, `imagegen-frontend-mobile`,
  `design-taste-frontend-v1`, `full-output-enforcement`.
- Ran `npx @21st-dev/cli init --client claude --write` — added a `21st` MCP server entry to
  `.mcp.json` (repo root) pointing at `https://21st.dev/api/mcp` with header
  `x-api-key: ${API_KEY_21ST}`.
- Set `API_KEY_21ST` as a persistent **User**-level Windows env var (PowerShell
  `SetEnvironmentVariable(...,'User')`) with the key the user provided. Key was pasted in
  plaintext in chat — user should consider rotating it on 21st.dev if this machine/session
  log is shared.

**Neither the new skills nor the 21st MCP tools were live in the session that did this
work** — skill lists and MCP connections both load only at session start, and this session
started before these changes. **A Claude Code restart is required** before either is usable.
This design doc exists specifically so the post-restart session can pick up here without
re-deriving all of the above.

## Reference for visual design

https://www.getayna.com/ — AI fashion photoshoot generator, given as a loose visual/
positioning reference for Catalog Studio's page. Not to be copied, just a tone reference.

## Immediate next steps after restart

1. Verify the new skills (`design-taste-frontend`, `imagegen-frontend-web`, etc.) and the
   `21st` MCP tools are actually available (`ToolSearch` / skill listing).
2. Confirm this doc's summary with the user — nothing here is final until they say so; it's
   a faithful record of the chat, not a re-opened decision.
3. Use the taste/imagegen skills + 21st component search to do a visual design pass (mockups)
   for: homepage (rebuilt), `ads-studio.html`, `catalog-studio.html` — before writing any
   real site HTML.
4. Once visual design is approved, decide whether this still needs a formal written spec
   (per `superpowers:brainstorming` architectural path — recommended, since this is a
   multi-page site-wide repositioning) or the user wants to skip straight to
   `superpowers:writing-plans` / implementation.
