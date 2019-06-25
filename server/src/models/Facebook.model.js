/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  FacebookSchema = new Schema( {
    "cookie": String,
    "email": String,
    "password": String,
    "userInfo": {
      "id": {
        "type": String,
        "default": ""
      },
      "name": {
        "type": String,
        "default": ""
      },
      "thumbSrc": {
        "type": String,
        "default": ""
      },
      "profileUrl": {
        "type": String,
        "default": ""
      }
    },
    "token": {
      "agent": String,
      "privacy": String,
      "token": String
    },
    "status": { "type": Boolean, "default": 0 },
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

FacebookSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const Facebook = mongoose.model( "Facebook", FacebookSchema );

module.exports = Facebook;
