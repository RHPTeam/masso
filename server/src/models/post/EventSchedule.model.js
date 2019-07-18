const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  EventScheduleSchema = new Schema( {
    "facebookID": {
      "type": Schema.Types.ObjectId,
      "ref": "Facebook"
    },
    "postID": {
      "type": Schema.Types.ObjectId,
      "ref": "Post"
    },
    "mixOpen": {
      "type": Schema.Types.ObjectId,
      "ref": "PostCategory"
    },
    "mixClose": {
      "type": Schema.Types.ObjectId,
      "ref": "PostCategory"
    },
    "location": Number, // 0: Timeline, 1: Group, 2: Page
    "targetID": {
      "type": String,
      "default": ""
    },
    "started_at": {
      "type": Date
    },
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "_event": {
      "type": Schema.Types.ObjectId,
      "ref": "Event"
    },
    "_campaign": {
      "type": Schema.Types.ObjectId,
      "ref": "Campaign"
    },
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "updated_at": {
      "type": Date
    }
  } );

EventScheduleSchema.pre( "save", function( next ) {
  /* eslint-disable camelcase */
  this.updated_at = Date.now();
  next();
} );

/* eslint-disable one-var */
const EventSchedule = mongoose.model( "EventSchedule", EventScheduleSchema );

module.exports = EventSchedule;
