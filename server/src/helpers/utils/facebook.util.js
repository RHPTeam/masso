/* eslint-disable strict */
const {
    linkGetIdPost,
    linkGetPreviewScrape,
    linkUploadImage,
    linkUploadFeed,
    formDataPost,
    scrapeSharePost
  } = require( "../../configs/crawl" ),
  {
    callbackGetIdPostSuccess,
    downloadImageFail,
    getIdPostSuccess,
    handleImageSuccess,
    requestGetIdPost,
    requestgetPreviewScrapeFail,
    requestMissInfo,
    requestNewFeedFail,
    writeFileImageFail
  } = require( "../../configs/text.res" ),
  {
    converSourceUnix,
    convertUnicodeToCharacter,
    findSubString
  } = require( "./functions.util" ),
  fs = require( "fs" ),
  request = require( "request" ),
  download = require( "download" ),
  randomstring = require( "randomstring" ),
  generateObjectVariablesFacebook = (
    uid,
    content,
    images,
    location,
    color,
    scrapeLink,
    youtube
  ) => {
    const variables = {
      "client_mutation_id": "825c85ea-68e2-436e-9f7c-ed4b514fec3a",
      "actor_id": uid,
      "input": {
        "actor_id": uid,
        "client_mutation_id": "f83d7659-623a-474b-9a7b-1bf4ed66c60f",
        "source": "WWW",
        "audience": { "web_privacyx": "300645083384735" },
        "message": { "text": content, "ranges": [] },
        "with_tags_ids": [],
        "multilingual_translations": [],
        "camera_post_context": {
          "deduplication_id": "ed7e5149-a986-43db-9d02-b158174f2ab8",
          "source": "composer"
        },
        "composer_entry_time": 154,
        "composer_session_events_log": { "composition_duration": 128 },
        "direct_share_status": "NOT_SHARED",
        "sponsor_relationship": "WITH",
        "web_graphml_migration_params": {
          "is_also_posting_video_to_feed": false,
          "target_type": "feed",
          "xhpc_composerid": "rc.js_xc",
          "xhpc_context": "profile",
          "xhpc_publish_type": "FEED_INSERT"
        }
      }
    };

    // Check location post new feed on facebook (Include: Timeline, Group, Page)

    // Check multi-media
    // Youtube
    if ( youtube !== null ) {
      // eslint-disable-next-line dot-notation
      variables[ "input" ][ "attachments" ] = [
        {
          "link": {
            "share_scrape_data": JSON.stringify( {
              "share_type": scrapeSharePost.youtubelink,
              "share_params": {
                "urlInfo": {
                  "canonical": youtube.link,
                  "final": youtube.link,
                  "user": youtube.link
                },
                "favicon":
                  "https://www.youtube.com/yts/img/favicon_144-vfliLAfaB.png",
                "external_author": youtube.external_author,
                "iframe": [],
                "title": youtube.title,
                "summary": youtube.summary,
                "images_sorted_by_dom": [ youtube.thumbnail ],
                "ranked_images": {
                  "images": [ youtube.thumbnail ],
                  "ranking_model_version": 11,
                  "specified_og": true
                },
                "medium": 106,
                "url": youtube.link,
                "global_share_id": youtube.global_share_id,
                "url_scrape_id": youtube.url_scrape_id,
                "hmac": youtube.hmac
              }
            } )
          }
        }
      ];
    }

    // Check hash uid random (Why same three logging)

    // Check number random client mutation id

    return variables;
  },
  getIdPostFacebook = ( { cookie, agent, token, privacy, type, storyID } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "POST",
        "url": linkGetIdPost( findSubString( cookie, "c_user=", ";" ) ),
        "headers": {
          "Cookie": cookie,
          "User-Agent": agent,
          "Accept": "/",
          "Connection": "keep-alive"
        },
        "form": {
          "story_id": storyID,
          "__user": findSubString( cookie, "c_user=", ";" ),
          "__a": "1",
          "fb_dtsg": token,
          "data[web_graphml_migration_params][xhpc_composerid]":
            "rc.u_ps_fetchstream_3_4_1",
          "data[is_local_dev_platform_app_instance]": "false",
          "data[is_page_recommendation]": "false"
        }
      };

      // Change audience case: timeline, group, fanpage
      if ( type === "timeline" ) {
        option.form[ "data[audience][web_privacyx]" ] = privacy;
      }

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          let postID = null;

          if ( type === "timeline" ) {
            // Check don't exist privacy_fbid (test_bee)
            postID = findSubString( body, '"privacy_fbid":"', '"' );
          }
          return resolve( {
            "errors": getIdPostSuccess,
            "results": {
              "postID": postID
            }
          } );
        }
        return resolve( {
          "errors": requestGetIdPost,
          "results": null
        } );
      } );
    } );
  };

module.exports = {
  "createNewFeed": ( {
    cookie,
    agent,
    token,
    content,
    privacy,
    color,
    images,
    youtube,
    location,
    scrapeLink
  } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "POST",
        "url": linkUploadFeed,
        "headers": {
          "Cookie": cookie,
          "User-Agent": agent,
          "Accept": "/",
          "Connection": "keep-alive"
        },
        "form": {
          "variables": JSON.stringify(
            generateObjectVariablesFacebook(
              findSubString( cookie, "c_user=", ";" ),
              content,
              images,
              location,
              color,
              scrapeLink,
              youtube
            )
          ),
          "__user": findSubString( cookie, "c_user=", ";" ),
          "fb_dtsg": token,
          "__a": "1"
        }
      };

      request( option, async ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          // Check case timeline or group and fanpage
          if (
            location.timeline !== null && location.timeline !== undefined && location.timeline !== ""
          ) {
            // Timeline/Profile
            const bodyJson = JSON.parse( body.replace( "for (;;);", "" ) ).payload;

            // Check error when post timeline
            if ( bodyJson.errors !== null && bodyJson.errors !== undefined ) {
              return resolve( {
                "errors": {
                  "code": 8188,
                  "text": bodyJson.errors[ 0 ].description
                },
                "results": null
              } );
            } else if ( bodyJson.data.story_create !== null ) {
              // Get ID post from id hash preview of facebook
              const result = await getIdPostFacebook( {
                cookie,
                agent,
                token,
                privacy,
                "type": "timeline",
                "storyID": bodyJson.data.story_create.story.id
              } );

              if ( result.errors.code !== 200 ) {
                return resolve( {
                  "error": {
                    "code": result.errors.code,
                    "text": result.errors.text
                  },
                  "results": null
                } );
              }

              return resolve( {
                "error": callbackGetIdPostSuccess,
                "results": {
                  "postID": result.results.postID,
                  "type": "timeline"
                }
              } );
            } else if ( bodyJson === undefined ) {
              return resolve( {
                "errors": requestMissInfo,
                "results": null
              } );
            }
          } else if (
            location.group !== null && location.group !== undefined && location.group !== ""
          ) {
            // Group
          } else if (
            location.group !== null && location.group !== undefined && location.group !== ""
          ) {
            // Page
          }
        }
        return resolve( {
          "errors": requestNewFeedFail,
          "results": null
        } );
      } );
    } );
  },
  "getPreviewScrapeOther": ( { cookie, agent, token, scrapeLink } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "POST",
        "url": linkGetPreviewScrape(
          findSubString( cookie, "c_user=", ";" ),
          scrapeLink
        ),
        "headers": {
          "Cookie": cookie,
          "User-Agent": agent,
          "Accept": "/",
          "Connection": "keep-alive",
          "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        "form": {
          "fb_dtsg": token,
          "__user": findSubString( cookie, "c_user=", ";" ),
          "__a": "1"
        }
      };

      request( option, async ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          if ( !scrapeLink.includes( "facebook.com" ) ) {
            return resolve( {
              "errors": {
                "code": 200,
                "text": "Lấy thông tin từ link chia sẻ thành công!"
              },
              "results": {
                "link": scrapeLink,
                "title": convertUnicodeToCharacter(
                  findSubString( body, '"title":"', '"' )
                ),
                "summary": convertUnicodeToCharacter(
                  findSubString( body, '"summary":"', '"' )
                ).replace( /\\\//gi, "/" ),
                "external_author": findSubString(
                  body,
                  '"external_author":"',
                  '"'
                ).replace( /\\\//gi, "/" ),
                "thumbnail": findSubString( body, '"images":["', '"' ).replace(
                  /\\\//gi,
                  "/"
                ),
                "global_share_id": findSubString( body, '"global_share_id":', "," ),
                "url_scrape_id": findSubString( body, '"url_scrape_id":"', '"' ),
                "hmac": findSubString( body, '"hmac":"', '"' )
              }
            } );
          }
        }
        return resolve( {
          "errors": requestgetPreviewScrapeFail,
          "results": null
        } );
      } );
    } );
  },
  "getPreviewScrapeYoutube": ( { cookie, agent, token, youtube } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "POST",
        "url": linkGetPreviewScrape(
          findSubString( cookie, "c_user=", ";" ),
          youtube
        ),
        "headers": {
          "Cookie": cookie,
          "User-Agent": agent,
          "Accept": "/",
          "Connection": "keep-alive",
          "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        "form": {
          "fb_dtsg": token,
          "__user": findSubString( cookie, "c_user=", ";" ),
          "__a": "1"
        }
      };

      request( option, async ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          return resolve( {
            "errors": {
              "code": 200,
              "text": "Lấy thông tin từ youtube thành công!"
            },
            "results": {
              "link": youtube,
              "title": convertUnicodeToCharacter(
                findSubString( body, '"title":"', '"' )
              ),
              "summary": convertUnicodeToCharacter(
                findSubString( body, '"summary":"', '"' )
              ).replace( /\\\//gi, "/" ),
              "external_author": findSubString(
                body,
                '"external_author":"',
                '"'
              ).replace( /\\\//gi, "/" ),
              "thumbnail": findSubString( body, '"images":["', '"' ).replace(
                /\\\//gi,
                "/"
              ),
              "global_share_id": findSubString( body, '"global_share_id":', "," ),
              "url_scrape_id": findSubString( body, '"url_scrape_id":"', '"' ),
              "hmac": findSubString( body, '"hmac":"', '"' )
            }
          } );
        }
        return resolve( {
          "errors": requestgetPreviewScrapeFail,
          "results": null
        } );
      } );
    } );
  },
  "handleImageUpload": ( url ) => {
    return new Promise( ( resolve ) => {
      const urlFixed = converSourceUnix( url );

      download( urlFixed )
        .then( ( data ) => {
          const pathFileImage = `${__dirname}/${randomstring.generate()}.png`;

          fs.writeFileSync( pathFileImage, data, ( err ) => {
            if ( err ) {
              return resolve( {
                "error": writeFileImageFail,
                "results": null
              } );
            }
          } );
          return resolve( {
            "error": handleImageSuccess,
            "results": pathFileImage
          } );
        } )
        .catch( ( error ) => {
          if ( error.name === "RequestError" ) {
            return resolve( {
              "error": downloadImageFail,
              "results": null
            } );
          }
        } );
    } );
  },
  "uploadImage": ( { cookie, agent, token, path, av } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "POST",
        "url": linkUploadImage( token, findSubString( cookie, "c_user=", ";" ), av ),
        "headers": {
          "User-Agent": agent,
          "Cookie": cookie,
          "Accept": "/",
          "Connection": "keep-alive",
          "Content-Type": "multipart/form-data"
        },
        "formData": {
          "target_id": findSubString( cookie, "c_user=", ";" ),
          "profile_id": findSubString( cookie, "c_user=", ";" ),
          "farr": fs.createReadStream( path ),
          "source": formDataPost.source,
          "upload_id": formDataPost.upload_id,
          "waterfallxampp": formDataPost.waterfallxapp
        }
      };

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          return resolve( findSubString( body, '"photoID":"', '"' ) );
        }
        return resolve( {
          "error": {
            "code": 404,
            "text": "Link crawl đã bị thay đổi hoặc thất bại trong khi request!"
          },
          "results": []
        } );
      } );
    } );
  }
};
