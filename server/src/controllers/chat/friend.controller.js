/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
/* eslint-disable default-case */
/**
 * Controller facebook for project
 * author: hocpv
 * date up: 09/03/2019
 * date to: ___
 * team: BE-RHP
 */
const login = require( "facebook-chat-api" );
const Account = require( "../../models/Account.model" );
const Vocate = require( "../../models/chat/Vocate.model" );
const Facebook = require( "../../models/Facebook.model" );

const convertCookieToObject = require( "../../helpers/utils/facebook/cookie" );
const cookieFacebook = require( "../../configs/cookieFacebook" );
const jsonResponse = require( "../../configs/response" );
const {
  removeObjectDuplicates
} = require( "../../helpers/utils/functions/array" );
const { agent } = require( "../../configs/crawl" );
const { getAllFriends } = require( "../../controllers/core/facebook.core" );
const { findSubString } = require( "../../helpers/utils/functions/string" ),
  // Setup login facebook function
  loginFacebook = ( cookie ) => {
    return new Promise( ( resolve, reject ) => {
      login( { "appState": cookie }, ( err, api ) => {
        if ( err ) {
          reject( err );
        } else {
          resolve( api );
        }
      } );
    } );
  };
const getFriendsFB = async ( api ) => {
  return new Promise( ( resolve ) => {
    // eslint-disable-next-line handle-callback-err
    api.getFriendsList( ( err, dataRes ) => {
      resolve( dataRes );
    } );
  } );
};

module.exports = {
  /**
   * Get All data from Friend collection
   * @param req
   * @param res
   * Note: Api define admin and members, if u're admin then u can get all data, on the contrary u just can get data of you created before
   *
   */
  "index": async ( req, res ) => {
    let dataResponse = [],
      page,
      dataRes;
    const role = findSubString( req.headers.authorization, "cfr=", ";" ),
      accountResult = await Account.findOne( { "_id": req.uid } );

    if ( role === "Member" ) {
      Promise.all(
        accountResult._accountfb.map( async ( facebook ) => {
          let findFacebook = await Facebook.findOne( { "_id": facebook } ),
            friendsList = await getAllFriends( {
              "cookie": findFacebook.cookie,
              agent
            } );

          dataResponse = dataResponse.concat( friendsList.results, dataResponse );

          return dataResponse;
        } )
      ).then( ( data ) => {
        dataResponse = [];
        // Concat element children of array
        // eslint-disable-next-line prefer-spread
        const dataFriend = [].concat.apply( [], data );

        Promise.all(
          removeObjectDuplicates( dataFriend, "uid" ).map( async ( friend ) => {
            let vocate = await Vocate.find( {
              "_account": req.uid,
              "_friends": friend.uid.toString()
            } );

            vocate.length === 0 ? ( friend.vocate = "Chưa thiết lập" ) : ( friend.vocate = vocate[ 0 ].name );
            friend.photo = `https://graph.facebook.com/${
              friend.uid
            }/picture?type=large`;
            return friend;
          } )
        ).then( async ( item ) => {
          if ( req.query._size && req.query._page ) {
            dataRes = item.slice(
              ( Number( req.query._page ) - 1 ) * Number( req.query._size ),
              Number( req.query._size ) * Number( req.query._page )
            );
          } else if ( req.query._size ) {
            dataRes = item.slice( 0, Number( req.query._size ) );
          }

          if ( req.query._size ) {
            if ( item.length % req.query._size === 0 ) {
              page = Math.floor( item.length / req.query._size );
            } else {
              page = Math.floor( item.length / req.query._size ) + 1;
            }

            return res
              .status( 200 )
              .json( jsonResponse( "success", { "results": dataRes, "page": page } ) );
          }

          res.status( 200 ).json( jsonResponse( "success", item ) );
        } );
      } );
    }
  },
  /**
   * Create friends with api facebook
   * @param req
   * @param res
   *
   */
  "indexApi": async ( req, res ) => {
    let api = null,
      page,
      dataRes;
    const userId = req.uid,
      accountResult = await Account.findOne( { "_id": userId } );

    if ( !accountResult ) {
      return res
        .status( 403 )
        .json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    const listFriend = await Promise.all(
      accountResult._accountfb.map( async ( facebook ) => {
        let findFacebook = await Facebook.findOne( { "_id": facebook } ),
          // Convert cookie to object which pass to facebook
          cookieObject = convertCookieToObject( findFacebook.cookie )[ 0 ],
          cookie = cookieFacebook(
            cookieObject.fr,
            cookieObject.datr,
            cookieObject.c_user,
            cookieObject.xs
          ),
          dataFriend;

        api = await loginFacebook( cookie );
        dataFriend = await getFriendsFB( api );
        return dataFriend;
      } )
    );

    // eslint-disable-next-line prefer-spread
    const dataFriend = [].concat.apply( [], listFriend );

    Promise.all(
      removeObjectDuplicates( dataFriend, "userID" ).map( async ( friend ) => {
        let vocate = await Vocate.find( {
            "_account": req.uid,
            "_friends": friend.userID.toString()
          } ),
          listFriendInfo = {
            "alternateName": friend.alternateName,
            "firstName": friend.firstName,
            "gender": friend.gender,
            "userID": friend.userID,
            "fullName": friend.fullName,
            "profilePicture": `http://graph.facebook.com/${
              friend.userID
            }/picture?type=large`,
            "profileUrl": friend.profileUrl,
            "vanity": friend.vanity
          };

        vocate.length === 0 ? ( listFriendInfo.vocate = "Chưa thiết lập" ) : ( listFriendInfo.vocate = vocate[ 0 ].name );

        return listFriendInfo;
      } )
    ).then( async ( item ) => {
      if ( req.query._size && req.query._page ) {
        dataRes = item.slice(
          ( Number( req.query._page ) - 1 ) * Number( req.query._size ),
          Number( req.query._size ) * Number( req.query._page )
        );
      } else if ( req.query._size ) {
        dataRes = item.slice( 0, Number( req.query._size ) );
      }

      if ( req.query._size ) {
        if ( item.length % req.query._size === 0 ) {
          page = Math.floor( item.length / req.query._size );
        } else {
          page = Math.floor( item.length / req.query._size ) + 1;
        }

        return res
          .status( 200 )
          .json( jsonResponse( "success", { "results": dataRes, "page": page } ) );
      }

      res.status( 200 ).json( jsonResponse( "success", item ) );
    } );
  }
};
