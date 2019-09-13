/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  PostCategorySchema = new Schema( {
    "title": String,
    "description": String,
    "mix": {
      "type": Boolean,
      "default": false
    },
    "totalPosts": {
      "type": Number,
      "default": 0
    },
    "postExample": Array, // check post in folder example exist create
    "idFolderExample": String, // check user have copy folder example?
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "updated_at": Date,
    "other01": String,
    "other02": String
  } );

PostCategorySchema.index( {
  "title": "text",
  "description": "text"
} );

PostCategorySchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const PostCategory = mongoose.model( "PostCategory", PostCategorySchema );

PostCategorySchema.on( "index", function ( error ) {
  if ( error ) {
    console.log( error.message );
  }
} );

module.exports = PostCategory;
