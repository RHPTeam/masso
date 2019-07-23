const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  PostScheduleSchema = new Schema( {
    "facebookID": {
      "type": Schema.Types.ObjectId,
      "ref": "Facebook"
    },
    "postID": {
      "type": Schema.Types.ObjectId,
      "ref": "Post"
    },
    "location": Number, // 0: Timeline, 1: Group, 2: Page
    "targetID": {
      "type": String,
      "default": ""
    },
    "started_at": {
      "type": Date
    },
    "status": {
      "type": Boolean
    },
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "updated_at": {
      "type": Date
    }
  } );

PostScheduleSchema.pre( "save", function( next ) {
  /* eslint-disable camelcase */
  this.updated_at = Date.now();
  next();
} );

/* eslint-disable one-var */
const PostSchedule = mongoose.model( "PostSchedule", PostScheduleSchema );

module.exports = PostSchedule;
