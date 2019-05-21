/**
 * Controller server for project
 * author: sky albert
 * updater: _________
 * date up: 21/05/2019
 * date to:
 * team: BE-RHP
 */
const Server = require( "../models/Server.model" );

const decodeRole = require( "../helpers/utils/decodeRole.util" );
const jsonResponse = require( "../configs/res" );

module.exports = {
  /**
   * Get server (all or query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    if ( req.headers.cfr === undefined ) {
      return res.status( 405 ).json( { "status": "error", "message": "Không thể xác thực được quyền của bạn!" } );
    }

    let dataResponse = null, role = req.headers.cfr;

    if ( decodeRole( role, 10 ) !== 1 && decodeRole( role, 10 ) !== 2 ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho chức năng này!" } );
    }

    if ( req.query._id ) {
      dataResponse = await Server.findOne( { "_id": req.query._id } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Server.find( req.query ).lean();
    }

    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
  },
  /**
   * Get server (all or query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "create": async ( req, res ) => {
    if ( req.headers.cfr === undefined ) {
      return res.status( 405 ).json( { "status": "error", "message": "Không thể xác thực được quyền của bạn!" } );
    }

    if ( req.body.title.length === 0 ) {
      return res.status( 403 ).json( { "status": "error", "title": "Tên của server không được bỏ trống!" } );
    } else if ( req.body.amountMax === undefined ) {
      return res.status( 403 ).json( { "status": "error", "amountMax": "Số lượng user tối đa của server không được bỏ trống!" } );
    } else if ( req.body.status === undefined ) {
      return res.status( 403 ).json( { "status": "error", "server": "Trạng thái của server không được bỏ trống!" } );
    } else if ( Object.entries( req.body.info ).length === 0 && req.body.info.constructor === Object ) {
      return res.status( 403 ).json( { "status": "error", "info": "Cấu hình vps không được bỏ trống!" } );
    }

    let role = req.headers.cfr;

    if ( decodeRole( role, 10 ) !== 1 && decodeRole( role, 10 ) !== 2 ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho chức năng này!" } );
    }

    const newServer = new Server( req.body );

    await newServer.save();

    res.status( 200 ).json( jsonResponse( "success", newServer ) );
  }
};
