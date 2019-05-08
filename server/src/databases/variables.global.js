/**
 * Global variables to access everywhere and save data to handle everything
 */
const cronListObjectProperties = {};

module.exports = {
  "set": ( key, value ) => {
    Object.defineProperty( cronListObjectProperties, key, {
      "value": value
    } );
  },
  "get": ( key ) => {
    return cronListObjectProperties[ key ];
  }
};
