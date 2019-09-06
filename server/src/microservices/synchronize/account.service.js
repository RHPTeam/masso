const request = require( "axios" );

module.exports = {
  "changePasswordSync": ( url, data, headers ) => {
    return request( {
      "method": "patch",
      "url": `${process.env.APP_PARENT_URL}/api/v1/${url}`,
      "data": data,
      "headers": headers
    } );
  },
  "updateUserSync": ( url, data, headers ) => {
    return request( {
      "method": "patch",
      "url": `${process.env.APP_PARENT_URL}/api/v1/${url}`,
      "data": data,
      "headers": headers
    } );
  }
};
