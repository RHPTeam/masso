const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  PostScheduleSchema = new Schema( {
    "cookie": {
      "type": String
    },
    "feed": {
      "activity": {
        "type": Object
      },
      "color": {
        "type": String
      },
      "content": {
        "type": String
      },
      "location": { // Where is post? profile, fanpage, group
        "type": Object
      },
      "photos": {
        "type": Array
      },
      "place": {
        "type": String
      },
      "scrape": {
        "type": String
      },
      "tags": {
        "type": Array
      }
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
    "_post": {
      "type": Schema.Types.ObjectId,
      "ref": "Post"
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
