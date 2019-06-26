/**
 * Create route Role for project
 * author: hocpv
 * date: 23/04/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const PostController = require( "../../../controllers/post/post.controller" );
// Handle save image
const fs = require( "fs-extra" );
const multer = require( "multer" ),
  storage = multer.diskStorage( {
    "destination": ( req, file, cb ) => {
      path = `./uploads/posts/person/${req.uid}`;

      fs.mkdirsSync( path );
      cb( null, path );
    },
    "filename": ( req, file, cb ) => {
      cb(
        null,
        `${new Date().toISOString().replace( /:|\./g, "" )}-${file.originalname}`
      );
    }
  } ),
  upload = multer( {
    "storage": storage,
    "limits": {
      "fileSize": 1024 * 1024 * 5
    },
    "fileFilter": function( req, file, cb ) {
      if ( !file.originalname.match( /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/ ) ) {
        return cb( new Error( "Only image files are allowed!" ) );
      }
      cb( null, true );
    }
  } );

router
  .route( "/" )
  .get( PostController.index )
  .post( PostController.create )
  .patch( upload.array( "attachments", 20 ), PostController.update )
  .delete( PostController.delete );

// route create post by content
router.route( "/create" ).post( PostController.createPost );

router
  .route( "/now" )
  .get( PostController.getPostSchedule )
  .post( PostController.createPostSchedule );
router
  .route( "/search" )
  .post( PostController.search );
router.route( "/sync" ).post( PostController.createSyncFromMarket );

router.route( "/sync/duplicate" ).post( PostController.syncDuplicatePostInFolderExample );

router.route( "/sync/duplicate/folder" ).post( PostController.syncDuplicateFolderExample );

// Get Newest Post
router
  .route( "/newest" ).get( PostController.getNewestPosts );

// Upload image
router.route( "/upload" ).post( upload.array( "attachments" ), PostController.upload );

module.exports = router;
