/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  PostGroupSchema = new Schema( {
    "title": String,
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "_groups": Array,
    "_pages": Array,
    "_timeline": Array,
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "updated_at": Date
  } );

PostGroupSchema.index( {
  "title": "text"
} );

PostGroupSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const PostGroups = mongoose.model( "PostGroups", PostGroupSchema );

PostGroups.on( "index", function ( error ) {
  if ( error ) {
    console.log( error.message );
  }
} );

module.exports = PostGroups;
