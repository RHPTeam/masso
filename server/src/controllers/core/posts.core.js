/* eslint-disable strict */
const cheerio = require( "cheerio" ),
  fs = require( "fs" ),
  jsdom = require( "jsdom" ),
  { JSDOM } = jsdom,
  request = require( "request" ),
  { post } = require( "../../configs/crawl" ),
  { getDtsgFB } = require( "../../helpers/utils/dtsgfb.util" ),
  { findSubString } = require( "../../helpers/utils/functions.util" ),
  getPost = ( { cookie, agent, id, token } ) => {
    return new Promise( ( resolve ) => {
      const option = {
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

            fs.writeFile( "temp.html", post, ( error ) => {
              if ( error ) {
                console.log( error );
              }
              console.log( "Successfully Written to File." );
            } );
          } else if ( pageCase !== null ) {
            // Get text in post
            const post = $( "div.permalinkPost" ).find( "div.userContentWrapper" ).find( "div.userContent" ).html();

            // Get images in post ( Note: if post have one images, system will filter undefined to get images link full
            $( "div.permalinkPost" ).find( "div.userContentWrapper" ).find( "a[rel*='theater']" ).each( function () {
              images.push( $( this ).attr( "data-ploi" ) );
            } );



            console.log( images.filter( ( image ) => image !== undefined ) );

            // fs.writeFile( "temp.html", $( "div.permalinkPost" ).find( "div.userContentWrapper" ).find( "a[rel*='theater']" ), ( error ) => {
            //   if ( error ) {
            //     console.log( error );
            //   }
            //   console.log( "Successfully Written to File." );
            // } );
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
