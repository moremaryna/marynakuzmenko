#!/usr/bin/env node
// Checks the numbers, dates and law on /training/ (src/_data/training.js).
//
//   npm run check:figures                  everything
//   npm run check:figures -- --offline     only what needs no network
//   npm run check:figures -- --report=figures-report.md
//
// Run every Monday by .github/workflows/check-figures.yml, which opens (or
// comments on) one GitHub issue when it fails. It never edits the data: a
// changed number is a person's decision, made after reading the source.
//
// What fails the run:
//
//  1. Overdue: `reviewed` is more than 92 days old. The law has already been
//     amended once since Article 4 first applied.
//  2. Inconsistent data: a figure whose number is not among the things checked
//     for it, or a date the law section relies on that it does not print.
//  3. The built page (_site/training/index.html, when there is one) does not
//     print a number, a figure's sentence or the law summary exactly.
//  4. aiinagriculture.org, where the offer is published and reviewed, says
//     something different: another number, another sentence, a figure this
//     site lacks, or a later review than this one.
//  5. A primary source no longer contains the number or date it is cited for,
//     or does not answer at all (twice, a minute apart).
//
// What only warns: a source that refuses robots (401, 403, 429, or a 202
// bot challenge, which EUR-Lex sends). Those need checking by hand, and the
// report says which.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MAX_AGE_DAYS = 92;
const WARN_AGE_DAYS = 76;
const RETRY_AFTER_MS = 60_000;
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (compatible; marynakuzmenko-figure-check/1.0; +https://marynakuzmenko.com/training/)",
  Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-GB,en;q=0.9",
};

// --- Text -------------------------------------------------------------------

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"' };

/** An HTML page as the words a reader sees, so a quote can be found in it. */
function textOf(html) {
  return html
    .replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
      if (code[0] !== "#") return ENTITIES[code.toLowerCase()] ?? match;
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return String.fromCodePoint(n);
    })
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Plain text written in the data file, normalised the same way. */
const plain = (text) => textOf(String(text));

const contains = (haystack, needle) => haystack.toLowerCase().includes(plain(needle).toLowerCase());

/** The first way of writing each fact that `text` contains, or null per fact. */
const findEvidence = (text, evidence) =>
  evidence.map((ways) => ({ ways, found: ways.find((way) => contains(text, way)) ?? null }));

const readable = (iso) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

// --- Fetching ---------------------------------------------------------------

async function get(fetchImpl, url) {
  try {
    const response = await fetchImpl(url, { headers: HEADERS, redirect: "follow", signal: AbortSignal.timeout(30_000) });
    const body = await response.text();
    if ([401, 403, 429].includes(response.status)) return { state: "blocked", status: response.status };
    if (!response.ok) return { state: "down", status: response.status };
    const text = textOf(body);
    // A bot challenge answers 202, or 200 with almost nothing on the page.
    if (response.status !== 200 || text.length < 500) return { state: "blocked", status: `${response.status}, ${text.length} characters` };
    return { state: "ok", status: response.status, html: body, text };
  } catch (error) {
    return { state: "down", status: error.name === "TimeoutError" ? "timeout" : error.cause?.code ?? error.message };
  }
}

/** Asks again, a minute later, before calling a source down. */
async function fetchPage(fetchImpl, url, wait) {
  const first = await get(fetchImpl, url);
  if (first.state !== "down") return first;
  await wait(RETRY_AFTER_MS);
  return get(fetchImpl, url);
}

/**
 * A gov.uk publication keeps its findings in HTML attachments one level below
 * its own address. They are read too, so a number in the report itself counts.
 */
async function withAttachments(fetchImpl, url, page, wait) {
  const { pathname, origin } = new URL(url);
  if (!/(^|\.)gov\.uk$/.test(new URL(url).hostname) || !pathname.startsWith("/government/publications/")) return page;
  const links = new Set();
  for (const [, href] of page.html.matchAll(/href="([^"#?]+)"/g)) {
    const target = new URL(href, origin);
    if (target.origin === origin && target.pathname.startsWith(`${pathname}/`)) links.add(target.href);
  }
  let text = page.text;
  for (const link of [...links].slice(0, 10)) {
    const attachment = await fetchPage(fetchImpl, link, wait);
    if (attachment.state === "ok") text += ` ${attachment.text}`;
  }
  return { ...page, text, attachments: links.size };
}

// --- The checks -------------------------------------------------------------

async function run({ training, builtPage = null, offline = false, now = new Date(), fetchImpl = globalThis.fetch, wait = (ms) => new Promise((r) => setTimeout(r, ms)) }) {
  const results = [];
  const fail = (check, message) => results.push({ level: "fail", check, message });
  const warn = (check, message) => results.push({ level: "warn", check, message });
  const pass = (check, message) => results.push({ level: "pass", check, message });

  // 1. Overdue
  const age = Math.floor((now - new Date(`${training.reviewed}T00:00:00Z`)) / 86_400_000);
  const due = readable(new Date(new Date(`${training.reviewed}T00:00:00Z`).getTime() + MAX_AGE_DAYS * 86_400_000));
  if (age > MAX_AGE_DAYS) fail("Review", `Last reviewed ${readable(training.reviewed)}, ${age} days ago; it was due by ${due}. Re-read every source, then change \`reviewed\`.`);
  else if (age > WARN_AGE_DAYS) warn("Review", `Last reviewed ${readable(training.reviewed)}; due by ${due}.`);
  else pass("Review", `Last reviewed ${readable(training.reviewed)}; next due by ${due}.`);

  // 2. The data agrees with itself
  for (const figure of training.figures) {
    if (!figure.evidence?.length || !figure.evidence[0].some((way) => plain(way) === plain(figure.value)))
      fail("Data", `"${figure.value}": its first evidence list must include the number exactly as printed, so the source is checked for that number.`);
  }
  const lawText = plain(`${training.act.answer} ${training.act.note}`);
  for (const date of training.act.dates) {
    if (!contains(lawText, date)) fail("Data", `The law section relies on ${date} but does not say it.`);
  }

  // 3. The built page prints them
  if (builtPage === null) {
    warn("Built page", "No _site/training/index.html; run `npm run build` first to check what the page prints.");
  } else {
    const page = textOf(builtPage);
    const expected = [
      ...training.figures.flatMap((f) => [f.value, f.text, f.source]),
      training.act.answer,
      training.act.note,
      `Last reviewed ${readable(training.reviewed)}`,
    ];
    const missing = expected.filter((quote) => !contains(page, quote));
    if (missing.length) missing.forEach((quote) => fail("Built page", `Does not print: "${plain(quote)}"`));
    else pass("Built page", "Prints every number, sentence and the review date.");
  }

  if (offline) return results;

  // 4. aiinagriculture.org says the same
  const canonical = await fetchPage(fetchImpl, training.source, wait);
  if (canonical.state !== "ok") {
    (canonical.state === "blocked" ? warn : fail)("aiinagriculture.org", `${training.source} answered ${canonical.status}; compare it by hand.`);
  } else {
    const theirValues = [...canonical.html.matchAll(/class="stat__value"[^>]*>([^<]+)</g)].map((m) => plain(m[1]));
    const ourValues = training.figures.map((f) => plain(f.value));
    for (const value of theirValues.filter((v) => !ourValues.includes(v)))
      fail("aiinagriculture.org", `Shows a figure this site does not: "${value}". Copy it into \`figures\` once you have read its source.`);
    for (const value of ourValues.filter((v) => theirValues.length && !theirValues.includes(v)))
      fail("aiinagriculture.org", `No longer shows "${value}". Find out why before keeping it here.`);
    const quotes = [...training.figures.map((f) => f.text), training.act.answer, training.act.note, training.act.scope];
    for (const quote of quotes.filter((q) => !contains(canonical.text, q)))
      fail("aiinagriculture.org", `Words differ from this site's: "${plain(quote)}"`);
    const theirReview = canonical.text.match(/Last reviewed (\d{1,2} [A-Z][a-z]+ \d{4})/);
    if (!theirReview) warn("aiinagriculture.org", "Could not find its \"Last reviewed\" date.");
    else if (new Date(`${theirReview[1]} UTC`) > new Date(`${training.reviewed}T00:00:00Z`))
      fail("aiinagriculture.org", `Reviewed on ${theirReview[1]}, after this site (${readable(training.reviewed)}). Bring its law and figures across, then change \`reviewed\`.`);
    if (!results.some((r) => r.check === "aiinagriculture.org" && r.level === "fail"))
      pass("aiinagriculture.org", `Same numbers and words (theirs reviewed ${theirReview ? theirReview[1] : "on an unknown date"}).`);
  }

  // 5. The primary sources still say it
  const sources = [
    ...training.figures.map((f) => ({ label: `${f.value} — ${f.source}`, url: f.url, evidence: f.evidence })),
    ...training.act.sources.map((s) => ({ label: s.name, url: s.url, evidence: s.evidence, law: true })),
  ];
  const lawTexts = [];
  let lawBlocked = false;
  for (const source of sources) {
    let page = await fetchPage(fetchImpl, source.url, wait);
    if (page.state === "blocked") {
      warn("Source", `${source.label}: ${source.url} refused the check (${page.status}). Open it and confirm by hand.`);
      if (source.law) lawBlocked = true;
      continue;
    }
    if (page.state === "down") {
      fail("Source", `${source.label}: ${source.url} did not answer (${page.status}), twice. Has it moved?`);
      if (source.law) lawBlocked = true;
      continue;
    }
    page = await withAttachments(fetchImpl, source.url, page, wait);
    if (source.law) lawTexts.push(page.text);
    const facts = findEvidence(page.text, source.evidence);
    const lost = facts.filter((f) => !f.found);
    const where = page.attachments ? ` (and its ${page.attachments} attachment link(s))` : "";
    if (lost.length)
      lost.forEach((f) => fail("Source", `${source.label}: ${source.url}${where} no longer contains ${f.ways.map((w) => `"${w}"`).join(" or ")}.`));
    else pass("Source", `${source.label}: found ${facts.map((f) => `"${f.found}"`).join(", ")}.`);
  }
  for (const date of training.act.dates) {
    if (lawTexts.some((text) => contains(text, date))) pass("Law dates", `${date} appears in a cited source.`);
    else if (lawBlocked) warn("Law dates", `${date} was not found in the sources that answered; one or more refused the check, so confirm by hand.`);
    else fail("Law dates", `${date} does not appear in any cited source. Has the date moved?`);
  }

  return results;
}

// --- Report -----------------------------------------------------------------

const MARK = { fail: "✗", warn: "!", pass: "✓" };

function report(results) {
  const failures = results.filter((r) => r.level === "fail").length;
  const warnings = results.filter((r) => r.level === "warn").length;
  const lines = [
    `# /training/ figures check`,
    ``,
    failures ? `**${failures} problem(s)** and ${warnings} to check by hand.` : `No problems; ${warnings} to check by hand.`,
    ``,
    ...results.map((r) => `- ${MARK[r.level]} **${r.check}** — ${r.message}`),
    ``,
    `How to fix: read the source, change \`src/_data/training.js\`, change \`reviewed\`, rebuild. Never change a number you have not read in its primary source.`,
  ];
  return { text: lines.join("\n"), failures };
}

if (require.main === module) {
  (async () => {
    const args = process.argv.slice(2);
    const offline = args.includes("--offline");
    const reportPath = args.find((a) => a.startsWith("--report="))?.slice("--report=".length);
    const built = path.join(ROOT, "_site", "training", "index.html");
    const training = require(path.join(ROOT, "src", "_data", "training.js"));
    const results = await run({
      training,
      builtPage: fs.existsSync(built) ? fs.readFileSync(built, "utf8") : null,
      offline,
    });
    const { text, failures } = report(results);
    console.log(text);
    if (reportPath) fs.writeFileSync(reportPath, `${text}\n`);
    process.exit(failures ? 1 : 0);
  })();
}

module.exports = { run, report, textOf, findEvidence };
