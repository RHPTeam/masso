const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  EventSchema = new Schema( {
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
      "location": {
        "type": String
      },
      "photos": {
        "type": Object
      },
      "place": {
        "type": String
      },
      "scape": {
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

EventSchema.pre( "save", function( next ) {
  /* eslint-disable camelcase */
  this.updated_at = Date.now();
  next();
} );

/* eslint-disable one-var */
const Event = mongoose.model( "Event", EventSchema );

module.exports = Event;
