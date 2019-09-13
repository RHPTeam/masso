const JWT = require( "jsonwebtoken" );

module.exports = {
  "signToken": ( user ) => {
    return JWT.sign(
      {
        "iss": "RHPTeam",
        "sub": user._id,
        "iat": new Date().getTime(),
        "exp": new Date().setDate( new Date().getMinutes() + 3 )
      },
      process.env.APP_KEY
    );
  },
  "decodeToken": ( token ) => {
    return JWT.verify( token, process.env.APP_KEY );
  }
};
