/**
 * Create route User for project
 * author: hoc-anms
 * date: 20/04/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
// const { findSubString } = require( "../../helpers/utils/functions/string" );
// const auth = require( "../../helpers/middleware/authenticate.middleware" );
// const AccountController = require( "../../controllers/account.controller" );

// Handle save image
// const fs = require( "fs-extra" );
// const multer = require( "multer" ),
//   storage = multer.diskStorage( {
//     "destination": ( req, file, cb ) => {
//       const userId = findSubString( req.headers.Cookie, "uid", ";" ),
//         path = `./uploads/users/person/${userId}`;

//       fs.mkdirsSync( path );
//       cb( null, path );
//     },
//     "filename": ( req, file, cb ) => {
//       cb(
//         null,
//         `${new Date().toISOString().replace( /:|\./g, "" )}-${file.originalname}`
//       );
//     }
//   } ),
//   upload = multer( {
//     "storage": storage,
//     "limits": {
//       "fileSize": 1024 * 1024 * 5
//     },
//     "fileFilter": function( req, file, cb ) {
//       if ( !file.originalname.match( /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/ ) ) {
//         return cb( new Error( "Only image files are allowed!" ) );
//       }
//       cb( null, true );
//     }
//   } );

// router
//   .route( "/" )
//   .post( auth, upload.single( "file" ), AccountController.upload )
//   .get( auth, AccountController.show )
//   .patch( auth, AccountController.update );

// router.route( "/change-password" ).patch( AccountController.changePassword );

module.exports = router;
