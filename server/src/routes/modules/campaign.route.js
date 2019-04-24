/**
 * Create route campaign for project
 * author: hocpv
 * date: 22/04/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const CampaignController = require( "../../controllers/campaign.controller" );

router
  .route( "/" )
  .get( CampaignController.index )
  .post( CampaignController.create )
  .patch( CampaignController.update )
  .delete( CampaignController.delete );
module.exports = router;
