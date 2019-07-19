/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
/**
 * Controller facebook for project
 * author: hocpv
 * date up: 09/03/2019
 * date to: 16/07/2019
 * team: BE-RHP
 */
const login = require( "facebook-chat-api" );
const Account = require( "../../models/Account.model" );
const Vocate = require( "../../models/chat/Vocate.model" );
const Facebook = require( "../../models/Facebook.model" );
const Friend = require( "../../models/chat/Friend.model" );

const convertCookieToObject = require( "../../helpers/utils/facebook/cookie" );
const cookieFacebook = require( "../../configs/cookieFacebook" );
const jsonResponse = require( "../../configs/response" );
const { removeObjectDuplicates } = require( "../../helpers/utils/functions/array" ),
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
    let page,
      dataRes;
    const findFriend = await Friend.find( { "_account": req.uid }, "-__v -_id" ).lean();

    Promise.all(
      removeObjectDuplicates( findFriend, "userID" ).map( async ( friend ) => {
        let vocate = await Vocate.find( {
          "_account": req.uid,
          "_friends": friend.userID.toString()
        } ).lean();

        vocate.length === 0 ? ( friend.vocate = "Chưa thiết lập" ) : ( friend.vocate = vocate[ 0 ].name );

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

      res.status( 304 ).json( jsonResponse( "fail", "API này không được cung cấp!" ) );
    } );
  },
  /**
   * Create friends with api facebook
   * @param req
   * @param res
   *
   */
  "create": async ( req, res ) => {
    let api = null,
      page,
      dataRes;
    const userId = req.uid,
      accountResult = await Account.findOne( { "_id": userId } ).lean(),
      findFacebook = await Facebook.find( { "_account": req.uid } ).lean();

    if ( !accountResult ) {
      return res
        .status( 403 )
        .json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    await Friend.deleteMany( { "_account": req.uid } );

    const listFriend = await Promise.all(
      findFacebook.map( async ( facebook ) => {
        // Convert cookie to object which pass to facebook
        let cookieObject = convertCookieToObject( facebook.cookie )[ 0 ],
          cookie = cookieFacebook(
            cookieObject.fr,
            cookieObject.datr,
            cookieObject.c_user,
            cookieObject.xs
          ),
          dataFriend;

        api = await loginFacebook( cookie );
        dataFriend = await getFriendsFB( api );
        dataRes = await Promise.all(
          dataFriend.map( async ( friend ) => {
            let listFriendInfo = {
              "alternateName": friend.alternateName,
              "firstName": friend.firstName,
              "gender": friend.gender,
              "userID": friend.userID,
              "fullName": friend.fullName,
              "profilePicture": `https://graph.facebook.com/${
                friend.userID
              }/picture?type=large`,
              "profileUrl": friend.profileUrl,
              "vanity": friend.vanity,
              "_facebook": facebook._id,
              "_account": req.uid
            };

            return listFriendInfo;
          } )
        );
        await Friend.insertMany( dataRes.filter( ( item ) => item.firstName !== "Người dùng Facebook" ) );
        return dataRes;
      } )
    );

    // eslint-disable-next-line prefer-spread
    const dataFriend = [].concat.apply( [], listFriend );

    await Promise.all(
      removeObjectDuplicates( dataFriend, "userID" ).filter( ( item ) => item.firstName !== "Người dùng Facebook" ).map( async ( friend ) => {
        let vocate = await Vocate.find( {
          "_account": req.uid,
          "_friends": friend.userID.toString()
        } );

        vocate.length === 0 ? ( friend.vocate = "Chưa thiết lập" ) : ( friend.vocate = vocate[ 0 ].name );

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

      res.status( 304 ).json( jsonResponse( "fail", "API này không được cung cấp!" ) );
    } );
  },
  /**
   * Search Friend
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  "search": async ( req, res ) => {
    if ( req.query.keyword === undefined ) {
      return res
        .status( 404 )
        .json( {
          "status": "fail",
          "keyword": "Vui lòng cung cấp từ khóa để tìm kiếm!"
        } );
    }

    let page = null, dataResponse = null, data = ( await Friend.find( { "$text": { "$search": `\"${req.query.keyword}\"`, "$language": "none" }, "_account": req.uid } ).lean() );

    data = await Promise.all( removeObjectDuplicates( data, "userID" ).filter( ( item ) => item.firstName !== "Người dùng Facebook" ).map( async ( friend ) => {
      let vocate = await Vocate.find( {
        "_account": req.uid,
        "_friends": friend.userID.toString()
      } );

      vocate.length === 0 ? ( friend.vocate = "Chưa thiết lập" ) : ( friend.vocate = vocate[ 0 ].name );

      return friend;
    } ) );
    if ( req.query._size && req.query._page ) {
      dataResponse = data.slice(
        ( Number( req.query._page ) - 1 ) * Number( req.query._size ),
        Number( req.query._size ) * Number( req.query._page )
      );
    } else if ( req.query._size ) {
      dataResponse = data.slice( 0, Number( req.query._size ) );
    }

    if ( req.query._size ) {
      if ( data.length % req.query._size === 0 ) {
        page = Math.floor( data.length / req.query._size );
      } else {
        page = Math.floor( data.length / req.query._size ) + 1;
      }
    }

    res.status( 200 ).json( { "status": "success", "data": { "results": dataResponse, "page": page, "total": data.length } } );
  }

};
