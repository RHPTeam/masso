const request = require( "axios" );

module.exports = {
  "updateUserSync": ( url, data, headers ) => {
    let urlRequest = `${process.env.APP_PARENT_URL }/api/v1/${url}`;

    return request( {
      "method": "patch",
      "url": urlRequest,
      "data": data,
      "headers": headers
    } );
  }
};
