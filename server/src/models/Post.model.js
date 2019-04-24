/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  PostSchema = new Schema( {
    "title": { "type": String, "default": "" },
    "content": { "type": String, "default": "" },
    "attachments": [ {
      "link": String,
      "typeAttachment": Number

    } ],
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "_categories": [ {
      "type": Schema.Types.ObjectId,
      "ref": "PostCategory"
    } ],
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

const Post = mongoose.model( "Post", PostSchema );

module.exports = Post;
