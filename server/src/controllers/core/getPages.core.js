const request = require( "request" );
const cheerio = require( "cheerio" ),
  { findSubString } = require( "../../helpers/utils/functions/string" ),
  { getDtsgFB } = require( "../../helpers/utils/facebook/dtsgfb" ),
  { linkPages } = require( "../../configs/crawl" );

let getPage = ( { cookie, agent } ) => {
  return new Promise( ( resolve ) => {
    let option = {
      "method": "get",
      "url": linkPages,
      "headers": {
        "User-Agent": agent,
        "Cookie": cookie
      }

    };

    request( option, function ( err, res, body ) {

      let $ = cheerio.load( body ),
        result = [];

      if ( body.includes( "https://www.facebook.com/login" ) ) {
        resolve( { "error": "400", "result": result } );
      } else {
        let text = findSubString( $( "script:contains('BookmarkSeeAllEntsSectionController')" ).contents()[ "0" ].data, "BookmarkSeeAllEntsSectionController", "]]," ),
          formatText = findSubString( text, "},[", "]]" );

        eval("var pageRes = [" + formatText + "]" );

        resolve( { "error": null, "results": pageRes } );
      }
    } );
  } );
};

module.exports = async ( { cookie, agent } ) => {
  // Get token which can next do anymonre
  const token = await getDtsgFB( { cookie, agent } );

  // Check conditional request
  if ( token === false ) {
    return {
      "error": {
        "code": 405,
        "text": "Cookie hết hạn, thử lại bằng cách cập nhật cookie mới!"
      },
      "results": []
    };
  }
  return await getPage( { cookie, agent } );
};
