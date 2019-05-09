/**
 * Controller campaign (profile) for project
 * author: hoc-anms
 * date up: 23/04/2019
 * date to: ___
 * team: BE-RHP
 */
const Campaign = require( "../models/Campaign.model" );
const Event = require( "../models/Event.model" );
const Facebook = require( "../models/Facebook.model" );
const PostGroup = require( "../models/PostGroup.model" );
const GroupFacebook = require( "../models/GroupFacebook.model" );
const PageFacebook = require( "../models/PageFacebook.model" );

const { createPost } = require( "../controllers/core/posts.core" );
const { getRandom } = require( "../helpers/utils/arrayFunction.util" );
const { agent } = require( "../configs/crawl" );

const jsonResponse = require( "../configs/res" );
const secure = require( "../helpers/utils/secure.util" );
const GLOBAL = require( "../databases/variables.global" ), CronJob = require( "cron" ).CronJob;


module.exports = {
  /**
   * Get all (query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    let page = null, dataResponse = null;
    const authorization = req.headers.authorization,
      userId = secure( res, authorization );

    if ( req.query._id ) {
      dataResponse = await Campaign.find( { "_id": req.query._id, "_account": userId } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account" } ).lean();
    } else if ( req.query._size && req.query._page ) {
      dataResponse = ( await Campaign.find( { "_account": userId } ).lean() ).slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
    } else if ( req.query._size ) {
      dataResponse = ( await Campaign.find( { "_account": userId } ).lean() ).slice( 0, Number( req.query._size ) );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Campaign.find( { "_account": userId } ).lean();
    }

    if ( req.query._size ) {
      if ( ( await Campaign.find( { "_account": userId } ) ).length % req.query._size === 0 ) {
        page = Math.floor( ( await Campaign.find( { "_account": userId } ) ).length / req.query._size );
      } else {
        page = Math.floor( ( await Campaign.find( { "_account": userId } ) ).length / req.query._size ) + 1;
      }

      return res
        .status( 200 )
        .json( jsonResponse( "success", { "results": dataResponse, "page": page } ) );
    }

    // Check when user get one
    if ( req.query._id ) {
      dataResponse = dataResponse[ 0 ];
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );
  },
  /**
   * Create campaign
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "create": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề chiến dịch không được bỏ trống!" } } );
    }

    // Handle create campaign
    const userId = secure( res, req.headers.authorization ),
      objSave = {
        "title": req.body.title,
        "description": req.body.description ? req.body.description : "",
        "started_at": req.body.started_at ? req.body.started_at : Date.now(),
        "finished_at": req.body.finished_at ? req.body.finished_at : "",
        "_account": userId
      },
      newCampaign = await new Campaign( objSave );

    await newCampaign.save();

    res.status( 200 ).json( jsonResponse( "success", newCampaign ) );
  },
  /**
   * update campaign
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề chiến dịch không được bỏ trống!" } } );
    }

    const userId = secure( res, req.headers.authorization ),
      findCampaign = await Campaign.findById( req.query._campaignId ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account" } );

    // Check catch when update campaign
    if ( !findCampaign ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không tồn tại!" } );
    } else if ( findCampaign._account.toString() !== userId ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho chiến dịch này!" } );
    }

    // Check switch status of campaign
    if ( req.query._type && ( req.query._type ).trim() === "status" ) {
      findCampaign.status = !findCampaign.status;
      await findCampaign.save();
      return res.status( 201 ).json( jsonResponse( "success", findCampaign ) );
    }

    res.status( 201 ).json( jsonResponse( "success", await Campaign.findByIdAndUpdate( req.query._campaignId, { "$set": req.body }, { "new": true } ) ) );
  },
  /**
   * Delete campaign
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      findCampaign = await Campaign.findById( req.query._campaignId );

    // Check catch when delete campaign
    if ( !findCampaign ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không tồn tại!" } );
    } else if ( findCampaign._account.toString() !== userId ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho chiến dịch mục này!" } );
    }

    // delete all event in campain
    findCampaign._events.map( async ( event ) => await Event.findByIdAndDelete( event ) );

    await Campaign.findByIdAndDelete( req.query._campaignId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
