/**
 * Create route Sign Up for project
 * author: hoc-anms
 * date: 20/04/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();

const AccountController = require( "../../controllers/account.controller" );

router
  .route( "/" )
  .post( AccountController.signUp );

module.exports = router;
