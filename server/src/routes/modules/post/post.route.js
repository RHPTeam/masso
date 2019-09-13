/**
 * Create route Post for project
 * author: sky albert
 * date: 09/09/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const PostController = require( "../../../controllers/post/post.controller" );
const UploadImage = require( "../../../helpers/services/upload.service" );

router
  .route( "/" )
  .get( PostController.index )
  .post( PostController.create )
  .patch( UploadImage.array( "./uploads/posts/person", "attachments", 10, null, "uid" ), PostController.update )
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
router.route( "/upload" ).post( UploadImage.array( "./uploads/posts/person", "attachments", 10, null, "uid" ), PostController.upload );
router.route( "/sync/duplicate" ).post( PostController.syncDuplicatePostInFolderExample );
router.route( "/sync/duplicate/folder" ).post( PostController.syncDuplicateFolderExample );

router.route( "/remove/image" ).post( PostController.removeImageNotExist );

// Get Newest Post
router
  .route( "/newest" ).get( PostController.getNewestPosts );

// Upload image
router.route( "/upload" ).post( UploadImage.array( "./uploads/posts/person", "attachments", 10, null, "uid" ), PostController.upload );

module.exports = router;
