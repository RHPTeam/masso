/**
 * Create route block for project
 * author: hocpv
 * date: 07/03/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const secure = require( "../../../helpers/utils/secures/jwt" );
const BlockController = require( "../../../controllers/chat/block.controller" );
const Account = require( "../../../models/Account.model" );
// Handle save image
const fs = require( "fs-extra" );
const multer = require( "multer" ),
  storage = multer.diskStorage( {
    "destination": async ( req, file, cb ) => {
      const email = secure( file, req.headers.authorization ),
        foundUser = await Account.findOne( { "email": email } ),
        path = `./uploads/chat/blocks/person/${foundUser._id}`;

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
  .get( BlockController.index )
  .post( BlockController.create )
  .patch( upload.single( "file" ), BlockController.update )
  .delete( BlockController.delete );
router.route( "/item" )
  .post( upload.single( "file" ), BlockController.createItem );
module.exports = router;
