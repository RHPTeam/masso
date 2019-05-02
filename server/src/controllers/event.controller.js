/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */

/**
 * Controller event for project
 * author: hoc-anms
 * date up: 23/04/2019
 * date to: ___
 * team: BE-RHP
 */
const Account = require( "../models/Account.model" );
const Campaign = require( "../models/Campaign.model" );
const Event = require( "../models/Event.model" );
const PageFacebook = require( "../models/PageFacebook.model" );
const GroupFacebook = require( "../models/GroupFacebook.model" );

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
    const userId = secure( res, req.headers.authorization ),
      objSave = {
        "title": req.body.title,
        "color": req.body.color,
        "typeEvent": req.body.typeEvent,
        "content": req.body.content,
        "_targets": req.body._targets,
        "status": req.body.status,
        "started_at": req.body.started_at ? req.body.started_at : Date.now(),
        "finished_at": req.body.finished_at ? req.body.finished_at : null,
        "_account": userId
      },
      newEvent = await new Event( objSave ),
      findCampaign = await Campaign.findOne( { "_id": req.query._campaignId, "_account": userId } );

    // Check catch when update event
    if ( !findCampaign ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không tồn tại!" } );
    } else if ( findCampaign._account.toString() !== userId ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho sự kiện này!" } );
    }

    // Check auto or custom
    if ( req.body.typeEvent && req.body.typeEvent === 1 ) {
      if ( !req.body.content || req.body.content.length === 0 ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "content": "Bài đăng không được bỏ trống!" } } );
      } else if ( !req.body._targets || req.body._targets.length === 0 ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "_targets": "Nơi đăng không được bỏ trống!" } } );
      }
    }

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
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findEvent = await Event.findById( req.query._eventId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findEvent ) {
      return res.status( 403 ).json( jsonResponse( "Sự kiện không tồn tại!", null ) );
    }
    if ( req.query._type && ( req.query._type ).trim() === "status" ) {
      findEvent.status = !findEvent.status;
      await findEvent.save();
      return res.status( 201 ).json( jsonResponse( "Cập nhật sự kiện thành công!", findEvent ) );
    }
    req.body.post ? findEvent._post.push( req.body.post ) : findEvent._post;
    await findEvent.save();
    if ( req.body.target ) {
      if ( req.body.target.typeTarget === 0 ) {
        const foundGroupFacebook = await GroupFacebook.findOne( { "_id": req.body.target.id } );

        if ( !foundGroupFacebook ) {
          return res.status( 403 ).json( jsonResponse( "Group facebook không tồn tại!", null ) );
        }
        findEvent._targets.push( req.body.target );
        await findEvent.save();
      }
      const foundPageFacebook = await PageFacebook.findOne( { "_id": req.body.target.id } );

      if ( !foundPageFacebook ) {
        return res.status( 403 ).json( jsonResponse( "Page facebook không tồn tại!", null ) );
      }
      findEvent._targets.push( req.body.target );
      await findEvent.save();
    }
    const dataEventUpdate = await Event.findByIdAndUpdate( req.query._eventId, { "$set": req.body }, { "new": true } );

    res.status( 201 ).json( jsonResponse( "Cập nhật sự kiện trong chiến dịch thành công!", dataEventUpdate ) );

  },
  /**
   * Delete Event
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findCampaign = await Campaign.findOne( { "_id": req.query._campId, "_account": userId } ),
      findEvent = await Event.findById( req.query._eventId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findCampaign ) {
      return res.status( 403 ).json( jsonResponse( "Chiến dịch không tồn tại!", null ) );
    }
    if ( !findEvent ) {
      return res.status( 403 ).json( jsonResponse( "Sự kiện không tồn tại!", null ) );
    }
    if ( req.query._postId ) {

      if ( findEvent._post.indexOf( req.query._postId ) <= -1 ) {
        return res.status( 403 ).json( jsonResponse( "Item không tồn tại!", null ) );
      }
      findEvent._post.pull( req.query._postId );
      await findEvent.save();
      return res.status( 200 ).json( jsonResponse( "Xóa item post trong sự kiện thành công!", findEvent ) );
    }
    if ( req.query._targetId ) {

      if ( findEvent._targets.indexOf( req.query._targetId ) <= -1 ) {
        return res.status( 403 ).json( jsonResponse( "Item không tồn tại!", null ) );
      }
      findEvent._targets.pull( req.query._targetId );
      await findEvent.save();
      return res.status( 200 ).json( jsonResponse( "Xóa item _target trong sự kiện thành công!", findEvent ) );
    }
    findCampaign._events.pull( findEvent._id );
    await findCampaign.save();
    await Event.findByIdAndDelete( req.query._eventId );
    res.status( 200 ).json( jsonResponse( "Xóa sự kiện trong chiến dịch thành công!", null ) );
  }
};
