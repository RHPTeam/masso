const app = require( "./app" );
const api = require( "./src/routes" );
const debug = require( "debug" );
const fs = require( "fs" );
const http = require( "http" );
const https = require( "https" );
let server;

if ( process.env.APP_ENV === "production" ) {
  const options = {
    "pfx": fs.readFileSync( process.env.HTTPS_URL ),
    "passphrase": process.env.HTTPS_PASSWORD
  };

  server = https.createServer( options, app );
} else {
  server = http.createServer( app );
}

app.use( "/api/v1", api );
app.use( "/", ( _req, res ) => res.send( "API running!" ) );

// eslint-disable-next-line one-var
const serverCluster = server.listen( process.env.APP_PORT || 3000, function () {
  debug( `Server listening on port ${serverCluster.address().port}` );
  console.log( `Server listening on port ${serverCluster.address().port}` );
} );
