const jwt = require( "jsonwebtoken" );

const jsonResponse = require( "../../configs/res" );
const Account = require( "../../models/Account.model" );
const config = require( "../../configs/server" );

/**
 *  The Auth Checker middleware function.
 */

module.exports = ( req, res, next ) => {
  if ( !req.headers.authorization ) {
    return res
      .status( 404 )
      .json( jsonResponse( "Cookie của bạn không được tìm thấy!", null ) );
  }
  const token = req.headers.authorization;

  return jwt.verify( token, config.JWT_SECRET, ( err, decoded ) => {
    if ( err ) {
      return res.status( 401 ).end();
    }
    const userId = decoded.sub;

    return Account.findById( userId, ( userErr, user ) => {
      if ( userErr || !user ) {
        return res.status( 401 ).end();
      }
      return next();
    } );
  } );
};
