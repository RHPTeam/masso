const Role = require( "../models/Role.model" );
const { roleSync } = require( "../microservices/synchronize/role.service" );

( async () => {
  const roleList = await Role.find( {} );

  // Check Role First Time Server running
  if ( roleList.length === undefined || roleList.length === 0 ) {
    console.log( "Start sync role" );

    const resRole = await roleSync( "roles/sync" );

    console.log( resRole.data );
    // Catch
    if ( resRole.data.status !== "success" ) {
      console.log( resRole.data );
    }

    Role.insertMany( resRole.data.data, ( error ) => {
      if ( error ) {
        console.log( error );
      }
    } );
  }
} )();
