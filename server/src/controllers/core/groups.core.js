
/* eslint-disable prefer-arrow-callback */
/* eslint-disable strict */
const request = require( "request" ),
  { linkgraphfacebook } = require( "../../configs/crawl" ),
  { getDtsgFB } = require( "../../helpers/utils/facebook/dtsgfb" ),
  { findSubString } = require( "../../helpers/utils/functions/string" ),
  getGroupIsAdmin = async ( { cookie, agent, token } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "POST",
        "url": linkgraphfacebook,
        "headers": {
          "User-Agent": agent,
          "Cookie": cookie
        },
        "form": {
          "__a": "1",
          "__user": findSubString( cookie, "c_user=", ";" ),
          "av": findSubString( cookie, "c_user=", ";" ),
          "fb_dtsg": token,
          "variables": JSON.stringify( { "count": 10000, "isAdminGroups": true } ),
          "doc_id": 2708483759193256
        }
      };

      request( option, async function( err, res, body ) {
        if ( !err && res.statusCode === 200 ) {
          // Check conditional url
          let bodyJson = JSON.parse( body ),
            groupListNode = bodyJson.data.viewer.account_user.groups.edges;

          groupListNode = await Promise.all( groupListNode.map( ( node ) => {
            return {
              "groupId": node.node.id,
              "name": node.node.name,
              "profile_picture": node.node.profile_picture.uri,
              "isAdmin": true
            };
          } ) );

          resolve( {
            "error": {
              "code": 200,
              "text": null
            },
            "results": groupListNode
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
  getYourGroup = async ( { cookie, agent, token } ) => {
    return new Promise( ( resolve ) => {
      const option = {
        "method": "POST",
        "url": linkgraphfacebook,
        "headers": {
          "User-Agent": agent,
          "Cookie": cookie
        },
        "form": {
          "__a": "1",
          "__user": findSubString( cookie, "c_user=", ";" ),
          "av": findSubString( cookie, "c_user=", ";" ),
          "fb_dtsg": token,
          "variables": JSON.stringify( { "count": 10000, "isAdminGroups": false } ),
          "doc_id": 2708483759193256
        }
      };

      request( option, async function( err, res, body ) {
        if ( !err && res.statusCode === 200 ) {
          // Check conditional url
          let bodyJson = JSON.parse( body ),
            groupListNode = bodyJson.data.viewer.account_user.groups.edges;

          groupListNode = await Promise.all( groupListNode.map( ( node ) => {
            return {
              "groupId": node.node.id,
              "name": node.node.name,
              "profile_picture": node.node.profile_picture.uri,
              "isAdmin": false
            };
          } ) );

          resolve( {
            "error": {
              "code": 200,
              "text": null
            },
            "results": groupListNode
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
  // eslint-disable-next-line one-var
  const groupListIsAdmin = await getGroupIsAdmin( { cookie, agent, token } ),
    yourGroupList = await getYourGroup( { cookie, agent, token } );

  return {
    "error": {
      "code": groupListIsAdmin.error.code,
      "text": groupListIsAdmin.error.text
    },
    "results": groupListIsAdmin.results.concat( yourGroupList.results )
  };
};
