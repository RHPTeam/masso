const { linkGetActionTypeLoader, linkGetItemActionTypeLoader, linkGetAllFriends, linkSearchPlaces } = require( "../../configs/crawl" );
const { getDtsgAg } = require( "../../helpers/utils/dtsgfb.util" );
const { findSubString } = require( "../../helpers/utils/functions.util" );

const request = require( "request" );

module.exports = {
  "getAllActionTypeLoader": ( { cookie, agent } ) => {
    return new Promise( async ( resolve ) => {
      const token = await getDtsgAg( { cookie, agent } ), option = {
        "method": "GET",
        "url": linkGetActionTypeLoader( token, findSubString( cookie, "c_user=", ";" ) ),
        "headers": {
          "Cookie": cookie,
          "User-Agent": agent
        }
      };

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          const bodyJson = JSON.parse( body.replace( "for (;;);", "" ) );

          return resolve( {
            "error": {
              "code": 200,
              "text": null
            },
            "results": bodyJson.payload.entries
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
  },
  "getAllItemActionTypeLoader": ( { cookie, agent, item } ) => {
    return new Promise( async ( resolve ) => {
      const token = await getDtsgAg( { cookie, agent } ), option = {
        "method": "GET",
        "url": linkGetItemActionTypeLoader( token, findSubString( cookie, "c_user=", ";" ), item ),
        "headers": {
          "Cookie": cookie,
          "User-Agent": agent
        }
      };

      console.log( option );

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          const bodyJson = JSON.parse( body.replace( "for (;;);", "" ) );

          return resolve( {
            "error": {
              "code": 200,
              "text": null
            },
            "results": bodyJson.payload.entries
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
  },
  "getAllFriends": ( { cookie, agent } ) => {
    return new Promise( async ( resolve ) => {
      const token = await getDtsgAg( { cookie, agent } ), option = {
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

          return resolve( {
            "error": {
              "code": 200,
              "text": null
            },
            "results": bodyJson.payload.entries
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
  },
  "searchPlaces": ( { cookie, agent, keyword, number } ) => {
    return new Promise( async ( resolve ) => {
      const token = await getDtsgAg( { cookie, agent } ), option = {
        "method": "GET",
        "url": linkSearchPlaces( findSubString( cookie, "c_user=", ";" ), token, keyword, number ),
        "headers": {
          "Cookie": cookie,
          "User-Agent": agent
        }
      };

      request( option, ( err, res, body ) => {
        if ( !err && res.statusCode === 200 ) {
          const bodyJson = JSON.parse( body.replace( "for (;;);", "" ) );

          return resolve( {
            "error": {
              "code": 200,
              "text": null
            },
            "results": bodyJson.payload.entries
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
  }
};
