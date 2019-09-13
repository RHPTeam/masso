const router = require( "express-promise-router" )();
const logPostNow = require( "../../controllers/logPostNow.controller" );

router.route( "" )
  .get( logPostNow.index );

module.exports = router;
