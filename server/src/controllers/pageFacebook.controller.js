/* eslint-disable one-var */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/**
 * Controller page facebook for project
 * author: hoc-anms
 * date up: 24/04/2019
 * date to: ___
 * team: BE-RHP
 */
const PageFacebook = require( "../models/PageFacebook.model" );
const Facebook = require( "../models/Facebook.model" );

const { agent } = require( "../configs/crawl" );
const getAllPages = require( "./core/pages.core" );
const jsonResponse = require( "../configs/res" );
const secure = require( "../helpers/utils/secure.util" );

module.exports = {
  /**
   * Get All (query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    let dataResponse = null, newPageList = null;
    const authorization = req.headers.authorization,
      userId = secure( res, authorization ),
      facebookList = await Facebook.find( { "_account": userId } );

    // Get all page from facebook and save
    newPageList = facebookList.map( async ( facebook ) => {
      const pageList = await getAllPages( { "cookie": facebook.cookie, agent } );

      // Handle code when fix add other item
      const pageListFixed = pageList.results.map( ( page ) => {
        page._account = userId;
        page._facebook = facebook._id;
        return page;
      } );

      return pageListFixed;
    } );
    newPageList = await Promise.all( newPageList );

    console.log( newPageList );
    return;


    // Handle get all page from mongodb
    if ( req.query._id ) {
      dataResponse = await PageFacebook.find( { "_id": req.query._id, "_account": userId } ).lean();
      dataResponse = dataResponse[ 0 ];
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await PageFacebook.find( { "_account": userId } ).lean();
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );
  }
};
