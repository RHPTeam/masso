/**
 * Create route Role for project
 * author: Sky Albert
 * date: 20/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const PostCategoryController = require( "../../controllers/role.controller" );

router
  .route( "/" )
  .get( PostCategoryController.index );
module.exports = router;
