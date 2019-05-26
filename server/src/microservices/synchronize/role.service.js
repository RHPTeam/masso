const axios = require( "axios/index" );

module.exports = {
  "roleSync": ( url ) => {
    return axios( {
      "method": "get",
      "url": url
    } );
  }
};
