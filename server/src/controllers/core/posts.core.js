const path = require( "path" ),
  cheerio = require( "cheerio" ),
  puppeteer = require( "puppeteer" ),
  fs = require( "fs" ),
  request = require( "request" ),
  Facebook = require( "../../models/Facebook.model" ),
  { post, mpost } = require( "../../configs/crawl" ),
  { getDtsgFB, getFullDtsgFB } = require( "../../helpers/utils/facebook/dtsgfb" ),
  {
    createNewFeed,
    getPreviewScrape,
    handleImageUpload,
    uploadImage
  } = require( "../../helpers/utils/facebook/facebook" ),
  {
    convertCookieFacebook,
    findSubString
  } = require( "../../helpers/utils/functions/string" ),
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
       * When id of post appear effect background text. Handle duplicate text.
       * When id of post is new member of item. Handle get like
       */

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          let $ = cheerio.load( body, { "decodeEntities": false } ),
            pageCase = $( "div.permalinkPost" ).find( "div.userContentWrapper" ),
            images = [];

          if ( url === post( id ) ) {
            // Check two case: profile, page
            if ( pageCase.length > 0 ) {
              // Get images in post ( Note: if post have one images, system will navigation undefined to get images link full ( current version has only get max which is 5 images )
              $( "div.permalinkPost" )
                .find( "div.userContentWrapper" )
                .find( "a[rel*='theater']" )
                .each( function() {
                  images.push( $( this ).attr( "data-ploi" ) );
                } );
              resolve( {
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
            resolve( {
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

          resolve( {
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
        resolve( {
          "error": {
            "code": 404,
            "text": "Link crawl đã bị thay đổi hoặc thất bại trong khi request!"
          },
          "results": []
        } );
      } );
    } );
  },
  download = require( "image-downloader" ),
  downloadIMG = async ( url ) => {
    let pathAbsolute = path.resolve( __dirname );

    // remove root path project
    if ( pathAbsolute.includes( "src" ) ) {
      pathAbsolute = pathAbsolute.substring(
        0,
        pathAbsolute.indexOf( "src" )
      );
    }

    const options = {
      "url": url,
      "dest": pathAbsolute.includes( "/" ) ? `${pathAbsolute}uploads/temp` : `${pathAbsolute}uploads\\temp`
    };

    try {
      const { filename } = await download.image( options );

      return {
        "error": {
          "code": 200,
          "text": "Tải ảnh thành công. Vui lòng kiểm tra..."
        },
        "results": filename
      };
    } catch ( e ) {
      console.error( e );
      return {
        "error": {
          "code": 404,
          "text": "Tải ảnh thất bại. Vui lòng kiểm tra..."
        },
        "results": null
      };
    }
  };

module.exports = {
  "createPost": async ( { cookie, agent, feed } ) => {
    const tokenFull = await getFullDtsgFB( { cookie, agent } ),
      token = tokenFull.value,
      privacy = tokenFull.privacy,
      feedObject = {};

    // Check catch if cookie logged out
    if ( tokenFull === false ) {
      return {
        "error": {
          "code": 1037,
          "text":
            "Tài khoản của bạn đã bị đăng xuất, vui lòng cung cấp lại mã kích hoạt để tiêp tục!"
        },
        "results": null
      };
    }

    // Check if user upload image or paste link image
    if ( feed.photos ) {
      // Case 01: When user post images to facebook
      const sources = feed.photos.map( async ( image ) => {
        // Assign variables when handle link photos
        let photoID = null;

        // Check source image extension
        // eslint-disable-next-line no-shadow
        const path = await handleImageUpload( image );

        // Check download fail
        if ( path.error.code === 1023 ) {
          return;
        }
        // Check write file issues
        if ( path.error.code === 1024 ) {
          return;
        }

        // Assign variable for "av" author vendor | 0: timeline, 1: item, 2: page
        if ( feed.location.type === 0 || feed.location.type === 1 ) {
          feedObject.privacy = findSubString( cookie, "c_user=", ";" );
        } else if ( feed.location.type === 2 ) {
          feedObject.privacy = feed.location.value;
        }

        // Get photo ID from facebook return by crawl
        photoID = await uploadImage( {
          cookie,
          agent,
          token,
          "path": path.results,
          "av": feedObject.privacy
        } );

        // Check error ( if user use image for feed now, check if facebook return error or return null array )
        if ( photoID.error && photoID.error.code === 404 ) {
          photoID = undefined;
        }

        await fs.unlinkSync( path.results );
        return photoID;
      } );

      feedObject.photos = ( await Promise.all( sources ) ).filter(
        ( source ) => source !== undefined && source !== null
      );
    }

    // Check if user want scrape / share something
    if ( feed.scrape ) {
      // Check case if user use link of youtube which system will redirect and make full thumbnail
      if ( feed.scrape.includes( "youtube.com" ) ) {
        feed.scrape = feed.scrape.replace( "youtube.com", "youtubefb.com" );
      }
      const resultPreviewScrape = await getPreviewScrape( {
        cookie,
        agent,
        token,
        "scrape": feed.scrape
      } );

      feedObject.scrape = resultPreviewScrape.results;
    }

    // Check activity
    if ( feed.activity && feed.activity.type.length > 0 ) {
      feedObject.activity = feed.activity;
    }

    // Check if user change privacy of feed
    feedObject.privacy = privacy;

    // Pass data from original object of client
    feedObject.color = feed.color;
    feedObject.content = feed.content;
    feedObject.location = feed.location;
    feedObject.place = feed.place;
    feedObject.tags = feed.tags;

    // Upload post to facebook
    return await createNewFeed( {
      cookie,
      agent,
      token,
      "feed": feedObject
    } );
  },
  "getPost": async ( { cookie, agent, id } ) => {
    let token = await getDtsgFB( { cookie, agent } ),
      results = [],
      url = post( id ),
      // eslint-disable-next-line no-shadow
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
  },
  "createNewFeed": async ( { cookie, feed } ) => {
    const browser = await puppeteer.launch( { "headless": false } );

    try {
      // Convert Cookie
      const cookieConverted = await convertCookieFacebook( cookie ),
        imagesList = ( await Promise.all(
          feed.photos.map( async ( photo ) => {
            if ( photo.match( /\s/g ) ) {
              return ( await downloadIMG( encodeURI( photo ) ) ).results;
            }
            return ( await downloadIMG( photo ) ).results;
          } )
        ) ).filter( ( photo ) => photo !== null ),

        // Open browser
        page = ( await browser.pages() )[ 0 ],
        context = browser.defaultBrowserContext();

      await context.overridePermissions( "https://www.facebook.com", [
        "notifications"
      ] );
      await page.setCookie( ...cookieConverted );
      await page.waitFor( 1000 );
      await page.goto(
        `https://www.facebook.com/${
          feed.location.type === 0 ? findSubString( cookie, "c_user=", ";" ) : feed.location.value
        }`
      );

      if ( await page.$( "form#login_form" ) !== null ) { // Check if account has cookie expired
        await browser.close();
        console.log( "🥵🥵🥵🥵 FB account expired! 🥵🥵🥵🥵" );

        await Facebook.updateOne( { "userInfo.id": findSubString( cookie, "c_user=", ";" ) }, { "status": false }, ( err ) => {
          if ( err ) {
            throw Error( "Xảy ra lỗi trong quá trình cập nhật lại tài khoản khi đã bị đăng xuất." );
          }
        } );

        return {
          "error": {
            "code": 8889,
            "text": "Tài khoản đã bị đăng xuất khỏi thiết bị. Vui lòng kết nối lại tài khoản của bạn!",
            "message": "Tài khoản đã bị đăng xuất khỏi thiết bị. Vui lòng kết nối lại tài khoản của bạn!"
          },
          "results": null
        };
      }

      await page.click( 'div[data-testid="react-composer-root"]' );
      await page.waitForSelector( 'div[data-testid="react-composer-root"]' );
      await page.waitForSelector(
        'div[data-testid="react-composer-root"] div[contenteditable="true"]'
      );
      await page.evaluate( ( content ) => {
        const el = document.createElement( "textarea" );

        el.value = content;
        el.setAttribute( "readonly", "" );
        el.style = {
          "position": "absolute",
          "left": "-9999px"
        };
        document.body.appendChild( el );
        el.select();
        document.execCommand( "copy" );
        document.body.removeChild( el );
      }, feed.content );
      await page.click( 'div[data-testid="react-composer-root"] div[contenteditable="true"]' );
      await page.keyboard.down( "Control" );
      await page.keyboard.down( "KeyV" );
      await page.click( 'div[data-testid="react-composer-root"]' );

      for ( let i = 0; i < imagesList.length; i++ ) {
        if ( feed.location.type === 0 || feed.location.type === 1 ) {
          await page.waitForSelector( 'input[data-testid="media-sprout"]' );
          const input = await page.$( 'input[data-testid="media-sprout"]' );

          await input.uploadFile( imagesList[ i ] );
        } else if ( feed.location.type === 2 ) {
          if ( i < 1 ) {
            let input;

            if ( await page.$( 'input[data-testid="media-sprout"]' ) ) {
              console.log( "Page case1: " );
              await page.click( 'input[data-testid="media-sprout"]' );
              input = await page.$( 'input[data-testid="media-sprout"]' );

            }
            if ( await page.$( 'div[data-testid="photo-video-button"]' ) ) {
              console.log( "Page case2: " );
              await page.click( 'div[data-testid="photo-video-button"]' );
              await page.waitForSelector( 'input[name="composer_photo"]' );
              await page.click( 'input[name="composer_photo"]' );
              input = await page.$( 'input[name="composer_photo"]' );
            }
            await input.uploadFile( imagesList[ i ] );
          } else {
            const input = await page.$( 'input[data-testid="media-sprout"]' );

            await input.uploadFile( imagesList[ i ] );
          }
        }
        await page.waitForSelector( "div.fbScrollableArea" );
        await page.waitForSelector(
          'div.fbScrollableAreaContent div[data-testid="media-attachment-photo"]'
        );
      }

      // Handle disabled null
      try {
        await page.waitForFunction(
          'document.querySelector(\'div[data-testid="react-composer-root"] button[data-testid="react-composer-post-button"]\').disabled === false'
        );
        await page.waitFor( 1000 );
        await page.click(
          'div[data-testid="react-composer-root"] button[data-testid="react-composer-post-button"]'
        );

        if ( feed.location.type === 1 ) { // Check case group which has admin approve post feed of you
          await page.waitFor( 1000 );
          if ( await page.$( "div.composerPostSection div.mvm.pam.uiBoxYellow" ) !== null ) {
            return {
              "error": {
                "code": 8888,
                "text": `Nhóm ${
                  feed.location.type === 0 ? findSubString( cookie, "c_user=", ";" ) : feed.location.value
                } đang ở chế độ kiểm duyệt bài viết, vui lòng kiểm tra bài viết tại mục bài viết của bạn trong nhóm.`,
                "message": `Nhóm ${
                  feed.location.type === 0 ? findSubString( cookie, "c_user=", ";" ) : feed.location.value
                } đang ở chế độ kiểm duyệt bài viết, vui lòng kiểm tra bài viết tại mục bài viết của bạn trong nhóm.`
              },
              "results": null
            };
          }
        }

        // Handle wait for post finnish
        await page.waitFor( 3000 );

        // Get ID Preview
        try {
          await page.waitForSelector( 'div[data-ft*="mf_story_key"]' );
          // eslint-disable-next-line one-var
          const previewInfo = await page.$eval(
              'div[data-ft*="mf_story_key"]',
              ( div ) => div.getAttribute( "data-ft" )
            ),
            start = '"mf_story_key":"',
            end = '"';

          await browser.close();

          return {
            "error": {
              "code": 200,
              "text": null
            },
            "results": {
              "postID": previewInfo.substring(
                previewInfo.indexOf( start ) + start.length,
                previewInfo.indexOf( end, previewInfo.indexOf( start ) + start.length )
              ),
              "type":
              // eslint-disable-next-line no-nested-ternary
                feed.location.type === 0 ? "timeline" : feed.location.type === 1 ? "group" : feed.location.type === 2 ? "page" : null
            }
          };
        } catch ( e ) {
          await browser.close();
          console.log( "❎❎❎❎ Have error get ID preview post facebook but post is posted..." );
          return {
            "error": {
              "code": 200,
              "text": null
            },
            "results": {
              "postID": feed.location.type === 0 ? findSubString( cookie, "c_user=", ";" ) : feed.location.value,
              "type":
              // eslint-disable-next-line no-nested-ternary
                feed.location.type === 0 ? "timeline" : feed.location.type === 1 ? "group" : feed.location.type === 2 ? "page" : null
            }
          };
        }
      } catch ( err ) {
        await browser.close();
        console.log( "❌❌❌❌ Error button disabled of null... Server wil try again..." );
        return {
          "error": {
            "code": 8888,
            "text": "Xảy ra lỗi khi đăng bài viết, chuột bị click ra ngoài..",
            "message": err
          },
          "results": null
        };
      }
    } catch ( error ) {
      console.log( error );
      await browser.close();
      return {
        "error": {
          "code": 8888,
          "text": "Xảy ra lỗi trong quá trình đăng bài viết.",
          "message": error
        },
        "results": null
      };
    }
  }
};
