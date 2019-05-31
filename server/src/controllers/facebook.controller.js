/**
 * Controller facebook for project
 * author: hocpv
 * date up: 22/04/2019
 * date to: ___
 * team: BE-RHP
 */
const Account = require( "../models/Account.model" );
const Facebook = require( "../models/Facebook.model" );
const PageFacebook = require( "../models/post/PageFacebook.model" );
const GroupFacebook = require( "../models/post/GroupFacebook.model" );
const PostGroup = require( "../models/post/PostGroup.model" );

const { getAllActionTypeLoader, getAllItemActionTypeLoader, getAllFriends, getUserInfo, searchPlaces } = require( "./core/facebook.core" );
const { findSubString } = require( "../helpers/utils/functions/string" );
const { agent } = require( "../configs/crawl" );
const jsonResponse = require( "../configs/response" );
const secure = require( "../helpers/utils/secures/jwt" );

module.exports = {
  "index": async ( req, res ) => {
    let dataResponse = null;
    const authorization = req.headers.authorization,
      userId = secure( res, authorization ),
      accountResult = await Account.findOne( { "_id": userId } );

    if ( !accountResult ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": "Người dùng không tồn tại!" } );
    }
    if ( userId !== req.uid ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": "Xem lại quyền người dùng!" } );
    }
    if ( req.query._id ) {
      dataResponse = await Facebook.find( { "_id": req.query._id, "_account": req.uid } ).lean();
      dataResponse = dataResponse[ 0 ];
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Facebook.find( { "_account": req.uid } ).lean();
    }

    // Remove cookie when get facebook account
    if ( req.query._id ) {
      delete dataResponse.cookie;
    } else {
      dataResponse = dataResponse.map( ( facebook ) => {
        delete facebook.cookie;
        return facebook;
      } );
      dataResponse = await Promise.all( dataResponse );
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );
  },
  "create": async ( req, res ) => {
    // Check validator
    if ( !req.body.cookie || req.body.cookie === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "cookie": "Cookie facebook không được để trống!" } } );
    }
    const authorization = req.headers.authorization,

      userId = secure( res, authorization ),
      accountResult = await Account.findOne( { "_id": userId } ),
      userInfoCore = await getUserInfo( { "cookie": req.body.cookie, agent } ),
      foundAccountFacebook = await Facebook.find( {
        "userInfo.id": findSubString( req.body.cookie, "c_user=", ";" )
      } );

    if ( !accountResult ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": "Người dùng không tồn tại!" } );
    }
    if ( userId !== req.uid ) {
      return res.status( 405 ).json( { "status": "errors.js", "message": "Xem lại quyền người dùng!" } );
    }
    if ( accountResult._accountfb.length >= 2 ) {
      return res.status( 403 ).json( { "status": "errors.js", "message": "Bạn đã tạo tối đa số tài khoản facebook!" } );
    }
    if ( foundAccountFacebook.length > 0 ) {
      return res.status( 403 ).json( { "status": "errors.js", "message": "Tài khoản facebook với cookie này trùng với một tài khoản ở 1 cookie khác!" } );
    }

    let newFacebook = await new Facebook( { "cookie": req.body.cookie ? req.body.cookie : null, "status": 1, "_account": req.uid, "userInfo": {
      "id": userInfoCore.results.id,
      "name": userInfoCore.results.fullName,
      "thumbSrc": userInfoCore.results.thumbSrc,
      "profileUrl": userInfoCore.results.profileUrl
    } } );

    // Check errors
    if ( userInfoCore.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": userInfoCore.error.text } );
    }

    await newFacebook.save();

    // Remove cookie when add facebook account
    newFacebook = newFacebook.toObject();
    delete newFacebook.cookie;

    accountResult._accountfb.push( newFacebook._id );
    await accountResult.save();

    res.status( 200 ).json( jsonResponse( "success", newFacebook ) );
  },
  "update": async ( req, res ) => {
    const authorization = req.headers.authorization,
      userId = secure( res, authorization ),
      accountResult = await Account.findOne( { "_id": userId } ),
      userInfoCore = await getUserInfo( { "cookie": req.body.cookie, agent } ),
      findFacebook = await Facebook.findById( req.query._facebookId );

    if ( !accountResult ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": "Người dùng không tồn tại!" } );
    }
    if ( userId !== req.uid ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": "Xem lại quyền người dùng!" } );
    }
    // Check validator
    if ( !req.body.cookie || req.body.cookie === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "cookie": "Cookie facebook không được để trống!" } } );
    } else if ( !req.query._facebookId || req.query._facebookId === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "_facebookId": "Vui lòng cung cấp query _facebookId!" } } );
    }

    let newFacebook = {
        "cookie": req.body.cookie ? req.body.cookie : null,
        "status": 1, "_account": req.uid, "userInfo": {
          "id": userInfoCore.results.id,
          "name": userInfoCore.results.fullName,
          "thumbSrc": userInfoCore.results.thumbSrc,
          "profileUrl": userInfoCore.results.profileUrl
        }
      },
      dataResponse = null;

    // Check errors
    if ( userInfoCore.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": userInfoCore.error.text } );
    } else if ( findSubString( req.body.cookie, "c_user=", ";" ) !== findFacebook.userInfo.id ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": "Cookie không phải của tài khoản hiện tại! Vui lòng thử lại!" } );
    }

    dataResponse = await Facebook.findByIdAndUpdate( req.query._facebookId, { "$set": newFacebook }, { "new": true } );

    dataResponse = dataResponse.toObject();
    delete dataResponse.cookie;

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );
  },
  "delete": async ( req, res ) => {
    const accountResult = await Account.findOne( { "_id": req.uid } ),
      listPostGroupByUser = await PostGroup.find( { "_account": req.uid } ),
      findFacebook = await Facebook.findById( req.query._id ),
      listGroupFacebook = ( await GroupFacebook.find( { "_facebook": req.query._facebookId, "_account": req.uid } ).lean() ).map( ( groupFacebook ) => groupFacebook.groupId ),
      listPageFacebook = ( await PageFacebook.find( { "_facebook": req.query._facebookId, "_account": req.uid } ).lean() ).map( ( pageFacebook ) => pageFacebook.pageId );

    if ( !accountResult ) {
      return res.status( 404 ).json( { "status": "error", "message": "Người dùng không tồn tại!" } );
    }
    // Check catch when delete campaign
    if ( !findFacebook ) {
      return res.status( 404 ).json( { "status": "error", "message": "Tài khoản facebook không tồn tại!" } );
    }

    // Remove item Id, page Id of facebook account
    Promise.all( listPostGroupByUser.map( async ( postGroup ) => {
      // Remove pages of facebook
      Promise.all( postGroup._pages.map( ( pageId, index ) => {
        if ( listPageFacebook.includes( pageId ) ) {
          postGroup._pages.splice( index, 1 );
        }
      } ) );

      // Remove groups of facebook
      Promise.all( postGroup._groups.map( ( groupId, index ) => {
        if ( listGroupFacebook.includes( groupId ) ) {
          postGroup._groups.splice( index, 1 );
        }
      } ) );

      await postGroup.save();
    } ) );

    // Delete Group and Page of facebook deleted
    await GroupFacebook.deleteMany( { "_facebook": req.query._facebookId } );
    await PageFacebook.deleteMany( { "_facebook": req.query._facebookId } );

    // Remove Id account facebook from account
    accountResult._accountfb.pull( req.query._facebookId );
    await accountResult.save();

    await Facebook.findByIdAndDelete( req.query._facebookId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "getAllActionTypeLoader": async ( req, res ) => {
    const findFacebook = await Facebook.find( { "_account": req.uid } ),
      activityList = await getAllActionTypeLoader( { "cookie": findFacebook[ 0 ].cookie, agent } );

    if ( activityList.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": activityList.error.text } );
    }

    res.status( 200 ).json( jsonResponse( "success", activityList ) );
  },
  "showActionTypeLoader": async ( req, res ) => {
    const findFacebook = await Facebook.find( { "_account": req.uid } ),
      activityItemList = await getAllItemActionTypeLoader( { "cookie": findFacebook[ 0 ].cookie, agent, "item": req.params.id } );

    if ( activityItemList.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": activityItemList.error.text } );
    }

    res.status( 200 ).json( jsonResponse( "success", activityItemList ) );
  },
  "getAllFriends": async ( req, res ) => {
    const findFacebook = await Facebook.find( { "_account": req.uid } );

    if ( findFacebook.length === 0 ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": "Bạn không có tài khoản facebook để thực hiện chức năng này!" } );
    }
    let friendsList = await getAllFriends( { "cookie": findFacebook[ 0 ].cookie, agent } );

    if ( friendsList.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": friendsList.error.text } );
    }

    res.status( 200 ).json( jsonResponse( "success", friendsList ) );
  },
  "searchPlaces": async ( req, res ) => {
    const findFacebook = await Facebook.find( { "_account": req.uid } ),
      placesList = await searchPlaces( { "cookie": findFacebook[ 0 ].cookie, agent, "keyword": req.query.keyword ? req.query.keyword : null,
        "number": req.query.number ? req.query.number : 15 } );

    if ( placesList.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": placesList.error.text } );
    }

    res.status( 200 ).json( jsonResponse( "success", placesList ) );
  }
};
