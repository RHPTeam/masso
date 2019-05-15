/**
 * Controller blogs help for project
 * author: hoc-anms
 * updater:
 * date up: 15/05/2019
 * date to:
 * team: BE-RHP
 */

const BlogHelp = require( "../models/BlogHelp.model" );
const CategoryHelp = require( "../models/HelpCategory.model" );

const jsonResponse = require( "../configs/res" );
const secure = require( "../helpers/utils/secure.util" );
const dictionary = require( "../configs/dictionaries" );

module.exports = {
  /**
   * Get blog help (all or query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    let dataResponse = null;
    const authorization = req.headers.authorization,
      userId = secure( res, authorization );

    // Handle get all group from mongodb
    if ( req.query._id ) {
      dataResponse = await BlogHelp.find( { "_id": req.query._id, "_account": userId } ).lean();
      dataResponse = dataResponse[ 0 ];
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await BlogHelp.find( { "_account": userId } ).lean();
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );
  },
  /**
   * Create blog help
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "create": async ( req, res ) => {

  },
  /**
   * Update blog help
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {

  },
  /**
   * Delete blog help
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {

  }
};
