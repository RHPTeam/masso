/* eslint-disable no-shadow */
/* eslint-disable strict */
const cheerio = require( "cheerio" ),
  fs = require( "fs" ),
  request = require( "request" ),
  { post, mpost } = require( "../../configs/crawl" ),
  { getDtsgFB } = require( "../../helpers/utils/dtsgfb.util" ),
  { findSubString } = require( "../../helpers/utils/functions.util" ),
  getPost = ( { cookie, agent, id, token } ) => {
    return new Promise( ( resolve ) => {
      let option = {
        "method": "GET",
        "url": post( id ),
        "headers": {
          "User-Agent": agent,
          "Cookie": cookie,
          "Accept": "/"
        },
        "form": {
          "__user": findSubString( cookie, "c_user=", ";" ),
          "fb_dtsg": token
        }
      };

      console.log( option );

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          let $ = cheerio.load( body, { "decodeEntities": false } ), pageCase = $( "div.permalinkPost" ).find( "div.userContentWrapper000" ), images = [];

          if ( pageCase === null ) {
            const post = findSubString( $( "div.hidden_elem" ).find( "code#u_0_1c" ).html(), "<!--", "-->" );
          } else if ( pageCase !== null ) {
            // Get text in post
            const post = $( "div.permalinkPost" ).find( "div.userContentWrapper" ).find( "div.userContent" ).html();

            // Get images in post ( Note: if post have one images, system will filter undefined to get images link full ( current version has only get max which is 5 images )
            $( "div.permalinkPost" ).find( "div.userContentWrapper" ).find( "a[rel*='theater']" ).each( function () {
              images.push( $( this ).attr( "data-ploi" ) );
            } );
            // Get like and share by m.facebook.com ( Note: When use browser facebook.com which must get ajax link )
            option = {
              "method": "GET",
              "url": mpost( id ),
              "headers": {
                "User-Agent": agent,
                "Cookie": cookie,
                "Accept": "/"
              },
              "form": {
                "__user": findSubString( cookie, "c_user=", ";" ),
                "fb_dtsg": token
              }
            };

            request( option, ( error, response, body ) => {
              $ = cheerio.load( body );
              fs.writeFile( "temp.html", body, ( error ) => {
                if ( error ) {
                  console.log( error );
                }
                console.log( "Successfully Written to File." );
              } );
            } );

            // fs.writeFile( "temp.html", $( "div.permalinkPost" ).find( "div.userContentWrapper" ).find( "a[rel*='theater']" ), ( error ) => {
            //   if ( error ) {
            //     console.log( error );
            //   }
            //   console.log( "Successfully Written to File." );
            // } );
            return resolve( {
              "error": {
                "code": 200,
                "text": null
              },
              "results": {
                "content": post,
                "text": $( "div.permalinkPost" ).find( "div.userContentWrapper" ).find( "div.userContent" ).text(),
                "images": images.filter( ( image ) => image !== undefined )
              }
            } );
          }
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
  "getPost": async ( { cookie, agent, id } ) => {
    const token = await getDtsgFB( { cookie, agent } );

    if ( token === false ) {
      return {
        "error": {
          "code": 405,
          "text": "Cookie hết hạn, thử lại bằng cách cập nhật cookie mới!"
        },
        "results": []
      };
    }
    return await getPost( { cookie, agent, id, token } );
  }
};
