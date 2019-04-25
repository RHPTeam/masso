/**
 * Create route event for project
 * author: hocpv
 * date: 24/04/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const EventController = require( "../../controllers/event.controller" );

router
  .route( "/" )
  .get( EventController.index )
  .post( EventController.create )
  .patch( EventController.update )
  .delete( EventController.delete );
module.exports = router;
