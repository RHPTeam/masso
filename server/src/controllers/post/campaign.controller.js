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
const Facebook = require( "../../models/Facebook.model" );
const Post = require( "../../models/post/Post.model" );
const { deletedSchedule } = require( "../../helpers/utils/functions/scheduleLog" );
const EventScheduleController = require( "../../controllers/post/eventSchedule.controller" );

const jsonResponse = require( "../../configs/response" );
const convertUnicode = require( "../../helpers/utils/functions/unicode" );

module.exports = {
  /**
   * Get all (query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    let dataResponse = null;

    // Check if query get one item from _id
    if ( req.query._id ) {
      dataResponse = await Campaign.findOne( { "_id": req.query._id, "_account": req.uid } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account", "populate": { "path": "target_category", "select": "_id _pages _groups" } } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account", "populate": { "path": "post_category", "select": "_id title" } } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account", "populate": { "path": "timeline", "select": "userInfo" } } ).lean();
      return res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
    }

    // Handle et items by pagination with status from database
    if ( req.query._size && req.query._page && req.query._status ) {
      const pageNo = parseInt( req.query._page ),
        size = parseInt( req.query._size ),
        query = {},
        totalPosts = await Campaign.countDocuments( { "_account": req.uid, "status": req.query._status } );

      // Check catch
      if ( pageNo < 0 || pageNo === 0 ) {
        return res.status( 403 ).json( { "status": "error", "message": "Dữ liệu số trang không đúng, phải bắt đầu từ 1." } );
      }

      // Handle input data before connect to mongodb
      query.skip = size * ( pageNo - 1 );
      query.limit = size;
      query.sort = { "$natural": -1 };

      // Handle with mongodb
      dataResponse = await Campaign.find( { "_account": req.uid, "status": req.query._status }, "title description status started_at", query ).lean();

      return res.status( 200 ).json( jsonResponse( "success", { "results": dataResponse, "page": Math.ceil( totalPosts / size ), "size": size } ) );
    }

    // Handle get items by pagination from database
    if ( req.query._size && req.query._page ) {
      const pageNo = parseInt( req.query._page ),
        size = parseInt( req.query._size ),
        query = {},
        totalPosts = await Campaign.countDocuments( { "_account": req.uid } );

      // Check catch
      if ( pageNo < 0 || pageNo === 0 ) {
        return res.status( 403 ).json( { "status": "error", "message": "Dữ liệu số trang không đúng, phải bắt đầu từ 1." } );
      }

      // Handle input data before connect to mongodb
      query.skip = size * ( pageNo - 1 );
      query.limit = size;
      query.sort = { "$natural": -1 };

      // Handle with mongodb
      dataResponse = await Campaign.find( { "_account": req.uid }, "title description status started_at", query ).lean();

      return res.status( 200 ).json( jsonResponse( "success", { "results": dataResponse, "page": Math.ceil( totalPosts / size ), "size": size } ) );
    }

    res.status( 304 ).json( jsonResponse( "fail", "API này không được cung cấp!" ) );
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
      "status": 1,
      "logs": {
        "content": [ {
          "message": `Khởi tạo chiến dịch "${req.body.title}" thành công.`,
          "createdAt": new Date()
        } ],
        "total": 1
      },
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

    const findCampaign = await Campaign.findOne( { "_id": req.query._campaignId, "_account": req.uid } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account", "populate": { "path": "target_category", "select": "_id _pages _groups" } } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account", "populate": { "path": "post_category", "select": "_id title" } } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account", "populate": { "path": "timeline", "select": "userInfo" } } );

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
          deletedSchedule( eventSchedule, __dirname );
        } ) );
        await EventSchedule.deleteMany( { "_event": event._id } );
        event.status = findCampaign.status;
        await EventScheduleController.create( event, findCampaign._id, req.uid );

        await Event.findByIdAndUpdate( event._id, { "$set": { "status": findCampaign.status } }, { "new": true } );

        // Handle logs campaign when update status
        findCampaign.logs.total += 1;
        findCampaign.logs.content.push( {
          "message": `Chuyển trạng thái chiến dịch từ ${!findCampaign.status} sang ${findCampaign.status} thành công.`,
          "createdAt": new Date()
        } );
      } ) );

      // Check name if update name
      // if ( convertUnicode( findCampaign.title ).toString().toLowerCase() !== convertUnicode( req.body.title ).toString().toLowerCase() ) {
      //   findCampaign.logs.total += 1;
      //   findCampaign.logs.content.push( {
      //     "message": `Thay đổi tên chiến dịch từ ${findCampaign.title} sang ${req.body.title} thành công.`,
      //     "createdAt": new Date()
      //   } );
      // }

      await findCampaign.save();
      return res.status( 201 ).json( jsonResponse( "success", findCampaign ) );
    }

    res.status( 201 ).json( jsonResponse( "success", await Campaign.findByIdAndUpdate( req.query._campaignId, { "$set": req.body }, { "new": true } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account", "populate": { "path": "target_category", "select": "_id _pages _groups" } } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account", "populate": { "path": "post_category", "select": "_id title" } } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account", "populate": { "path": "timeline", "select": "userInfo" } } ).lean() ) );
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
        deletedSchedule( eventSchedule, __dirname );
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
    campaignInfo.status = false;

    // Handle logs
    campaignInfo.logs.content = [ {
      "message": `Sao chép từ chiến dịch "${campaignInfo.title}" thành công.`,
      "createdAt": new Date()
    } ];
    campaignInfo.logs.total += 1;

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
  },
  "duplicateSyncCampaignExample": async ( req, res ) => {
    const findFacebook = await Facebook.findOne( { "_id": req.body.facebookId, "_account": req.uid } ).lean(),
      dataCampaign = {
        "title": req.body.campaignExample.title + "Copy",
        "description": req.body.campaignExample.description,
        "status": 0,
        "started_at": Date.now(),
        "finished_at": "",
        "_account": req.uid
      },
      newCampaign = await new Campaign( dataCampaign );

    await newCampaign.save();
    let date = new Date(),
      count = 0;

    console.log( date.getDate() )
    // Handle campaign
    for ( let i = 0; i < req.body.campaignExample.postList.length; i++ ) {
      // Post in 20h
      if ( i % 2 === 0 ) {
        count++;
        let attachments = await Promise.all( req.body.campaignExample.postList[ i ].photos.map( ( image ) => {
            return {
              "link": image,
              "typeAttachment": 1
            };
          } ) ),
          dataPost = {
            "title": req.body.campaignExample.postList[ i ].title,
            "content": req.body.campaignExample.postList[ i ].content,
            "attachments": attachments,
            "_account": req.uid
          },
          newPost = await new Post( dataPost );

        await newPost.save();
        date.setDate( date.getDate() + count );
        date.setHours( 20, 0, 0 );
        const dataEvent = {
            "title": dictionary.NAME_EVENT_EXAMPLE + " " + ( i + 1 ).toString(),
            "status": 0,
            "_account": req.uid,
            "started_at": date
          },
          newEvent = await new Event( dataEvent );

        // Create to event schedule, Check follow condition
        newEvent.timeline.push( findFacebook._id );
        newEvent.post_custom.push( newPost._id );
        await EventScheduleController.create( newEvent.toObject(), newCampaign._id, req.uid );

        await newEvent.save();
        newCampaign._events.push( newEvent._id );
        await newCampaign.save();
      } else {
        // Post in 8h30
        let attachments = await Promise.all( req.body.campaignExample.postList[ i ].photos.map( ( image ) => {
            return {
              "link": image,
              "typeAttachment": 1
            };
          } ) ),
          dataPost = {
            "title": req.body.campaignExample.postList[ i ].title,
            "content": req.body.campaignExample.postList[ i ].content,
            "attachments": attachments,
            "_account": req.uid
          },
          newPost = await new Post( dataPost );

        await newPost.save();
        date.setDate( date.getDate() + count );
        date.setHours( 8, 30, 0 );
        const dataEvent = {
            "title": dictionary.NAME_EVENT_EXAMPLE + " " + ( i + 1 ).toString(),
            "status": 0,
            "_account": req.uid,
            "started_at": date
          },
          newEvent = await new Event( dataEvent );

        // Create to event schedule, Check follow condition
        newEvent.timeline.push( findFacebook._id );
        newEvent.post_custom.push( newPost._id );
        await EventScheduleController.create( newEvent.toObject(), newCampaign._id, req.uid );

        await newEvent.save();
        newCampaign._events.push( newEvent._id );
        await newCampaign.save();
      }
    }
    const findCampaign = await Campaign.findOne( { "_id": newCampaign._id, "_account": req.uid } ).populate( "_events" ).lean();

    res.send( { "status": "success", "data": findCampaign } );
  }
};
