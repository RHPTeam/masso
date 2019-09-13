/* eslint-disable global-require */
const cluster = require( "cluster" );

if ( cluster.isMaster ) {
  require( "./src/process/sync" );

  // Count the machine's CPUs
  const cpuCount = require( "os" ).cpus().length;

  // Create a worker for each CPU
  for ( let i = 0; i < cpuCount; i++ ) {
    cluster.fork();
  }

  // Listen for dying workers
  cluster.on( "exit", function () {
    cluster.fork();
  } );
} else {
  require( "./server" );
}
