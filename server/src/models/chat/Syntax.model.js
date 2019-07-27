/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const SyntaxSchema = new Schema( {
  "title": String,
  "name": [],
  "content": [ {
    "typeContent": String,
    "valueContent": String
  } ],
  "_facebook": [ {
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

SyntaxSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const Syntax = mongoose.model( "Syntax", SyntaxSchema );

module.exports = Syntax;
