/**
 * Controller event for project
 * author: hoc-anms
 * date up: 23/04/2019
 * date to: ___
 * team: BE-RHP
 */
const Campaign = require( "../models/Campaign.model" );
const Event = require( "../models/Event.model" );

const jsonResponse = require( "../configs/res" ),
  secure = require( "../helpers/utils/secure.util" );

module.exports = {
  /**
   * Get All (query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    let page = null, dataResponse = null;
    const authorization = req.headers.authorization,
      userId = secure( res, authorization );

    if ( req.query._id ) {
      dataResponse = await Event.find( { "_id": req.query._id, "_account": userId } ).lean();
    } else if ( req.query._size && req.query._page ) {
      dataResponse = ( await Event.find( { "_account": userId } ).lean() ).slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
    } else if ( req.query._size ) {
      dataResponse = ( await Event.find( { "_account": userId } ).lean() ).slice( 0, Number( req.query._size ) );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Event.find( { "_account": userId } ).lean();
    }

    if ( req.query._size ) {
      if ( ( await Event.find( { "_account": userId } ) ).length % req.query._size === 0 ) {
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
    } else if ( req.body.type_event === 1 ) {
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

    const errors = [], userId = secure( res, req.headers.authorization ),
      findCampaign = await Campaign.findOne( { "_id": req.query._campaignId, "_account": userId } ).populate( { "path": "_events", "select": "title started_at" } );

    // Check catch when update event
    if ( !findCampaign ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không tồn tại!" } );
    } else if ( findCampaign._account.toString() !== userId ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho sự kiện này!" } );
    }

    // Check status of campaign to create status for event
    req.body.status = findCampaign.status;
    // eslint-disable-next-line one-var
    const newEvent = await new Event( req.body );

    // Check exist started_at
    await Promise.all( findCampaign._events.map( ( event ) => {
      if ( event.started_at === req.body.started_at ) {
        errors.push( event.title );
      }
    } ) );
    if ( errors.length > 0 ) {
      return res.status( 404 ).json( { "status": "error", "message": `${errors[ 0 ]} có thời gian bắt đầu trùng với thời gian bạn thiết lập cho sự kiện mới này!` } );
    }

    await newEvent.save();
    findCampaign._events.push( newEvent._id );
    await findCampaign.save();

    // Create Cron Job

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
    } else if ( !req.body.type_event ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "type_event": "Loại sự kiện không được bỏ trống! [0: Auto, 1: Custom]" } } );
    } else if ( req.body.type_event === 1 ) {
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

    const userId = secure( res, req.headers.authorization ),
      findEvent = await Event.findById( req.query._eventId );

    // Check catch when update event
    if ( !findEvent ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sự kiện không tồn tại!" } );
    } else if ( findEvent._account.toString() !== userId ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho sự kiện này!" } );
    }

    // Check switch status of event
    if ( req.query._type && req.query._type.trim() === "status" ) {
      findEvent.status = !findEvent.status;
      await findEvent.save();
      return res.status( 201 ).json( jsonResponse( "success", findEvent ) );
    }

    res.status( 201 ).json( jsonResponse( "success", await Event.findByIdAndUpdate( req.query._eventId, { "$set": req.body }, { "new": true } ) ) );
  },
  /**
   * Delete Event
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      findCampaign = await Campaign.findOne( { "_events": req.query._eventId } ),
      findEvent = await Event.findById( req.query._eventId );

    // Check catch when delete campaign
    if ( !findCampaign ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không tồn tại!" } );
    } else if ( !findEvent ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sự kiện không tồn tại!" } );
    } else if ( findEvent._account.toString() !== userId ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho sự kiện này!" } );
    }

    // delete event of campain
    findCampaign._events = findCampaign._events.filter( ( event ) => event.toString() !== req.query._eventId );
    findCampaign.save();

    await Event.findByIdAndDelete( req.query._eventId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "duplicate": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      findCampaign = await Campaign.findOne( { "_events": req.query._eventId } ),
      findEvent = await Event.findById( req.query._eventId ).select( "-_id -__v -updated_at -created_at" ).lean();

    // Check catch when duplicate
    if ( !findEvent ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sự kiện không tồn tại!" } );
    } else if ( findEvent._account.toString() !== userId ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho sự kiện này!" } );
    }

    findEvent.title = `${findEvent.title} Copy`;

    // eslint-disable-next-line one-var
    const newEvent = new Event( findEvent );

    await newEvent.save();
    findCampaign._events.push( newEvent._id );
    findCampaign.save();

    res.status( 200 ).json( jsonResponse( "success", newEvent ) );
  }
};
