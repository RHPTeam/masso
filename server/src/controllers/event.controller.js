/* eslint-disable one-var */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
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
const decodeRole = require( "../helpers/utils/decodeRole.util" );

module.exports = {
  /**
   * Get All (query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    let dataResponse = null;
    const authorization = req.headers.authorization,
      role = req.headers.cfr,
      userId = secure( res, authorization ),
      accountResult = await Account.findById( userId );

    if ( !accountResult ) {
      return res
        .status( 403 )
        .json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    if (
      decodeRole( role, 10 ) === 0 || decodeRole( role, 10 ) === 1 || decodeRole( role, 10 ) === 2
    ) {
      !req.query._id ? ( dataResponse = await Event.find( { "_account": userId } ) ) : ( dataResponse = await Event.find( {
        "_id": req.query._id,
        "_account": userId
      } ) );
      if ( !dataResponse ) {
        return res.status( 403 ).json( jsonResponse( "Thuộc tính không tồn tại" ) );
      }
      dataResponse = dataResponse.map( ( item ) => {
        if ( item._account.toString() === userId ) {
          return item;
        }
      } );
    }
    res
      .status( 200 )
      .json( jsonResponse( "Lấy dữ liệu thành công =))", dataResponse ) );
  
  },
  /**
   * Create event
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "create": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findCampaign = await Campaign.findOne( { "_id": req.query._campId, "_account": userId } );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findCampaign ) {
      return res.status( 403 ).json( jsonResponse( "Chiến dịch không tồn tại!", null ) );
    }
    const objSave = {
        "title": req.body.title,
        "started_at": req.body.started_at,
        "finished_at": req.body.finished_at,
        "_account": userId
      },
      newEvent = await new Event( objSave );

    await newEvent.save();
    findCampaign._events.push( newEvent._id );
    await findCampaign.save();
    res.status( 200 ).json( jsonResponse( "Tạo sự kiện trong chiến dịch thành công!", newEvent ) );
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
