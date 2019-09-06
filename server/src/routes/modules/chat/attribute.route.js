/**
 * Create route Attribute for project
 * author: Tran Toan (Sky Albert)
 * date: 08/03/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const AttributeController = require( "../../../controllers/chat/attribute.controller" );


router.route( "/" )
  .get( AttributeController.index )
  .post( AttributeController.create )
  .patch( AttributeController.update )
  .delete( AttributeController.delete );
router.route( "/filter" )
  .post( AttributeController.filter );
module.exports = router;
