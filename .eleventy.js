const pluginSEO = require("eleventy-plugin-seo");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
//const markdownItAnchor = require("markdown-it-anchor");

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

  /*let markdownAnchorOptions = {
      permalink: false
  };*/


  const markdownLib = markdownIt(markdownOptions); //.use(markdownItAnchor, markdownAnchorOptions);
  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addFilter("markdown", (content) => {
    return markdownLib.render(content);
  });


  /* From: https://github.com/artstorm/eleventy-plugin-seo

  Adds SEO settings to the top of all pages
  The "glitch-default" bit allows someone to set the url in seo.json while
  still letting it have a proper glitch.me address via PROJECT_DOMAIN
  */
  const seo = require("./src/seo.json");
  if (seo.url === "glitch-default") {
    seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
  }
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
