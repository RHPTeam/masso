// eslint-disable-next-line camelcase
const { port_socket, pfx_url, pfx_pass } = require( "../configs/server" ),
  { agent } = require( "../configs/crawl" ),
  { checkLogin } = require( "../controllers/core/facebook.core" ),
  express = require( "express" ),
  app = express(),
  // eslint-disable-next-line new-cap
  https = require( "https" ),
  options = {
    "pfx": fs.readFileSync( pfx_url ),
    // eslint-disable-next-line camelcase
    "passphrase": pfx_pass
  }, server = https.createServer( options, app ), io = require( "socket.io" )( server ),
  socketThread = {},
  Facebook = require( "../models/Facebook.model" );

let errorsLogin = [];

<<<<<<< HEAD
https.listen( port_socket );
=======
server.listen( port_socket );
>>>>>>> dev-toantr-vue

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
