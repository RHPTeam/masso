/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
/**
 * Controller message for project
 * author: hocpv
 * date up: 15/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require( "../../models/Account.model" );
const Message = require( "../../models/chat/Message.model" );

const jsonResponse = require( "../../configs/response" );
const { findSubString } = require( "../../helpers/utils/functions/string" );

module.exports = {
  /**
   * Get all(id) message
   * @param: req
   * @param: res
   */
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id && req.query._itemId ) {
      dataResponse = ( await Message.findOne( { "_id": req.query._id, "_account": req.uid } ) ).contents.find( ( item ) => item.id === req.query._itemId );
      return res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
    }
    await req.query._id ? dataResponse = await Message.find( {
      "_id": req.query._id,
      "_account": req.uid
    } ).populate( {
      "path": "_sender",
      "select": "-cookie"
    } ) : req.query._fbId ? dataResponse = await Message.find( {
      "_account": req.uid,
      "_sender": req.query._fbId
    } ).populate( {
      "path": "_sender",
      "select": "-cookie"
    } ) : dataResponse = await Message.find( { "_account": req.uid } ).populate( { "path": "_sender", "select": "-cookie" } );
    if ( !dataResponse ) {
      return res.status( 403 ).json( jsonResponse( "fail", "Thuộc tính không tồn tại" ) );
    }
    dataResponse = dataResponse.map( ( item ) => {
      if ( item._account.toString() === req.uid ) {
        return item;
      }
    } );

    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
  },

  /**
   * Delete conversation
   * @param: req
   * @param: res
   */
  "delete": async ( req, res ) => {
    await Message.findByIdAndRemove( req.query._threadId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
