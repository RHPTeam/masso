// Default when init system schedule object null
const schedule = {}, keyDefault = "rhp";

module.exports = {
  set ( key, value ) {
    schedule[ keyDefault + key ] = value;
  },

  get ( key ) {
    return schedule[ keyDefault + key ];
  },

  objectKeyExists ( key ) {
    return schedule.hasOwnProperty( key );
  }
};
