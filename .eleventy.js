const pluginSEO = require("eleventy-plugin-seo");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    "html",
    "njk",
    "md",
    // Static Assets:
    "css",
    "jpeg",
    "jpg",
    "png",
    "svg",
    "woff",
    "woff2"
  ]);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy("public");

  let markdownOptions = {
      html: true,
      breaks: true,
      linkify: true
  };

  // markdown rendering for rich-text blocks
  const markdownLib = markdownIt(markdownOptions);
  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addFilter("markdown", (content) => {
    return markdownLib.render(content);
  });

  // filter for press listings, by publication date
  eleventyConfig.addFilter("sortByPubDate", function(array) {
    return array.slice().sort((a, b) => {
        // Convert 'DD.MM.YYYY' to 'YYYY-MM-DD'
        let dateA = convertDate(a.data.pubdate);
        let dateB = convertDate(b.data.pubdate);

        return new Date(dateB) - new Date(dateA);
    });
  });

  // convert 'MM.DD.YYYY' (data.pubdate) to 'YYYY-MM-DD'
  function convertDate(dateString) {
      let parts = dateString.split(".");
      return `${parts[2]}-${parts[0]}-${parts[1]}`;
  }

  /* From: https://github.com/artstorm/eleventy-plugin-seo

  Adds SEO settings to the top of all pages
  The "glitch-default" bit allows someone to set the url in seo.json while
  still letting it have a proper glitch.me address via PROJECT_DOMAIN
  */
  const seo = require("./src/seo.json");
  eleventyConfig.addPlugin(pluginSEO, seo);

  eleventyConfig.setBrowserSyncConfig({ ghostMode: false });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "build"
    }
  };
};
