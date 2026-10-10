
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

  // The stylesheet is served with a one-year immutable cache, so its URL
  // carries a hash of its contents: a changed file gets a new URL, and no
  // visitor is left with yesterday's styles on today's pages.
  const css = require("fs").readFileSync("src/assets/css/style.css");
  eleventyConfig.addGlobalData(
    "cssVersion",
    require("crypto").createHash("sha1").update(css).digest("hex").slice(0, 10)
  );

  // Blog posts: every page tagged "posts", newest first.
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByTag("posts").sort((a, b) => b.date - a.date)
  );

  // 2026-09-28 -> "28 September 2026"
  eleventyConfig.addFilter("readableDate", (date) =>
    new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
      .format(new Date(date))
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
