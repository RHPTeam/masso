// eslint-disable-next-line camelcase
const fs = require( "fs" ),
  http = require( "http" ),
  https = require( "https" ),
  express = require( "express" ),
  app = express();

let server = null, io = null;

if ( process.env.APP_ENV === "production" ) {
  const option = {
    "pfx": fs.readFileSync( process.env.HTTPS_URL ),
    "passphrase": process.env.HTTPS_PASSWORD
  };

  server = https.createServer( option, app );
} else {
  server = http.createServer( app );
}

io = require( "socket.io" )( server );

server.listen( process.env.PORT_SOCKET );

io.on( "connection", async ( socket ) => {
  console.log( `Client from ${process.env.APP_URL}:${process.env.PORT_BASE} connected with id: ${socket.id}` );
} );

module.exports = {

};
