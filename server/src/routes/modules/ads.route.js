const router = require( "express-promise-router" )();
const AnalysisController = require( "../../controllers/analysis.controller" );

router.route( "/statistics" ).get( AnalysisController.statistic );
router.route( "/statistics/campaigns" ).get( AnalysisController.statisticCampaign );

module.exports = router;
