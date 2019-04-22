// eslint-disable-next-line new-cap
const router = require( "express" ).Router();
const auth = require( "../helpers/middleware/authenticate.middleware" );

router.use( "/core", require( "./modules/core.route" ) );
router.use( "/signup", require( "./modules/signup.route" ) );
router.use( "/signin", require( "./modules/signin.route" ) );
router.use( "/users", auth, require( "./modules/account.route" ) );
router.use( "/password", require( "./modules/forgetPassword.route" ) );
router.use( "/facebook", auth, require( "./modules/facebook.route" ) );

module.exports = router;
