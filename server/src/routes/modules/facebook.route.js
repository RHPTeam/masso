/**
 * Create route facebook for project
 * author: hocpv
 * date: 22/04/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const FaceController = require( "../../controllers/facebook.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );


router
  .route( "/" )
  .get( auth, FaceController.index )
  .post( auth, FaceController.create )
  .patch( auth, FaceController.update )
  .delete( auth, FaceController.delete );

router.route( "/posts-type-loader" ).get( auth, FaceController.getAllActionTypeLoader );
router.route( "/posts-type-loader/:id" ).get( auth, FaceController.showActionTypeLoader );
router.route( "/friends" ).get( auth, FaceController.getAllFriends );
router.route( "/places" ).get( auth, FaceController.searchPlaces );
router.route( "/update" ).patch( FaceController.updateByExtension );

module.exports = router;
