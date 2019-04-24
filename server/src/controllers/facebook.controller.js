/* eslint-disable one-var */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/**
 * Controller facebook for project
 * author: hocpv
 * date up: 22/04/2019
 * date to: ___
 * team: BE-RHP
 */
const facebookChatApi = require( "facebook-chat-api" );
const Account = require( "../models/Account.model" );
const Facebook = require( "../models/Facebook.model" );

const jsonResponse = require( "../configs/res" );
const cookieFacebook = require( "../configs/cookieFacebook" );
const convertCookieToObject = require( "../helpers/utils/cookie.util" );
const secure = require( "../helpers/utils/secure.util" );
const decodeRole = require( "../helpers/utils/decodeRole.util" );

// function global get api facebook
let api = null,
  loginCookie = ( data ) => {
    return new Promise( ( resolve ) => {
      facebookChatApi( { "appState": data.cookie }, ( err, api ) => {
        if ( err ) {
          console.log( err );
          return;
        }
        resolve( api );
      } );
    } );
  };

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
      role = req.headers.cfr,
      userId = secure( res, authorization ),
      accountResult = await Account.findById( userId );

    if ( !accountResult ) {
      return res
        .status( 403 )
        .json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    if (
      decodeRole( role, 10 ) === 0 || decodeRole( role, 10 ) === 1 || decodeRole( role, 10 ) === 2
    ) {
      !req.query._id ? ( dataResponse = await Facebook.find( { "_account": userId } ).select(
        "-cookie"
      ) ) : ( dataResponse = await Facebook.find( {
        "_id": req.query._id,
        "_account": userId
      } ).select( "-cookie" ) );
      if ( !dataResponse ) {
        return res.status( 403 ).json( jsonResponse( "Thuộc tính không tồn tại" ) );
      }
      dataResponse = dataResponse.map( ( item ) => {
        if ( item._account.toString() === userId ) {
          return item;
        }
      } );
    }
    res
      .status( 200 )
      .json( jsonResponse( "Lấy dữ liệu thành công =))", dataResponse ) );
  },
  /**
   * Add account facebook to acc
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "create": async ( req, res ) => {
    let data;
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    // check acount facebook using cookie is exist
    const foundAccountCookie = await Facebook.find( {
      "cookie": req.body.cookie,
      "_account": userId
    } );

    if ( foundAccountCookie.length > 0 ) {
      return res
        .status( 404 )
        .json( jsonResponse( "Bạn đã sử dụng cookie này!", null ) );
    }
    // check maximum account facebook
    if ( accountResult._accountfb.length >= accountResult.maxAccountFb ) {
      return res
        .status( 405 )
        .json(
          jsonResponse(
            "Số lượng tài khoản của bạn đã đủ giới hạn, vui lòng mua dịch vụ để có số lượng lớn hơn!",
            null
          )
        );
    }
    // pre process with cookie facebook
    const result = convertCookieToObject( req.body.cookie )[ 0 ],
      defineAgainCookie = cookieFacebook(
        result.fr,
        result.datr,
        result.c_user,
        result.xs
      ),
      // check cookie is another but loop account facebook
      foundAccountFacebook = await Facebook.find( {
        "userInfo.id": result.c_user
      } );

    if ( foundAccountFacebook.length > 0 ) {
      return res
        .status( 403 )
        .json(
          jsonResponse(
            "Tài khoản facebook với cookie này trùng với một tài khoản ở 1 cookie khác!",
            null
          )
        );
    }
    // login facebook with cookie to get data
    api = await loginCookie( { "cookie": defineAgainCookie }, ( err ) => {
      if ( err ) {
        return res
          .status( 405 )
          .json(
            jsonResponse( "Cookie hết hạn hoặc gặp lỗi khi đăng nhập!", null )
          );
      }
    } );

    // get user facebook infor for save to db facebook
    const newFacebook = await new Facebook( req.body );

    api.getUserInfo( result.c_user, async ( err, ret ) => {
      if ( err ) {
        return console.error( err );
      }

      data = Object.values( ret )[ 0 ];
      newFacebook.userInfo = {
        "id": result.c_user,
        "name": data.name,
        "thumbSrc": `http://graph.facebook.com/${
          result.c_user
        }/picture?type=large`,
        "profileUrl": data.profileUrl
      };
      newFacebook._account = userId;
      newFacebook.status = 1;
      await newFacebook.save();
      return res
        .status( 200 )
        .json( jsonResponse( "Thêm tài khoản facebook thành công!", newFacebook ) );
    } );
    accountResult._accountfb.push( newFacebook._id );
    await Account.findByIdAndUpdate(
      userId,
      { "$set": { "_accountfb": accountResult._accountfb } },
      { "new": true }
    ).select( "-password" );
  },
  /**
   * Update account Facebook by user
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "update": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization );
    const accountResult = await Account.findById( userId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const fbResult = await Facebook.findOne( { "_id": req.query._fbId } );

    if ( fbResult._account.toString() !== userId ) {
      return res
        .status( 405 )
        .json( jsonResponse( "Bạn không có quyền cho mục này!", null ) );
    }
    if ( !fbResult ) {
      res.status( 403 ).json( jsonResponse( "Thuộc tính này không tồn tại!", null ) );
    }
    // pre process with cookie facebook
    const result = convertCookieToObject( req.body.cookie )[ 0 ];
    const defineAgainCookie = cookieFacebook(
      result.fr,
      result.datr,
      result.c_user,
      result.xs
    );
    // login facebook with cookie to get data

    api = await loginCookie( { "cookie": defineAgainCookie }, ( err ) => {
      if ( err ) {
        return res
          .status( 405 )
          .json(
            jsonResponse( "Cookie hết hạn hoặc gặp lỗi khi đăng nhập!", null )
          );
      }
    } );
    if ( result.c_user !== fbResult.userInfo.id ) {
      return res
        .status( 405 )
        .json(
          jsonResponse(
            "Bạn không thể cập nhật tài khoản facebook khi sử dụng một cookie với tài khoản khác!",
            null
          )
        );
    }
    // update information facebook when login again
    api.getUserInfo( result.c_user, async ( err, ret ) => {
      if ( err ) {
        return console.error( err );
      }
      data = Object.values( ret )[ 0 ];
      fbResult.userInfo = {
        "name": data.name,
        "thumbSrc": `http://graph.facebook.com/${
          result.c_user
        }/picture?type=large`,
        "profileUrl": data.profileUrl
      };
      fbResult.status = 1;
      await fbResult.save();
    } );
    const objectSaver = {
      "cookie": req.body.cookie,
      "status": 1,
      "updated_at": Date.now()
    };
    const newFacebook = await Facebook.findByIdAndUpdate(
      req.query._fbId,
      { "$set": objectSaver },
      { "new": true }
    );

    res
      .status( 200 )
      .json( jsonResponse( "Cập nhật thuộc tính thành công!", newFacebook ) );
  },
  /**
   * Delete Account Facebook By User
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization );
    const accountResult = await Account.findById( userId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const fbResult = await Facebook.findOne( { "_id": req.query._fbId } );

    if ( !fbResult ) {
      return res.status( 403 ).json( jsonResponse( "Thuộc tính này không tồn tại!", null ) );
    }
    if ( fbResult._account.toString() !== userId ) {
      return res
        .status( 405 )
        .json( jsonResponse( "Bạn không có quyền cho mục này!", null ) );
    }
    await fbResult.remove();

    accountResult._accountfb.pull( fbResult._id );
    await Account.findByIdAndUpdate(
      userId,
      { "$set": { "_accountfb": accountResult._accountfb } },
      { "new": true }
    ).select( "-password" );
    res.status( 200 ).json( jsonResponse( "Xóa dữ liệu thành công!", null ) );
  },
  /**
   * Login Account Facebook
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "login": async ( req, res ) => {
    let data;
    const userId = secure( res, req.headers.authorization );
    const accountResult = await Account.findById( userId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const foundAccountFb = await Facebook.findById( req.query._fbId );

    if ( !foundAccountFb ) {
      return res
        .status( 403 )
        .json( jsonResponse( "Tài khoản facebook không tồn tại!", null ) );
    }
    const result = convertCookieToObject( foundAccountFb.cookie )[ 0 ];
    const defineAgainCookie = cookieFacebook(
      result.fr,
      result.datr,
      result.c_user,
      result.xs
    );

    api = await loginCookie( { "cookie": defineAgainCookie }, async ( err ) => {
      if ( err ) {
        foundAccountFb.status = 0;
        await foundAccountFb.save();
        return res
          .status( 405 )
          .json(
            jsonResponse( "Cookie hết hạn hoặc gặp lỗi khi đăng nhập!", err )
          );
      }
    } );
    // update information facebook when login again
    api.getUserInfo( result.c_user, async ( err, ret ) => {
      if ( err ) {
        return console.error( err );
      }

      data = Object.values( ret )[ 0 ];
      foundAccountFb.userInfo = {
        "name": data.name,
        "thumbSrc": `http://graph.facebook.com/${
          result.c_user
        }/picture?type=large`,
        "profileUrl": data.profileUrl
      };
      foundAccountFb.status = 1;
      await foundAccountFb.save();
    } );
    res
      .status( 200 )
      .json(
        jsonResponse(
          `Đăng nhập tài khoản facebook ${
            foundAccountFb.userInfo.name
          } thành công!`,
          null
        )
      );
  },
  /**
   * Logout Account Facebook
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "logout": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization );
    const accountResult = await Account.findById( userId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const foundAccountFb = await Facebook.findById( req.query._fbId );

    if ( !foundAccountFb ) {
      return res
        .status( 403 )
        .json( jsonResponse( "Tài khoản facebook không tồn tại!", null ) );
    }
    api.logout( ( err ) => {
      if ( err ) {
        return console.error( err );
      }
    } );
    foundAccountFb.status = 0;
    await foundAccountFb.save();
    res
      .status( 200 )
      .json( jsonResponse( "Đăng xuất tài khoản facebook thành công!", null ) );
  }
};
