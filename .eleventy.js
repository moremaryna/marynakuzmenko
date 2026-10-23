
module.exports = function (eleventyConfig) {
  // Copy /src/assets to /assets in the output.
  //
  // The originals under img/events/ stay out of it: the phone photos, GIFs and
  // the LinkedIn text that each event folder is dropped in with. Pages load
  // only the WebP renditions scripts/site-images.py writes beside them, and
  // the -og.jpg made for link previews, so those two kinds are let through.
  const EVENT_ORIGINAL = /^img[\/]events[\/].*\.(jpe?g|png|gif|txt)$/i;
  eleventyConfig.addPassthroughCopy(
    { "src/assets": "assets" },
    { filter: (path) => !EVENT_ORIGINAL.test(path) || /-og\.jpg$/i.test(path) }
  );
  // Favicon and web manifest live at the site root
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "src/site.webmanifest": "site.webmanifest" });

  // Expand a stats.json shorthand for prose: "3.4K+" -> "3,400"
  eleventyConfig.addFilter("fullCount", function (value) {
    const match = String(value).trim().match(/^([\d.,]+)\s*([KM])?\+?$/i);
    if (!match) return value;
    const multiplier = { K: 1e3, M: 1e6 }[(match[2] || "").toUpperCase()] || 1;
    return Math.round(parseFloat(match[1].replace(/,/g, "")) * multiplier).toLocaleString("en-GB");
  });

  // "Speaker and trainer…" -> "speaker and trainer…", for a facts.json line
  // that runs on from "Dr. Maryna Kuzmenko is a".
  eleventyConfig.addFilter("lcfirst", (value) =>
    String(value).charAt(0).toLowerCase() + String(value).slice(1)
  );

  // The stylesheet is served with a one-year immutable cache, so its URL
  // carries a hash of its contents: a changed file gets a new URL, and no
  // visitor is left with yesterday's styles on today's pages.
  const css = require("fs").readFileSync("src/assets/css/style.css");
  eleventyConfig.addGlobalData(
    "cssVersion",
    require("crypto").createHash("sha1").update(css).digest("hex").slice(0, 10)
  );

  // The About page's recognition list as plain sentences, word for word, for
  // the Person's `award` in the structured data.
  const facts = require("./src/_data/facts.json");
  eleventyConfig.addGlobalData("awardStrings", [
    ...facts.recognition.map((item) => `${item.title} — ${item.text}`),
    ...facts.petiole.recognition.map((item) => `Petiole Pro — ${item}`),
    `Petiole Pro — ${facts.petiole.grantsLine}`,
  ]);

  // Blog posts: every page tagged "posts", newest first.
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByTag("posts").sort((a, b) => b.date - a.date)
  );

  // 2026-09-28 -> "28 September 2026"
  eleventyConfig.addFilter("readableDate", (date) =>
    new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
      .format(new Date(date))
  );

  // Full ISO timestamp, for feeds and structured data. "now" means now.
  eleventyConfig.addFilter("isoDateTime", (date) =>
    (date === "now" ? new Date() : new Date(date)).toISOString()
  );

  // When a page last changed: its last git commit, or its publication date
  // if that is later, or now for a file not yet committed. The file's own
  // timestamp would only say when this machine checked the repo out.
  const { execSync } = require("child_process");
  const gitDates = new Map();
  const gitDate = (inputPath) => {
    if (!inputPath) return null;
    if (!gitDates.has(inputPath)) {
      let out = "";
      try {
        const git = (args) => execSync(`git ${args} -- "${inputPath}"`, {
          encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
        }).trim();
        // Edited since its last commit: it changes with this build, so "now".
        out = git("status --porcelain") ? "now" : git("log -1 --format=%cI");
      } catch { /* not a git checkout: fall through to "now" */ }
      gitDates.set(inputPath, out === "now" ? new Date() : out ? new Date(out) : null);
    }
    return gitDates.get(inputPath);
  };
  eleventyConfig.addFilter("lastModified", (page) => {
    const committed = gitDate(page && page.inputPath);
    // Only a date set in front matter counts as publication; Eleventy's
    // default page.date is just the file's timestamp on this machine.
    const published = page && page.data && page.data.date ? new Date(page.data.date) : null;
    if (committed && published) return committed > published ? committed : published;
    return committed || published || new Date();
  });

  // Words in a rendered HTML fragment, for BlogPosting.wordCount
  eleventyConfig.addFilter("wordCount", (html) =>
    String(html || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length
  );

  // 2026-09-28 -> "2026-09-28", for <time datetime> and structured data
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
