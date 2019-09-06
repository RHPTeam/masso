/**
 * Create route facebook for project
 * author: hocpv
 * date: 29/07/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const SrvController = require( "../../../controllers/srv/srv.controller.js" );
const permission = require( "../../../helpers/middleware/permission.middleware" );


router
  .route( "/client" )
  .get( permission, SrvController.index )

module.exports = router;
