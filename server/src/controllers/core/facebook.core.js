/* eslint-disable no-shadow */
const puppeteer = require( "puppeteer" );
const {
  linkGetActionTypeLoader,
  linkGetItemActionTypeLoader,
  linkGetAllFriends,
  linkSearchPlaces
} = require( "../../configs/crawl" );
const { getDtsgAg } = require( "../../helpers/utils/facebook/dtsgfb" );
const { convertCookieFacebook, findSubString } = require( "../../helpers/utils/functions/string" );

const cheerio = require( "cheerio" ),
  request = require( "request" );

module.exports = {
  "checkLogin": ( { cookie, agent } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "GET",
        "url": "https://www.facebook.com",
        "headers": {
          "Cookie": cookie,
          "User-Agent": agent
        }
      };

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          if ( body.includes( "https://www.facebook.com/login" ) ) {
            resolve( {
              "error": {
                "code": 405,
                "text": "Cookie hết hạn, thử lại bằng cách cập nhật cookie mới!"
              },
              "results": []
            } );
          } else {
            resolve( {
              "error": {
                "code": 200,
                "text": null
              },
              "results": null
            } );
          }
        } else {
          resolve( {
            "error": {
              "code": 404,
              "text": "Link crawl đã bị thay đổi hoặc thất bại trong khi request!"
            },
            "results": []
          } );
        }
      } );
    } );
  },
  "getAllActionTypeLoader": ( { cookie, agent } ) => {
    return new Promise( async ( resolve ) => {
      const token = await getDtsgAg( { cookie, agent } ),
        option = {
          "method": "GET",
          "url": linkGetActionTypeLoader(
            token,
            findSubString( cookie, "c_user=", ";" )
          ),
          "headers": {
            "Cookie": cookie,
            "User-Agent": agent
          }
        };

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          const bodyJson = JSON.parse( body.replace( "for (;;);", "" ) );

          resolve( {
            "error": {
              "code": 200,
              "text": null
            },
            "results": bodyJson.payload.entries
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
  "getAllItemActionTypeLoader": ( { cookie, agent, item } ) => {
    return new Promise( async ( resolve ) => {
      const token = await getDtsgAg( { cookie, agent } ),
        option = {
          "method": "GET",
          "url": linkGetItemActionTypeLoader(
            token,
            findSubString( cookie, "c_user=", ";" ),
            item
          ),
          "headers": {
            "Cookie": cookie,
            "User-Agent": agent
          }
        };

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          const bodyJson = JSON.parse( body.replace( "for (;;);", "" ) );

          resolve( {
            "error": {
              "code": 200,
              "text": null
            },
            "results": bodyJson.payload.entries
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
  "getAllFriends": ( { cookie, agent } ) => {
    return new Promise( async ( resolve ) => {
      const token = await getDtsgAg( { cookie, agent } ),
        option = {
          "method": "GET",
          "url": linkGetAllFriends( token, findSubString( cookie, "c_user=", ";" ) ),
          "headers": {
            "Cookie": cookie,
            "User-Agent": agent
          }
        };

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          const bodyJson = JSON.parse( body.replace( "for (;;);", "" ) );

          resolve( {
            "error": {
              "code": 200,
              "text": null
            },
            "results": bodyJson.payload ? bodyJson.payload.entries : []
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
  "getUserInfo": ( { cookie } ) => {
    return new Promise( async ( resolve ) => {
      try {
        // Open browser
        const cookieConverted = convertCookieFacebook( cookie ),
          browser = await puppeteer.launch( { "headless": false } ),
          // Open a new tab
          page = await browser.newPage(),
          // Define turn off notification popup
          context = browser.defaultBrowserContext();

        await context.overridePermissions( "https://www.facebook.com", [
          "notifications"
        ] );

        // set viewport
        await page.setViewport( { "width": 1366, "height": 768 } );

        // Set cookie before access to facebook
        await Promise.all(
          cookieConverted.map( ( element ) => {
            page.setCookie( element );
          } )
        );

        // Go to facebook.com/:id
        await page.waitFor( 1000 );
        await page.goto(
          `https://www.facebook.com/${findSubString( cookie, "c_user=", ";" )}`
        );

        // Get info
        await page.waitForSelector( "#fb-timeline-cover-name" );
        // eslint-disable-next-line one-var
        const name = await page.title();

        await browser.close();

        resolve( {
          "error": {
            "code": 200,
            "text": null
          },
          "results": {
            "id": findSubString( cookie, "c_user=", ";" ),
            "fullName": name,
            "thumbSrc": `https://graph.facebook.com/${findSubString(
              cookie,
              "c_user=",
              ";"
            )}/picture?type=large`,
            "profileUrl": `https://www.facebook.com/${findSubString(
              cookie,
              "c_user=",
              ";"
            )}`
          }
        } );
      } catch ( error ) {
        await browser.close();

        resolve( {
          "error": {
            "code": 404,
            "text": "Xảy ra lỗi trong quá trình lấy thông tin bằng puppeteer!"
          },
          "results": error
        } );
      }
    } );
  },
  "loadFans": ( { cookie, agent } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "GET",
        "url": `https://www.facebook.com/${findSubString(
          cookie,
          "c_user=",
          ";"
        )}`,
        "headers": {
          "User-Agent": agent,
          "Cookie": cookie
        }
      };

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          // eslint-disable-next-line no-unused-vars
          const $ = cheerio.load( body );

          if ( body.includes( "https://www.facebook.com/login" ) ) {
            resolve( {
              "error": {
                "code": 405,
                "text": "Cookie hết hạn, thử lại bằng cách cập nhật cookie mới!"
              },
              "results": []
            } );
          }
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
  "searchPlaces": ( { cookie, agent, keyword, number } ) => {
    return new Promise( async ( resolve ) => {
      const token = await getDtsgAg( { cookie, agent } ),
        option = {
          "method": "GET",
          "url": linkSearchPlaces(
            findSubString( cookie, "c_user=", ";" ),
            token,
            keyword,
            number
          ),
          "headers": {
            "Cookie": cookie,
            "User-Agent": agent
          }
        };

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          const bodyJson = JSON.parse( body.replace( "for (;;);", "" ) );

          resolve( {
            "error": {
              "code": 200,
              "text": null
            },
            "results": bodyJson.payload.entries
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
  }
};
