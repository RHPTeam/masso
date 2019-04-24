/**
 * Create route Role for project
 * author: hocpv
 * date: 22/04/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const FaceController = require( "../../controllers/facebook.controller" );

router
  .route( "/" )
  .get( FaceController.index )
  .post( FaceController.create )
  .patch( FaceController.update )
  .delete( FaceController.delete );
module.exports = router;
