const jwt = require( "jsonwebtoken" ),
  { findSubString } = require( "../utils/functions/string" ),
  Account = require( "../../models/Account.model" );

module.exports = ( req, res, next ) => {
  if ( !req.headers.authorization ) {
    return res.status( 405 ).json( { "status": "error", "message": "Cookie của bạn không được tìm thấy!" } );
  }

  const authorization = req.headers.authorization;

  // Decode Cookie to get sid

  return jwt.verify( findSubString( authorization, "sid=", ";" ), process.env.APP_KEY, ( error, decoded ) => {
    if ( error ) {
      return res.status( 405 ).json( { "status": "error", "message": "Cookie của bạn không đúng!" } );
    }

    const id = decoded.sub;

    return Account.findOne( { "_id": id }, ( err, user ) => {
      if ( err || !user ) {
        return res.status( 405 ).json( { "status": "error", "message": "Cookie của bạn không hợp lệ!" } );
      }
      req.uid = id;
      return next();
    } );
  } );
};
