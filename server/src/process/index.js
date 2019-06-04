/* eslint-disable no-unused-vars */
const Role = require( "../models/Role.model" );
const Facebook = require( "../models/Facebook.model" );
const { roleSync } = require( "../microservices/synchronize/role.service" );

// Other process
require( "./cron/post/campaign" );
require( "./cron/post/post" );
// const chatAuto = require( "./cron/chat/index" );

( async () => {
  const roleList = await Role.find( {} ),
    accountFacebookList = await Facebook.find( {} );


  // Check Role First Time Server running
  if ( roleList.length === undefined || roleList.length === 0 ) {
    console.log( "Start sync role" );

    const resRole = await roleSync( "roles/sync" );

    // Catch
    if ( resRole.data.status !== "success" ) {
      console.log( resRole.data );
    }

    Role.insertMany( resRole.data.data, ( error ) => {
      if ( error ) {
        console.log( error );
      }
    } );

    console.log( "Sync role successfully!" );
  }

  // accountFacebookList.map( ( e ) => chatAuto( e ) );
} )();
