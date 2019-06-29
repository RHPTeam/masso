const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  EventScheduleSchema = new Schema( {
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
        "type": Object
      },
      "photos": {
        "type": Object
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
