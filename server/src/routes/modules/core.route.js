const router = require( "express-promise-router" )();
const core = require( "../../controllers/core.controller" );

router.route( "/action-type-loader" ).get( core.getAllActionTypeLoader );
router.route( "/action-type-loader/:id" ).get( core.getAllItemActionTypeLoader );
router.route( "/friends" ).get( core.getAllFriends );
router.route( "/groups" ).get( core.getAllGroups );
router.route( "/pages" ).get( core.getAllPages );
router.route( "/posts" ).post( core.createPost );
router.route( "/posts/:id" ).get( core.getPost );
router.route( "/search/groups" ).get( core.searchGroups );
router.route( "/search/pages" ).get( core.searchPages );
router.route( "/search/places" ).get( core.searchPlaces );
router.route( "/search/posts" ).get( core.searchPosts );
router.route( "/text-format-presets" ).get( core.getAllTextFormatPresets );

module.exports = router;
