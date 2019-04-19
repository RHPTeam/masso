/* eslint-disable strict */
module.exports = {
  "agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
  "groups": "https://www.facebook.com/groups/?category=groups",
  "pages": "https://www.facebook.com/bookmarks/pages",
  "postsSearch": ( keyword ) => {
    return `https://m.facebook.com/graphsearch/str/${encodeURI(
      keyword
    )}/stories-keyword/stories-feed?tsid&source=pivot&pn=5`;
  },
  "post": ( id ) => {
    return `https://www.facebook.com/${ id }`;
  }
};
