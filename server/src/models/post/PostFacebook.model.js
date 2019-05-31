/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,
  PostFacebookSchema = new Schema( {
    "title": String,
    "content": String,
    "color": String,
    "attachments": [
      {
        "link": String,
        "typeAttachment": Number // 0 video 1 image
      }
    ],
    "place": String,
    "scrape": String,
    "tags": Array,
    "activity": {
      "typeActivity": String,
      "id": String,
      "text": String
    },
    "like": Number,
    "share": Number,
    "vote": Number,
    "generate": Boolean, // 1 crawl, 0 user, admin
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

PostFacebookSchema.index( {
  "title": "text",
  "content": "text"
} );

PostFacebookSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const PostFacebook = mongoose.model( "PostFacebook", PostFacebookSchema );

<<<<<<< HEAD
PostFacebook.on( "index.vue", function ( error ) {
=======
PostFacebook.on( "index1.vue", function ( error ) {
>>>>>>> 412889344a0e88c616eca6ae524b4e507e1339af
  if ( error ) {
    console.log( error.message );
  }
} );

module.exports = PostFacebook;
