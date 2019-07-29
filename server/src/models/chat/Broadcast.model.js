/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const BroadcastSchema = new Schema( {
  "enabled": {
    "type": Boolean,
    "default": false
  },
  "isValid": {
    "type": Boolean,
    "default": true
  },
  "synced": {
    "type": Boolean,
    "default": false
  },
  "title": {
    "type": String,
    "default": ""
  },
  "type": {
    "type": String,
    "default": "broadcast"
  },
  "cards": [ {
    "type": Schema.Types.ObjectId,
    "ref": "Card"
  } ],
  "userFilter": [ {
    "type": Schema.Types.ObjectId,
    "ref": "Friend"
  } ],
  "userActive": [ {
    "type": Schema.Types.ObjectId,
    "ref": "Facebook"
  } ],
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

BroadcastSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );


const Broadcast = mongoose.model( "Broadcast", BroadcastSchema );

module.exports = Broadcast;
