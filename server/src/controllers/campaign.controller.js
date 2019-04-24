/* eslint-disable one-var */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/**
 * Controller campaign (profile) for project
 * author: hoc-anms
 * date up: 23/04/2019
 * date to: ___
 * team: BE-RHP
 */
const Account = require( "../models/Account.model" );
const Campaign = require( "../models/Campaign.model" );

const jsonResponse = require( "../configs/res" );
const secure = require( "../helpers/utils/secure.util" );
const decodeRole = require( "../helpers/utils/decodeRole.util" );

module.exports = {
  /**
   * Get all (query)
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
      !req.query._id ? ( dataResponse = await Campaign.find( { "_account": userId } ) ) : ( dataResponse = await Campaign.find( {
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
   * Create campaign
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "create": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    const objSave = {
        "title": req.body.title,
        "description": req.body.description ? req.body.description : "",
        "started_at": req.body.started_at,
        "finished_at": req.body.finished_at,
        "_account": userId
      },
      newCampaign = await new Campaign( objSave );

    await newCampaign.save();

    res.status( 200 ).json( jsonResponse( "Tạo chiến dịch thành công!", newCampaign ) );
  },
  /**
   * update campaign
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findCampaign = await Campaign.findById( req.query._campId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findCampaign ) {
      return res.status( 403 ).json( jsonResponse( "Chiến dịch không tồn tại!", null ) );
    }
    if ( req.query._type && ( req.query._type ).trim() === "status" ) {
      findCampaign.status = !findCampaign.status;
      await findCampaign.save();
      return res.status( 201 ).json( jsonResponse( "Cập nhật chiến dịch thành công!", findCampaign ) );
    }
    const dataCampaignUpdate = await Campaign.findByIdAndUpdate( req.query._campId, { "$set": req.body }, { "new": true } );

    res.status( 201 ).json( jsonResponse( "Cập nhật chiến dịch thành công!", dataCampaignUpdate ) );
  },
  /**
   * Delete campaign
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findCampaign = await Campaign.findById( req.query._campId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findCampaign ) {
      return res.status( 403 ).json( jsonResponse( "Chiến dịch không tồn tại!", null ) );
    }
    await Campaign.findByIdAndDelete( req.query._campId );
    res.status( 200 ).json( jsonResponse( "Xóa chiến dịch thành công!", null ) );
  }
};
