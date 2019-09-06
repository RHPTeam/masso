/* eslint-disable one-var */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/**
 * Controller Group facebook for project
 * author: hoc-anms
 * date up: 24/04/2019
 * date to: ___
 * team: BE-RHP
 */
const GroupFacebook = require( "../../models/post/GroupFacebook.model" );
const Facebook = require( "../../models/Facebook.model" );
const PostGroup = require( "../../models/post/PostGroup.model" );

const { agent } = require( "../../configs/crawl" );
const getAllGroups = require( "../core/groups.core" );
const jsonResponse = require( "../../configs/response" );

module.exports = {
  /**
   * Get All (query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    let dataResponse = null;

    // Handle get all item from mongodb
    if ( req.query._id ) {
      dataResponse = await GroupFacebook.find( { "_id": req.query._id, "_account": req.uid } ).lean();
      dataResponse = dataResponse[ 0 ];
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await GroupFacebook.find( { "_account": req.uid } ).lean();
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );

  },
  /**
   * Update all item from facebook strange
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {
    const facebookInfo = await Facebook.findOne( { "_id": req.query._id, "_account": req.uid } ),
      postGroupList = await PostGroup.find( { "_account": req.uid } ),
      groupList = await getAllGroups( { "cookie": facebookInfo.cookie, agent } ),
      groupListFixed = groupList.results.map( ( group ) => {
        group._account = req.uid;
        group._facebook = facebookInfo._id;
        return group;
      } ),
      findGroupFacebook = await GroupFacebook.find( { "_facebook": facebookInfo._id } );

    await Promise.all( findGroupFacebook.map( ( groupFacebook ) => {
      groupFacebook.remove();
    } ) );
    // insert item facebook list to database
    await GroupFacebook.insertMany( groupListFixed );
    // Check post item exists old ID
    await Promise.all( postGroupList.map( ( postGroup ) => {
      postGroup._groups.map( async ( group ) => {
        const groupChecked = await GroupFacebook.findOne( { "groupId": group } );

        if ( !groupChecked ) {
          postGroup._groups.splice( postGroup._groups.indexOf( group ), 1 );
          await postGroup.save();
        }
      } );
    } ) );

    res
      .status( 200 )
      .json( jsonResponse( "success", null ) );
  }
};
