/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
/**
 * Controller broadcast for project
 * author: hocpv
 * date up: 12/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Broadcast = require( "../../models/chat/Broadcast.model" );

module.exports = {
  /**
   * Get all(id) broadcast
   * @param: req
   * @param: res
   */
  "index": async ( req, res ) => {},
  /**
   * Create broadcast
   * @param: req
   * @param: res
   */
  "create": async ( req, res ) => {
    // Fix Account for model
    req.body._account = req.uid;

    const newBroadcast = new Broadcast( req.body );

    await newBroadcast.save();

    res.status( 201 ).json( { "status": "success", "data": newBroadcast } );
  },
  /**
   * Update broadcast
   * @param: req
   * @param: res
   */
  "update": async ( req, res ) => {},
  /**
   * Delete broadcast
   * @param: req
   * @param: res
   */
  "delete": async ( req, res ) => {}
};
