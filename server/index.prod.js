const bodyParser = require( "body-parser" );
const fs = require( "fs" );
const cors = require( "cors" );
const https = require( "https" );
const express = require( "express" ),
  app = express(),
  logger = require( "morgan" ),
  options = {
    "pfx": fs.readFileSync( process.env.HTTPS_URL ),
    "passphrase": process.env.HTTPS_PASSWORD
  },
  server = https.createServer( options, app );

const api = require( "./src/routes" );
// eslint-disable-next-line no-unused-vars
const passportConfig = require( "./src/helpers/service/passport.service" );
const cookieParser = require( "cookie-parser" );
const mongoose = require( "mongoose" );
const passport = require( "passport" );
const Role = require( "./src/models/Role.model" );
const Help = require( "./src/models/help/Help.model" );

const io = require( "socket.io-client" ),
  socket = io.connect( "http://45.119.83.116:8388/", { "reconnection": true } );


// Combine module process to handle multi process
require( "./src/process" );
require( "./src/microservices" );

// connect to mongoose NoSQL DB
mongoose.connect( `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, {
  "useCreateIndex": true,
  "useNewUrlParser": true
} );
mongoose.set( "useFindAndModify", false );

app.set( "port", process.env.PORT_BASE );

app.use( cors() );
app.use( bodyParser.json( { "limit": "500MB", "extended": true } ) );
app.use( bodyParser.urlencoded( { "limit": "500MB", "extended": true } ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( logger( "tiny" ) );
// file image local
app.use( "/uploads", express.static( "uploads" ) );
app.use( cookieParser( process.env.APP_KEY ) );
app.use( "/api/v1", api );
app.use( "/", ( req, res ) => res.send( "API running!" ) );

// Create Role when not have
roleDefault = async () => {
  const foundRole = await Role.find( {} );

  if ( foundRole.length === undefined || foundRole.length === 0 ) {
    const arr = [
      { "level": "SuperAdmin" },
      { "level": "Admin" },
      { "level": "Member" }
    ];

    Role.insertMany( arr );
  }
};

roleDefault();

// Create help when not have
helpDefault = async () => {
  const foundHelp = await Help.find( {} );

  if ( foundHelp.length === undefined || foundHelp.length === 0 ) {
    const defaultHelp = await new Help( {} );

    await defaultHelp.save();
  }
};

helpDefault();

const Account = require( "./src/models/Account.model" ),
  PostFacebook = require( "./src/models/post/PostFacebook.model" );

socket.on( "connect", async () => {
  console.log( "connected to http://45.119.83.116:8288/" );

  socket.emit( "newKey", "handle here" );

  // Listen keyword user send and move to crawl server
  socket.on( "getKey", async ( data ) => {
    console.log( data );
    // Get keyword from database
    const foundAccount = await Account.find( {} ).select( "keywords" ),
      findPostFacebook = await PostFacebook.find( {} ).select( "title -_id" );

    socket.emit( "postFacebook", findPostFacebook );
    Promise.all( foundAccount.map( async ( account ) => {
      return account.keywords;
    } ) ).then( async ( item ) => {
      // Create event to send keyword search post
      socket.emit( "crawl", item.toString().split( "," ) );
    } );
  } );

  // Listen data response and process
  socket.on( "dataRes", async ( data ) => {
    // handling
    const newPostFacebook = await new PostFacebook( data );

    await newPostFacebook.save();

  } );

} );

// listen a port
server.listen( process.env.PORT_BASE, () => {
  console.log( `Api server running on ${process.env.APP_URL}` );
} );

module.exports = app;
