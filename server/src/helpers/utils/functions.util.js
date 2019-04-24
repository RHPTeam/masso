/* eslint-disable strict */
module.exports = {
  "findSubString": ( str, start, end ) => {
    if ( !end ) {
      return str.substring( str.indexOf( start ) + start.length );
    }
    return str.substring( str.indexOf( start ) + start.length, str.indexOf( end, str.indexOf( start ) + start.length ) );
  }
};
