/* eslint-disable no-shadow */
/* eslint-disable strict */
const cheerio = require( "cheerio" ),
  fs = require( "fs" ),
  request = require( "request" ),
  { post, mpost, scrapeSharePost } = require( "../../configs/crawl" ),
  { getDtsgFB, getFullDtsgFB } = require( "../../helpers/utils/dtsgfb.util" ),
  {
    createNewFeed,
    getPreviewScrape,
    handleImageUpload,
    uploadImage
  } = require( "../../helpers/utils/facebook.util" ),
  { findSubString } = require( "../../helpers/utils/functions.util" ),
  getPost = ( { cookie, agent, url, id } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "GET",
        "url": url,
        "headers": {
          "User-Agent": agent,
          "Cookie": cookie
        }
      };

      /**
       * When id of post appear effect background text. Handle dupplicate text.
       * When id of post is new member of group. Handle get like
       */

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          let $ = cheerio.load( body, { "decodeEntities": false } ),
            pageCase = $( "div.permalinkPost" ).find( "div.userContentWrapper" ),
            images = [];

          if ( url === post( id ) ) {
            // Check two case: profile, fanpage
            if ( pageCase.length > 0 ) {
              // Get images in post ( Note: if post have one images, system will filter undefined to get images link full ( current version has only get max which is 5 images )
              $( "div.permalinkPost" )
                .find( "div.userContentWrapper" )
                .find( "a[rel*='theater']" )
                .each( function() {
                  images.push( $( this ).attr( "data-ploi" ) );
                } );
              return resolve( {
                "results": {
                  "content": $( "div.permalinkPost" )
                    .find( "div.userContentWrapper" )
                    .find( "div.userContent" )
                    .html(),
                  "text": $( "div.permalinkPost" )
                    .find( "div.userContentWrapper" )
                    .find( "div.userContent" )
                    .text(),
                  "images": images.filter( ( image ) => image !== undefined )
                },
                "next": true
              } );
            }
            // Check two case: profile
            $( "div.hidden_elem" )
              .find( "code" )
              .each( function() {
                let tempDOM = $( this ).html(),
                  tempText = findSubString( tempDOM, "<!--", "-->" );

                if ( tempText.includes( 'role="feed"' ) ) {
                  $ = cheerio.load( tempText, { "decodeEntities": false } );
                  $( "div" )
                    .find( "div.userContentWrapper" )
                    .find( "a[rel*='theater']" )
                    .each( function() {
                      images.push( $( this ).attr( "data-ploi" ) );
                    } );
                }
              } );
            return resolve( {
              "results": {
                "content": $( "div" )
                  .find( "div.userContent" )
                  .html(),
                "text": $( "div" )
                  .find( "div.userContent" )
                  .text(),
                "images": images.filter( ( image ) => image !== undefined )
              },
              "next": true
            } );
          }
          // Get like and share by m.facebook.com ( Note: When use browser facebook.com which must get ajax link )
          // Check if DOM change it
          $( "div.hidden_elem" )
            .find( "code" )
            .each( function() {
              let tempDOM = $( this ).html(),
                tempText = findSubString( tempDOM, "<!--", "-->" );

              if ( tempText.includes( 'data-sigil="m-mentions-expand"' ) ) {
                $ = cheerio.load( tempText, { "decodeEntities": false } );
              }
            } );

          return resolve( {
            "results": {
              "like": parseInt(
                $( "div" )
                  .find( "div[id*='sentence_']" )
                  .find( "div[aria-label]" )
                  .text()
              ),
              "share": parseInt(
                $( "div" )
                  .find( "span[data-sigil='feed-ufi-sharers']" )
                  .text()
                  .replace( /\D+/g, "" )
              )
            },
            "next": false
          } );
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
  };

module.exports = {
  "createPost": async ( {
    cookie,
    agent,
    content,
    images,
    color,
    location,
    scrapeLink,
    youtube
  } ) => {
    let tokenFull = await getFullDtsgFB( { cookie, agent } ),
      token = tokenFull.value,
      pivacy = tokenFull.privacy,
      youtubeLink = null,
      av = null,
      listPhotoID = [],
      scrapeLinkObject = {};

    // Check if user upload image or paste link image
    if ( images.length > 0 ) {
      // Case 01: When user post images to facebook
      const sources = images.map( async ( image ) => {
        // Check source image extentsion
        const path = await handleImageUpload( image );

        // Check download fail
        if ( path.error.code === 1023 ) {
          return;
        }
        // Check write file issues
        if ( path.error.code === 1024 ) {
          return;
        }

        // Assign variable for "av" author vendor
        if (
          ( location.timeline !== null && location.timeline !== undefined && location.timeline !== "" ) || ( location.group !== null && location.group !== undefined && location.group !== "" )
        ) {
          av = findSubString( cookie, "c_user=", ";" );
        } else if (
          location.page !== null && location.page !== undefined && location.page !== ""
        ) {
          av = location.page.id;
        }

        // eslint-disable-next-line one-var
        const photoID = await uploadImage( {
          cookie,
          agent,
          token,
          "path": path.results,
          av
        } );

        await fs.unlinkSync( path.results );
        return photoID;
      } );

      listPhotoID = await Promise.all( sources );
    } else if ( scrapeLink.includes( "facebook.com" ) ) {
      // Check any case if user paste link post facebook
      if (
        scrapeLink.includes( "/permalink/" ) && scrapeLink.includes( "/groups" )
      ) {
        // Check case link scrape share of group ( share_type = 37 )
        scrapeLinkObject.type = scrapeSharePost.group;
        scrapeLinkObject.postId = findSubString( scrapeLink, "/permalink/" )
          .trim()
          .replace( "/", "" );
      } else if ( scrapeLink.includes( "/posts/" ) ) {
        // Check case link scrape access strange (profile, fanpage) - ( share_type = 22 )
        scrapeLinkObject.type = scrapeSharePost.strange;
        scrapeLinkObject.postId = findSubString( scrapeLink, "/posts/" )
          .trim()
          .replace( "/", "" );
      } else if ( scrapeLink.includes( "story_fbid=" ) ) {
        // Check case link scrape when post share from other post
        scrapeLinkObject.type = scrapeSharePost.shareother;
        scrapeLinkObject.postId = findSubString( scrapeLink, "story_fbid=", "&" );
      } else if ( scrapeLink.includes( "fbid=" ) ) {
        // Check case link scrape access threater photo slide
        scrapeLinkObject.type = scrapeSharePost.threater;
        scrapeLinkObject.postId = findSubString( scrapeLink, "fbid=" )
          .trim()
          .replace( "/", "" );
      } else if ( scrapeLink.includes( "/videos/" ) ) {
        // Check case link scrape access video post
        scrapeLinkObject.type = scrapeSharePost.video;
        scrapeLinkObject.postId = findSubString( scrapeLink, "/videos/" )
          .trim()
          .replace( "/", "" );
      } else if ( scrapeLink.includes( "profile.php?id=" ) ) {
        // Check case link scrape share profile other
        scrapeLinkObject.type = scrapeSharePost.shareprofile;
        scrapeLinkObject.postId = findSubString( scrapeLink, "id=" )
          .trim()
          .replace( "/", "" );
      }
    } else if ( youtube !== null && youtube !== undefined && youtube !== "" ) {
      // Check any case if user paste link youtube
      const youtubeFullThumbnailLink = youtube.replace(
          "youtube.com",
          "youtubefb.com"
        ),
        resultPreviewScrape = await getPreviewScrape( {
          cookie,
          agent,
          token,
          "youtube": youtubeFullThumbnailLink
        } );

      youtubeLink = resultPreviewScrape.results;
    }

    // Upload post to facebook
    const result = await createNewFeed( {
      cookie,
      agent,
      token,
      content,
      "privacy": pivacy,
      color,
      "images": listPhotoID,
      "youtube": youtubeLink,
      location,
      "link": scrapeLink
    } );
    // Check error if upload post errors

    return result;
  },
  "getPost": async ( { cookie, agent, id } ) => {
    let token = await getDtsgFB( { cookie, agent } ),
      results = [],
      url = post( id ),
      getInfoPost = async ( { cookie, agent } ) => {
        const data = await getPost( { cookie, agent, url, id } );

        results = results.concat( data.results );
        if ( data.next === true ) {
          url = mpost( id );
          return await getInfoPost( { cookie, agent } );
        }
        return {
          "error": {
            "code": 200,
            "text": null
          },
          "data": {
            "id": id,
            "content": results[ 0 ].content,
            "text": results[ 0 ].text,
            "images": results[ 0 ].images,
            "like": results[ 1 ].like,
            "share": results[ 1 ].share
          }
        };
      };

    if ( token === false ) {
      return {
        "error": {
          "code": 405,
          "text": "Cookie hết hạn, thử lại bằng cách cập nhật cookie mới!"
        },
        "results": []
      };
    }
    return await getInfoPost( { cookie, agent } );
  }
};
