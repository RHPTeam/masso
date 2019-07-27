/**
 * Create route Role for project
 * author: hocpv
 * date: 23/04/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const PostCategoryController = require( "../../../controllers/post/postCategory.controller" );

router
  .route( "/" )
  .get( PostCategoryController.index )
  .post( PostCategoryController.create )
  .patch( PostCategoryController.update )
  .delete( PostCategoryController.delete );
router
  .route( "/search" )
  .post( PostCategoryController.search );
router.route( "/mix/:categoryId" ).post( PostCategoryController.addToMix );
module.exports = router;
