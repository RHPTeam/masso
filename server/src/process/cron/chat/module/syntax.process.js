const Block = require( "../../../../models/chat/Block.model" );

const BlockProcess = require( "./block.process" );
const MessageProcess = require( "./message.process" );

module.exports = {
  // Handle message when vocative and scripts
  "handleSyntax": async ( message, foundSyntax, account, api ) => {
    return new Promise( async ( resolve ) => {
      const randomItem = ( foundSyntax.content )[ Math.floor( Math.random() * ( foundSyntax.content ).length ) ];

      if ( randomItem.typeContent === "block" ) {
        randomItem.valueContent.split( "," ).forEach( async ( item ) => {
          const foundBlock = await Block.findById( item );
          let result = await BlockProcess.handleBlock( message, foundBlock, account, api );

          resolve( result );
        } );
      } else if ( randomItem.typeContent === "text" ) {
        let data = {
            "message": randomItem.valueContent,
            "type": "text",
            "_account": account._account,
            "_sender": account._id,
            "_receiver": message.senderID
          },
          result = MessageProcess.handleMessage( data, account, api );

        resolve( result );
      }
    } );
  }
};
