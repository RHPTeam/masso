const LogPostNow = require( "../models/LogPostNow.model" );

module.exports = {
  "index": async ( req, res ) => {
    const findLogPostNow = await LogPostNow.findOne( { "_account": req.uid } ).lean();

    res.status( 200 ).json( { "status": "success", "data": findLogPostNow } );
  }
};
