/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  CampaignSchema = new Schema( {
    "title": { "type": String, "required": true },
    "description": String,
    "started_at": Date,
    "finished_at": Date,
    "status": { "type": Boolean, "default": 0 },
    "logs": {
      "content": [ {
        "message": String,
        "createdAt": Date
      } ],
      "total": {
        "type": Number,
        "default": 0
      }
    },
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "_events": [ {
      "type": Schema.Types.ObjectId,
      "ref": "Event"
    } ],
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "updated_at": Date
  } );

CampaignSchema.index( {
  "title": "text",
  "description": "text"
} );

CampaignSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const Campaign = mongoose.model( "Campaign", CampaignSchema );

CampaignSchema.on( "index", function ( error ) {
  if ( error ) {
    console.log( error.message );
  }
} );

module.exports = Campaign;
