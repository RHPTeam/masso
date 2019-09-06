/**
 * Model users or account for project
 * author: hoc-anms
 * date up: 20/04/2019
 * date to: ___
 * team: BE-RHP
 */
/* eslint-disable strict */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema;

const rcrypt = require( "../helpers/secures/rcrypt" ),

  AccountSchema = new Schema( {
    "name": String,
    "email": {
      "type": String,
      "unique": true
    },
    "password": String,
    "phone": String,
    "status": Boolean,
    "code": String,
    "expireDate": Date,
    "keywords": Array,
    "maxAccountFb": {
      "type": Number,
      "default": 2
    },
    "presenter": { "type": String, "default": "" },
    "imageAvatar": String,
    "language": {
      "type": String,
      "default": "vi"
    },
    "settings": {
      "themeCustom": {
        "typeTheme": { "type": String, "default": "auto" },
        "valueTheme": String
      },
      "system": {
        "tutorial": { "type": Number, "default": 1 },
        "suggest": { "type": Number, "default": 1 }
      }
    },
    "_role": {
      "type": Schema.Types.ObjectId,
      "ref": "Role"
    },
    "_server": {
      "type": Schema.Types.ObjectId,
      "ref": "Server"
    },
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "keywordSearch": [ {
      "content": String,
      "time": Date
    } ],
    "other01": String, // id of phpMyadmin from older server
    "other02": String,
    "updated_at": Date
  } );

AccountSchema.pre( "save", async function( next ) {
  try {
    this.password = await rcrypt.encode( this.password, 10 );
    // eslint-disable-next-line camelcase
    this.updated_at = Date.now();
    next();
  } catch ( error ) {
    next( error );
  }
} );

// =================== METHODS ========================= //

AccountSchema.methods.isValidPassword = async function( newPassword ) {
  try {
    const password = this.password;

    return await rcrypt.unlock( newPassword, password );
  } catch ( error ) {
    throw new Error( error );
  }
};

// eslint-disable-next-line one-var
const Account = mongoose.model( "Account", AccountSchema );

module.exports = Account;
