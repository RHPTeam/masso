/**
 * Create route block for project
 * author: hocpv
 * date: 07/03/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const secure = require( "../../../helpers/utils/secures/jwt" );
const BlockController = require( "../../../controllers/chat/block.controller" );
// Handle save image
const fs = require( "fs-extra" );
const multer = require( "multer" ),
  storage = multer.diskStorage( {
    "destination": async ( req, file, cb ) => {
      const userId = secure( file, req.headers.authorization ),
        path = `./uploads/chat/blocks/person/${userId}`;

      fs.mkdirsSync( path );
      cb( null, path );
    },
    "filename": ( req, file, cb ) => {
      cb( null, `${new Date().toISOString().replace( /:|\./g, "" ) }-${ file.originalname}` );
    }
  } ),
  upload = multer( {
    "storage": storage,
    "limits": {
      "fileSize": 1024 * 1024 * 25
    },
    "fileFilter": function ( req, file, cb ) {
      if ( !file.originalname.match( /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/ ) ) {
        return cb( new Error( "Only image files are allowed!" ) );
      }
      cb( null, true );
    }
  } );

router.route( "/" )
  .get( BlockController.index )
  .post( BlockController.create )
  .patch( upload.single( "file" ), BlockController.update )
  .delete( BlockController.delete );
router.route( "/item" )
  .post( upload.single( "file" ), BlockController.createItem );
module.exports = router;
