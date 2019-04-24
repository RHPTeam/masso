const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  RoleSchema = new Schema( {
    "level": String,
    "_members": [
      {
        "type": Schema.Types.ObjectId,
        "ref": "Account"
      }
    ],
    "_owners": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    }
  } ),

  Role = mongoose.model( "Role", RoleSchema );

module.exports = Role;
