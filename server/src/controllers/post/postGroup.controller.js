/* eslint-disable one-var */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/**
 * Controller post group for project
 * author: hoc-anms
 * date up: 24/04/2019
 * date to: ___
 * team: BE-RHP
 */
const PostGroup = require( "../../models/post/PostGroup.model" );
const PageFacebook = require( "../../models/post/PageFacebook.model" );
const GroupFacebook = require( "../../models/post/GroupFacebook.model" );
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

    // Handle get all page from mongodb
    if ( req.query._id ) {
      dataResponse = await PostGroup.find( { "_id": req.query._id, "_account": req.uid } ).lean();
      dataResponse = dataResponse[ 0 ];
      dataResponse._pages = await Promise.all( dataResponse._pages.map( async ( id ) => {
        return await PageFacebook.findOne( { "pageId": id } ).select( "-_id -_account -_facebook -created_at -updated_at -__v" ).lean();
      } ) );
      dataResponse._groups = await Promise.all( dataResponse._groups.map( async ( id ) => {
        return await GroupFacebook.findOne( { "groupId": id } ).select( "-_id -_account -_facebook -created_at -updated_at -__v" ).lean();
      } ) );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await PostGroup.find( { "_account": req.uid } ).lean();
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );
  },
  /**
   * Create post group
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "create": async ( req, res ) => {
    // Check validator
    if ( !req.body.title || req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề nhóm nơi đăng không được bỏ trống!" } } );
    }

    // Handle create campaign
    const newPostGroup = await new PostGroup( {
      "title": req.body.title,
      "_pages": req.body._pages ? req.body._pages : [],
      "_groups": req.body._groups ? req.body._groups : [],
      "_account": req.uid
    } );

    await newPostGroup.save();

    res.status( 200 ).json( jsonResponse( "success", newPostGroup ) );

  },
  /**
   * Update post group
   * ID: using of facebook
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề nhóm nơi đăng không được bỏ trống!" } } );
    }

    const findPostGroup = await PostGroup.findOne( { "_id": req.query._postGroupId, "_account": req.uid } );

    // Check catch when update campaign
    if ( !findPostGroup ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": "Nhóm nơi đăng không tồn tại!" } );
    }

    // check exists in database
    req.body._groups = req.body._groups.concat( findPostGroup._groups );
    req.body._pages = req.body._pages.concat( findPostGroup._pages );
    req.body._groups = [ ...new Set( req.body._groups ) ];
    req.body._pages = [ ...new Set( req.body._pages ) ];

    res.status( 201 ).json( jsonResponse( "success", await PostGroup.findByIdAndUpdate( req.query._postGroupId, { "$set": req.body }, { "new": true } ) ) );
  },
  /**
   * Delete post group
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {
    const findPostGroup = await PostGroup.findOne( { "_id": req.query._postGroupId, "_account": req.uid } );

    // Check catch when delete campaign
    if ( !findPostGroup ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": "Nhóm nơi đăng không tồn tại!" } );
    }

    await PostGroup.findByIdAndDelete( req.query._postGroupId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
