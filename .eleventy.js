
module.exports = function (eleventyConfig) {
  // Copy /src/assets to /assets in the output
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
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
