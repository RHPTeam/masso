/**
 * Controller facebook for project
 * author: hocpv
 * updater: sky albert
 * date up: 22/04/2019
 * date to: 21/06/2019
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
const { getDtsgAg, getFullDtsgFB } = require( "../helpers/utils/facebook/dtsgfb" );
const jsonResponse = require( "../configs/response" );
// const chatAuto = require( "../process/cron/chat/index" );

module.exports = {
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await Facebook.findOne( { "_id": req.query._id, "_account": req.uid }, "-cookie -token -_account -_created_at -_updated_at" ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Facebook.find( { "_account": req.uid }, "-cookie -token -_account -_created_at -_updated_at" ).lean();
    }

    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
  },
  "create": async ( req, res ) => {
    // Check validator
    if ( !req.body.cookie || req.body.cookie === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "cookie": "Cookie facebook không được để trống!" } } );
    }

    const accountResult = await Account.findOne( { "_id": req.uid } ),
      userInfoCore = await getUserInfo( { "cookie": req.body.cookie, agent } ),
      countAccountFacebook = await Facebook.countDocuments( { "_account": req.uid } ),
      foundAccountFacebook = await Facebook.findOne( {
        "userInfo.id": findSubString( req.body.cookie, "c_user=", ";" )
      } );

    if ( countAccountFacebook.length >= accountResult.maxAccountFb ) {
      return res.status( 406 ).json( { "status": "error", "message": "Bạn đã tạo tối đa số tài khoản facebook!" } );
    }
    if ( foundAccountFacebook ) {
      return res.status( 403 ).json( { "status": "error", "message": "Tài khoản facebook với cookie này trùng với một tài khoản ở 1 cookie khác!" } );
    }

    /* eslint-disable-next-line one-var */
    const agentToken = await getDtsgAg( { "cookie": req.body.cookie, agent } ),
      fullToken = await getFullDtsgFB( { "cookie": req.body.cookie, agent } );


    let newFacebook = await new Facebook( {
      "cookie": req.body.cookie,
      "status": 1,
      "_account": req.uid,
      "userInfo": {
        "id": userInfoCore.results.id,
        "name": userInfoCore.results.fullName,
        "thumbSrc": userInfoCore.results.thumbSrc,
        "profileUrl": userInfoCore.results.profileUrl
      },
      "token": {
        "agent": agentToken,
        "privacy": fullToken.privacy,
        "token": fullToken.token
      }
    } );

    // Check errors
    if ( userInfoCore.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "error", "message": userInfoCore.error.text } );
    }

    await newFacebook.save();

    // handle srv chat
    // await chatAuto( newFacebook );

    // Remove cookie and token when add facebook account
    newFacebook = newFacebook.toObject();
    delete newFacebook.cookie;
    delete newFacebook.token;

    res.status( 200 ).json( jsonResponse( "success", newFacebook ) );
  },
  "update": async ( req, res ) => {
    const accountResult = await Account.findOne( { "_id": req.uid } ),
      userInfoCore = await getUserInfo( { "cookie": req.body.cookie, agent } ),
      findFacebook = await Facebook.findById( req.query._facebookId );

    if ( !accountResult ) {
      return res.status( 404 ).json( { "status": "error", "message": "Người dùng không tồn tại!" } );
    }

    // Check validator
    if ( !req.body.cookie || req.body.cookie === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "cookie": "Cookie facebook không được để trống!" } } );
    } else if ( !req.query._facebookId || req.query._facebookId === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "_facebookId": "Vui lòng cung cấp query _facebookId!" } } );
    }

    /* eslint-disable-next-line one-var */
    const agentToken = await getDtsgAg( { "cookie": req.body.cookie, agent } ),
      fullToken = await getFullDtsgFB( { "cookie": req.body.cookie, agent } );

    let newFacebook = {
        "cookie": req.body.cookie,
        "status": 1,
        "_account": req.uid, "userInfo": {
          "id": userInfoCore.results.id,
          "name": userInfoCore.results.fullName,
          "thumbSrc": userInfoCore.results.thumbSrc,
          "profileUrl": userInfoCore.results.profileUrl
        },
        "token": {
          "agent": agentToken,
          "privacy": fullToken.privacy,
          "token": fullToken.token
        }
      },
      dataResponse = null;

    // Check errors
    if ( userInfoCore.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "error", "message": userInfoCore.error.text } );
    } else if ( findSubString( req.body.cookie, "c_user=", ";" ) !== findFacebook.userInfo.id ) {
      return res.status( 404 ).json( { "status": "error", "message": "Cookie không phải của tài khoản hiện tại! Vui lòng thử lại!" } );
    }

    dataResponse = await Facebook.findByIdAndUpdate( req.query._facebookId, { "$set": newFacebook }, { "new": true } );

    // handle srv chat
    // await chatAuto( dataResponse );

    dataResponse = dataResponse.toObject();
    delete dataResponse.cookie;
    delete dataResponse.token;

    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
  },
  "updateByExtension": async ( req, res ) => {
    // Check validator
    if ( !req.body.cookie || req.body.cookie === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "cookie": "Cookie facebook không được để trống!" } } );
    }

    if ( req.body.cookie ) {
      const findFacebook = await Facebook.findOne( { "userInfo.id": findSubString( req.body.cookie, "c_user=", ";" ) } );

      if ( findFacebook ) {
        findFacebook.cookie = req.body.cookie;
        await findFacebook.save();
      }
    }
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "delete": async ( req, res ) => {
    const accountResult = await Account.findOne( { "_id": req.uid } ),
      listPostGroupByUser = await PostGroup.find( { "_account": req.uid } ),
      findFacebook = await Facebook.findById( req.query._id ),
      listGroupFacebook = ( await GroupFacebook.find( { "_facebook": req.query._id, "_account": req.uid } ).lean() ).map( ( groupFacebook ) => groupFacebook.groupId ),
      listPageFacebook = ( await PageFacebook.find( { "_facebook": req.query._id, "_account": req.uid } ).lean() ).map( ( pageFacebook ) => pageFacebook.pageId );

    if ( !accountResult ) {
      return res.status( 404 ).json( { "status": "error", "message": "Người dùng không tồn tại!" } );
    }
    // Check catch when delete campaign
    if ( !findFacebook ) {
      return res.status( 404 ).json( { "status": "error", "message": "Tài khoản facebook không tồn tại!" } );
    }

    // Remove item Id, page Id of facebook account
    Promise.all( listPostGroupByUser.map( async ( postGroup ) => {
      // Remove timelines of facebook
      if ( postGroup._timeline.includes( findFacebook.userInfo.id ) ) {
        postGroup._timeline.pull( findFacebook.userInfo.id );
      }
      // Remove pages of facebook
      await Promise.all( postGroup._pages.map( ( pageId, index ) => {
        if ( listPageFacebook.includes( pageId ) ) {
          postGroup._pages.splice( index, 1 );
        }
      } ) );

      // Remove groups of facebook
      await Promise.all( postGroup._groups.map( ( groupId, index ) => {
        if ( listGroupFacebook.includes( groupId ) ) {
          postGroup._groups.splice( index, 1 );
        }
      } ) );

      await postGroup.save();
    } ) );

    // Delete Group and Page of facebook deleted
    await GroupFacebook.deleteMany( { "_facebook": req.query._id } );
    await PageFacebook.deleteMany( { "_facebook": req.query._id } );

    await Facebook.findByIdAndDelete( req.query._id );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "getAllActionTypeLoader": async ( req, res ) => {
    const findFacebook = await Facebook.find( { "_account": req.uid } ),
      activityList = await getAllActionTypeLoader( { "cookie": findFacebook[ 0 ].cookie, agent } );

    if ( activityList.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "error", "message": activityList.error.text } );
    }

    res.status( 200 ).json( jsonResponse( "success", activityList ) );
  },
  "showActionTypeLoader": async ( req, res ) => {
    const findFacebook = await Facebook.find( { "_account": req.uid } ),
      activityItemList = await getAllItemActionTypeLoader( { "cookie": findFacebook[ 0 ].cookie, agent, "item": req.params.id } );

    if ( activityItemList.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "error", "message": activityItemList.error.text } );
    }

    res.status( 200 ).json( jsonResponse( "success", activityItemList ) );
  },
  "getAllFriends": async ( req, res ) => {
    const findFacebook = await Facebook.find( { "_account": req.uid } );

    if ( findFacebook.length === 0 ) {
      return res.status( 404 ).json( { "status": "error", "message": "Bạn không có tài khoản facebook để thực hiện chức năng này!" } );
    }
    let friendsList = await getAllFriends( { "cookie": findFacebook[ 0 ].cookie, agent } );

    if ( friendsList.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "error", "message": friendsList.error.text } );
    }

    res.status( 200 ).json( jsonResponse( "success", friendsList ) );
  },
  "searchPlaces": async ( req, res ) => {
    const findFacebook = await Facebook.find( { "_account": req.uid } ),
      placesList = await searchPlaces( { "cookie": findFacebook[ 0 ].cookie, agent, "keyword": req.query.keyword ? req.query.keyword : null,
        "number": req.query.number ? req.query.number : 15 } );

    if ( placesList.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "error", "message": placesList.error.text } );
    }

    res.status( 200 ).json( jsonResponse( "success", placesList ) );
  }
};
