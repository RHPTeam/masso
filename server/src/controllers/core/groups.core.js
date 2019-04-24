/* eslint-disable one-var */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable strict */
const cheerio = require( "cheerio" ),
  request = require( "request" ),
  { groups } = require( "../../configs/crawl" ),
  { findSubString } = require( "../../helpers/utils/functions.util" ),
  dtsg = ( { cookie, agent } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "GET",
        "url": groups,
        "headers": {
          "Cookie": cookie,
          "User-Agent": agent,
          "Accept": "/",
          "Connection": "keep-alive"
        }
      };

      request( option, function( err, res, body ) {
        if ( !err && res.statusCode === 200 ) {
          if ( body.includes( "https://www.facebook.com/login" ) ) {
            resolve( false );
          } else {
            resolve( findSubString( body, '"async_get_token":"', '"' ) );
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
  handle = async ( { cookie, agent, url, token } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "GET",
        "url": url,
        "headers": {
          "User-Agent": agent,
          "Cookie": cookie
        }
      };

      request( option, function( err, res, body ) {
        if ( !err && res.statusCode === 200 ) {
          // Check conditional url
          let $ = cheerio.load( body ),
            linkmore = findSubString(
              body,
              'id="group-discover-card-see-moremembership"><div><a href="',
              '"'
            ),
            linkcallback = `https://www.facebook.com${linkmore}&fb_dtsg_ag=${token.replace(
              ":",
              "%3A"
            )}&__user=${findSubString( cookie, "c_user=", ";" )}&__a=1`,
            results = [];

          if ( url === groups ) {
            // Crawl DOM Facebook return when client request by request package
            // Case 01: Get all groups which user is admin
            $( "div#GroupDiscoverCard_admin" )
              .find( 'a[data-hovercard*="/ajax/hovercard"]' )
              .each( function() {
                results.push( {
                  "groupID": findSubString(
                    $( this ).attr( "data-hovercard" ),
                    "group.php?id=",
                    "&"
                  ),
                  "name": $( this ).text()
                } );
              } );

            // Case 02: Get all groups which user is membership
            $( "div#GroupDiscoverCard_membership" )
              .find( 'a[data-hovercard*="/ajax/hovercard"]' )
              .each( function() {
                results.push( {
                  "groupID": findSubString(
                    $( this ).attr( "data-hovercard" ),
                    "group.php?id=",
                    "&"
                  ),
                  "name": $( this ).text()
                } );
              } );

            return resolve( {
              "currentgroups": results,
              "linkcallback": linkcallback.replace( /amp;/g, "" )
            } );
          }
          /* When client load the first, facebook will get height of browser client to create
              div#group-discover-card-see-moremembership. When user scroll to that div,
              facebook will auto load more groups */
          body = body.replace( "for (;;);", "" );

          if ( JSON.parse( body ).domops[ 0 ] === undefined || JSON.parse( body ).domops[ 0 ][ 3 ] === null ) {
            return resolve( {
              "currentgroups": results,
              "linkcallback": undefined
            } );
          }
          let leftdom = JSON.parse( body ).domops[ 0 ][ 3 ].__html,
            rightdom = JSON.parse( body ).domops[ 1 ][ 3 ].__html;

          $ = cheerio.load( leftdom );
          $( "li" ).each( function() {
            results.push( {
              "groupID": findSubString(
                $( this )
                  .find( 'a[data-hovercard*="hovercard"]' )
                  .attr( "data-hovercard" ),
                "group.php?id=",
                "&"
              ),
              "name": $( this )
                .find( 'a[data-hovercard*="hovercard"]' )
                .text()
            } );
          } );
          $ = cheerio.load( rightdom );
          $( "li" ).each( function() {
            results.push( {
              "groupID": findSubString(
                $( this )
                  .find( 'a[data-hovercard*="hovercard"]' )
                  .attr( "data-hovercard" ),
                "group.php?id=",
                "&"
              ),
              "name": $( this )
                .find( 'a[data-hovercard*="hovercard"]' )
                .text()
            } );
          } );

          // If user has so many groups more which facebook return again for linkcallback
          if ( JSON.parse( body ).domops[ 2 ][ 3 ] === null ) {
            return resolve( {
              "currentgroups": results,
              "linkcallback": undefined
            } );
          }
          let moredom = JSON.parse( body ).domops[ 2 ][ 3 ].__html;

          $ = cheerio.load( moredom );

          linkcallback = `https://www.facebook.com${$( "a" ).attr(
            "href"
          )}&fb_dtsg_ag=${token}&__user=${findSubString(
            cookie,
            "c_user=",
            ";"
          )}&__a=1`;

          return resolve( {
            "currentgroups": results,
            "linkcallback": linkcallback
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

module.exports = async ( { cookie, agent } ) => {
  // Get token which can next do anymonre
  let url = groups, results = [];
  const token = await dtsg( { cookie, agent } ),
    getGroups = async ( { cookie, agent, token } ) => {
      const data = await handle( { cookie, agent, url, token } );
      
      results = results.concat( data.currentgroups );
      if ( data.linkcallback !== undefined ) {
        url = data.linkcallback;
        return await getGroups( { cookie, agent, token } );
      }
      return results;
    };

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
  return await getGroups( { cookie, agent, token } );
};
