/**
 * Controller facebook for project
 * author: hocpv
 * date up: 22/04/2019
 * date to: ___
 * team: BE-RHP
 */
const Facebook = require( "../models/Facebook.model" );
const PageFacebook = require( "../models/PageFacebook.model" );
const GroupFacebook = require( "../models/GroupFacebook.model" );

const { getUserInfo } = require( "./core/facebook.core" );
const { findSubString } = require( "../helpers/utils/functions.util" );
const { agent } = require( "../configs/crawl" );
const jsonResponse = require( "../configs/res" );
const secure = require( "../helpers/utils/secure.util" );

module.exports = {
  /**
   * Get facebook (accept query)
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "index": async ( req, res ) => {
    let dataResponse = null;
    const authorization = req.headers.authorization,
      userId = secure( res, authorization );

    if ( req.query._id ) {
      dataResponse = await Facebook.find( { "_id": req.query._id, "_account": userId } ).lean();
      dataResponse = dataResponse[ 0 ];
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Facebook.find( { "_account": userId } ).lean();
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
  /**
   * Add account facebook to acc
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "create": async ( req, res ) => {
    // Check validator
    if ( !req.body.cookie || req.body.cookie === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "cookie": "Cookie facebook không được để trống!" } } );
    }

    const userId = secure( res, req.headers.authorization ),
      userInfoCore = await getUserInfo( { "cookie": req.body.cookie, agent } );
    let newFacebook = await new Facebook( { "cookie": req.body.cookie ? req.body.cookie : null, "status": 1, "_account": userId, "userInfo": {
      "id": userInfoCore.results.id,
      "name": userInfoCore.results.fullName,
      "thumbSrc": userInfoCore.results.thumbSrc,
      "profileUrl": userInfoCore.results.profileUrl
    } } );

    // Check error
    if ( userInfoCore.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "error", "message": userInfoCore.error.text } );
    }

    await newFacebook.save();

    // Remove cookie when add facebook account
    newFacebook = newFacebook.toObject();
    delete newFacebook.cookie;

    res.status( 200 ).json( jsonResponse( "success", newFacebook ) );
  },
  /**
   * Update account Facebook by user
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "update": async ( req, res ) => {
    // Check validator
    if ( !req.body.cookie || req.body.cookie === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "cookie": "Cookie facebook không được để trống!" } } );
    } else if ( !req.query._facebookId || req.query._facebookId === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "_facebookId": "Vui lòng cung cấp query _facebookId!" } } );
    }

    const userId = secure( res, req.headers.authorization ),
      userInfoCore = await getUserInfo( { "cookie": req.body.cookie, agent } ),
      findFacebook = await Facebook.findById( req.query._facebookId );
    let newFacebook = {
        "cookie": req.body.cookie ? req.body.cookie : null,
        "status": 1, "_account": userId, "userInfo": {
          "id": userInfoCore.results.id,
          "name": userInfoCore.results.fullName,
          "thumbSrc": userInfoCore.results.thumbSrc,
          "profileUrl": userInfoCore.results.profileUrl
        }
      },
      dataResponse = null;

    // Check error
    if ( userInfoCore.error.code !== 200 ) {
      return res.status( 404 ).json( { "status": "error", "message": userInfoCore.error.text } );
    } else if ( findSubString( req.body.cookie, "c_user=", ";" ) !== findFacebook.userInfo.id ) {
      return res.status( 404 ).json( { "status": "error", "message": "Cookie không phải của tài khoản hiện tại! Vui lòng thử lại!" } );
    }

    dataResponse = await Facebook.findByIdAndUpdate( req.query._facebookId, { "$set": newFacebook }, { "new": true } );

    dataResponse = dataResponse.toObject();
    delete dataResponse.cookie;

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );
  },
  /**
   * Delete Account Facebook By User
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      findFacebook = await Facebook.findById( req.query._facebookId );

    // Check catch when delete campaign
    if ( !findFacebook ) {
      return res.status( 404 ).json( { "status": "error", "message": "Tài khoản facebook không tồn tại!" } );
    } else if ( findFacebook._account.toString() !== userId ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho tài khoản facebook này!" } );
    }
    // Delete Group and Page of facebook deleted
    await GroupFacebook.remove( { "_facebook": req.query._facebookId } );
    await PageFacebook.remove( { "_facebook": req.query._facebookId } );

    await Facebook.findByIdAndDelete( req.query._facebookId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
