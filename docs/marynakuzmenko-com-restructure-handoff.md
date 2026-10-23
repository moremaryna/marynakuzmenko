# marynakuzmenko.com: restructure handoff for Claude Code

**Prepared:** 23 October 2026, from a page-by-page review of the live site on that date
**Owner:** Dr. Maryna Kuzmenko
**Scope:** the marynakuzmenko.com repository only

> **Kick-off prompt (paste into Claude Code):**
> Read `docs/marynakuzmenko-com-restructure-handoff.md` in full. Start with Phase 0 and report what you find before editing anything. Then work through the phases in order, committing after each one on the branch `restructure-2026-10`. Do not deploy.

---

## 1. Goal

The site must present Dr. Maryna Kuzmenko as three things, in this order:

1. **A speaker on AI in agriculture** for corporate and industry events: keynotes, panels, AGMs, guest lectures.
2. **A trainer for agrifood teams.** The training offer itself lives on aiinagriculture.org/ai-training-agrifood/. This site links to it and does not rebuild it.
3. **An agritech influencer:** LinkedIn Top Voice, newsletter, weekly LinkedIn Live, event coverage. She is open to disclosed brand partnerships.

**What is wrong today.**
- The site calls her "Educator & Author" in every title tag and footer.
- The homepage says courses are her "main work".
- "Teaching" in the top nav points to a topic essay, not to courses.
- The same bio, award list and five reach numbers are repeated on the home, about, recognition, partner, speaking, books and MooMore pages, with conflicting values.
- The events log mixes keynotes with trade shows she attended as a visitor, so the speaking record looks thinner than it is.

**The organising rule.** Every page answers one visitor question and has one primary call to action. Every fact lives in one data file and is rendered from it, never retyped.

---

## 2. Hard rules (apply to every phase)

1. **Never invent content.** That covers testimonials, quotes, client or partner names, logos, fees, dates, audience or attendance numbers, press mentions and talk titles.
   - Where content is missing, build the component so it is driven by data, and render nothing when the data list is empty.
   - No visible placeholders, "Lorem", "Coming soon" or "TODO" may appear in built HTML.
2. **Reuse existing copy** wherever it survives the restructure.
   - Copy marked **DRAFT** in this document is new. Implement it, and list every DRAFT string in the final report so Maryna can approve or change it.
3. **British English.** Fix US spellings (-ize, -ization) in any copy you touch.
4. **Voice.** First person on About, MooMore, Insights and Contact. Third person ("Dr. Maryna Kuzmenko") in titles, metadata, JSON-LD and the third-person bios.
5. **Never describe her as a consultant or adviser.** She does not offer consultancy. This rule is already written into the bio prompt on /about/; keep it.
6. **Keep every URL stable** except the one redirect in §6. Keep the trailing-slash style.
7. **Keep the existing visual design:** theme colour `#1e4d3a`, fonts, components, spacing and image assets.
   - No new frameworks or dependencies unless the repo already uses them.
   - Every layout must work at 375 px wide with no horizontal scroll.
8. **Out of scope:** the moomore.com, aiinagriculture.org and petiolepro.com repositories. Appendix B lists notes for those; do not attempt them.
9. **No announcement-style copy** ("Delighted to share…").

---

## 3. Phase 0: discovery (report before editing)

What the live site shows:
- Pages are served as `/<slug>/`, with a shared header and footer.
- Assets live under `/assets/img/` and `/assets/pdf/`.
- Cloudflare sits in front (`/cdn-cgi/l/email-protection` links).
- The MooMore page carries `article:published_time` metadata, which suggests a build step.
- The generator is unknown.

Find and summarise:

- Framework or generator, and the build and dev-server commands.
- Where page sources, templates and partials live, and how the nav and footer are shared.
- Whether a data layer exists (JSON, YAML, front matter, a `_data/` folder).
- How JSON-LD is emitted today, and on which pages.
- The contact form handler: service, endpoint, and any field whitelist.
- Hosting and deploy config, and how redirects are declared (`_redirects`, `netlify.toml`, `vercel.json`, a Cloudflare rule, server config).
- Whether `sitemap.xml` and `llms.txt` exist and how they are generated.

If pages turn out to be hand-written HTML with a copied header and footer in each file, propose the smallest way to share partials and facts, for example a tiny build script. **Ask Maryna before adding a build step.**

Report your findings and a file-level plan, then continue.

---

## 4. Target information architecture

### 4.1 Main navigation (in this order)

| Label | Target | Notes |
|---|---|---|
| Speaking | `/speaking/` | |
| Team training ↗ | `https://aiinagriculture.org/ai-training-agrifood/` | External; same tab; ↗ marks it as external |
| Partnerships | `/partner/` | |
| Insights | `/insights/` | |
| About | `/about/` | |
| **Book Maryna** (button) | `/contact/?type=speaking` | Styled as the primary button |

Remove these from the top nav: **Teaching, Books, Events, Contact.** All of them stay reachable from the footer and from in-page links.

### 4.2 Footer (replace the current "Expertise / Insights" columns)

| Work with me | Read & follow | About |
|---|---|---|
| Speaking · `/speaking/` | Insights · `/insights/` | About · `/about/` |
| Speaking appearances · `/events/` | Events I've covered · `/coverage/` | Press & organiser kit · `/press-kit/` |
| Team training ↗ · aiinagriculture.org/ai-training-agrifood/ | AI in Agriculture field guide · `/ai-in-agriculture/` | From crops to cattle (MooMore) · `/moomore/` |
| Brand partnerships · `/partner/` | Books · `/books/` | MooMore ↗ · moomore.com |
| Contact · `/contact/` | Newsletter ↗ · `facts.newsletter.url` | Petiole Pro ↗ · petiolepro.com |
| | Friday LinkedIn Live ↗ · aiinagriculture.org/livestreams/ | |
| | LinkedIn ↗ · YouTube ↗ · Courses ↗ (aiinagriculture.org/courses/) | |

Footer bottom line:
- Copyright line, **DRAFT:** "© 2026 · Dr. Maryna Kuzmenko · Speaker and trainer on AI in agriculture."
- Keep the "Where Agriculture Meets AI." tagline.
- Keep the "More Maryna" link (moremaryna.com) unchanged until Maryna decides (§11).

### 4.3 Page register: one job each

| URL | Status | The one question it answers | Primary CTA |
|---|---|---|---|
| `/` | Rebuild | Who is Maryna and why book her? | Book Maryna |
| `/speaking/` | Rework | What can she speak about at my event, and how do I book? | Check availability |
| `/events/` | Rework (speaking only) | Where has she spoken, and where is she next? | Book Maryna |
| `/coverage/` | **New** | Does she show up across the sector and report on it? | Partner with me |
| `/about/` | Rework | Who is she, what has she built, why trust her? | Book Maryna |
| `/press-kit/` | **New** | I need a bio, headshot or photos for my programme or article | Download headshot |
| `/partner/` | Light rework | Can my agritech brand work with her? | Request the partnership media kit |
| `/insights/` | Light rework | Where can I read and follow her thinking? | Subscribe to the newsletter |
| `/ai-in-agriculture/` | Light rework | What is her view of AI in agriculture? (topic pillar page) | View speaking topics |
| `/books/` | Light rework | What has she written? | Buy on Amazon (existing) |
| `/moomore/` | Light rework | Why did she move from crop AI to dairy cattle? | Visit moomore.com |
| `/contact/` | Rework | How do I book or reach her? | Submit the form |
| `/recognition/` | **Retire** → 301 | (absorbed into About) | n/a |

**Rule for reach numbers.** The five-number reach block (LinkedIn, newsletter, YouTube, students, countries) appears **only on `/` and `/partner/`**. Both render it from the same component and data. Every other page links to About or Partnerships instead of repeating the numbers.

---

## 5. Single source of truth: the facts file

Create one data file, named and placed to suit the stack (e.g. `_data/facts.json` or `src/data/facts.ts`). Every number, award name and positioning string on the site renders from it.

- Keys marked **CONFIRM** keep the default shown here but are listed in the final report for Maryna to check.
- Store `asOf: "October 2026"`. Wherever the reach block renders, show it in small text: "Figures as of October 2026".

| Key | Value (default) | Status |
|---|---|---|
| `positioning.short` | AI in agriculture speaker and trainer | DRAFT |
| `positioning.line` | Speaker and trainer on AI in agriculture, LinkedIn Top Voice, founder of MooMore and co-founder of Petiole | DRAFT |
| `reach.students` | 3.4K+ (long form: "more than 3,400") | Confirmed (aiinagriculture.org shows 3,420+) |
| `reach.countries` | 129 | **CONFIRM**: 121 also appears on the site |
| `reach.linkedin` | 38K+ | **CONFIRM** against the profile today |
| `reach.newsletter` | 16K+ | **CONFIRM** (/ai-in-agriculture/ says 15K+) |
| `reach.youtube` | 23K+ | Confirmed (/ai-in-agriculture/ says "3K+", a typo) |
| `reach.links` | students → Udemy course URL (existing); countries → existing LinkedIn post; linkedin → profile; youtube → channel | Existing |
| `newsletter.name` | AI in Agriculture newsletter | **CONFIRM**: Maryna may have renamed it "Deploying AI in Agriculture, and Writing About It" |
| `newsletter.url` | https://aiinagriculture.org/newsletters/ | **CONFIRM** (or the LinkedIn newsletter URL) |
| `live` | Weekly Friday LinkedIn Live on understanding agricultural AI · https://aiinagriculture.org/livestreams/ | Confirmed |
| `award.wiw` | **Innovate UK Women in Innovation Award 2025/26**, winner, for MooMore; announced 5 August 2026; £75,000 grant; twelve-month programme to June 2027; one of 61 grant winners among 100 women recognised from 1,590 applications; profile URL https://iuk-business-connect.org.uk/projects/women-in-innovation/maryna-kuzmenko/ | Confirmed |
| `award.topVoice` | LinkedIn Top Voice, May 2026 | **CONFIRM** the topic label (the site variously says "Expert Top Voice", "AI in Agriculture", "agritech and sustainability") |
| `award.ofc` | Oxford Farming Conference Inspire Fellow 2026, one of 15 | Confirmed |
| `award.wiwForum` | Innovate UK Women in Innovation Community Forum member, 2025/26 cohort, one of 16 | Confirmed |
| `award.wipo` | WIPO and ITC SheTrades "Scaling Young Women's Businesses Through IP Mentorship" fellow, 2024 | Confirmed |
| `award.virgin` | Virgin StartUp Step Up alumna, 2020 | Confirmed |
| `petiole.grants` | Three Innovate UK grants and one Horizon Europe grant (Petiole; counted separately from the MooMore award) | **CONFIRM**: aiinagriculture.org says two |
| `petiole.recognition` | GIST Tech-I 2015 finalist (USA); CNBC Top 20 Hottest Startup Ideas 2015; UK FPC Fresh Awards 2023 shortlist | Confirmed |
| `petiole.reach` | Used by research organisations on six continents and cited in peer-reviewed research | Confirmed. **No download or citation numbers** until Maryna confirms them |
| `moomore.status` | In validation on a 650-cow crossbred herd in Staffordshire | Confirmed |
| `roles` | Founder, MooMore · Co-founder and CEO, Petiole (company Petiole Ltd; platform Petiole Pro) | Confirmed |
| `languages` | English, Ukrainian, Russian; German at B1 | Confirmed (from the aiinagriculture.org FAQ) |
| `replyTime` | within two working days | DRAFT / **CONFIRM** |
| `showreelUrl` | *(empty)* | Section hidden until set |
| `onesheetPdf` | *(empty)* | Link hidden until the file exists |

Also create these data lists, all empty unless stated:

- **`testimonials`** — fields: `quote`, `name`, `role`, `organisation`, `event`, `permission` (boolean). Render only entries where `permission` is true. Hide every testimonial section when none qualify.
- **`partners`** — past brand partners. Hidden while empty.
- **`press`** — "Featured in" entries. Seed with the two that exist on the site now:
  - the AgFunder-labelled LinkedIn article "Building a resilient agriculture industry after the Ukraine invasion" (existing URL);
  - the BBC 2019 event (existing URL).

### 5.1 Inconsistencies on the live site to fix in Phase 1

| What | Where it appears now | Fix |
|---|---|---|
| "Educator & Author" / "Educator, author, and speaker" | `<title>`, OG and Twitter tags on home; footer line on every page; /about/ meta; Key facts role; JSON role; bio prompt "Educator first" | Replace with the `positioning.*` strings (§8) |
| Countries 121 vs 129 | /ai-in-agriculture/ FAQ ("121"); JSON-LD on home | Render from `reach.countries` |
| Students "3K+" vs "3.4K+" | /ai-in-agriculture/ ("3K+ students") | Render from facts |
| YouTube "3K+ subscribers" | /ai-in-agriculture/ "Where This Work Lives" | Render from facts (23K+) |
| Newsletter "15K+" vs "16K+" | /ai-in-agriculture/ vs /about/, /recognition/, /partner/ | Render from facts |
| Award "Women in Innovation Award 2026" | Home recognition list, /speaking/, /recognition/, /events/, /about/ meta and bios, /ai-in-agriculture/ FAQ, /moomore/ caption | Visible copy uses "Innovate UK Women in Innovation Award 2025/26". Exception: alt text that describes the text printed on the winner-card image may keep "2026" |
| Year-bound CTAs | Home "…collaborations in 2026"; /speaking/ "Check Availability for 2026"; /events/ "in 2026/27" | Evergreen copy (§7) |
| Wrong link | /events/ AI Challenge Camp (Jan 2026) "LinkedIn Notes" → same URL as the Fruit Logistica Day 1 post | Remove that one link and keep "Watch recap"; listed in §11 |
| Wrong link label | /events/ BridgeAI (Sep 2025) "Read LinkedIn recap" → a cvent.com page | Relabel "Event page" |
| Typo | /events/ "Universidad Surcolombiana, Colombiana" | "…, Colombia" |
| Typo | /events/ Oxford Farming Conference "Celebrating 90 anniversary" | "Celebrating the 90th anniversary" |
| Organisation name | /events/ Plantae Presents "American Association of Plant Biologists" | "American Society of Plant Biologists (ASPB)" |
| Grammar | /moomore/ H2 "Why I added AI to dairy cattle into my crop AI portfolio" | **DRAFT:** "Why I added dairy cattle to my crop AI work". The `<title>` "From Crops to Cattle" stays |

---

## 6. Redirects and sitemap

**One redirect only:**

```
/recognition/   →   /about/#recognition   301
```

Then:
- Update every internal link that points to `/recognition/`.
- Add `/coverage/` and `/press-kit/` to the sitemap and remove `/recognition/`.
- If `llms.txt` exists, update it to the new structure and positioning line.

---

## 7. Page-by-page specifications

### 7.1 Home `/`

Keep these images: Loughborough AI Camp, Petiole demo rig, speaking-from-the-floor photo.

Sections, in order:

1. **Hero**
   - Eyebrow: "Where Agriculture Meets AI." (existing tagline)
   - H1, **DRAFT:** "AI in agriculture keynotes and team training, from someone who builds it."
   - Lead, **DRAFT:** "I'm Dr. Maryna Kuzmenko. I build AI for farms with MooMore and Petiole, write for a {reach.linkedin} LinkedIn community as a LinkedIn Top Voice, and help agrifood organisations see what AI can and can't do in the field."
   - Buttons: primary **Book Maryna to speak** → `/contact/?type=speaking`; secondary **Train your team ↗** → aiinagriculture.org/ai-training-agrifood/
   - Photo: the existing on-stage image.
2. **Proof line.** Three items, one line each, rendered from facts:
   - Innovate UK Women in Innovation Award 2025/26, winner (links to /moomore/)
   - LinkedIn Top Voice, May 2026
   - Oxford Farming Conference Inspire Fellow 2026
3. **"Where I've spoken" strip.** Text names only, no logos (no logo permissions yet). Render from events where `highlight: true` (see §7.3). Link "All appearances →" to `/events/`.
4. **Reach block.** The five numbers from facts, each linking where it links today, plus the "as of" line.
5. **"Three ways to work with me"**, **DRAFT** cards:
   - *Keynotes & panels*: "For conferences, AGMs and industry events, in person or online." → `/speaking/`
   - *Team training*: "Workshops and courses for agrifood teams, from 45 minutes to 12 weeks, with BASIS CPD points." → aiinagriculture.org/ai-training-agrifood/ ↗
   - *Brand partnerships*: "Disclosed content and live sessions for agritech brands, for an audience that evaluates technology for a living." → `/partner/`
6. **Signature talks.** Three cards from the talks data (§7.2) with `homepage: true`. Each card shows the title, a one-line takeaway and "Best for". Link "All topics and formats →" to `/speaking/`.
7. **Showreel.** Hidden while `showreelUrl` is empty.
8. **"Why listen to someone who builds it"**, **DRAFT**, three short cards using existing claims only:
   - *Petiole Pro*: "Smartphone crop measurement used by research organisations on six continents." → petiolepro.com ↗
   - *MooMore*: "Thermal imaging and on-device AI to catch lameness in dairy cows before it shows. In validation on a 650-cow herd." → `/moomore/`
   - *Books*: "The AI in Agriculture series: field guides on what technology actually pays back." → `/books/`
9. **Testimonials.** Hidden while empty.
10. **Follow.** Three links: newsletter (`facts.newsletter`), Friday LinkedIn Live, YouTube.
11. **Closing CTA**, **DRAFT:**
    - H2: "Planning an agrifood event or a team day?"
    - Text: "Tell me the date and who'll be in the room. I reply {replyTime}."
    - Button: **Check availability** → `/contact/?type=speaking`

**Remove from home:**
- the "Expertise & Impact" four cards;
- the six-item "Global Recognition" list (it moves to About);
- the "Ready to shape the agrifood frontier?… in 2026" block.

### 7.2 Speaking `/speaking/`

**Hero**
- Keep the eyebrow "Keynotes · Panels · Lectures".
- H1, **DRAFT:** "AI in agriculture keynote speaker". This matches the existing title tag and is a plain statement.
- Lead: keep the existing line "I help audiences look past the hype of AI to see the harvest of the future."
- Buttons: primary **Check availability** → `/contact/?type=speaking`; secondary **Press & organiser kit** → `/press-kit/`. Add a **Download one-sheet** link, shown only when `onesheetPdf` is set.

**Talks data** (one data list feeds Home and Speaking). Keep all five existing talks with their existing titles and blurbs. Add these fields to each:
- `takeaway` (one line);
- `bestFor`;
- `formats`;
- `homepage` (boolean);
- `slug` (reserved for future talk pages; **do not create talk pages now**).

| Existing title | `bestFor`, **DRAFT** (derived from the existing blurb) | `homepage` default |
|---|---|---|
| Beyond the Hype: Practical AI for Modern Agronomy | Growers, agronomists, technical teams | true |
| Eyes of the Machine: Computer Vision in Post-Harvest Quality | Packers, fresh-produce businesses, quality and supply-chain teams | true |
| Invisible Barriers: The Female Founder's Journey in AgTech | Conferences, leadership events, women-in-agrifood programmes | true |
| The Silicon Soil: AI's Role in Global Food Security | Policy makers, investors, international forums | false |
| The First Leaf: AI & Computer Vision in Forestry Nurseries | Forestry and nursery sector, research institutes | false |

Leave `takeaway` empty if it cannot be taken from the existing blurb, and list it in the report. For `formats`, use only: Keynote (45–90 min), Panel, Technical lecture, Online. The 45–90 minute range matches the aiinagriculture.org formats table.

**Page sections, in order:**

1. Hero.
2. **Signature topics.** All five talks, with `takeaway` and `bestFor` shown.
3. **Formats.** Keep the existing four-item list, but change the "Workshops" bullet to:
   > **Team training and workshops:** half-day to multi-week programmes for agrifood teams, with CPD points, are on [aiinagriculture.org](https://aiinagriculture.org/ai-training-agrifood/) ↗.
   >
   > *(DRAFT)*

   Keep the existing "Every session is customised…" sentence, in British spelling.
4. **"Where I've spoken"**: the events where `highlight: true`, showing organiser, event, role and year. Link "All appearances →" to `/events/`.
5. **Testimonials.** Hidden while empty.
6. **"On the stage, and on the screen"**: keep the two existing photos and captions.
7. **Organiser FAQ.** Mark it up as FAQPage JSON-LD. Include only the questions below. Add questions about travel, recording rights, lead time and AV needs only when Maryna supplies the answers.
   - *Can you speak online or hybrid?* "Yes — in person, online or hybrid."
   - *Which languages?* Render from `facts.languages`, adapted to the first person.
   - *Do you tailor the talk?* Reuse the existing customisation sentence.
   - *Do you also train teams?* **DRAFT:** "Yes — workshops and multi-week courses, with BASIS CPD points through Petiole Ltd, are on aiinagriculture.org."
   - *What does it cost?* **DRAFT / CONFIRM:** "Fees depend on format, travel and preparation. Send the date and audience and I'll reply with a quote {replyTime}."
   - **Do not mention the "first workshop free" offer on this site.** It stays on aiinagriculture.org only.
8. **Closing CTA**, **DRAFT:**
   - H2: "Bring AI in agriculture to your stage."
   - Button: **Check availability** → `/contact/?type=speaking`

**Remove:** the "UK & Global Engagements" block. It is the recognition list again; recognition lives on About.

### 7.3 Speaking appearances `/events/` (keep the URL)

Turn this page into a **speaking-only** log. Visitor attendances move to `/coverage/`, and recognition entries move to About.

Data model, preferred if the stack allows: one `events` list rendered by both `/events/` and `/coverage/`.

| Field | Values / meaning |
|---|---|
| `date` | YYYY-MM or YYYY-MM-DD |
| `title` | |
| `organiser` | |
| `role` | Her existing label |
| `mode` | In person / Online |
| `location` | |
| `summary` | |
| `image` | |
| `links[]` | |
| `type` | `spoken` / `covered` |
| `highlight` | boolean |
| `upcoming` | boolean |

If the stack has no data layer, move the HTML blocks between the two pages instead.

**Classification.** Move every existing entry exactly as below. ★ = `highlight: true`.

| Date | Entry | Destination |
|---|---|---|
| 2026-10-19 | Innovate UK Business Connect webinar "Understanding the Innovation Journey" (Speaker, 350+ attendees) ★ | `/events/` |
| 2026-10 | Fruit Attraction 2026, Madrid | `/coverage/` |
| 2026-09 | World Agri-Tech Innovation Summit 2026, London | `/coverage/` |
| 2026-09 | UK Dairy Day 2026, Telford | `/coverage/` |
| 2026-08 | Innovate UK Women in Innovation 2026, Winner | **Remove** (it is on About → Recognition) |
| 2026-07 | Fruit Focus 2026, East Malling | `/coverage/` |
| 2026-07 | Investing in Women Code Report 2026 launch, London | `/coverage/` |
| 2026-07 | Groundswell 2026 | `/coverage/` |
| 2026-06 | Cereals 2026 | `/coverage/` |
| 2026-05 | LinkedIn Top Voice Recognition | **Remove** (About → Recognition) |
| 2026-03 | Innovate UK Agrifood Annual Showcase, Birmingham | `/coverage/` |
| 2026-03 | Fruitnet Berry Congress 2026, London | `/coverage/` |
| 2026-03 | Investing in Women Code Annual Signatory Summit, London | `/coverage/` |
| 2026-02 | The Singapore Exchange: Peer Insights Forum, London | `/coverage/` |
| 2026-02 | 2026 Soybean Breeders' Workshop, University of Georgia (Speaker, online) ★ | `/events/` |
| 2026-02 | Future of Food Summit 2026 (Economist Impact), London | `/coverage/` |
| 2026-02 | Fruit Logistica 2026, Berlin | `/coverage/` |
| 2026-01 | Women in Innovation Community Forum meeting, Edinburgh | `/coverage/` |
| 2026-01 | AI Challenge Camp, Loughborough University (Challenge Holder) | `/events/` |
| 2026-01 | LAMMA, CropTec, Low Carbon Agriculture 2026, Birmingham | `/coverage/` |
| 2026-01 | Oxford Farming Conference (Inspire Fellow) | `/coverage/` |
| 2025-12 | SKUAST-K guest lecture "AI-Powered Plant Phenotyping in Horticulture" | `/events/` |
| 2025-11 | Women in Innovation 2025, Year's Recap, Birmingham | `/coverage/` |
| 2025-11 | Teerthanker Mahaveer University, "AI Tools in Agrifood" (Guest Lecturer) | `/events/` |
| 2025-11 | Third Southeast Asian Coffee Education Congress, Cavite State University (plenary speaker, per the certificate) ★ | `/events/` |
| 2025-11 | Oxford Farming Conference Inspire Programme meeting, London | `/coverage/` |
| 2025-11 | BridgeAI: Adopters & Developers, The Alan Turing Institute (Pitch Fest participant) ★ | `/events/` |
| 2025-10 | The First Floriculture Forum, Universidad Surcolombiana (Speaker) | `/events/` |
| 2025-09 | BridgeAI Agriculture and Food Processing Collaborative Event, London (Speaker) | `/events/` |
| 2025-09 | University of Sargodha, "AI-Transform Agriculture in Pakistan" (Guest Lecturer) | `/events/` |
| 2025-08 | Scottish Apple Producers AGM 2025, Megginch Castle (**Keynote Speaker**) ★ | `/events/` |
| 2025-06 | Women in Innovation Community Forum launch, London | `/coverage/` |
| 2025-05 | Kharkiv State Biotechnological University, "Forestry Contribution to the European Green Deal" (Speaker) | `/events/` |
| 2025-05 | WIPO Women and IP Symposium 2025 (Speaker) ★ | `/events/` |
| 2025-05 | Plantae Presents: AI in Plant Biological Sciences Research, ASPB (Speaker) ★ | `/events/` |
| 2025-03 | Day of the Orchard 2025, Uman National University of Horticulture (Speaker) | `/events/` |
| 2024-12 | Women in Innovation Roundtable, London | `/coverage/` |
| 2024-11 | AI for Food Systems Transformation, Ethiopian Institute of Agricultural Research (Speaker) ★ | `/events/` |
| 2024-09 | Agritech Showcase, British Week in Peru, British Embassy Lima (Speaker) ★ | `/events/` |
| 2024-09 | PMAS Arid Agriculture University Rawalpindi (Guest Lecturer) | `/events/` |
| 2024-09 | **Add:** Landscape 2024, Agroecosystems in Transformation, Berlin (remote lecture). Use the existing photo and caption from /speaking/ | `/events/` |
| Selected past | REAP 2017 (Agri-TechE) ★, BBC 2019 event | `/events/` "Selected past engagements" |
| Selected past | AgFunder / LinkedIn article on resilient agriculture after the Ukraine invasion | Move to `press` data (Press kit → "Writing elsewhere") |

**Page changes:**

- `<title>`, **DRAFT:** "Speaking Appearances | Dr. Maryna Kuzmenko".
- Keep the existing meta description, adding "Africa" to the list of regions.
- Keep the H1 "Sharing Knowledge Across Borders." and the eyebrow "The Global Stage".
- Add a line under the H1, **DRAFT:** "Keynotes, lectures and panels. Looking for the shows I attend and report on? See [events I've covered](/coverage/)."
- **Upcoming** section at the top. Render events with `upcoming: true`; hide the section when there are none. Do not add REAP 2026 or any other future event until Maryna supplies the date, title and venue (§11).
- Bottom CTA, **DRAFT:** "Bring AI innovation to your stage." with the button **Book Maryna** → `/contact/?type=speaking`. This replaces "in 2026/27".

### 7.4 Events I've covered `/coverage/` (new page)

- `<title>`, **DRAFT:** "Agritech Events I've Covered | Dr. Maryna Kuzmenko"
- Meta description, **DRAFT:** "Field notes from the agrifood shows, summits and field days Dr. Maryna Kuzmenko attends and reports on for her LinkedIn community, from Fruit Logistica to World Agri-Tech."
- Eyebrow: "On the ground". H1, **DRAFT:** "Events I've covered".
- Intro, **DRAFT:** "I spend a good part of the year at agrifood shows, summits and field days, and report back for my LinkedIn community and newsletter readers. This is the log, with links to the notes."
- List the `covered` entries from §7.3, newest first. Keep each entry's existing role label (e.g. "Micro Influencer", "One of the Crowd :)"), summary, image and links exactly. These labels are part of her voice.
- Where an entry has an Insights post, put that link first.
- Primary CTA, **DRAFT:** "Launching something the sector should know about?" with the button **Partner with me** → `/partner/`. Secondary: a newsletter link.
- Add the page to the footer and link it from `/partner/` and `/insights/`.

### 7.5 About `/about/`

The About page stops being the bio download page; that content moves to `/press-kit/`. It becomes the narrative and credentials page and the canonical home of Recognition.

- `<title>`, **DRAFT:** "About Dr. Maryna Kuzmenko — AI in Agriculture Speaker, Trainer and Founder"
- Meta description, **DRAFT:** "The story, work and recognition of Dr. Maryna Kuzmenko: founder of MooMore, co-founder of Petiole, LinkedIn Top Voice and Innovate UK Women in Innovation Award 2025/26 winner."
- OG type stays `profile`.

Sections, in order:

1. **H1 "About Dr. Maryna Kuzmenko"** with a first-person lead: the first-person bio from Appendix A.
2. **"What I do now"**, three short paragraphs, **DRAFT**:
   - *Speaking*: one sentence, linking to `/speaking/`.
   - *Training*: one sentence, linking to aiinagriculture.org ↗.
   - *Writing and coverage*: newsletter, Friday LinkedIn Live, YouTube, books; links to `/insights/` and `/coverage/`.
3. **"What I build"**: reuse the existing professional-bio paragraphs about Petiole / Petiole Pro and MooMore, with figures from facts. Keep the leaf-area photo and the BridgeAI photo with their captions.
4. **"The problem I keep coming back to"**: reuse the existing sentence from the 100-word bio, "a measurement that matters is locked behind specialist equipment, so the people who need it never take it", plus the Petiole/MooMore contrast. Link to `/moomore/`.
5. **Recognition, `id="recognition"`.** This is the canonical list, rendered from facts. Each item is a full linked sentence, in the style of the current homepage list. Order:
   1. Women in Innovation Award 2025/26 (link to /moomore/ and the IUK profile)
   2. LinkedIn Top Voice
   3. OFC Inspire Fellow
   4. WiW Community Forum
   5. WIPO/ITC SheTrades fellow
   6. Virgin StartUp Step Up
   7. a sub-list "Petiole Pro": GIST Tech-I 2015, CNBC Top 20 2015, FPC Fresh Awards 2023 shortlist, and the grants line

   Keep the Women in Innovation Forum photo here.
6. **Education and professional training**: keep as is.
7. **Key facts**: keep the list (it is useful for answer engines), render it from facts, and update "Role" to the positioning line.
8. **Pointer box**, **DRAFT:** "Need a bio or a headshot for your programme? → [Press & organiser kit](/press-kit/)".
9. **CTA:** **Book Maryna** → `/contact/?type=speaking`.

**Move out of About into `/press-kit/`:**
- the headshot download block;
- the 300-character, one-line, 50-word, 100-word, speaker introduction, media and first-person bios;
- "Suggested JSON format";
- "Prompt to create a suitable bio";
- the intro paragraph "I created this page to make life easier for dear event organisers…".

### 7.6 Press & organiser kit `/press-kit/` (new page)

- `<title>`, **DRAFT:** "Press & Organiser Kit — Dr. Maryna Kuzmenko"
- Meta description, **DRAFT:** "Official bios in every length, a hi-res headshot and event photos of Dr. Maryna Kuzmenko for programmes, articles and podcasts."
- Primary CTA: **Download hi-res headshot**.

Sections, in order:

1. Eyebrow "Official biography resource" (existing). H1, **DRAFT:** "Press & organiser kit". Then the existing intro paragraph, moved verbatim from /about/.
2. **Headshot**: the existing block, unchanged (file, dimensions, size).
3. **Photos**: existing on-stage, field and demo images already in `/assets/img/`, each with its caption and a download link to the largest size that exists in the repo. Do not upscale.
4. **Bios**: the seven variants from **Appendix A**, each with a copy button.
   - Order: one-line, 300 characters, 50 words, 100 words, speaker introduction (to read aloud), media bio, first-person.
   - Interpolate all numbers from facts.
5. **Speaker one-sheet (PDF)**: hidden until `onesheetPdf` is set.
6. **Talk titles**: link to `/speaking/`. Do not repeat the talk list.
7. **JSON bio**: the existing copy block, updated:
   - `role` becomes the positioning line;
   - the award name uses 2025/26;
   - add `"speaking": "https://marynakuzmenko.com/speaking/"` and `"training": "https://aiinagriculture.org/ai-training-agrifood/"`.
8. **Bio prompt**: the existing prompt, with two edits:
   - replace "Educator first: teaches…" with "Speaker and trainer on AI in agriculture first; teaches…";
   - add a line "Trains agrifood teams (AI literacy and fluency) via aiinagriculture.org".

   Keep the line "Does not offer paid consultancy or advisory services…" exactly.
9. **Featured in / writing elsewhere**: render the `press` data. Hidden if empty; it is seeded with 2 entries (§5).
10. **Press contact**: "Media enquiries → [contact form](/contact/?type=media)". Keep the existing LinkedIn "fastest route" line from /contact/.

### 7.7 Partnerships `/partner/`

Keep the URL, title, hero, "Credibility That Travels" and the five "Ways to Collaborate" cards.

Changes:
- Meta description: replace "AI in agriculture educator and LinkedIn Top Voice" with "LinkedIn Top Voice on AI in agriculture".
- The reach block becomes the shared component (§4.3).
- Card 03 "Keynotes & Event Appearances": shorten to one sentence plus the link to `/speaking/`.
- Card 05 "Educational Collaborations": keep. Render its numbers from facts.
- **Add "Where I show up"** after the cards:
  - the 4–6 most recent `covered` entries, compact, with a "See all →" link to `/coverage/`;
  - **DRAFT** heading: "On the ground at the sector's main shows".
- **Add "How I work with brands"**, **DRAFT / CONFIRM:** "Every paid placement is labelled as such. I keep editorial control of what I write, and I only take on partnerships I can explain to my audience in the same plain terms I use for everything else."
- **Past partners**: render the `partners` data; hidden while empty.
- **Remove** the "Recognition & Platforms" block. Replace it with the line "Recognition → [About](/about/#recognition)".
- Button labels: "Request the Media Kit" and "Start a Conversation" both go to `/contact/?type=partnership`. Rename them "Request the partnership media kit" and "Start a conversation". This avoids confusion with the press kit.

### 7.8 Insights `/insights/`

Keep the post listing and every post URL.

- **Subscribe block** at the top or right after the first row:
  - newsletter (`facts.newsletter`);
  - Friday LinkedIn Live (`facts.live`);
  - YouTube.
- Primary CTA: **Subscribe to the newsletter**.
- **"Also here" links**, **DRAFT:** "Events I've covered" → `/coverage/`; "AI in Agriculture: the field guide" → `/ai-in-agriculture/`.
- Do not add more listing features (tags, pagination) in this pass.

### 7.9 AI in Agriculture field guide `/ai-in-agriculture/`

Keep this page; it is the topic pillar page. It is no longer labelled "Teaching" anywhere.

- Keep the title, H1, "The Premise", "The Shifts That Matter" and the quote.
- **"Where This Work Lives"**: render all numbers from facts (this fixes "15K+", "3K+ subscribers" and "3K+ students").
  - Point the Udemy line to aiinagriculture.org/courses/ai-in-agriculture/ (**CONFIRM**, §11).
  - Change the "With your team" bullet, **DRAFT**, to: "**With your team:** workshops and courses on responsible AI adoption, at [aiinagriculture.org](https://aiinagriculture.org/ai-training-agrifood/) ↗."
- **FAQ**:
  - "Who is Dr. Maryna Kuzmenko?" becomes two sentences from `positioning.line` plus the award, with a link to `/about/`. Countries come from facts.
  - "Where can I learn…": change "For organisations, a guest lecture or workshop is the usual route" to point to aiinagriculture.org training.
  - Keep the other answers.
  - Ensure FAQPage JSON-LD matches the visible text.
- Primary CTA: **View speaking topics** → `/speaking/`.

### 7.10 Books `/books/`

Keep all three books, their copy, links and ISBNs.

- In "Where else I teach this":
  - **Courses card**: link to aiinagriculture.org/courses/ ↗; numbers from facts.
  - Talks card: unchanged.
  - Writing card: unchanged.
- Add `Book` JSON-LD for each title: `name`, `author` → `{"@id":"https://marynakuzmenko.com/#person"}`, `isbn` (the ISBN shown), `url` (the Amazon Kindle link), `bookFormat`, `inLanguage: "en"`. Add `isPartOf` for books 1–2 (series "AI in Agriculture").

### 7.11 MooMore story `/moomore/`

Keep it as the founder story (per the GEO spec v2). Change only the following:
- The H2 grammar fix (§5.1).
- Award names in visible captions → 2025/26.
- In "What I am working on now", replace the "Teaching" bullet with **DRAFT:** "**Speaking and training**: AI in agriculture keynotes, and AI literacy training for agrifood teams. [Speaking →](/speaking/)". Teaching reach comes from facts.
- No Organization schema on this page (GEO spec §5d).

### 7.12 Contact `/contact/` (keep the URL)

- `<title>`, **DRAFT:** "Book or Contact Dr. Maryna Kuzmenko — Speaking, Training & Partnerships"
- Meta description, **DRAFT:** "Check Dr. Maryna Kuzmenko's availability for keynotes, team training, brand partnerships or media on AI in agriculture. Replies {replyTime}."
- Eyebrow "Let's Connect" (keep). H1, **DRAFT:** "Book Maryna or get in touch". Lead, **DRAFT:** "Keynotes, team training, brand partnerships and media. I reply {replyTime}."

**Form changes.** Keep the existing handler and endpoint, and update its field whitelist if it has one.

- **"What can I help with?"** options. The `value` is the key used by `?type=`.

  | `value` | Label |
  |---|---|
  | `speaking` | Keynote, panel or speaking engagement |
  | `training` | Team training or workshop |
  | `lecture` | Guest lecture (university or research institute) |
  | `partnership` | Brand partnership |
  | `media` | Media or press |
  | `books` | Books or writing |
  | `other` | Something else |

- **Pre-select from the query string.** For example, `/contact/?type=speaking` selects `speaking` and reveals its fields. Use a few lines of vanilla JS; with JS off the form must still work, defaulting to "Something else".
- **Always shown:** Full name, Work email, Organisation (**new**), Message.
- **When `speaking`, `training` or `lecture` is selected:**
  - Event or programme name (**new**)
  - Event date (existing)
  - Format (existing: In person / Online / Hybrid)
  - City and country (**new**)
  - Audience size (**new** select: Under 50 / 50–200 / 200–500 / 500+)
  - Who will be in the room (**new** short text)
  - Budget (optional free text, **new**; no preset bands until Maryna sets them)
- **When `training` is selected**, show this note, **DRAFT:** "Formats and topics are outlined on [aiinagriculture.org](https://aiinagriculture.org/ai-training-agrifood/) ↗ — you can still send your enquiry here."
- **When `partnership` is selected:** Collaboration type (existing) and Deadline (existing).
- **Success message**, **DRAFT:** "Thank you — I'll reply {replyTime}."
- **"Explore First"** links: replace "Teaching & courses" with "Team training ↗" (aiinagriculture.org) and add "Press & organiser kit".

### 7.13 Recognition `/recognition/` (retire)

1. Make sure everything on it exists on About → Recognition. Its "Influence, in Numbers" block is covered by the shared reach component on Home and Partner.
2. Delete the page source.
3. Add the redirect from §6.

---

## 8. Metadata and structured data

### 8.1 Site-wide strings

| Item | New value |
|---|---|
| Home `<title>` / OG / Twitter title | **DRAFT:** "Dr. Maryna Kuzmenko — AI in Agriculture Speaker & Trainer" |
| Home meta / OG / Twitter description | **DRAFT:** "Keynotes, team training and expert commentary on AI in agriculture from Dr. Maryna Kuzmenko, LinkedIn Top Voice and founder of MooMore and Petiole." |
| OG image alt (all pages) | Replace "AI in Agriculture Educator & Author" with each page's title |
| Footer line | §4.2 |

Every page needs a unique `<title>`, a meta description, a self-referencing canonical and exactly one `<h1>`.

### 8.2 Person JSON-LD

Render it from facts on `/` and `/about/`, identical on both, and wrap it in `ProfilePage` on `/about/`.

| Property | Value |
|---|---|
| `@id` | `https://marynakuzmenko.com/#person` (must match the moomore.com Organization `founder.@id`) |
| `name` | Maryna Kuzmenko |
| `alternateName` | Dr. Maryna Kuzmenko |
| `honorificPrefix` | Dr |
| `url` | `https://marynakuzmenko.com/` |
| `image` | the hi-res headshot URL |
| `jobTitle` | **DRAFT:** "AI in agriculture speaker and trainer" |
| `description` | the 50-word bio |
| `worksFor` | MooMore `{ "@id": "https://moomore.com/#organization", "name": "MooMore", "url": "https://moomore.com/" }` and Petiole `{ "@type": "Organization", "name": "Petiole Ltd", "alternateName": "Petiole Pro", "url": "https://www.petiolepro.com/" }` |
| `award` | the About → Recognition list, word for word, as strings |
| `knowsAbout` | Applied AI in agriculture; Computer vision in agriculture; AI literacy training; Plant phenotyping; Post-harvest quality control; Precision livestock farming; Dairy cattle lameness detection; Agritech entrepreneurship |
| `knowsLanguage` | `["en","uk","ru","de"]` |
| `alumniOf` | Taras Shevchenko National University of Kyiv; London Metropolitan University |
| `sameAs` | Keep the existing array, adding the YouTube channel if missing. Existing per GEO spec v2: moomore.com, LinkedIn, IUK profile, ResearchGate, Udemy, petiolepro.com |

### 8.3 Other schema

- `Book` × 3 on `/books/` (§7.10).
- `FAQPage` on `/speaking/` and `/ai-in-agriculture/`.
- `WebSite` on `/`.
- **Do not add** `Event` markup for past events in this pass.

---

## 9. Order of work

Commit after each phase with a clear message.

| Phase | Work | Done when |
|---|---|---|
| 0 | Discovery report (§3) | Stack, commands, form handler and redirect mechanism are known |
| 1 | Facts file; replace every hard-coded number, award name and positioning string; fix §5.1 | §10 check 1 passes |
| 2 | Nav, footer, redirect, sitemap | New nav on all pages; `/recognition/` redirects |
| 3 | Home (§7.1) | Sections in order; empty sections hidden |
| 4 | Speaking, events split, new `/coverage/` (§7.2–7.4) | Every event sits on exactly one page |
| 5 | About rework, new `/press-kit/`, retire `/recognition/` (§7.5, 7.6, 7.13) | No bio variants left on About |
| 6 | Partner, Insights, field guide, Books, MooMore, Contact (§7.7–7.12) | `?type=` pre-select works |
| 7 | Structured data (§8) | All JSON-LD parses; Person identical on `/` and `/about/` |
| 8 | QA (§10) and `RESTRUCTURE-REPORT.md` | Report delivered |

---

## 10. Acceptance checks

1. **Forbidden strings.** None of these may appear in the built output, case-insensitive:
   - `121 countries`
   - `3K+ students`
   - `3K+ subscribers`
   - `15K+`
   - `two Innovate UK grants`
   - `two grants from Innovate UK`
   - `Educator & Author`
   - `Educator &amp; Author`
   - `Educator, author, and speaker`
   - `Educator first`
   - `Check Availability for 2026`
   - `in 2026/27`
   - `collaborations in 2026`
   - `Colombiana`
   - `90 anniversary`
   - `Association of Plant Biologists`
   - `href="/recognition/"`
   - `href="https://marynakuzmenko.com/recognition/"`
   - `TODO`
   - `Lorem`
   - `>Teaching<` (as a nav label)
   - "Women in Innovation Award 2026" in visible text (alt text describing the winner-card image is the only exception)
2. **No hard-coded stats.** The displayed figures `38K`, `16K`, `23K`, `3.4K`, `3,400` and `129` (as a country count) appear only in the facts file, not in page sources.
3. **Headings and metadata.** Every page has one `<h1>`, a unique `<title>`, a meta description and a self-canonical.
4. **JSON-LD.** Every `application/ld+json` block parses (a small Node or Python script). The Person block is byte-identical on `/` and `/about/`.
5. **Redirect.** `/recognition/` returns 301 to `/about/#recognition`. Test with the host's local emulator if one exists; otherwise verify the config syntax and say so in the report.
6. **Internal links.** No broken internal links (crawl the local build). External links are not changed except where this document says so.
7. **Empty sections.** Testimonials, showreel, one-sheet, partners and upcoming events render nothing while empty. Confirm by building with each list empty.
8. **Contact form.** `?type=` works for all seven values. Conditional fields show and hide correctly. The form submits with JS disabled.
9. **Visual check.** Screenshot home, speaking, events, coverage, about, press-kit, partner and contact at 375 px and 1280 px. Check the mobile nav opens and shows the "Book Maryna" button.
10. **Events split.** Every event listed in §7.3 appears on exactly one of `/events/` or `/coverage/`, or was deliberately removed.

**`RESTRUCTURE-REPORT.md` must list:**
- changed and new files;
- the redirect;
- every DRAFT string, with its page and its location;
- every CONFIRM fact;
- any link you removed;
- anything you could not do, and why.

---

## 11. Open questions for Maryna

These do not block the work. Use the default until answered.

| # | Question | Default used |
|---|---|---|
| 1 | Countries: 129 or 121? | 129 |
| 2 | LinkedIn followers still 38K+? Newsletter readers 16K+? | Yes, both |
| 3 | Petiole grants: three Innovate UK + one Horizon Europe? (aiinagriculture.org says two) | Three + one |
| 4 | LinkedIn Top Voice: which topic label, if any? | "LinkedIn Top Voice, May 2026" with no topic |
| 5 | Newsletter name and URL: has it become "Deploying AI in Agriculture, and Writing About It"? | Current site name; aiinagriculture.org/newsletters/ |
| 6 | Which three talks lead on the homepage? | Beyond the Hype; Eyes of the Machine; Invisible Barriers |
| 7 | Speaking fees: publish a "from" price, or "on request"? | On request |
| 8 | Is "reply within two working days" right for this site too? | Yes |
| 9 | Course links: Udemy referral link or aiinagriculture.org/courses/? | aiinagriculture.org (the course is moving there) |
| 10 | What is moremaryna.com, and should it stay in the footer? | Leave unchanged |
| 11 | REAP 2026: date, talk title and venue for "Upcoming"? BerryWorld UK keynote: can it be listed once confirmed? | Neither is listed yet |
| 12 | Correct LinkedIn link for the AI Challenge Camp (Jan 2026)? | That link removed |
| 13 | Testimonials: who to ask, with permission to publish name, role and organisation. Strongest candidates: Scottish Apple Producers (AGM keynote), Innovate UK Business Connect (webinar), Loughborough AI Camp, BridgeAI, university hosts | Section hidden |
| 14 | Press and podcast links for "Featured in"? | Two existing entries only |
| 15 | Oxford Farming Conference 2026 Union Debate: a speaking slot, or a contribution from the floor? (aiinagriculture.org's caption says "Speaking at the Union Debate"; this site says "speaking from the floor") | Treated as coverage, not a speaking engagement |
| 16 | The University of Sargodha poster lists her as co-founder of "Agfluencers". Should Agfluencers appear on the site? | Not mentioned |
| 17 | Petiole Pro downloads and citation counts: which figures can be evidenced? | No numbers shown |

---

## Appendix A: bio variants (DRAFT)

Numbers in `{braces}` render from facts. Running text uses "Dr Maryna Kuzmenko", matching the bios on the live site.

**One-line**
> Dr Maryna Kuzmenko is a UK-based speaker and trainer on AI in agriculture, a LinkedIn Top Voice, and winner of the Innovate UK Women in Innovation Award 2025/26 for MooMore.

**300 characters**
> Dr Maryna Kuzmenko speaks and trains on AI in agriculture for agrifood events and teams. A LinkedIn Top Voice, she founded MooMore, co-founded Petiole, writes the AI in Agriculture book series, and won the Innovate UK Women in Innovation Award 2025/26.

**50 words**
> Dr Maryna Kuzmenko is a UK-based speaker and trainer on AI in agriculture and a LinkedIn Top Voice. She founded MooMore, which uses thermal imaging to detect lameness in dairy cows early, co-founded Petiole, and writes the AI in Agriculture book series. She won the Innovate UK Women in Innovation Award 2025/26.

**100 words**
> Dr Maryna Kuzmenko is a UK-based speaker and trainer on AI in agriculture. She gives keynotes at agrifood conferences and industry meetings, trains agrifood teams in practical AI literacy, and writes for a {reach.linkedin} LinkedIn community as a LinkedIn Top Voice. Her work returns to one problem: a measurement that matters is locked behind specialist equipment, so the people who need it never take it. With Petiole Pro the answer was a smartphone camera, now used by research organisations on six continents. With MooMore, winner of the Innovate UK Women in Innovation Award 2025/26, it is thermal imaging that catches lameness in dairy cows early.

**Speaker introduction (to be read aloud)**
> Our next speaker builds the technology she talks about. Dr Maryna Kuzmenko founded MooMore, which uses thermal imaging and AI to catch lameness in dairy cows before a farmer can see it, and co-founded Petiole, whose crop measurement tools are used by researchers on six continents. She is a LinkedIn Top Voice, the author of the AI in Agriculture book series, and a winner of the Innovate UK Women in Innovation Award 2025/26. She has taught AI in agriculture to more than {reach.students long form} students in {reach.countries} countries. Please welcome Dr Maryna Kuzmenko.

**Media bio**
> The speaker introduction above in plain third person (drop the first and last sentences), then: "Speaking: marynakuzmenko.com/speaking · Team training: aiinagriculture.org · MooMore: moomore.com · Press contact: marynakuzmenko.com/contact/?type=media"

**First person**
> I speak and train on AI in agriculture, for conference audiences, boards and agrifood teams, and I build the thing I talk about. MooMore uses thermal imaging and on-device AI to catch lameness in dairy cows before anyone can see it, and it won the Innovate UK Women in Innovation Award 2025/26. Before that I spent a decade on the crop side with Petiole, building measurement tools now used by research organisations on six continents. I write about all of it as a LinkedIn Top Voice, and in the AI in Agriculture book series.

---

## Appendix B: notes for the other domains (not for this repo)

- **aiinagriculture.org**
  - The trainer bio says Petiole Pro "received two Innovate UK grants". Align it with `petiole.grants` once Maryna confirms.
  - Point "The full biography" to marynakuzmenko.com/about/.
  - Add "For a keynote only, see marynakuzmenko.com/speaking/".
  - Check the Union Debate caption (§11, question 15).
- **moomore.com:** confirm the link to marynakuzmenko.com from "Who is behind it", the Press page and the footer is live (GEO spec v2 §2a).
- **Testimonials:** collect each one once and publish it on both marynakuzmenko.com and aiinagriculture.org.
