/* eslint-disable strict */
const cheerio = require( "cheerio" ),
  request = require( "request" ),
  { postsSearch } = require( "../../configs/crawl" ),
  { getDtsgFB } = require( "../../helpers/utils/dtsgfb.util" ),
  { findSubString } = require( "../../helpers/utils/functions.util" ),
  getAllPostBySearch = ( { cookie, agent, url, token } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "POST",
        "url": url,
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

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          let $ = cheerio.load( body ), results = [], linkcallback = $( "div#see_more_pager" ).find( "a" ).attr( "href" );

          $( "div#BrowseResultsContainer" )
            .find( "div.bt.bu" )
            .each( function() {
              // Check id two type: Profile and Group
              const linkID = $( this ).find( "span[id*='like_']" ).attr( "id" );

              if ( linkID === undefined ) {
                return resolve( {
                  "error": {
                    "code": 404,
                    "text": "Class chứa link id bài viết tìm kiếm bị hỏng hoặc đã bị thay thế!"
                  },
                  "results": []
                } );
              }

              results.push( {
                "postID": findSubString( $( this ).find( "span[id*='like_']" ).attr( "id" ), "like_" )
              } );

              return resolve( {
                "postscurrent": results,
                "linkcallback": linkcallback
              } );

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
  "searchPost": async ( { keyword, number, cookie, agent } ) => {
    let url = postsSearch( keyword ),
      token = await getDtsgFB( { cookie, agent } ),
      results = [];

    if ( token === false ) {
      return {
        "error": {
          "code": 405,
          "text": "Cookie hết hạn, thử lại bằng cách cập nhật cookie mới!"
        },
        "results": []
      };
    }

    for ( let i = 1; i <= Math.ceil( number / 12 ); i++ ) {
      const data = await getAllPostBySearch( { cookie, agent, url, token } );

      url = data.linkcallback;
      if ( i === Math.ceil( number / 12 ) ) {
        let range = number - 12 * ( i - 1 );

        if ( number < 12 ) {
          range = number;
        }
        if ( range > 0 ) {
          results = results.concat( data.postscurrent.slice( 0, range ) );
        } else {
          results = results.concat( data.postscurrent );
        }
      } else {
        results = results.concat( data.postscurrent );
      }
    }
    return results;
  }
};
