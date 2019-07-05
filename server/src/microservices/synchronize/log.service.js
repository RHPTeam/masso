const request = require( "axios" );

module.exports = {
  "logUserAction": ( url, data, headers ) => {
    return request( {
      "method": "post",
      "url": `${process.env.APP_PARENT_URL}/api/v1/${url}`,
      "data": data,
      "headers": headers
    } );
  }
};
