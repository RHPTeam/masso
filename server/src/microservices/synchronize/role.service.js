const request = require( "axios" );

module.exports = {
  "roleSync": ( url ) => {
    let urlRequest = `${process.env.APP_PARENT_URL }/api/v1/${url}`;

    console.log( urlRequest );
    return request( {
      "method": "get",
      "url": urlRequest
    } );
  }
};
