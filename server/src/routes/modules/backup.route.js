const router = require( "express-promise-router" )();
const BackupController = require( "../../controllers/backup.controller" );

router.route( "/category" ).post( BackupController.backupCategory );
router.route( "/post" ).post( BackupController.backupPost );

module.exports = router;
