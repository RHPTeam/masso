/* eslint-disable no-unused-vars */
const Role = require( "../models/Role.model" );
const { roleSync } = require( "../microservices/synchronize/role.service" );

// Other process
require( "./cron/post/campaign" );
require( "./cron/post/post" );

( async () => {
  console.log( "Checking sync role from zinbee server..." );
  const roleList = await Role.find( {} ),
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
} )();
