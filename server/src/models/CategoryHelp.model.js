const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  CategoryHelpSchema = new Schema( {
    "title": String,
    "level": Number, // 1 2 3
    "parent": String,
    "_blogHelp": [ {
      "type": Schema.Types.ObjectId,
      "ref": "BlogHelp"
    } ],
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    }
  } ),

  CategoryHelp = mongoose.model( "CategoryHelp", CategoryHelpSchema );

module.exports = CategoryHelp;
