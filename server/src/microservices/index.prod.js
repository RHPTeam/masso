// eslint-disable-next-line camelcase
const fs = require( "fs" ),
  { agent } = require( "../configs/crawl" ),
  { checkLogin } = require( "../controllers/core/facebook.core" ),
  express = require( "express" ),
  app = express(),
  // eslint-disable-next-line new-cap
  https = require( "https" ),
  options = {
    "pfx": fs.readFileSync( process.env.HTTPS_URL ),
    // eslint-disable-next-line camelcase
    "passphrase": process.env.HTTPS_PASSWORD
  }, server = https.createServer( options, app ), io = require( "socket.io" )( server ),
  socketThread = {},
  Facebook = require( "../models/Facebook.model" );

let errorsLogin = [];

server.listen( process.env.PORT_SOCKET );

io.on( "connection", async ( socket ) => {
  console.log( `Client from post.zinbee.vn connected with id: ${socket.id}` );
  const threadId = socket.id;

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
