/**
 * Controller users or account for project
 * author: hoc-anms
 * updater: sky albert
 * date up: 20/04/2019
 * date to: 25/05/2019
 * team: BE-RHP
 */
const Account = require( "../models/Account.model" ),
  Role = require( "../models/Role.model" ),
  fs = require( "fs" ),
  jsonResponse = require( "../configs/response" ),
  { changePasswordSync, createNewPasswordSync, updateUserSync } = require( "../microservices/synchronize/account.service" ),
  { defaulSchema } = require( "../helpers/services/default.service" ),
  { signToken } = require( "../configs/jwt" ),
  mail = require( "nodemailer" ),
  CronJob = require( "cron" ).CronJob;

module.exports = {
  "show": async ( req, res ) => {
    const userInfo = await Account.findOne( { "_id": req.uid } ).select( "-password -__v" ).lean();

    res.status( 200 ).json( jsonResponse( "success", userInfo ) );
  },
  "update": async ( req, res ) => {
    const { body, file } = req,
      userInfo = await Account.findOne( { "_id": req.uid } );

    let data, resUserSync, userInfoProfile;

    // Check update user info if user upload profile
    if ( file ) {
      // Custom link
      body.imageAvatar = `${process.env.APP_URL}:${process.env.PORT_BASE}/${file.path.replace( /\\/gi, "/" )}`;

      // join property email to data send
      resUserSync = await updateUserSync( "users/sync", { "info": body, "id": req.uid }, { "Authorization": req.headers.authorization } );
      if ( resUserSync.data.status !== "success" ) {
        return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
      }

      userInfo.imageAvatar = `${process.env.APP_URL}:${process.env.PORT_BASE}/${file.path}`;
      userInfoProfile = await Account.findByIdAndUpdate( req.uid, {
        "$set": body
      },
      {
        "new": true
      }
      ).select( "-password -__v" );

      return res.status( 201 ).json( jsonResponse( "success", userInfoProfile ) );
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
    const { code, email, password } = req.body,
      userInfo = await Account.findOne( { code, email } ),
      memberRole = await Role.findOne( { "_id": userInfo._role } );

    let resUserSync;

    if ( !userInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Phiên tạo mới mật khẩu của bạn đã hết hạn!" } );
    }

    // Sync
    resUserSync = await createNewPasswordSync( "users/new-password", { password }, { "Authorization": `sid=${signToken( userInfo._id )}; uid=${userInfo._id}; cfr=${memberRole.level};` } );
    if ( resUserSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }

    user.password = password;

    // Save
    await userInfo.save();

    // Reset code
    await Account.findByIdAndUpdate( userInfo._id, { "$set": { "code": "" } }, { "new": true } ).select( "-password" );

    res.status( 201 ).json( jsonResponse( "Change Password successfully!", null ) );
  },
  "resetPassword": async ( req, res, next ) => {
    const { email } = req.body,
      character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      buffer = fs.readFileSync( "./src/databases/template.json" ),
      template = JSON.parse( buffer );

    let code, cronCode, transporter, userAssignCode, userInfo;

    // Check validator
    if ( !email ) {
      return res.status( 404 ).json( { "status": "error", "message": "Vui lòng cung cấp email!" } );
    }

    userInfo = await Account.findOne( { email } );

    // Check errors
    if ( !userInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Email không tồn tại trên hệ thống!" } );
    }

    // Random get six character
    for ( let i = 0; i < 6; i++ ) {
      code += character.charAt( Math.floor( Math.random() * character.length ) );
    }

    // Use Smtp Protocol to send Email
    transporter = await mail.createTransport( {
      "service": "Gmail",
      "auth": {
        "user": process.env.MAIL_USERNAME,
        "pass": process.env.MAIL_PASSWORD
      }
    } );

    // Setup template email
    await transporter.sendMail(
      {
        "from": process.env.MAIL_USERNAME,
        "to": req.body.email,
        "subject": "Confirm reset password",
        "html": template.emailReset
      },
      ( err ) => {
        if ( err ) {
          return next( err );
        }
      }
    );

    // Update code temp
    userAssignCode = await Account.findOneAndUpdate( { "_id": userInfo._id }, { code } ).select( "-password" );

    if ( !userAssignCode ) {
      return res.status( 404 ).json( { "status": "error", "message": "[Email] Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }

    res.status( 201 ).json( { "status": "success", "message": `Vui lòng check email ${req.email} để lấy code` } );

    cronCode = await new CronJob( "* 5 * * * *", async () => {
      const user = await Account.findOne( { "_id": userInfo._id } );

      if ( user.code === "" || user.code === null ) {
        return;
      }

      await Account.findByIdAndUpdate( userInfo._id, { "$set": { "code": "" } }, { "new": true } ).select( "-password" );
    }, () => {
      cronCode.stop();
    }, true, true, "Asia/Ho_Chi_Minh" );
  },
  "checkCode": async ( req, res ) => {
    const { email, code } = req.body;

    let userInfo;

    if ( !email || !code ) {
      return res.status( 405 ).json( { "status": "error", "message": "Vui lòng cung cấp mã!" } );
    }

    userInfo = await Account.findOne( { email, code } );

    if ( !userInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Mã xác thực không chính xác!" } );
    }

    return res.status( 201 ).json( { "status": "success", "message": `${req.email} xác thực code thành công!` } );
  },
  "getUserInfoLostPass": async ( req, res ) => {
    const userInfo = await Account.findOne( { "email": req.query.email } ).select( "name email imageAvatar" );

    if ( !userInfo ) {
      return res.status( 405 ).json( { "status": "error", "message": "Tài khoản không tồn tại!" } );
    }
    res.status( 200 ).json( jsonResponse( "success", userInfo ) );
  },
  "signUp": async( req, res ) => {
    const newUser = new Account( req.body );

    await newUser.save();

    defaulSchema( newUser );

    res.send( { "status": "success", "data": "Synchronized..." } );
  }
};
