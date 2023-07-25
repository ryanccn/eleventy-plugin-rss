# @ryanccn/eleventy-plugin-rss

A pack of [Eleventy](https://github.com/11ty/eleventy) filters for generating Atom, JSON and RSS feeds using the Nunjucks templating engine.

This is a fork of the [official plugin](https://github.com/11ty/eleventy-plugin-rss), which doesn't seem to be particularly maintained.

See `sample/feed.njk` for an example Atom feed template, `sample/feed.json` for an example JSON feed template, or `sample/feed-rss.njk` for an example RSS feed template.

## Installation

```
npm install @ryanccn/eleventy-plugin-rss
```

## Filters

- `dateRfc3339`: RFC 3339 dates that Atom uses
- `dateRfc822`: RFC 822 dates
- `getNewestCollectionItemDate`: Get the newest date of an item in a collection
- `absoluteUrl`: Make a relative URL absolute
- `convertHtmlToAbsoluteUrls`: Convert relative links in HTML to absolute URLs
