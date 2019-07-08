/* eslint-disable no-unused-vars */
const Role = require( "../models/Role.model" );
const Facebook = require( "../models/Facebook.model" );
const { roleSync } = require( "../microservices/synchronize/role.service" );

// Other process
require( "./cron/post/campaign" );
// require( "./cron/post/post" );
// const chatAuto = require( "./cron/chat/index" );

( async () => {
  const roleList = await Role.find( {} ),
    accountFacebookList = await Facebook.find( {} ),
    resRole = await roleSync( "roles/sync" );

  // Check Role First Time Server running
  if ( resRole.data.data.length > roleList.length ) {
    console.log( "Start sync role" );

    // Catch
    if ( resRole.data.status !== "success" ) {
      console.log( resRole.data );
    }
    resRole.data.data.map( async ( role ) => {
      let findRole = await Role.findOne( { "level": role.level } );

      if ( !findRole ) {
        let newRole = await new Role( role );

        await newRole.save();
      }
    } );

    console.log( "Sync role successfully!" );
  }

  // accountFacebookList.map( ( e ) => chatAuto( e ) );
} )();
