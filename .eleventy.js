
module.exports = function (eleventyConfig) {
  // Copy /src/assets to /assets in the output
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Expand a stats.json shorthand for prose: "3.4K+" -> "3,400"
  eleventyConfig.addFilter("fullCount", function (value) {
    const match = String(value).trim().match(/^([\d.,]+)\s*([KM])?\+?$/i);
    if (!match) return value;
    const multiplier = { K: 1e3, M: 1e6 }[(match[2] || "").toUpperCase()] || 1;
    return Math.round(parseFloat(match[1].replace(/,/g, "")) * multiplier).toLocaleString("en-GB");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
