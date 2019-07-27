/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const MessageSchema = new Schema( {
  "contents": [ {
    "typeContent": String,
    "valueContent": String,
    "reference": {
      "type": Number,
      "default": 1 // 1 - customer, 2 - account facebook
    },
    "timeStamp": {
      "type": Date,
      "default": Date.now()
    }
  } ],
  "_account": {
    "type": Schema.Types.ObjectId,
    "ref": "Account"
  },
  "_sender": {
    "type": Schema.Types.ObjectId,
    "ref": "Facebook"
  },
  "_receiver": Object,
  "stranger": {
    "id": String,
    "name": String,
    "url": String,
    "image": String
  },
  "created_at": {
    "type": Date,
    "default": Date.now()
  },
  "updated_at": Date
} );

MessageSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const Message = mongoose.model( "Message", MessageSchema );

module.exports = Message;
