/**
 * Create route friends for project
 * author: hoc-anms
 * date: 28/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const FriendController = require( "../../../controllers/chat/friend.controller" );


router.route( "/" )
  .get( FriendController.index )
  .post( FriendController.create );
router.route( "/search" )
  .post( FriendController.search )
module.exports = router;
