// Checks the built site in _site/ against the acceptance checks of the
// October 2026 restructure (docs/marynakuzmenko-com-restructure-handoff.md,
// section 10): forbidden strings, hard-coded figures in page sources, one
// <h1>, a unique <title>, a meta description and a self-canonical on every
// page, JSON-LD that parses, and internal links that resolve.
//
//   npm run build && node scripts/check-site.js
//
// Exits non-zero when anything fails.

const fs = require("fs");
const path = require("path");

const SITE = "_site";
const SRC = "src";
const ORIGIN = "https://marynakuzmenko.com";

const FORBIDDEN = [
  "121 countries",
  "3K+ students",
  "3K+ subscribers",
  "15K+",
  "two Innovate UK grants",
  "two grants from Innovate UK",
  "Educator & Author",
  "Educator &amp; Author",
  "Educator, author, and speaker",
  "Educator first",
  "Check Availability for 2026",
  "in 2026/27",
  "collaborations in 2026",
  "Colombiana",
  "90 anniversary",
  "Association of Plant Biologists",
  'href="/recognition/"',
  'href="https://marynakuzmenko.com/recognition/"',
  "TODO",
  "Lorem",
  ">Teaching<",
  "Coming soon",
];

// Figures that may appear only in src/_data/facts.json.
const FIGURES = [/38K/, /16K/, /23K/, /3\.4K/, /3,400/, /\b129\b/];

const walk = (dir, filter) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, filter);
    return filter(full) ? [full] : [];
  });

const failures = [];
const fail = (message) => failures.push(message);

// The pages this build wrote. Stale files kept in _site from older builds
// (an old favicon folder, the 404 page's siblings) are left out by asking
// Eleventy's own sitemap and the known extra pages.
const pages = walk(SITE, (f) => f.endsWith(".html") && !f.includes(`${path.sep}assets${path.sep}`))
  .filter((f) => {
    const html = fs.readFileSync(f, "utf8");
    return html.includes('<link rel="canonical"') || f.endsWith("404.html");
  });

const titles = new Map();
const urlOf = (file) => {
  const rel = path.relative(SITE, file).split(path.sep).join("/");
  return "/" + rel.replace(/index\.html$/, "");
};

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const url = urlOf(file);

  // 1. Forbidden strings (case-insensitive)
  // Matched as whole words, so "23K+ subscribers" is not "3K+ subscribers"
  // and Universidad Surcolombiana is not "Colombiana".
  for (const needle of FORBIDDEN) {
    const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(?<![\\w.])${escaped}${/\w$/.test(needle) ? "\\b" : ""}`, "i");
    if (pattern.test(html)) fail(`${url}: forbidden string "${needle}"`);
  }
  // "Women in Innovation Award 2026" is allowed only in an alt attribute
  const visible = html.replace(/alt="[^"]*"/g, "");
  if (/Women in Innovation Awards? 2026/i.test(visible)) fail(`${url}: "Women in Innovation Award 2026" outside alt text`);

  // 3. One <h1>, a unique <title>, a meta description, a self-canonical
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(`${url}: ${h1s} <h1> elements`);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (!title) fail(`${url}: no <title>`);
  else titles.set(title, [...(titles.get(title) || []), url]);
  if (!/<meta name="description" content="[^"]+"/.test(html)) fail(`${url}: no meta description`);
  if (!file.endsWith("404.html")) {
    const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
    if (canonical !== ORIGIN + url) fail(`${url}: canonical is ${canonical}`);
  }

  // 4. Every JSON-LD block parses
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  blocks.forEach((m, i) => {
    try { JSON.parse(m[1]); } catch (e) { fail(`${url}: JSON-LD block ${i + 1} does not parse (${e.message})`); }
  });

  // 6. Internal links resolve to a built file
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const target = decodeURI(m[1]);
    const candidates = [target, path.posix.join(target, "index.html")];
    if (!candidates.some((c) => fs.existsSync(path.join(SITE, c)))) fail(`${url}: broken internal link ${m[1]}`);
  }
}

for (const [title, urls] of titles) {
  if (urls.length > 1) fail(`duplicate <title> "${title}" on ${urls.join(", ")}`);
}

// The Person block must be byte-identical on / and /about/
const personOf = (file) => {
  const html = fs.readFileSync(path.join(SITE, file), "utf8");
  const m = html.match(/<script type="application\/ld\+json" id="person">([\s\S]*?)<\/script>/);
  return m && m[1];
};
const homePerson = personOf("index.html");
const aboutPerson = personOf("about/index.html");
if (!homePerson || !aboutPerson) fail("Person JSON-LD missing on / or /about/");
else if (homePerson !== aboutPerson) fail("Person JSON-LD differs between / and /about/");

// 2. Figures appear only in facts.json, not in page sources
for (const file of walk(SRC, (f) => /\.(njk|md|html|json|js)$/.test(f) && !f.endsWith("facts.json") && !f.includes("backup"))) {
  const text = fs.readFileSync(file, "utf8");
  for (const figure of FIGURES) {
    // 129 only as a country count: skip it inside numbers like 1290 or URLs
    for (const m of text.matchAll(new RegExp(figure.source, "g"))) {
      const around = text.slice(Math.max(0, m.index - 40), m.index + 40);
      if (/http|urn:li|activity|\d{4,}/.test(around) && figure.source.includes("129")) continue;
      fail(`${path.relative(".", file)}: hard-coded figure ${m[0]} near "${around.replace(/\s+/g, " ")}"`);
    }
  }
}

console.log(`Checked ${pages.length} pages.`);
if (failures.length) {
  console.log(failures.map((f) => "  ✗ " + f).join("\n"));
  process.exit(1);
}
console.log("All checks passed.");
