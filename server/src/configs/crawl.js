/* eslint-disable strict */
module.exports = {
  "agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
  "formDataPost": {
    "source": 8,
    "upload_id": 1024,
    "waterfallxapp": "web_react_composer"
  },
  "groups": "https://www.facebook.com/groups/?category=groups",
  "linkUploadImage": ( token, id, av ) => {
    return `https://upload.facebook.com/ajax/react_composer/attachments/photo/upload?av=${av}&__user=${id}&__a=1&fb_dtsg=${token}`;
  },
  "linkGetPreviewScrape": ( id, scrapeLink ) => {
    return `https://www.facebook.com/react_composer/scraper/?composer_id=rc.u_0_13&target_id=${id}&scrape_url=${scrapeLink}&entry_point=feedx_sprouts&source_attachment=STATUS&source_logging_name=link_pasted&av=${id}`;
  },
  "linkUploadFeed":
    "https://www.facebook.com/webgraphql/mutation/?doc_id=1740513229408093",
  "linkGetIdPost": ( av ) => {
    return `https://www.facebook.com/async/publisher/creation-hooks/?av=${av}`;
  },
  "mpost": ( id ) => {
    return `https://m.facebook.com/${id}`;
  },
  "pages": "https://www.facebook.com/bookmarks/pages",
  "postsSearch": ( keyword ) => {
    return `https://m.facebook.com/graphsearch/str/${encodeURI(
      keyword
    )}/stories-keyword/stories-feed?tsid&source=pivot&pn=5`;
  },
  "post": ( id ) => {
    return `https://www.facebook.com/${id}`;
  },
  "scrapeSharePost": {
    "group": 37,
    "strange": 22,
    "shareother": 3,
    "video": 22,
    "threater": 37,
    "shareprofile": 1,
    "youtubelink": 100
  }
};
