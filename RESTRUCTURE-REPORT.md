# marynakuzmenko.com restructure — report

Branch `restructure-2026-10`, built from `docs/marynakuzmenko-com-restructure-handoff.md`. One commit per phase, plus two fix-up commits. **Nothing has been deployed.**

Run the acceptance checks at any time:

```
npm run build && npm run check
```

`scripts/check-site.js` checks for forbidden strings, hard-coded figures in page sources, one `<h1>` per page, unique titles, meta descriptions, self-canonicals, JSON-LD that parses, an identical Person block on `/` and `/about/`, and internal links. On the final build it reports **All checks passed** (21 pages).

## Phase 0 findings

- **Stack:** Eleventy 3 (`.eleventy.js`), with source in `src/` and output in `_site/`. `_site/` is committed and is what Firebase serves. The commands are `npm run build` and `npm run dev` (port 8081 in `.claude/launch.json`).
- **Shared parts:** the header, nav, footer and site-wide JSON-LD are in `src/_includes/layouts/base.njk`. Partials are in `src/_includes/partials/`.
- **Data layer:** this already existed (`src/_data/`), so no new build step was needed. The old `stats.json` held the reach numbers, and `site.json` held the role and awards.
- **Contact form:** posts to Formspree (`site.contactEndpoint`). A Cloudflare Worker in `cloudflare/contact-worker/` is ready but not deployed, and its `EXTRA_FIELDS` is the field whitelist.
- **Hosting:** Firebase Hosting. Redirects are declared in `firebase.json`. `sitemap.xml` and `llms.txt` are generated from Eleventy's collections.

## Files

**New**
- `src/_data/facts.json`: every figure, award, positioning line and link, plus the `testimonials`, `partners` and `press` lists and the Person details
- `src/_data/bios.js`: the seven Appendix A bios, with figures read from `facts.json`
- `src/_data/talks.json`: the five talks, with `takeaway`, `bestFor`, `formats`, `homepage` and `slug`
- `src/_data/events.js`: one list of 41 entries, typed `spoken` or `covered`, with `highlight`, `upcoming` and `archive` flags
- `src/_includes/partials/reach.njk`, `event.njk`, `testimonials.njk` and `person-jsonld.njk`
- `src/coverage/index.njk` (`/coverage/`) and `src/press-kit/index.njk` (`/press-kit/`)
- `scripts/check-site.js`, `docs/marynakuzmenko-com-restructure-handoff.md` and this report

**Changed**
- `.eleventy.js`: adds the `awardStrings`, `eventYear`, `eventDay` and `lcfirst` helpers
- `.gitignore`: the `coverage` rule was also ignoring `src/coverage/`, so it's now anchored to the repo root
- `firebase.json`: adds the redirect
- `package.json`: adds `npm run check`
- `cloudflare/contact-worker/src/index.js`: adds the new form fields to the whitelist
- `src/_data/site.json`: keeps only the technical config. The positioning, awards and Person details moved to `facts.json`.
- `src/_includes/layouts/base.njk`, `src/assets/css/style.css` and `src/llms.njk`
- Every page under `src/`: `index`, `speaking`, `events`, `about`, `partner`, `insights`, `ai-in-agriculture`, `books`, `moomore`, `contact`, `success` and `services`

**Deleted**
- `src/_data/stats.json`, replaced by `facts.reach`
- `src/recognition/index.njk` and `_site/recognition/`

## Redirect

`/recognition` and `/recognition/**` now 301 to `/about/#recognition` (`firebase.json`). The `/recognition/` page is deleted, and nothing links to it any more.

**Not verified locally.** The Firebase hosting emulator (firebase-tools 15.30.1) ignores *every* redirect in `firebase.json`, including `/advisory`, which does redirect in production. So I only checked that the config is valid JSON and follows the same pattern as the existing rules. After the next deploy, run this and look for `301` with `location: https://marynakuzmenko.com/about/#recognition`:

```
curl -sI https://marynakuzmenko.com/recognition/
```

`/coverage/` and `/press-kit/` appear in `sitemap.xml` automatically, and `/recognition/` has gone from it. `llms.txt` now carries the new positioning line and award list, and points to `/press-kit/` for bios and the headshot.

## DRAFT strings, for Maryna to approve

**Site-wide**
- `facts.positioning.short`: "AI in agriculture speaker and trainer"
- `facts.positioning.line`: "Speaker and trainer on AI in agriculture, LinkedIn Top Voice, founder of MooMore and co-founder of Petiole"
- `facts.positioning.jobTitle` (Person JSON-LD): "AI in agriculture speaker and trainer"
- Footer bottom line: "© 2026 · Dr. Maryna Kuzmenko · Speaker and trainer on AI in agriculture."
- Home `<title>`, OG and Twitter title: "Dr. Maryna Kuzmenko — AI in Agriculture Speaker & Trainer"
- Home description: "Keynotes, team training and expert commentary on AI in agriculture from Dr. Maryna Kuzmenko, LinkedIn Top Voice and founder of MooMore and Petiole."

**Home** (`src/index.njk`)
- H1: "AI in agriculture keynotes and team training, from someone who builds it."
- Lead: "I'm Dr. Maryna Kuzmenko. I build AI for farms with MooMore and Petiole, write for a {38K+} LinkedIn community as a LinkedIn Top Voice, and help agrifood organisations see what AI can and can't do in the field."
- "Three ways to work with me" cards. These are the handoff's texts for Keynotes & panels, Team training and Brand partnerships.
- "Why listen to someone who builds it" cards. These are the handoff's texts for Petiole Pro, MooMore and Books.
- Follow link sub-lines (my wording): "Subscribe ↗", "Weekly, on understanding agricultural AI ↗", "Explainers and event recaps ↗". The same lines are used on Insights.
- Closing CTA: "Planning an agrifood event or a team day?" / "Tell me the date and who'll be in the room. I reply within two working days." / "Check availability"

**Speaking** (`src/speaking/index.njk`, `src/_data/talks.json`)
- H1: "AI in agriculture keynote speaker"
- Formats bullet: "Team training and workshops: half-day to multi-week programmes for agrifood teams, with CPD points, are on aiinagriculture.org ↗."
- FAQ answers:
  - "Do you also train teams?": "Yes — workshops and multi-week courses, with BASIS CPD points through Petiole Ltd, are on aiinagriculture.org."
  - "What does it cost?" (**CONFIRM**): "Fees depend on format, travel and preparation. Send the date and audience and I'll reply with a quote within two working days."
  - "Which languages?": "I speak English, Ukrainian and Russian, and German at B1." (`facts.languages.firstPerson`)
- Closing CTA: "Bring AI in agriculture to your stage."
- `talks.json`: each talk's `bestFor` (as in the handoff), `formats` and `takeaway`. All five `takeaway` lines are condensed from the existing blurbs, so none are empty:
  - Beyond the Hype: "What plant phenotyping, variable-rate fertilisation and data ethics look like in a working, increasingly autonomous orchard."
  - Eyes of the Machine: "How non-destructive AI sensing protects shelf-life, reduces waste and standardises trade."
  - Invisible Barriers: "Why diversity is a prerequisite for agricultural innovation, not a nice-to-have."
  - The Silicon Soil: "How AI is moving from laboratory experiments to essential field infrastructure."
  - The First Leaf: "How AI monitors seedling viability and stress for higher survival rates and more resilient reforestation."
- Formats I assigned:
  - Keynote, Technical lecture and Online for Beyond the Hype and for Eyes of the Machine
  - Keynote, Panel and Online for Invisible Barriers and for The Silicon Soil
  - Technical lecture and Online for The First Leaf

**Speaking appearances** (`src/events/index.njk`)
- `<title>`: "Speaking Appearances | Dr. Maryna Kuzmenko". The meta description now includes "Africa".
- Line under the H1: "Keynotes, lectures and panels. Looking for the shows I attend and report on? See events I've covered."
- CTA: "Bring AI innovation to your stage." with the button "Book Maryna"
- New Landscape 2024 entry (`events.js`):
  - Role label: "Remote Lecture"
  - Summary: "A remote lecture into the Landscape 2024 conference in Berlin, 17 to 19 September 2024." This comes from the photo's banner. There is no organiser or link, because none exists on the site.

**Events I've covered** (`src/coverage/index.njk`)
- `<title>`, meta description, H1 "Events I've covered" and the intro paragraph, as in the handoff
- CTA: "Launching something the sector should know about?" with "Partner with me" and "Read the newsletter ↗"
- Line under the H1 (my wording): "Looking for keynotes and lectures? See speaking appearances."

**About** (`src/about/index.njk`)
- `<title>` and meta description, as in the handoff
- "What I do now": three paragraphs, Speaking, Training, and Writing and coverage
- "What I build": the existing professional-bio paragraphs, rewritten in the first person to follow the voice rule, with figures from facts
- Recognition sentences (`facts.recognition`):
  - LinkedIn Top Voice is new: "Dr. Maryna Kuzmenko was recognised by LinkedIn as a Top Voice in May 2026."
  - The Women in Innovation entry merges the old homepage sentence with the award details.
  - In the Forum entry, "advising on support for…" became "working on support for…", to keep any adviser wording off the site.
- Pointer box: "Need a bio or a headshot for your programme? → Press & organiser kit"
- Key facts: the audience line now points to Partnerships instead of repeating the numbers. Languages is a new line.

**Press & organiser kit** (`src/press-kit/index.njk`, `src/_data/bios.js`)
- `<title>`, meta description and the H1 "Press & organiser kit"
- All seven bios from Appendix A
- Section lines (my wording):
  - "On stage, in the field and at the demo stand. Each links to the largest file there is."
  - "Signature talks, with who each is for and the formats it comes in, are on the speaking page."
  - Heading: "Featured in and writing elsewhere"
- JSON bio: adds `speaking` and `training`. The bio prompt adds "Trains agrifood teams (AI literacy and fluency) via aiinagriculture.org", and "Educator first" became "Speaker and trainer on AI in agriculture first".

**Partnerships** (`src/partner/index.njk`)
- Meta description: "…LinkedIn Top Voice on AI in agriculture…"
- Card 03: "Brand-aligned stage presence at conferences and summits: speaking topics and formats."
- "Where I show up" / "On the ground at the sector's main shows"
- "How I work with brands" (**CONFIRM**): "Every paid placement is labelled as such. I keep editorial control of what I write, and I only take on partnerships I can explain to my audience in the same plain terms I use for everything else."
- Buttons: "Request the partnership media kit" and "Start a conversation"
- Line: "Recognition → About"

**Insights**
- "Subscribe to the newsletter ↗"
- "Also here: Events I've covered · AI in Agriculture: the field guide"

**AI in Agriculture field guide**
- "Who is Dr. Maryna Kuzmenko?": "Dr. Maryna Kuzmenko is a speaker and trainer on AI in agriculture, LinkedIn Top Voice, founder of MooMore and co-founder of Petiole. She won the Innovate UK Women in Innovation Award 2025/26 for MooMore, and has taught AI in agriculture to {3.4K+} students across {129} countries." The visible text links to About, and the JSON-LD matches it.
- "Where can I learn…": "For organisations, workshops and courses on responsible AI adoption are at aiinagriculture.org."
- "The Premise" paragraph: "…is a speaker and trainer on AI in agriculture who works at exactly that intersection…"
- Closing section: "Bring it to your event" / "Want this as a talk for your audience?" with "View speaking topics" (primary) and "Start the free course ↗"

**MooMore**
- Heading, now the page's `<h1>`: "Why I added dairy cattle to my crop AI work"
- Bullet: "Speaking and training — AI in agriculture keynotes, and AI literacy training for agrifood teams. Speaking →"

**Contact** (`src/contact/index.njk`)
- `<title>`, meta description, the H1 "Book Maryna or get in touch", and the lead "Keynotes, team training, brand partnerships and media. I reply within two working days."
- The seven option labels from the handoff
- New field labels: Organisation, Event or programme name, City and country, Audience size, Who will be in the room, Budget (optional)
- Training note: "Formats and topics are outlined on aiinagriculture.org ↗ — you can still send your enquiry here."
- Helper for guest lectures (my wording): "Tell me about the course or programme, and what your students need."
- Success page (`src/success/index.njk`): "Thank you — I'll reply within two working days."

**/services/** (not in the handoff, see below)
- Hero H1: "Speaking, training and writing on AI in agriculture."
- Hero paragraph: "Keynotes, team training, books and brand partnerships…"
- New "Team training" card in place of "Teaching & courses — My main work"
- Buttons: "Book Maryna" and "Train your team ↗"

## CONFIRM facts (all in `src/_data/facts.json`)

| Key | Value used | Question |
|---|---|---|
| `reach.countries` | 129 | 121 also appeared on the old site |
| `reach.linkedin` | 38K+ | Still right today? |
| `reach.newsletter` | 16K+ | The field guide had said 15K+ |
| `newsletter.name` / `.url` | AI in Agriculture newsletter, https://aiinagriculture.org/newsletters/ | Renamed? LinkedIn URL instead? |
| `award.topVoice` | "LinkedIn Top Voice, May 2026", with no topic | Which topic label, if any? |
| `petiole.grants` | three Innovate UK grants and one Horizon Europe grant | aiinagriculture.org says two |
| `replyTime` | within two working days | Right for this site? |
| Speaking FAQ "What does it cost?" | On request | Publish a "from" price? |
| Partnerships "How I work with brands" | as above | Wording OK? |
| `reachLinks.students` | Udemy course (referral link) | §5 says to keep it, but §11 Q9 says course links move to aiinagriculture.org |

## Links removed or changed

- **AI Challenge Camp (Jan 2026):** removed the "LinkedIn Notes" link, which pointed at the Fruit Logistica post. "Watch recap" stays.
- **BridgeAI collaborative event (Sep 2025):** the cvent.com link is relabelled "Event page".
- **Removed from the events log:**
  - Women in Innovation 2026 award: its IUK profile link is now on About → Recognition.
  - LinkedIn Top Voice: its `lnkd.in/p/eK3WAkEc` link is now on About → Recognition as "LinkedIn notes".
- **Top nav:** Teaching, Books, Events and Contact are gone from it. All four are in the footer.
- **Footer:**
  - The Udemy link became "Courses ↗" (aiinagriculture.org/courses/).
  - The Recognition link was removed.
  - "More Maryna" is unchanged.
- **Home:** the old sections were removed, and with them the "Check my Events", "AI in Agriculture →", "View Speaking Portfolio →" and "Read Insights →" links. Their pages are all reachable from the new sections or the footer.
- **About:** the old "regular speaker at educational events" paragraph and its `/events/` link were removed. The speaking paragraph links `/speaking/` instead.
- **Books:** the Courses card now links aiinagriculture.org/courses/ instead of `/ai-in-agriculture/`, and "Get in touch" goes to `/contact/?type=books`.
- **The AgFunder article** moved from the Events archive to the `press` list (Press kit → "Featured in and writing elsewhere").
- **Generic `/contact/` links** now carry `?type=`: speaking, partnership, books, media.

## Images

All images were already on the site, as you asked.

- **Home:**
  - Hero: the speaking-from-the-floor photo
  - Keynotes card: the Landscape 2024 remote lecture
  - Team training card: the AI Camp at Loughborough
  - Brand partnerships card: the BridgeAI apple demo
  - Petiole Pro card: the Petiole demo rig
  - MooMore card: the Women in Innovation winner card
  - Books card: The Precision Vineyard cover
- **About:** the BridgeAI talk, leaf-area measurement and Women in Innovation Forum photos.
- **Press kit:** the headshot, plus seven on-stage, field and demo photos. Each links to its master file in `src/assets/img/`, with nothing upscaled.
- **Events:** the photo from the existing Speaking page is now on the Landscape 2024 entry.
- **Not used:** `public/assets/img/speaking/maryna-kuzmenko-workshop.jpg` (an on-stage photo, 5255 × 3559, 9.9 MB) is untracked in the legacy `public/` folder and isn't on the site, so I left it alone. It would make a stronger home hero than the current photo, if you want it. It would first need resizing through `scripts/site-images.py`.

## Not done, or done differently

1. **The redirect can't be tested locally** (see above).
2. **`/ai-in-agriculture/` no longer matches the handoff.** It's now a free-course page, with no "Shifts That Matter", quote, "Where This Work Lives" or "121". I applied the intent instead: figures from facts, the positioning line, the FAQ changes, and "View speaking topics" as the closing CTA. The hero still leads with "Start the free course", because that is what the page is about. Swapping it would make the hero contradict the page.
3. **`/services/` isn't in the page register.** `/work` redirects to it, and it repeated "my main work: teaching", the old award name and the reach numbers. I kept the URL and brought the copy in line (DRAFT above). Retiring it would need a second redirect, which §6 rules out, so that's Maryna's call.
4. **`/resources/`** is a pre-existing noindex, unlinked "being prepared" placeholder page. I left it because the URL is stable. I recommend deleting it or giving it content.
5. **The reach numbers still appear outside `/` and `/partner/` in four places:**
   - the Books "Courses" card, which the handoff asks to keep, with numbers from facts
   - Partnerships card 05
   - the field guide's course stats (students)
   - the press kit's bios and JSON, which Appendix A specifies
   All of them render from `facts.json`.
6. **Copy kept as is:**
   - The footer brand tagline ("Architecting the future of agrifood through AI, Education, Policy, and Human-First Innovation.") isn't covered by the handoff.
   - The PMAS lecture title "How to Optimize Crop Yield…" is the host's own title, so its US spelling stays.
   - The WIPO summary keeps its existing wording.
7. **Person JSON-LD** now appears only on `/` and `/about/`, as the handoff says. Before, it was on every page. Other pages refer to it by `@id`. Its `image` is now the hi-res headshot. `site.image`, the speaking photo, stays as the default link-preview image.
8. **Books JSON-LD:** `bookFormat` is EBook, matching the Kindle URL. Check whether the ISBNs shown are the paperback ISBNs, because if so the two disagree.
9. **The contact form wasn't submitted.** That would send a real message through Formspree. Instead:
   - I checked all seven `?type=` values, the conditional fields, and which fields each type sends in the browser.
   - I checked the no-JavaScript behaviour from the built HTML: a plain POST, "Something else" selected, and the extra fields disabled.
10. **The mobile menu** now starts below 1000px, not 850px. The longer nav doesn't fit between 850px and 1000px. Before, there was also a gap between 851px and 900px where neither the nav nor the menu button showed.
11. **Stale `_site/` files are left in place:** an old `assets/img/favicon/` folder and two LinkedIn images that no build writes any more. They're live today, and removing them is outside this work.
12. **Two fix-up commits.** The event date filters and the `/coverage/` page were left out of their phase commits: the first because the config file wasn't staged, the second because of the `.gitignore` rule. Both are now committed, and a clean checkout of the branch builds and passes every check.

## Open questions (§11)

These defaults are used until Maryna answers:

- 129 countries
- 38K+ LinkedIn followers and 16K+ newsletter readers
- Three Innovate UK grants plus one Horizon Europe grant
- Top Voice with no topic label
- The current newsletter name and URL
- Homepage talks: Beyond the Hype, Eyes of the Machine, Invisible Barriers
- Fees on request
- A reply within two working days
- Courses on aiinagriculture.org (but the reach link still goes to Udemy, see the CONFIRM table)
- More Maryna unchanged
- No upcoming events: REAP 2026 and BerryWorld aren't listed
- The AI Camp LinkedIn link removed
- Testimonials hidden
- Two press entries only
- OFC 2026 treated as coverage
- Agfluencers not mentioned (it still appears in the Sargodha poster's alt text, which describes what the poster says)
- No Petiole Pro download or citation numbers
