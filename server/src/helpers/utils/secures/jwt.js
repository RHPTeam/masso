const jwt = require( "jsonwebtoken" ),
  { findSubString } = require( "../../utils/functions/string" );

module.exports = ( res, authorization ) => {
  return jwt.verify( findSubString( authorization, "sid=", ";" ), process.env.APP_KEY, ( err, decoded ) => {
    if ( err ) {
      return res.status( 401 ).end();
    }
    return decoded.sub;
  } );
};
