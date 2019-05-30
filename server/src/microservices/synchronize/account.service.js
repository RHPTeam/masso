const request = require( "axios" ),
  urlRequest = `${process.env.APP_PARENT_URL }/api/v1/`;

module.exports = {
  "changePasswordSync": ( url, data, headers ) => {
    return request( {
      "method": "patch",
      "url": urlRequest + url,
      "data": data,
      "headers": headers
    } );
  },
  "createNewPasswordSync": ( url, data, headers ) => {
    return request( {
      "method": "patch",
      "url": urlRequest + url,
      "data": data,
      "headers": headers
    } );
  },
  "updateUserSync": ( url, data, headers ) => {
    return request( {
      "method": "patch",
      "url": urlRequest + url,
      "data": data,
      "headers": headers
    } );
  }
};
