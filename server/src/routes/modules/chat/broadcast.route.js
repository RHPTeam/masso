/**
 * Create route Broadcast for project
 * author: hocpv
 * date: 12/03/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const BroadcastController = require( "../../../controllers/chat/broadcast.controller" );
// Handle save image
const secure = require( "../../../helpers/utils/secures/jwt" );

const fs = require( "fs-extra" );
const multer = require( "multer" ),
  storage = multer.diskStorage( {
    "destination": async ( req, file, cb ) => {
      const userId = secure( file, req.headers.authorization ),
        path = `./uploads/chat/broadcasts/person/${userId}`;

      fs.mkdirsSync( path );
      cb( null, path );
    },
    "filename": ( req, file, cb ) => {
      cb( null, `${new Date().toISOString().replace( /:|\./g, "" ) }-${ file.originalname}` );
    }
  } ),
  upload = multer( {
    "storage": storage,
    "fileFilter": function ( req, file, cb ) {
      if ( !file.originalname.match( /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/ ) ) {
        return cb( new Error( "Only image files are allowed!" ) );
      }
      cb( null, true );
    }
  } );


router.route( "/" )
  .get( BroadcastController.index )
  .post( BroadcastController.create )
  .patch( upload.single( "file" ), BroadcastController.update )
  .delete( BroadcastController.delete );

router.route( "/addBlock" )
  .post( BroadcastController.addBlock );

module.exports = router;
