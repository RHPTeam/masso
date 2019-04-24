/* eslint-disable prefer-arrow-callback */
/* eslint-disable strict */
const cheerio = require( "cheerio" ),
  request = require( "request" ),
  { pages } = require( "../../configs/crawl" ),
  findData = ( str, start, end ) => {
    return str.substring(
      str.indexOf( start ) + 2,
      str.indexOf( end, str.indexOf( start ) ) + 1
    );
  },
  handle = ( { cookie, agent } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "GET",
        "url": pages,
        "headers": {
          "Cookie": cookie,
          "User-Agent": agent
        }
      };

      request( option, function( _err, _res, body ) {
        const $ = cheerio.load( body );

        if ( body.includes( "https://www.facebook.com/login" ) ) {
          resolve( {
            "error": {
              "code": 405,
              "text": "Cookie hết hạn, thử lại bằng cách cập nhật cookie mới!"
            },
            "results": []
          } );
        } else {
          const results = [],
            dataFilter = $(
              "script:contains('BookmarkSeeAllEntsSectionController')"
            ).contents()[ "0" ].data,
            data = findData( dataFilter, ",[{id:", "}]]]]" ),
            findBy = ( str, index ) => {
              let start = str.indexOf( 'id:"', index );

              if ( start > 0 ) {
                let end = str.indexOf( ",count:", start );

                results.push( {
                  "id": str
                    .slice( start, end )
                    .split( "," )[ 0 ]
                    .replace( 'id:"', "" )
                    .replace( '"', "" ),
                  "name": str
                    .slice( start, end )
                    .split( "," )[ 1 ]
                    .replace( 'name:"', "" )
                    .replace( '"', "" )
                } );
                return findBy( str, end );
              }
              return results;
            };

          resolve( { "results": findBy( data, 0 ) } );
        }
      } );
    } );
  };

module.exports = async ( { cookie, agent } ) => {
  return await handle( { cookie, agent } );
};
