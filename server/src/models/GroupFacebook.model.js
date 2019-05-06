/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  GroupFacebookSchema = new Schema( {
    "groupId": String,
    "name": String,
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "_facebook": {
      "type": Schema.Types.ObjectId,
      "ref": "Facebook"
    },
    "_groups": [ {
      "type": Schema.Types.ObjectId,
      "ref": "PostGroups"
    } ],
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "updated_at": Date
  } );

GroupFacebookSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const GroupFacebook = mongoose.model( "GroupFacebook", GroupFacebookSchema );

module.exports = GroupFacebook;
