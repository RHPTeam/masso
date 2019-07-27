/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const BlockSchema = new Schema( {
  "name": String,
  "contents": [
    {
      "valueText": String,
      "typeContent": String
    }
  ],
  "_groupBlock": {
    "type": Schema.Types.ObjectId,
    "ref": "GroupBlock"
  },
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

BlockSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const Block = mongoose.model( "Block", BlockSchema );

module.exports = Block;
