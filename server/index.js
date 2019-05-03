const bodyParser = require( "body-parser" );
const config = require( "./src/configs/server" );
const cors = require( "cors" );
const http = require( "http" );
const express = require( "express" ),
  app = express(),
  logger = require( "morgan" ),
  server = http.createServer( app );
const api = require( "./src/routes" );
// eslint-disable-next-line no-unused-vars
const passportConfig = require( "./src/helpers/service/passport.service" );
const cookieParser = require( "cookie-parser" );
const mongoose = require( "mongoose" );
const passport = require( "passport" );
const Role = require( "./src/models/Role.model" );

// connect to mongoose NoSQL DB
mongoose.connect( `${config.db}/postv2`, {
  "useCreateIndex": true,
  "useNewUrlParser": true
} );
mongoose.set( "useFindAndModify", false );

app.set( "port", config.port );

app.use( cors() );
app.use( bodyParser.json( { "limit": "500MB", "extended": true } ) );
app.use( bodyParser.urlencoded( { "limit": "500MB", "extended": true } ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( logger( "tiny" ) );
// file image local
app.use( "/uploads", express.static( "uploads" ) );
app.use( cookieParser( config.JWT_SECRET ) );
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

// listen a port
server.listen( config.port, () => {
  console.log( `Api server running on ${config.url}` );
} );

module.exports = app;
