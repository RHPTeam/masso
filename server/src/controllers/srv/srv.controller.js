const { exec } = require( "child_process" );

module.exports = {
  /**
   * Script Handle Auto Built Client
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    const commandLineScript = `sh scripts/auto_built_client.sh ${ process.env.FOLDER_ROOT}`,
      handleScript = await exec( commandLineScript );

    handleScript.stdout.on( "data", ( data ) => {
      console.log( data );
      // sendBackInfo();
    } );

    res.status( 200 ).json( { "status": "success" } );
  }
};
