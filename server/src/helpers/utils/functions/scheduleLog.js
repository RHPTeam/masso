/* eslint-disable no-multi-spaces */
/* eslint-disable prefer-template */
const fs = require( "fs" );

module.exports = {
  "startedSchedule": ( obj, path ) => {
    const date = new Date(),
      // eslint-disable-next-line prefer-template
      dataRest = "C:" + obj._campaign.toString() + ", E:" + obj._event.toString() + ", ES:" + obj._id.toString();

    fs.appendFile( path.includes( "/" ) ? path.replace( "controllers/post", "databases/log/schedule.txt" ) : path.replace( "controllers\\post", "databases\\log\\schedule.txt" ), `[StartedSchedule_${date.toLocaleString()}]` + dataRest + "\r\n", "utf-8",  function ( err ) {
      if ( err ) {
        throw err;
      }
    } );
  },
  "finishedSchedule": ( obj, path ) => {
    const date = new Date(),
      // eslint-disable-next-line prefer-template
      dataRest = "C:" + obj._campaign.toString() + ", E:" + obj._event.toString() + ", ES:" + obj._id.toString();

    fs.appendFile( path.includes( "/" ) ? path.replace( "controllers/post", "databases/log/schedule.txt" ) : path.replace( "controllers\\post", "databases\\log\\schedule.txt" ), `[FinishedSchedule_${date.toLocaleString()}]` + dataRest + "\r\n", "utf-8",  function ( err ) {
      if ( err ) {
        throw err;
      }
      console.log( "Saved!" );
    } );
  },
  "deletedSchedule": ( obj, path ) => {
    const date = new Date(),
      // eslint-disable-next-line prefer-template
      dataRest = "C:" + obj._campaign.toString() + ", E:" + obj._event.toString() + ", ES:" + obj._id.toString();

    fs.appendFile( path.includes( "/" ) ? path.replace( "controllers/post", "databases/log/schedule.txt" ) : path.replace( "controllers\\post", "databases\\log\\schedule.txt" ), `[DeletedSchedule_${date.toLocaleString()}]` + dataRest + "\r\n", "utf-8",  function ( err ) {
      if ( err ) {
        throw err;
      }
    } );
  }
};
