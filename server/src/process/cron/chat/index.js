/* eslint-disable new-cap */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable one-var */
const login = require( "facebook-chat-api" );
let CronJob = require( "cron" ).CronJob;
const express = require( "express" ),
  app = express();
const Account = require( "../../../models/Account.model" );
const nodemailer = require( "nodemailer" ),
  // When  upload to server comment 2 line after
  http = require( "http" ).Server( app ),
  io = require( "socket.io" )( http );

/*
 const fs = require('fs')

 const https = require('https')
 const options = {
    pfx: fs.readFileSync(CONFIG.pfx),
    passphrase: CONFIG.passphrase
 };
 const server = https.createServer(options,app)
 const io = require("socket.io")(server);
 */

/** ***********************************************************************/
const convertCookieToObject = require( "../../../helpers/utils/facebook/cookie" );
const cookieFacebook = require( "../../../configs/cookieFacebook" );
const convertUnicode = require( "../../../helpers/utils/functions/unicode" );
const ErrorText = require( "../../../configs/errors" );
/** ***********************************************************************/

/** ***********************************************************************/
const VocateProcess = require( "./module/vocate.process" );
const MessageProcess = require( "./module/message.process" );
const SyntaxProcess = require( "./module/syntax.process" );
const BroadcastProcess = require( "./module/broadcast.process" );
/** ***********************************************************************/

/** ***********************************************************************/
const Facebook = require( "../../../models/Facebook.model" );
const Friend = require( "../../../models/chat/Friend.model" );
const Message = require( "../../../models/chat/Message.model" );
const Vocate = require( "../../../models/chat/Vocate.model" );
const Syntax = require( "../../../models/chat/Syntax.model" );
const Broadcast = require( "../../../models/chat/Broadcast.model" ),
  /** ***********************************************************************/

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

// Start all task process multi thread
let chatAuto = async function( account ) {
  // Create api contain data of facebook chat plugin
  let api = null;

  // Get info user facebook by api chat facebook
  const getInfoFB = ( id ) => {
      return new Promise( ( resolve ) => {
        api.getUserInfo( id, ( err, ret ) => {
          resolve( ret[ id ] );
        } );
      } );
    },
    // Update info after login
    updateInfoFB = async ( api ) => {
      // Get user id from api chat facebook
      const facebookID = await api.getCurrentUserID(),
        // Get user info facebook from api chat facebook
        newInfoFB = await getInfoFB( facebookID ),
        // Get user info facebook from database
        userInfoFB = await Facebook.findOne( { "userInfo.id": facebookID } );

      // Set new value user info facebook
      userInfoFB.userInfo.name = newInfoFB.name;
      userInfoFB.userInfo.thumbSrc = `http://graph.facebook.com/${facebookID}/picture?type=large`;
      userInfoFB.userInfo.profileUrl = newInfoFB.profileUrl;
      await userInfoFB.save();
      return userInfoFB;
    },
    // Convert cookie to object which pass to facebook
    cookieObject = convertCookieToObject( account.cookie )[ 0 ],
    cookie = cookieFacebook(
      cookieObject.fr,
      cookieObject.datr,
      cookieObject.c_user,
      cookieObject.xs
    );

  try {
    api = await loginFacebook( cookie );
    // await updateFriendsFB(api)
    account = await updateInfoFB( api );
  } catch ( e ) {
    if ( account.status == 1 ) {
      account.status = 0;
      account.cookie = "";
      await account.save();
    }
    io.sockets.emit( "checkLogout", {
      "account": account,
      "error": ErrorText.LOGOUT,
      "code": ErrorText.CODELOGOUT
    } );

    const foundUser = await Account.findById( account._account ),
      // Use Smtp Protocol to send Email
      transporter = await nodemailer.createTransport( {
        "service": "Gmail",
        "auth": {
          "user": process.env.MAIL_USERNAME,
          "pass": process.env.MAIL_PASSWORD
        }
      } ),
      html = `
          <div>
            <img src="http://zinbee.vn/assets/landing/image/logo/zinbee.png"> <br>
            <span style="font-size: 20px">Có thể phiên đăng nhập tài khoản facebook ${account.userInfo.name} của bạn đã hết hạn do quá trình đăng xuất trên trình duyệt hoặc có lỗi phát sinh trong quá trình sử dụng hệ thống.</span><br>
            <span style="font-size: 20px">Vui lòng lấy lại cookie của tài khoản facebook và cập nhật lại trong hệ thống.</span> <br>
            <span style="font-size: 20px">Kỹ thuật chatbee</span> <br>
            <span style="font-size: 20px">Trân trọng!</span>
          </div>`;

    await transporter.sendMail(
      {
        "from": process.env.MAIL_USERNAME,
        "to": foundUser.email,
        "subject": "Beechat Hot Notification",
        "html": html
      },
      ( err, info ) => {
        if ( err ) {
          return err;
        }
      }
    );
  }

  // START ACTION SYSTEM: (Conditional system: api not null)
  if ( api !== null ) {
    // Active facebook account on system
    account.status = 1;
    account.save();

    // Setup SOCKET.IO when client connect to server
    io.on( "connection", async ( socket ) => {
      console.log( `Client connected with id: ${socket.id}` );
      // Event: Send message
      socket.on( "sendMessage", async function( dataEmit, callback ) {
        // get data infinite by
        // console.log(1)
        // console.log(dataEmit)
        let sendData = await MessageProcess.handleMessage(
          dataEmit,
          account,
          api
        );

        return callback( sendData );
      } );
      // Event: Get list friends
      socket.on( "getListFriends", async function( dataEmit ) {
        const vocaList = await Vocate.find( { "_account": account._account } );

        if ( dataEmit.includes( account._id ) ) {
          api.getFriendsList( ( err, data ) => {
            if ( !data ) {
              data = data
                .filter( ( e ) => {
                  if ( e.userID !== "0" ) {
                    return e;
                  }
                } )
                .map( ( e ) => {
                  return VocateProcess.getVocate( e, vocaList );
                } );
              socket.emit( "listFriends", { "data": data } );
            }
          } );
        }
        return true;
      } );
      // Event: Send message friends (Cron Job)
      socket.on( "sendMessageCronFriends", async function( dataEmit ) {
        // Check dataEmit of friend before cron
        const filteredData = dataEmit._friends.filter( ( friend ) => {
          if ( friend._friends.includes( account._id ) ) {
            return friend;
          }
        } );
        // Handle Cron job when timer later

        new CronJob(
          "*****",
          async function() {
            // Handle broadcasts from database or event listen from client with 'sendMessageCronFriends' event
          },
          null,
          true,
          "Asia/Ho_Chi_Minh"
        );
      } );

      // Event: Stop send message broadcast (Cron)
      socket.on( "removeCronBroadcast", async function( dataEmit, callback ) {
        // Handle auto send message in broadcast
        if ( dataEmit.accountId.toString() === account._account.toString() ) {
          let sendData = await BroadcastProcess.handleStopMessageScheduleBroadcast(
            dataEmit,
            account,
            api
          );

          return callback( sendData );
        }
      } );
      // Event: Send message broadcast (Cron)
      socket.on( "activeCronBroadcast", async function( dataEmit, callback ) {
        if ( dataEmit.accountId.toString() === account._account.toString() ) {
          let sendData = await BroadcastProcess.handleMessageScheduleBroadcast(
            dataEmit,
            account,
            api
          );

          return callback( sendData );
        }
      } );
    } );
    // Handle broadcast 1p call cron to send broadcast with per account facebook
    const findActiveBroadcast = await Broadcast.find( {
      "_account": account._account
    } );

    await findActiveBroadcast[ 1 ].blocks.map( async ( block ) => {
      if ( block.status === true ) {
        await BroadcastProcess.handleMessageScheduleBroadcast(
          block,
          account,
          api
        );
      }
    } );

    // Handle action listen from which api receive from facebook
    let stopListen = api.listen( async ( err, message ) => {
      console.log(message)
      // Handle error with api
      if ( err !== null ) {
        if ( err.code !== "ESOCKETTIMEDOUT" ) {
          if ( err.code === "ENOTFOUND" || err === "Not logged in." ) {
            if ( account.status == 1 ) {
              account.status = 0;
              account.cookie = "";
              account.save();
              io.sockets.emit( "checkLogout", {
                "account": account,
                "error": ErrorText.LOGOUT,
                "code": ErrorText.CODELOGOUT
              } );

              const foundUser = await Account.findById( account._account ),
                // Use Smtp Protocol to send Email
                transporter = await nodemailer.createTransport( {
                  "service": "Gmail",
                  "auth": {
                    "user": process.env.MAIL_USERNAME,
                    "pass": process.env.MAIL_PASSWORD
                  }
                } ),
                html = `
          <div>
            <img src="http://zinbee.vn/assets/landing/image/logo/zinbee.png"> <br>
            <span style="font-size: 20px">Có thể phiên đăng nhập tài khoản facebook ${
  account.userInfo.name
} của bạn đã hết hạn do quá trình đăng xuất trên trình duyệt hoặc có lỗi phát sinh trong quá trình sử dụng hệ thống.</span><br>
            <span style="font-size: 20px">Vui lòng lấy lại cookie của tài khoản facebook và cập nhật lại trong hệ thống.</span> <br>
            <span style="font-size: 20px">Kỹ thuật chatbee</span> <br>
            <span style="font-size: 20px">Trân trọng!</span> 
          </div>`;

              await transporter.sendMail(
                {
                  "from": process.env.MAIL_USERNAME,
                  "to": foundUser.email,
                  "subject": "Beechat Hot Notification",
                  "html": html
                },
                ( err, info ) => {
                  if ( err ) {
                    return err;
                  }
                }
              );
            }
            io.sockets.emit( "error", {
              "account": account,
              "error": ErrorText.LISTEN
            } );
          }
          return stopListen();
        }
      }

      // Handle message which facebook return something
      if ( message !== undefined && message.isGroup !== true ) {
        // Define variable message
        const messageContent = message.body,
          receiverID = message.senderID;
        let messageObject;
        // Handle message with text type

        messageObject = {
          "reference": 1,
          "timeStamp": Date.now(),
          "typeContent": "text",
          "valueContent": messageContent
        };
        // Define content message before save to database
        if ( message.attachments.length !== 0 ) {
          // Handle message with attachments type

          // 1: type photo
          if ( message.attachments[ 0 ].type === "photo" ) {
            messageObject = {
              "reference": 1,
              "timeStamp": Date.now(),
              "typeContent": "image",
              "valueContent": message.attachments[ 0 ].url
            };
          }
          // 2: type sticker
          if ( message.attachments[ 0 ].type === "sticker" ) {
            messageObject = {
              "reference": 1,
              "timeStamp": Date.now(),
              "typeContent": "sticker",
              "valueContent": message.attachments[ 0 ].url
            };
          }
        }
        // Check if not message, create message and user message
        const userInfoFB = await Friend.findOne( { "userID": receiverID } );
        // If not friend create message and add to friends

        if ( !userInfoFB ) {
          api.getUserInfo( message.senderID, async ( err, ret ) => {
            if ( err ) {
              return console.error( err );
            }

            const dataInfo = Object.values( ret )[ 0 ],
              objSave = {
                "alternateName":
                  dataInfo.alternateName === undefined ? "" : dataInfo.alternateName,
                "firstName":
                  dataInfo.firstName === undefined ? "" : dataInfo.firstName,
                "gender":
                  dataInfo.gender === 1 ? "female_singular" : dataInfo.gender === 2 ? "male_singular" : "",
                "userID": message.senderID,
                "fullName": dataInfo.name,
                "profilePicture": `http://graph.facebook.com/${
                  message.senderID
                }/picture?type=large`,
                "profileUrl": dataInfo.profileUrl,
                "vanity": dataInfo.vanity
              },
              friend = await new Friend( objSave );

            friend._facebook.push( account._id );
            friend._account.push( account._account );
            await friend.save();
            const messageResult = await Message.findOne( {
              "_account": account._account,
              "_sender": account._id,
              "_receiver": friend._id
            } )
              .populate( { "path": "_receiver", "select": "-_account -_facebook" } )
              .populate( {
                "path": "_sender",
                "select": "-cookie"
              } );

            if ( !messageResult ) {
              // Handle message never chat together
              const messageCurrentObject = {
                  "contents": [ messageObject ],
                  "created_at": Date.now(),
                  "seen": false,
                  "status": "online",
                  "_account": account._account,
                  "_receiver": friend._id,
                  "_sender": account._id
                },
                // console.log(2)
                // console.log(messageCurrentObject)
                messageCurrent = new Message( messageCurrentObject );

              await messageCurrent.save();
            } else {
              // Handle message chatted
              messageResult.seen = false;
              messageResult.contents.push( messageObject );
              await messageResult.save();
            }

            // Handle message  is a script in syntax
            const foundAllSyntax = await Syntax.find( {
                "_account": account._account
              } ),
              // found syntax when customer message to
              foundSyntax = foundAllSyntax
                .map( ( syntax ) => {
                  if ( syntax._facebook.indexOf( account._id ) >= 0 ) {
                    return syntax;
                  }
                } )
                .filter( ( item ) => {
                  if ( item === undefined ) {
                    return;
                  }
                  return true;
                } )
                .filter( ( item ) => {
                  const filterName = item.name.find(
                    ( name ) =>
                      convertUnicode( name.toLowerCase() ).toString() === convertUnicode(
                        message.body.trim().toLowerCase()
                      ).toString()
                  );

                  if ( !filterName ) {
                    return;
                  }
                  return true;
                } )[ 0 ];

            if ( foundSyntax !== undefined ) {
              const data = await SyntaxProcess.handleSyntax(
                message,
                foundSyntax,
                account,
                api
              );
            }

            // Handle message  is a script in block
            // const foundAllBlock = await Block.find({'_account': account._account})
            // const foundBlock = foundAllBlock.find(val => convertUnicode(val.name).toString().toLowerCase() === convertUnicode(message.body).toString().toLowerCase())
            // if (foundBlock !== undefined) {
            //   const data = await BlockProcess.handleBlock(message, foundBlock, account, api)
            // }

            // Get data chat after update listen from api
            const messageUpdated = await Message.findOne( {
              "_account": account._account,
              "_sender": account._id,
              "_receiver": friend._id
            } )
              .populate( { "path": "_receiver", "select": "-_account -_facebook" } )
              .populate( {
                "path": "_sender",
                "select": "-cookie"
              } );

            return io.sockets.emit( "receiveMessage", {
              "message": messageUpdated
            } );
          } );
          return;
        }

        const messageResult = await Message.findOne( {
          "_account": account._account,
          "_sender": account._id,
          "_receiver": userInfoFB._id
        } )
          .populate( { "path": "_receiver", "select": "-_account -_facebook" } )
          .populate( {
            "path": "_sender",
            "select": "-cookie"
          } );

        if ( !messageResult ) {
          // Handle message never chat together
          const messageCurrentObject = {
              "contents": [ messageObject ],
              "created_at": Date.now(),
              "seen": false,
              "status": "online",
              "_account": account._account,
              "_receiver": userInfoFB._id,
              "_sender": account._id
            },
            // console.log(2)
            // console.log(messageCurrentObject)
            messageCurrent = new Message( messageCurrentObject );

          await messageCurrent.save();
        } else {
          // Handle message chatted
          messageResult.seen = false;
          messageResult.contents.push( messageObject );
          await messageResult.save();
        }

        // Handle message  is a script in syntax
        const foundAllSyntax = await Syntax.find( {
            "_account": account._account
          } ),
          // found syntax when customer message to
          foundSyntax = foundAllSyntax
            .map( ( syntax ) => {
              if ( syntax._facebook.indexOf( account._id ) >= 0 ) {
                return syntax;
              }
            } )
            .filter( ( item ) => {
              if ( item === undefined ) {
                return;
              }
              return true;
            } )
            .filter( ( item ) => {
              const filterName = item.name.find(
                ( name ) =>
                  convertUnicode( name.toLowerCase() ).toString() === convertUnicode( message.body.trim().toLowerCase() ).toString()
              );

              if ( !filterName ) {
                return;
              }
              return true;
            } )[ 0 ];

        if ( foundSyntax !== undefined ) {
          const data = await SyntaxProcess.handleSyntax(
            message,
            foundSyntax,
            account,
            api
          );
        }

        // Handle message  is a script in block
        // const foundAllBlock = await Block.find({'_account': account._account})
        // const foundBlock = foundAllBlock.find(val => convertUnicode(val.name).toString().toLowerCase() === convertUnicode(message.body).toString().toLowerCase())
        // if (foundBlock !== undefined) {
        //   const data = await BlockProcess.handleBlock(message, foundBlock, account, api)
        // }

        // Get data chat after update listen from api
        const messageUpdated = await Message.findOne( {
          "_account": account._account,
          "_sender": account._id,
          "_receiver": userInfoFB._id
        } )
          .populate( { "path": "_receiver", "select": "-_account -_facebook" } )
          .populate( {
            "path": "_sender",
            "select": "-cookie"
          } );

        return io.sockets.emit( "receiveMessage", {
          "message": messageUpdated
        } );
      }
    } );
  }
  return account;
};

// When  upload to server comment line after
http.listen( 8889 );
// server.listen( process.env.PORT_SOCKET );
module.exports = chatAuto;
