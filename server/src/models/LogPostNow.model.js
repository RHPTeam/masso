/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  LogPostNowSchema = new Schema( {
    "content": [ {
      "message": String,
      "createAt": Date
    } ],
    "total": {
      "type": Number,
      "default": 0
    },
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "updated_at": Date
  } );

LogPostNowSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const LogPostNow = mongoose.model( "LogPostNow", LogPostNowSchema );

module.exports = LogPostNow;
