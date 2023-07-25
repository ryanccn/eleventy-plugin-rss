const pkg = require("./package.json");

const dateRfc3339 = require("./src/dateRfc3339");
const dateRfc822 = require("./src/dateRfc822");
const absoluteUrl = require("./src/absoluteUrl");
const convertHtmlToAbsoluteUrls = require("./src/htmlToAbsoluteUrls");
const getNewestCollectionItemDate = require("./src/getNewestCollectionItemDate");

const plugin = function (eleventyConfig, options = {}) {
  try {
    eleventyConfig.versionCheck(pkg["11ty"].compatibility);
  } catch (e) {
    console.log(
      `WARN: Eleventy Plugin (${pkg.name}) Compatibility: ${e.message}`
    );
  }

  eleventyConfig.addFilter("absoluteUrl", absoluteUrl);

  eleventyConfig.addAsyncFilter(
    "htmlToAbsoluteUrls",
    (htmlContent, base, callback) => {
      if (!htmlContent) {
        if (callback) callback(null, "");
        return;
      }

      let posthtmlOptions = Object.assign(
        {
          // default PostHTML render options
          closingSingleTag: "slash",
        },
        options.posthtmlRenderOptions
      );

      convertHtmlToAbsoluteUrls(htmlContent, base, posthtmlOptions).then(
        (html) => {
          if (callback) callback(null, html);
        }
      );
    }
  );

  // Dates
  eleventyConfig.addFilter(
    "getNewestCollectionItemDate",
    getNewestCollectionItemDate
  );
  eleventyConfig.addFilter("dateToRfc3339", dateRfc3339);
  eleventyConfig.addFilter("dateToRfc822", dateRfc822);

  // Deprecated, these names are incorrect! Issue #8
  eleventyConfig.addFilter("rssLastUpdatedDate", (collection) => {
    return dateRfc3339(getNewestCollectionItemDate(collection));
  });

  // Deprecated, this name is incorrect! Issue #8
  eleventyConfig.addFilter("rssDate", dateRfc3339);
};

module.exports = Object.assign(plugin, {
  dateRfc3339,
  dateRfc822,
  getNewestCollectionItemDate,
  absoluteUrl,
  convertHtmlToAbsoluteUrls,
});
