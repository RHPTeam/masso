/**
 * Controller users or account for project
 * author: hoc-anms
 * updater: sky albert
 * date up: 20/04/2019
 * date to: 25/05/2019
 * team: BE-RHP
 */
const Account = require( "../models/Account.model" ),
  jsonResponse = require( "../configs/response" ),
  { changePasswordSync, updateUserSync } = require( "../microservices/synchronize/account.service" ),
  { defaulSchema } = require( "../helpers/services/default.service" );

module.exports = {
  "show": async ( req, res ) => {
    const userInfo = await Account.findOne( { "_id": req.uid } ).select( "-password" ).lean();

    res.status( 200 ).json( jsonResponse( "success", userInfo ) );
  },
  "update": async ( req, res ) => {
    const { body, file } = req,
      userInfo = await Account.findOne( { "_id": req.uid } ).select( "-password" );

    let data, resUserSync, avatar;

    // Check update user info if user upload profile
    if ( file ) {
      // Custom link
      body.imageAvatar = `${process.env.APP_URL}:${process.env.PORT_BASE}/${file.path.replace( /\\/gi, "/" )}`;

      // join property email to data send
      resUserSync = await updateUserSync( "users/sync", { "info": body, "id": req.uid }, { "Authorization": req.headers.authorization } );
      if ( resUserSync.data.status !== "success" ) {
        return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
      }

      avatar = `${process.env.APP_URL}:${process.env.PORT_BASE}/${file.path.replace( /\\/gi, "/" )}`;
      await Account.findByIdAndUpdate( userInfo._id, { "$set": { "imageAvatar": avatar } }, { "new": true } ).select( "-password -__v" );
      return res.status( 201 ).json( jsonResponse( "success", userInfo ) );
    }

    // join property email to data send
    resUserSync = await updateUserSync( "users/sync", { "info": body, "id": req.uid }, { "Authorization": req.headers.authorization } );
    if ( resUserSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH" } );
    }

    data = await Account.findByIdAndUpdate(
      userInfo._id,
      {
        "$set": body
      },
      {
        "new": true
      }
    ).select( "-password -__v" );

    res
      .status( 201 )
      .json( jsonResponse( "success", data ) );
  },
  "changePassword": async ( req, res ) => {
    const { body } = req,
      userInfo = await Account.findOne( { "_id": req.uid } ),
      isPassword = await userInfo.isValidPassword( body.password );

    let resUserInfo;

    // Check errors
    if ( !isPassword ) {
      return res.status( 404 ).json( { "status": "error", "message": "Mật khẩu không chính xác!" } );
    }

    // Assign new password
    userInfo.password = body.newPassword;

    // Sync main server
    resUserInfo = await changePasswordSync( "users/change-password/sync", body, { "Authorization": req.headers.authorization } );
    if ( resUserInfo.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }

    // Save to mongodb
    await userInfo.save();

    res.status( 201 ).json( jsonResponse( "success", null ) );
  },
  "createNewPassword": async ( req, res ) => {
    const { password } = req.body,
      userInfo = await Account.findOne( { "_id": req.uid } );

    if ( !userInfo ) {
      return res.send( { "status": "error", "message": "Người dùng không tồn tại trên server này" } );
    }

    userInfo.password = password;

    await userInfo.save();

    res.send( { "status": "success", "data": null } );
  },
  "signUp": async( req, res ) => {
    const newUser = new Account( req.body );

    await newUser.save();

    res.send( { "status": "success", "data": "Synchronized..." } );

    defaulSchema( newUser );
  }
};
