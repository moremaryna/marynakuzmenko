
module.exports = function (eleventyConfig) {
  // Copy /src/assets to /assets in the output
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};