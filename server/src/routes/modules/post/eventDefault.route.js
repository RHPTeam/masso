/**
 * Create route event for project
 * author: hocpv
 * date: 24/04/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const EventDefaultController = require( "../../../controllers/post/eventDefault.controller" );

router
  .route( "/" )
  .get( EventDefaultController.index )
  .post( EventDefaultController.create )
  .patch( EventDefaultController.update )
  .delete( EventDefaultController.delete );

module.exports = router;
