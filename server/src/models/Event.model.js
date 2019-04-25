/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  EventSchema = new Schema( {
    "title": { "type": String, "required": true },
    "typeEvent": Number,
    "started_at": Date,
    "finished_at": Date,
    "status": { "type": Boolean, "default": 0 },
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "_post": [ {
      "type": Schema.Types.ObjectId,
      "ref": "Post"
    } ],
    "_targets": [ {
      "id": String,
      "typeTarget": Number
    } ],
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "updated_at": Date
  } );

EventSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const Event = mongoose.model( "Event", EventSchema );

module.exports = Event;
