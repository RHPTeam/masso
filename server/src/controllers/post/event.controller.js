/**
 * Controller event for project
 * author: hoc-anms
 * date up: 23/04/2019
 * date to: ___
 * team: BE-RHP
 */
const ObjectId = require( "mongoose" ).Types.ObjectId;
// eslint-disable-next-line no-unused-vars
const ScheduleClasses = require( "../../helpers/utils/usecases/schedule" );
const Campaign = require( "../../models/post/Campaign.model" );
const Event = require( "../../models/post/Event.model" );
const GroupFacebook = require( "../../models/post/GroupFacebook.model" );
const PageFacebook = require( "../../models/post/PageFacebook.model" );
const EventSchedule = require( "../../models/post/EventSchedule.model" );
const ScheduleService = require( "node-schedule" );

const jsonResponse = require( "../../configs/response" );

const EventScheduleController = require( "../../controllers/post/eventSchedule.controller" );

module.exports = {
  /**
   * Get All (query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    let page = null, dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await Event.find( { "_id": req.query._id, "_account": req.uid } ).populate( { "path": "target_category", "select": "_id title" } ).populate( { "path": "post_category", "select": "_id title" } ).populate( { "path": "post_custom", "select": "_id title content _categories", "populate": { "path": "_categories", "select": "_id title" } } ).lean();
      // eslint-disable-next-line camelcase
      dataResponse[ 0 ].target_custom = await Promise.all( dataResponse[ 0 ].target_custom.map( async ( target ) => {
        if ( target.typeTarget === 0 ) {
          return {
            "_id": target._id,
            "typeTarget": target.typeTarget,
            "target": await GroupFacebook.findOne( { "groupId": target.id } ).select( "-_id groupId name" ).lean()
          };
        } else if ( target.typeTarget === 1 ) {
          return {
            "_id": target._id,
            "typeTarget": target.typeTarget,
            "target": await PageFacebook.findOne( { "pageId": target.id } ).select( "-_id pageId name" ).lean()
          };
        }
      } ) );
    } else if ( req.query._size && req.query._page ) {
      dataResponse = await Event.find( { "_id": req.query._id, "_account": req.uid } ).populate( { "path": "target_category", "select": "_id title" } ).populate( { "path": "post_category", "select": "_id title" } ).populate( { "path": "post_custom", "select": "_id title content _categories", "populate": { "path": "_categories", "select": "_id title" } } ).lean();
      // eslint-disable-next-line camelcase
      dataResponse[ 0 ].target_custom = await Promise.all( dataResponse[ 0 ].target_custom.map( async ( target ) => {
        if ( target.typeTarget === 0 ) {
          return {
            "_id": target._id,
            "typeTarget": target.typeTarget,
            "target": await GroupFacebook.findOne( { "groupId": target.id } ).select( "-_id groupId name" ).lean()
          };
        } else if ( target.typeTarget === 1 ) {
          return {
            "_id": target._id,
            "typeTarget": target.typeTarget,
            "target": await PageFacebook.findOne( { "pageId": target.id } ).select( "-_id pageId name" ).lean()
          };
        }
      } ) );
    } else if ( req.query._size ) {
      dataResponse = ( await Event.find( { "_account": req.uid } ).lean() ).slice( 0, Number( req.query._size ) );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Event.find( { "_account": req.uid } ).lean();
    }

    if ( req.query._size ) {
      if ( ( await Event.find( { "_account": req.uid } ) ).length % req.query._size === 0 ) {
        page = Math.floor( ( await Event.find( { "_account": userId } ) ).length / req.query._size );
      } else {
        page = Math.floor( ( await Event.find( { "_account": userId } ) ).length / req.query._size ) + 1;
      }

      return res
        .status( 200 )
        .json( jsonResponse( "success", { "results": dataResponse, "page": page } ) );
    }

    // Check when user get one
    if ( req.query._id ) {
      if ( dataResponse.length === 0 ) {
        return res.status( 404 ).json( { "status": "error", "message": "Sự kiện không tồn tại!" } );
      }
      dataResponse = dataResponse[ 0 ];
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );

  },
  /**
   * Create event
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "create": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề sự kiện không được bỏ trống!" } } );
    } else if ( req.body.type_event === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "type_event": "Loại sự kiện không được bỏ trống! [0: Auto, 1: Custom]" } } );
    } else if ( req.body.type_event === 0 ) {
      if ( req.body.post_category === undefined && req.body.post_custom === undefined ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "content": "Nội dung tối thiểu chọn ít nhất một bài đăng hoặc một danh mục! [post_category | post_custom]" } } );
      } else if ( req.body.break_point < 5 ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "break_point": "Thời gian chờ tối thiếu 5 phút! Điều này giúp tài khoản của bạn an toàn hơn!" } } );
      } else if ( req.body.started_at === undefined ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "started_at": "Thời gian bắt đầu chưa được thiết lập!" } } );
      } else if ( Date.now() > req.body.started_at ) {
        return res.status( 404 ).json( { "status": "error", "message": "Thời gian bắt đầu bạn thiết lập đã ở trong quá khứ!" } );
      }
    }

    const findCampaign = await Campaign.findOne( { "_id": req.query._campaignId, "_account": req.uid } ).populate( { "path": "_events", "select": "title started_at" } );

    // Check catch when update event
    if ( !findCampaign ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không tồn tại!" } );
    }

    // Check status of campaign to create status for event
    req.body.status = findCampaign.status;
    req.body._account = req.uid;
    // eslint-disable-next-line one-var
    const newEvent = await new Event( req.body );

    // Create to event schedule, Check follow condition
    await EventScheduleController.create( newEvent.toObject(), findCampaign._id, req.uid );

    await newEvent.save();
    findCampaign._events.push( newEvent._id );
    await findCampaign.save();

    res.status( 200 ).json( jsonResponse( "success", newEvent ) );
  },
  /**
   * Update event
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề sự kiện không được bỏ trống!" } } );
    } else if ( req.body.type_event === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "type_event": "Loại sự kiện không được bỏ trống! [0: Custom, 1: Auto]" } } );
    } else if ( req.body.type_event === 0 ) {
      if ( !req.body.post_category && req.body.post_custom.length === 0 ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "content": "Nội dung tối thiểu chọn ít nhất một bài đăng hoặc một danh mục! [post_category | post_custom]" } } );
      } else if ( req.body.break_point < 5 ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "break_point": "Thời gian chờ tối thiếu 5 phút! Điều này giúp tài khoản của bạn an toàn hơn!" } } );
      } else if ( !req.body.started_at ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "started_at": "Thời gian bắt đầu chưa được thiết lập!" } } );
      } else if ( Date.now() > req.body.started_at ) {
        return res.status( 404 ).json( { "status": "error", "message": "Thời gian bắt đầu bạn thiết lập đã ở trong quá khứ!" } );
      }
    }

    const findEvent = await Event.findOne( { "_id": req.query._eventId, "_account": req.uid } ),
      findCampaign = await Campaign.findOne( { "_events": new ObjectId( req.query._eventId ) } ),
      listEventOldSchedule = await EventSchedule.find( { "_event": req.query._eventId, "status": true } ).lean();

    // Check catch when update event
    if ( !findEvent ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sự kiện không tồn tại!" } );
    }

    // Check switch status of event
    if ( req.query._type && req.query._type.trim() === "status" ) {
      findEvent.status = !findEvent.status;
      await findEvent.save();
      return res.status( 201 ).json( jsonResponse( "success", findEvent ) );
    }

    /**
     * Update cron schedule and event schedule
     */
    await Promise.all( listEventOldSchedule.map( ( eventSchedule ) => {
      if ( ScheduleService.scheduledJobs && ScheduleService.scheduledJobs[ `rhp${eventSchedule._id.toString()}` ] ) {
        ScheduleService.scheduledJobs[ `rhp${eventSchedule._id.toString()}` ].cancel();
      }
    } ) );
    await EventSchedule.deleteMany( { "_event": req.query._eventId } );
    req.body._id = req.query._eventId;
    await EventScheduleController.create( req.body, findCampaign._id, req.uid );

    res.status( 201 ).json( jsonResponse( "success", await Event.findByIdAndUpdate( req.query._eventId, { "$set": req.body }, { "new": true } ) ) );
  },
  /**
   * Delete Event
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {
    const findCampaign = await Campaign.findOne( { "_events": req.query._eventId } ),
      findEvent = await Event.findOne( { "_id": req.query._eventId, "_account": req.uid } ),
      listEventOldSchedule = await EventSchedule.find( { "_event": req.query._eventId, "status": true } ).lean();

    // Check catch when delete campaign
    if ( !findCampaign ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không tồn tại!" } );
    } else if ( !findEvent ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sự kiện không tồn tại!" } );
    }

    /**
     * Delete cron schedule and event schedule
     */
    await Promise.all( listEventOldSchedule.map( ( eventSchedule ) => {
      if ( ScheduleService.scheduledJobs && ScheduleService.scheduledJobs[ `rhp${eventSchedule._id.toString()}` ] ) {
        ScheduleService.scheduledJobs[ `rhp${eventSchedule._id.toString()}` ].cancel();
      }
    } ) );
    await EventSchedule.deleteMany( { "_event": req.query._eventId } );

    // delete event of campain
    findCampaign._events = findCampaign._events.filter( ( event ) => event.toString() !== req.query._eventId );
    findCampaign.save();

    await Event.findByIdAndDelete( req.query._eventId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "duplicate": async ( req, res ) => {
    const findCampaign = await Campaign.findOne( { "_events": new ObjectId( req.query._eventId ) } ),
      findEvent = await Event.findOne( { "_id": req.query._eventId, "_account": req.uid } ).select( "-_id -__v -updated_at -created_at" ).lean();

    // Check catch when duplicate
    if ( !findEvent ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sự kiện không tồn tại!" } );
    }

    findEvent.title = `${findEvent.title} Copy`;

    // eslint-disable-next-line one-var
    const newEvent = new Event( findEvent );

    // Create to event schedule, Check follow condition
    await EventScheduleController.create( newEvent.toObject(), findCampaign._id, req.uid );

    await newEvent.save();
    findCampaign._events.push( newEvent._id );
    findCampaign.save();

    res.status( 200 ).json( jsonResponse( "success", newEvent ) );
  }
};
