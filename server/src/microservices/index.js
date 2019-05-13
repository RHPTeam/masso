// eslint-disable-next-line camelcase
const { agent } = require( "../configs/crawl" ),
  { port_socket } = require( "../configs/server" ),
  { checkLogin } = require( "../controllers/core/facebook.core" ),
  CronJob = require( "cron" ).CronJob,
  GLOBAL = require( "../databases/variables.global" ),
  express = require( "express" ),
  app = express(),
  // eslint-disable-next-line new-cap
  http = require( "http" ).Server( app ),
  io = require( "socket.io" )( http ),
  socketThread = {},
  errorsLogin = [],
  Facebook = require( "../models/Facebook.model" );

http.listen( port_socket );

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
      if ( statusLogin.error.code !== 200 ) {
        facebook.status = 0;
        await facebook.save();
        errorsLogin.push( facebook );
      }
    } ) );

    if ( errorsLogin.length > 0 ) {
      socketThread[ threadId ].emit( "statusAccount", false );
    }
  } );
} );
