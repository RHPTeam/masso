// eslint-disable-next-line camelcase
const { agent } = require( "../configs/crawl" ),
  { checkLogin } = require( "../controllers/core/facebook.core" ),
  express = require( "express" ),
  app = express(),
  // eslint-disable-next-line new-cap
  http = require( "http" ).Server( app ),
  io = require( "socket.io" )( http ),
  socketThread = {},
  Account = require( "../models/Account.model" ),
  Facebook = require( "../models/Facebook.model" );

let errorsLogin = [];

http.listen( process.env.PORT_SOCKET );

io.on( "connection", async ( socket ) => {
  console.log( `Client from post.zinbee.vn connected with id: ${socket.id}` );
  // Check server have one more account
  const threadId = socket.id,
    accountTest = await Account.find( {} ).limit( 1 ).lean();

  if ( accountTest.length === 0 ) {
    return false;
  }

  socketThread[ threadId ] = socket;

  // Listen check login
  socket.on( "check_login", async ( data ) => {

    // Get all facebook account
    const facebookAccountList = await Facebook.find( { "_account": data } );

    // Check one of facebook account list
    await Promise.all( facebookAccountList.map( async ( facebook ) => {
      // Check by crawl to facebook.com
      const statusLogin = await checkLogin( { "cookie": facebook.cookie, agent } );

      // Check error not same 200
      if ( statusLogin.error.code === 405 ) {
        facebook.status = 0;
        await facebook.save();
        errorsLogin.push( statusLogin.error.code );
      } else if ( statusLogin.error.code === 404 ) {
        errorsLogin.push( statusLogin.error.code );
      }
    } ) );

    if ( errorsLogin.length > 0 ) {
      socketThread[ threadId ].emit( "statusAccount", errorsLogin[ 0 ] );
      errorsLogin = [];
    }
  } );
} );
