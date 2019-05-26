/**
 * Controller users or account for project
 * author: hoc-anms
 * updater: sky albert
 * date up: 20/04/2019
 * date to: 25/05/2019
 * team: BE-RHP
 */
// const nodemailer = require( "nodemailer" ),
//   CronJob = require( "cron" ).CronJob;

const Account = require( "../models/Account.model" );

module.exports = {
  // "show": async ( req, _res ) => {
  //   console.log( req.uid );
  // },
  // "update": async ( req, res ) => {
  //   // const { body } = req;
  //   // const email = secure( res, req.headers.authorization );
  //   // const foundUser = await Account.findOne( { "email": email } );

  //   // if ( !foundUser ) {
  //   //   return res
  //   //     .status( 403 )
  //   //     .json( jsonResponse( "Người dùng không tồn tại!", null ) );
  //   // }

  //   // const dataResponse = await Account.findByIdAndUpdate(
  //   //   foundUser._id,
  //   //   {
  //   //     "$set": body
  //   //   },
  //   //   {
  //   //     "new": true
  //   //   }
  //   // ).select( "-password" );

  //   // // join property email to data send
  //   // update( `${process.env.SERVER_PARENT_API}/users`, req.headers, body );

  //   // res
  //   //   .status( 201 )
  //   //   .json( jsonResponse( "Update account successfull!", dataResponse ) );
  // },
  // "changePassword": async ( req, res ) => {
  //   // const userId = secure( res, req.headers.authorization );
  //   // const { body } = req;

  //   // if ( !userId ) {
  //   //   return res.status( 405 ).json( jsonResponse( "Not authorized!", null ) );
  //   // }
  //   // const foundUser = await Account.findById( userId );

  //   // if ( !foundUser ) {
  //   //   return res.status( 403 ).json( jsonResponse( "User is not found!", null ) );
  //   // }
  //   // if ( JSON.stringify( userId ) !== JSON.stringify( foundUser._id ) ) {
  //   //   return res.status( 403 ).json( jsonResponse( "Authorized is wrong!", null ) );
  //   // }
  //   // const isPassword = await foundUser.isValidPassword( body.password );

  //   // if ( !isPassword ) {
  //   //   return res.status( 403 ).json( jsonResponse( "Password is wrong!", null ) );
  //   // }
  //   // foundUser.password = body.newPassword;
  //   // await foundUser.save();
  //   // res.status( 201 ).json( jsonResponse( "Change Password successfully!", null ) );
  // },
  // "createNewPassword": async ( req, res ) => {
  //   // const userId = req.query._userId;
  //   // const { body } = req;

  //   // if ( !userId ) {
  //   //   return res.status( 405 ).json( jsonResponse( "Not authorized!", null ) );
  //   // }
  //   // const foundUser = await Account.findById( userId );

  //   // if ( !foundUser ) {
  //   //   return res.status( 403 ).json( jsonResponse( "User is not found!", null ) );
  //   // }
  //   // if ( JSON.stringify( userId ) !== JSON.stringify( foundUser._id ) ) {
  //   //   return res.status( 403 ).json( jsonResponse( "Authorized is wrong!", null ) );
  //   // }
  //   // foundUser.password = body.newPassword;
  //   // await foundUser.save();
  //   // res.status( 201 ).json( jsonResponse( "Change Password successfully!", null ) );
  // },
  // "resetPassword": async ( req, res, next ) => {
  //   // if ( !req.body.email ) {
  //   //   return res
  //   //     .status( 405 )
  //   //     .json( jsonResponse( "Vui lòng cung cấp email!", null ) );
  //   // }
  //   // const foundUser = await Account.findOne( {
  //   //   "email": req.body.email
  //   // } );

  //   // if ( !foundUser ) {
  //   //   return res
  //   //     .status( 405 )
  //   //     .json( jsonResponse( "Người dùng không tồn tại!", null ) );
  //   // }

  //   // let code = "";
  //   // const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  //   // for ( let i = 0; i < 6; i++ ) {
  //   //   code += possible.charAt( Math.floor( Math.random() * possible.length ) );
  //   // }

  //   // // Use Smtp Protocol to send Email
  //   // const transporter = await nodemailer.createTransport( {
  //   //   "service": "Gmail",
  //   //   "auth": {
  //   //     "user": process.env.MAIL_USERNAME,
  //   //     "pass": process.env.MAIL_PASSWORD
  //   //   }
  //   // } );

  //   // const html = `
  //   //   <div>
  //   //     <img src="http://zinbee.vn/assets/landing/image/logo/zinbee.png"> <br>
  //   //     <span style="font-size: 20px">Email tự động xác nhận passcode</span><br>
  //   //     <span style="font-size: 20px"><b>Code: ${code}</b> </span>
  //   //   </div>`;

  //   // await transporter.sendMail(
  //   //   {
  //   //     "from": process.env.MAIL_USERNAME,
  //   //     "to": req.body.email,
  //   //     "subject": "Confirm reset password",
  //   //     "html": html
  //   //   },
  //   //   // eslint-disable-next-line no-unused-vars
  //   //   ( err, info ) => {
  //   //     if ( err ) {
  //   //       return next( err );
  //   //     }
  //   //   }
  //   // );
  //   // const updateUser = await Account.findOneAndUpdate(
  //   //   {
  //   //     "email": req.body.email
  //   //   },
  //   //   {
  //   //     "code": code
  //   //   }
  //   // ).select( "-password" );

  //   // if ( !updateUser ) {
  //   //   return res
  //   //     .status( 405 )
  //   //     .json( jsonResponse( "Lỗi trong quá trình cập nhật mật khẩu!", null ) );
  //   // }
  //   /**
  //    * Cron job runs every minute set
  //    */
  //   // await new CronJob(
  //   //   "* 5 * * * *",
  //   //   async () => {
  //   //     const user = await Account.findById( foundUser._id );

  //   //     if ( user.code === "" || user.code === null ) {
  //   //       return false;
  //   //     }
  //   //     user.code = "";
  //   //     await Account.findByIdAndUpdate(
  //   //       foundUser._id,
  //   //       { "$set": { "code": "" } },
  //   //       { "new": true }
  //   //     ).select( "-password" );
  //   //     return true;
  //   //   },
  //   //   null,
  //   //   true,
  //   //   true,
  //   //   "Asia/Ho_Chi_Minh"
  //   // );
  //   // return res
  //   //   .status( 201 )
  //   //   .json( jsonResponse( "Cập nhật mật khẩu thành công!", null ) );
  // },
  // "checkCode": async ( req, res ) => {
  //   // const { email, code } = req.body;

  //   // if ( !email || !code ) {
  //   //   return res.status( 405 ).json( jsonResponse( "Not email or not code!", null ) );
  //   // }
  //   // const foundUser = await Account.findOne( {
  //   //   email
  //   // } );

  //   // if ( !foundUser ) {
  //   //   return res.status( 405 ).json( jsonResponse( "Not found User!", null ) );
  //   // }
  //   // if ( code !== foundUser.code ) {
  //   //   return res.status( 405 ).json( jsonResponse( "Code false!", null ) );
  //   // }
  //   // await Account.findByIdAndUpdate(
  //   //   foundUser._id,
  //   //   { "$set": { "code": "" } },
  //   //   { "new": true }
  //   // ).select( "-password" );
  //   // return res.status( 201 ).json( jsonResponse( "Code successfully!", null ) );
  // },
  // "getInforUserLostPass": async ( req, res ) => {
  //   // const foundUser = await Account.findOne( {
  //   //   "email": req.query.email
  //   // } ).select( "name email imageAvatar" );

  //   // if ( !foundUser ) {
  //   //   return res
  //   //     .status( 405 )
  //   //     .json( jsonResponse( "Người dùng không tồn tại!", null ) );
  //   // }
  //   // res
  //   //   .status( 200 )
  //   //   .json( jsonResponse( "Đây là tài khoản cũ của ban", foundUser ) );
  // },
  // "upload": async ( req, res ) => {
  //   // const email = secure( res, req.headers.authorization );
  //   // const foundUser = await Account.findOne( { "email": email } ).select( "-password" );

  //   // if ( !foundUser ) {
  //   //   return res
  //   //     .status( 403 )
  //   //     .json( jsonResponse( "Người dùng không tồn tại!", null ) );
  //   // }
  //   // foundUser.imageAvatar = `${process.env.APP_URL}:${process.env.PORT_BASE}/${ req.file.path.replace( /\\/gi, "/" )}`;
  //   // await Account.findByIdAndUpdate(
  //   //   userId,
  //   //   { "$set": { "imageAvatar": foundUser.imageAvatar } },
  //   //   { "new": true }
  //   // ).select( "-password" );
  //   // res
  //   //   .status( 200 )
  //   //   .json( jsonResponse( "Cập nhật ảnh đại diện thành công", foundUser ) );
  // },
  "signUp": async( req, res ) => {
    const newUser = new Account( req.body );

    await newUser.save();

    res.send( { "status": "success", "data": "Synchronized..." } );
  }
};
