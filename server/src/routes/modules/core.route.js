const router = require( "express-promise-router" )();
const core = require( "../../controllers/core.controller" );

router.route( "/groups" ).get( core.getAllGroups );
router.route( "/pages" ).get( core.gettAllPages );
router.route( "/posts/:id" ).get( core.getPost );
router.route( "/search/posts" ).get( core.searchPosts );
router.route( "/search/pages" ).get( core.searchPages );
router.route( "/search/groups" ).get( core.searchGroups );

module.exports = router;
