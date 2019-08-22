/**
 * Create route campaign for project
 * author: hocpv
 * date: 22/04/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const CampaignController = require( "../../../controllers/post/campaign.controller" );

router
  .route( "/" )
  .get( CampaignController.index )
  .post( CampaignController.create )
  .patch( CampaignController.update )
  .delete( CampaignController.delete );

router
  .route( "/:campaignID/status" )
  .patch( CampaignController.changeStatus() );

router
  .route( "/duplicate" )
  .post( CampaignController.duplicate );

router
  .route( "/sync/duplicate" )
  .post( CampaignController.duplicateSyncCampaignExample );

router
  .route( "/search" )
  .post( CampaignController.search );

module.exports = router;
