/**
 * Controller event for project
 * author: hoc-anms
 * date up: 23/04/2019
 * date to: ___
 * team: BE-RHP
 */
const ObjectId = require( "mongoose" ).Types.ObjectId;
// eslint-disable-next-line no-unused-vars
const Campaign = require( "../../models/post/Campaign.model" );
const Event = require( "../../models/post/Event.model" );
const { deletedSchedule } = require( "../../helpers/utils/functions/scheduleLog" );
const GroupFacebook = require( "../../models/post/GroupFacebook.model" );
const PageFacebook = require( "../../models/post/PageFacebook.model" );
const EventSchedule = require( "../../models/post/EventSchedule.model" );
const { logUserAction } = require( "../../microservices/synchronize/log.service" );


const jsonResponse = require( "../../configs/response" );
const convertUnicode = require( "../../helpers/utils/functions/unicode" );

const EventScheduleController = require( "../../controllers/post/eventSchedule.controller" );

module.exports = {
  "index": async ( req, res ) => {
    let page = null, dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await Event.find( { "_id": req.query._id, "_account": req.uid } ).populate( { "path": "target_category", "select": "_id title" } ).populate( { "path": "post_category", "select": "_id title" } ).populate( { "path": "timeline", "select": "_id userInfo" } ).populate( { "path": "post_custom", "select": "_id title content _categories", "populate": { "path": "_categories", "select": "_id title" } } ).lean();
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
      dataResponse = await Event.find( { "_id": req.query._id, "_account": req.uid } ).populate( { "path": "target_category", "select": "_id title" } ).populate( { "path": "post_category", "select": "_id title" } ).populate( { "path": "timeline", "select": "_id userInfo" } ).populate( { "path": "post_custom", "select": "_id title content _categories", "populate": { "path": "_categories", "select": "_id title" } } ).lean();
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
  "create": async ( req, res ) => {
    // Check validator
    if ( req.body.type_event === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "type_event": "Loại sự kiện không được bỏ trống! [1: Auto, 0: Custom]" } } );
    } else if ( req.body.type_event === 0 ) {
      if ( req.body.post_category === undefined && req.body.post_custom === undefined ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "content": "Nội dung tối thiểu chọn ít nhất một bài đăng hoặc một danh mục! [post_category | post_custom]" } } );
      } else if ( req.body.break_point < 5 ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "break_point": "Thời gian chờ tối thiếu 5 phút! Điều này giúp tài khoản của bạn an toàn hơn!" } } );
      } else if ( req.body.started_at === undefined ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "started_at": "Thời gian bắt đầu chưa được thiết lập!" } } );
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
    const newEvent = new Event( req.body );

    // Create to event schedule, Check follow condition
    if ( newEvent.status === true ) {
      await EventScheduleController.create( newEvent.toObject(), findCampaign._id );
    }

    await newEvent.save();
    findCampaign._events.push( newEvent._id );
    findCampaign.logs.content.push( {
      "message": `Tạo sự kiện "${newEvent.title}" ở ${findCampaign.title} thành công.`,
      "createdAt": new Date()
    } );
    findCampaign.logs.total += 1;
    await findCampaign.save();
    /** ********************** Log Action Of User For Admin ****************************** **/
    let objectLog = {
        "data": [
          {
            "logs": {
              "content": `Người dùng tạo sự kiện "${newEvent.title}" ở chiến dịch "${findCampaign.title}" thành công.`,
              "createdAt": new Date(),
              "info": {
                "campaignId": findCampaign._id,
                "eventId": newEvent._id
              },
              "status": 0
            }
          },
          {
            "logs": {
              "content": `Người dùng cài đặt sự kiện "${newEvent.title}" ở chiến dịch ${findCampaign.title} với thời gian giữa các lần đăng là ${newEvent.break_point} được đăng trên ${ newEvent.timeline.length > 0 ? "profile cá nhân với ID:" + newEvent.timeline.toString() : "" } ${newEvent.target_category ? ", nhóm người dùng cài đặt với ID:" + newEvent.target_category : ""} ${newEvent.target_custom.length > 0 ? ", nhóm và trang facebook với ID:" + newEvent.target_custom.toString() : "" } sẽ bắt đầu vào ${ newEvent.started_at }`,
              "createdAt": new Date(),
              "info": {
                "campaignId": findCampaign._id,
                "eventId": newEvent._id
              },
              "status": 0
            }
          } ],
        "_account": req.uid
      },
      resLogSync = await logUserAction( "log", objectLog, { "Authorization": req.headers.authorization } );

    if ( resLogSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }
    /** **************************************************************************** **/

    res.status( 200 ).json( jsonResponse( "success", newEvent ) );
  },
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.type_event === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "type_event": "Loại sự kiện không được bỏ trống! [0: Custom, 1: Auto]" } } );
    } else if ( req.body.type_event === 0 ) {
      if ( !req.body.post_category && req.body.post_custom.length === 0 ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "content": "Nội dung tối thiểu chọn ít nhất một bài đăng hoặc một danh mục! [post_category | post_custom]" } } );
      } else if ( req.body.break_point < 5 ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "break_point": "Thời gian chờ tối thiếu 5 phút! Điều này giúp tài khoản của bạn an toàn hơn!" } } );
      } else if ( !req.body.started_at ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "started_at": "Thời gian bắt đầu chưa được thiết lập!" } } );
      }
    }

    const findEvent = await Event.findOne( { "_id": req.query._eventId, "_account": req.uid } ),
      findCampaign = await Campaign.findOne( { "_events": new ObjectId( req.query._eventId ) } ),
      listEventOldSchedule = await EventSchedule.find( { "_event": req.query._eventId, "status": findCampaign.status } ).lean();

    // Check catch when update event
    if ( !findEvent ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sự kiện không tồn tại!" } );
    }

    /**
     * Update cron schedule and event schedule
     */

    await Promise.all( listEventOldSchedule.map( ( eventSchedule ) => {
      deletedSchedule( eventSchedule, __dirname );
    } ) );

    await EventSchedule.deleteMany( { "_event": req.query._eventId }, ( err ) => {
      if ( err ) {
        throw Error( "Xảy ra lỗi trong quá trình xóa [EventSchedule]" );
      }
    } );
    req.body._id = req.query._eventId;
    await EventScheduleController.create( req.body, findCampaign._id );

    // Handle logs campaign
    findCampaign.logs.total += 1;
    if ( convertUnicode( req.body.title ).toString().toLowerCase() !== convertUnicode( findEvent.title ).toString().toLowerCase() ) {
      findCampaign.logs.content.push( {
        "message": `Thay đổi tên sự kiện  từ "${findEvent.title}" sang "${req.body.title}" thành công.`,
        "createdAt": new Date()
      } );
    } else {
      findCampaign.logs.content.push( {
        "message": `Cập nhật sự kiện "${findEvent.title}" thành công.`,
        "createdAt": new Date()
      } );
    }
    await findCampaign.save();

    // Check exception update event
    if ( req.body.target_category === undefined ) {
      // eslint-disable-next-line camelcase
      findEvent.target_category = undefined;
    }
    if ( req.body.post_category === undefined ) {
      // eslint-disable-next-line camelcase
      findEvent.post_category = undefined;
    }
    /** ********************** Log Action Of User For Admin ****************************** **/
    let objectLog = {
        "data": [
          {
            "logs": {
              "content": `Người dùng cập nhật sự kiện "${findEvent.title}" ở chiến dịch "${findCampaign.title}" thành công.`,
              "createdAt": new Date(),
              "info": {
                "campaignId": findCampaign._id,
                "eventId": findEvent._id
              },
              "status": 0
            }
          },
          {
            "logs": {
              "content": `Người dùng cài đặt sự kiện "${findEvent.title}" ở chiến dịch ${findCampaign.title} với thời gian giữa các lần đăng là ${findEvent.break_point} được đăng trên ${ findEvent.timeline.length > 0 ? "profile cá nhân với ID:" + findEvent.timeline.toString() : "" } ${findEvent.target_category ? ", nhóm người dùng cài đặt với ID:" + findEvent.target_category : ""} ${findEvent.target_custom.length > 0 ? ", nhóm và trang facebook với ID:" + findEvent.target_custom.toString() : "" } sẽ bắt đầu vào ${ findEvent.started_at }`,
              "createdAt": new Date(),
              "info": {
                "campaignId": findCampaign._id,
                "eventId": findEvent._id
              },
              "status": 0
            }
          } ],
        "_account": req.uid
      },

      resLogSync = await logUserAction( "log", objectLog, { "Authorization": req.headers.authorization } );

    if ( resLogSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }
    /** **************************************************************************** **/


    // Save to db mongodb ( Resolve :D )
    await findEvent.save();

    res.status( 201 ).json( jsonResponse( "success", await Event.findByIdAndUpdate( req.query._eventId, { "$set": req.body }, { "new": true } ) ) );
  },
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
      deletedSchedule( eventSchedule, __dirname );
    } ) );
    await EventSchedule.deleteMany( { "_event": req.query._eventId }, ( err ) => {
      if ( err ) {
        throw Error( "Xảy ra lỗi trong quá trình xóa [EventSchedule]" );
      }
    } );

    // delete event of campain
    findCampaign._events = findCampaign._events.filter( ( event ) => event.toString() !== req.query._eventId );
    findCampaign.logs.content.push( {
      "message": `Xóa sự kiện "${findEvent.title}" thành công.`,
      "createdAt": new Date()
    } );
    findCampaign.logs.total += 1;
    await findCampaign.save();
    /** ********************** Log Action Of User For Admin ****************************** **/
    let objectLog = {
        "data": [
          {
            "logs": {
              "content": `Người dùng xóa sự kiện "${findEvent.title}" ở chiến dịch "${findCampaign.title}" thành công.`,
              "createdAt": new Date(),
              "info": {
                "campaignId": findCampaign._id,
                "eventId": findEvent._id
              },
              "status": 0
            }
          } ],
        "_account": req.uid
      },

      resLogSync = await logUserAction( "log", objectLog, { "Authorization": req.headers.authorization } );

    if ( resLogSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }
    /** **************************************************************************** **/

    await Event.findByIdAndDelete( req.query._eventId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "duplicate": async ( req, res ) => {
    const eventInfo = await Event.findOne( { "_id": req.query._eventId, "_account": req.uid } ).select( "-_id -__v -updated_at -created_at" ).lean();

    // Check catch when duplicate
    if ( !eventInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sự kiện không tồn tại!" } );
    }

    let newEvent, campaignContainEvent;

    // Check if other campaign
    if ( req.body.campaign && req.body.campaign.length > 0 ) {
      campaignContainEvent = await Campaign.findOne( { "_id": req.body.campaign, "_account": req.uid } );
    }
    campaignContainEvent = await Campaign.findOne( { "_events": req.body.campaign, "_account": req.uid } );

    eventInfo.title = `${eventInfo.title} Copy`;
    // eslint-disable-next-line camelcase
    eventInfo.started_at = req.body.started_at;

    newEvent = new Event( eventInfo );

    await newEvent.save();

    // Create EventSchedule
    if ( campaignContainEvent.status === true ) {
      await EventScheduleController.create( newEvent, campaignContainEvent._id );
    }

    campaignContainEvent._events.push( newEvent._id );
    campaignContainEvent.save();

    res.status( 200 ).json( jsonResponse( "success", newEvent ) );
  }
};
