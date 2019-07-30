/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const CardSchema = new Schema( {
  "config": Object,
  "isValid": {
    "type": Boolean,
    "default": true
  },
  "pluginId": {
    "type": String,
    "default": ""
  },
  "created_at": {
    "type": Date,
    "default": Date.now()
  },
  "updated_at": Date
} );

CardSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );


const Card = mongoose.model( "Card", CardSchema );

module.exports = Card;
