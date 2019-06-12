/**
 * Controller campaign (profile) for project
 * author: hoc-anms
 * updater: sky albert
 * date up: 23/04/2019
 * date to: 09/05/2019
 * team: BE-RHP
 */
// eslint-disable-next-line no-unused-vars
const Campaign = require( "../../models/post/Campaign.model" );
const Event = require( "../../models/post/Event.model" );
const EventSchedule = require( "../../models/post/EventSchedule.model" );
const { deletedSchedule } = require( "../../helpers/utils/functions/scheduleLog" );
const EventScheduleController = require( "../../controllers/post/eventSchedule.controller" );
const ScheduleService = require( "node-schedule" );

const jsonResponse = require( "../../configs/response" );


module.exports = {
  /**
   * Get all (query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    let page = null, dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await Campaign.find( { "_id": req.query._id, "_account": req.uid } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account", "populate": { "path": "target_category", "select": "_id _pages _groups" } } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account", "populate": { "path": "post_category", "select": "_id title" } } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account", "populate": { "path": "timeline", "select": "userInfo" } } ).lean();
    } else if ( req.query._size && req.query._page ) {
      dataResponse = ( await Campaign.find( { "_account": req.uid } ).lean() ).slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
    } else if ( req.query._size ) {
      dataResponse = ( await Campaign.find( { "_account": req.uid } ).lean() ).slice( 0, Number( req.query._size ) );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Campaign.find( { "_account": req.uid } ).lean();
    }

    if ( req.query._size ) {
      if ( ( await Campaign.find( { "_account": req.uid } ) ).length % req.query._size === 0 ) {
        page = Math.floor( ( await Campaign.find( { "_account": req.uid } ) ).length / req.query._size );
      } else {
        page = Math.floor( ( await Campaign.find( { "_account": req.uid } ) ).length / req.query._size ) + 1;
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
    const newCampaign = await new Campaign( {
      "title": req.body.title,
      "description": req.body.description ? req.body.description : "",
      "started_at": req.body.started_at ? req.body.started_at : Date.now(),
      "finished_at": req.body.finished_at ? req.body.finished_at : "",
      "_account": req.uid
    } );

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

    const findCampaign = await Campaign.findOne( { "_id": req.query._campaignId, "_account": req.uid } ).populate( "_events" );

    // Check catch when update campaign
    if ( !findCampaign ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không tồn tại!" } );
    }

    // Check switch status of campaign
    if ( req.query._type && ( req.query._type ).trim() === "status" ) {
      findCampaign.status = !findCampaign.status;

      await Promise.all( findCampaign._events.map( async ( event ) => {
        const listEventOldSchedule = await EventSchedule.find( { "_event": event._id } ).lean();

        await Promise.all( listEventOldSchedule.map( async ( eventSchedule ) => {
          if ( ScheduleService.scheduledJobs && ScheduleService.scheduledJobs[ `rhp${eventSchedule._id.toString()}` ] ) {
            await ScheduleService.scheduledJobs[ `rhp${eventSchedule._id.toString()}` ].cancel();
            deletedSchedule( eventSchedule, __dirname );
          }
        } ) );
        await EventSchedule.deleteMany( { "_event": event._id } );
        event.status = findCampaign.status;
        await EventScheduleController.create( event, findCampaign._id, req.uid );

        await Event.findByIdAndUpdate( event._id, { "$set": { "status": findCampaign.status } }, { "new": true } );
      } ) );

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
    const findCampaign = await Campaign.findOne( { "_id": req.query._campaignId, "_account": req.uid } ).populate( "_events" );

    // Check catch when delete campaign
    if ( !findCampaign ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không tồn tại!" } );
    }

    // delete all event in campain
    findCampaign._events.map( async ( event ) => {
      const listEventOldSchedule = await EventSchedule.find( { "_event": req.query._eventId } ).lean();

      await Promise.all( listEventOldSchedule.map( ( eventSchedule ) => {
        if ( ScheduleService.scheduledJobs && ScheduleService.scheduledJobs[ `rhp${eventSchedule._id.toString()}` ] ) {
          ScheduleService.scheduledJobs[ `rhp${eventSchedule._id.toString()}` ].cancel();
          deletedSchedule( eventSchedule, __dirname );
        }
      } ) );
      await EventSchedule.deleteMany( { "_event": event._id } );

      await Event.findByIdAndDelete( event );
    } );

    await Campaign.findByIdAndDelete( req.query._campaignId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  /**
   * Duplicate new campaign
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "duplicate": async ( req, res ) => {
    const findCampaign = await Campaign.findOne( { "_id": req.query._campaignId, "_account": req.uid } ).select( "-_id -__v -updated_at -created_at" ).populate( { "path": "_events", "select": "-_id -__v -updated_at -created_at" } ).lean(),
      campaignInfo = await Campaign.findOne( { "_id": req.query._campaignId, "_account": req.uid } ).select( "-_id -__v -updated_at -created_at" ).lean();

    // Check catch when delete campaign
    if ( !findCampaign ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không tồn tại!" } );
    }

    campaignInfo.title = `${findCampaign.title} Copy`;

    // eslint-disable-next-line one-var
    const newCampaign = new Campaign( campaignInfo );

    if ( findCampaign._events.length > 0 ) {
      newCampaign._events = [];

      await Promise.all( findCampaign._events.map( async ( event ) => {
        const newEvent = new Event( event );

        newCampaign._events.push( newEvent._id );
        await newEvent.save();
      } ) );
    }

    await newCampaign.save();

    // eslint-disable-next-line one-var
    const newCampaignInfo = await Campaign.findOne( { "_id": newCampaign._id } ).populate( "_events" ).lean();

    await Promise.all( newCampaignInfo._events.map( async ( event ) => {
      // Create to event schedule, Check follow condition
      await EventScheduleController.create( event, newCampaign._id, req.uid );
    } ) );


    // eslint-disable-next-line one-var
    const campaignReturned = await Campaign.findOne( { "_id": newCampaign._id } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account" } ).lean();

    res.status( 200 ).json( jsonResponse( "success", campaignReturned ) );
  },
  "search": async ( req, res ) => {
    if ( req.query.keyword === undefined ) {
      return res.status( 404 ).json( { "status": "fail", "keyword": "Vui lòng cung cấp từ khóa để tìm kiếm!" } );
    }

    let page = null, dataResponse = null, data = ( await Campaign.find( { "$text": { "$search": req.query.keyword, "$language": "none" }, "_account": req.uid } ).lean() );

    if ( req.query._size && req.query._page ) {
      dataResponse = data.slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
    } else if ( req.query._size ) {
      dataResponse = data.slice( 0, Number( req.query._size ) );
    }

    if ( req.query._size ) {
      if ( data.length % req.query._size === 0 ) {
        page = Math.floor( data.length / req.query._size );
      } else {
        page = Math.floor( data.length / req.query._size ) + 1;
      }
    }

    res.status( 200 ).json( { "status": "success", "data": { "results": dataResponse, "page": page } } );
  }
};
