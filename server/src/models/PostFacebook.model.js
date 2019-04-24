/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  PostFacebookSchema = new Schema( {
    "content": String,
    "attachments": [ {
      "link": String,
      "typeAttachment": Number
    } ],
    "like": Number,
    "share": Number,
    "vote": Number,
    "generate": Boolean,
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

PostSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const PostFacebook = mongoose.model( "PostFacebook", PostFacebookSchema );

module.exports = PostFacebook;
