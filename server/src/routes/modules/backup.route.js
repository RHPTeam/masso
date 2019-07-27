const router = require( "express-promise-router" )();
const BackupController = require( "../../controllers/backup.controller" );

router.route( "/category" ).post( BackupController.backupCategory );
router.route( "/post" ).post( BackupController.backupPost );
// router.route( "/post/u981" ).post( BackupController.backupPostU981 );

module.exports = router;
