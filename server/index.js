process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const bodyParser = require( "body-parser" );
const fs = require( "fs" );
const cors = require( "cors" );
const http = require( "http" );
const https = require( "https" );
const express = require( "express" ),
  app = express(),
  logger = require( "morgan" );
const api = require( "./src/routes" );
const mongoose = require( "mongoose" );
const passport = require( "passport" );
const dotenv = require( "dotenv" );

let server = null, directoryLog = null;

dotenv.config( { "path": ".env" } );
if ( process.env.APP_ENV === "production" ) {
  const options = {
    "pfx": fs.readFileSync( process.env.HTTPS_URL ),
    "passphrase": process.env.HTTPS_PASSWORD
  };

  server = https.createServer( options, app );
} else {
  server = http.createServer( app );
}

// Multi
require( "./src/helpers/services/passport.service" );
require( "./src/process" );
require( "./src/microservices" );

// connect to mongoose NoSQL DB
mongoose.connect( `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, {
  "useCreateIndex": true,
  "useNewUrlParser": true
} );
mongoose.set( "useFindAndModify", false );

app.set( "port", process.env.PORT_BASE );

app.use( cors( {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "allowedHeaders": [ "Content-Type", "Authorization" ],
  "exposedHeaders": [ "Cookie" ] } ) );
app.use( bodyParser.json( { "limit": "500MB", "extended": true } ) );
app.use( bodyParser.urlencoded( { "limit": "500MB", "extended": true } ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( logger( "dev" ) );
// file image local
app.use( "/uploads", express.static( "uploads" ) );
app.use( "/api/v1", api );
app.use( "/", ( req, res ) => res.send( "API running!" ) );

// listen a port
server.listen( process.env.PORT_BASE, () => {
  console.log( `Api server running on ${process.env.APP_URL}:${process.env.PORT_BASE}` );
} );

directoryLog = __dirname.includes( "/" ) ? `${__dirname }/src/databases/log` : `${__dirname }\\src\\databases\\log`;

if ( !fs.existsSync( directoryLog ) ) {
  fs.mkdir( directoryLog, ( err ) => {
    if ( err ) {
      throw err;
    }
    fs.writeFile( __dirname.includes( "/" ) ? directoryLog + "/schedule.txt" : directoryLog + "\\schedule.txt", "Starting Log...\r\n", function ( error ) {
      if ( error ) {
        throw error;
      }
      console.log( "File log is created successfully." );
    } );
  } );
}


module.exports = app;
