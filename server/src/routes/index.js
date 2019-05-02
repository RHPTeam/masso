// eslint-disable-next-line new-cap
const router = require( "express" ).Router();
const auth = require( "../helpers/middleware/authenticate.middleware" );

router.use( "/core", require( "./modules/core.route" ) );
router.use( "/signup", require( "./modules/signup.route" ) );
router.use( "/signin", require( "./modules/signin.route" ) );
router.use( "/users", auth, require( "./modules/account.route" ) );
router.use( "/password", require( "./modules/forgetPassword.route" ) );
router.use( "/facebook", auth, require( "./modules/facebook.route" ) );
router.use( "/posts", auth, require( "./modules/post.route" ) );
router.use( "/post-categories", auth, require( "./modules/postCategory.route" ) );
router.use( "/campaigns", auth, require( "./modules/campaign.route" ) );
router.use( "/events", auth, require( "./modules/event.route" ) );
router.use( "/post-group", auth, require( "./modules/postGroup.route" ) );
router.use( "/group-facebook", auth, require( "./modules/groupFacebook.route" ) );
router.use( "/page-facebook", auth, require( "./modules/pageFacebook.route" ) );
router.use( "/post-facebook", auth, require( "./modules/postFacebook.route" ) );


module.exports = router;
