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
const Account = require( "../models/Account.model" );
const PostGroup = require( "../models/PostGroup.model" );
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
      userId = secure( res, authorization );

    // Handle get all page from mongodb
    if ( req.query._id ) {
      dataResponse = await PostGroup.find( { "_id": req.query._id, "_account": userId } ).lean();
      dataResponse = dataResponse[ 0 ];
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await PostGroup.find( { "_account": userId } ).lean();
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
    const userId = secure( res, req.headers.authorization ),
      newPostGroup = await new PostGroup( {
        "title": req.body.title,
        "_pages": req.body._pages ? req.body._pages : [],
        "_groups": req.body._groups ? req.body._groups : [],
        "_account": userId
      } );

    await newPostGroup.save();

    res.status( 200 ).json( jsonResponse( "success", newPostGroup ) );

  },
  /**
   * Update post group
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findPostGroup = await PostGroup.findById( req.query._pgrId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findPostGroup ) {
      return res.status( 403 ).json( jsonResponse( "Nhóm mục tiêu không tồn tại!", null ) );
    }
    if ( req.body.content ) {
      if ( req.body.content.typeContent === 0 ) {
        const foundGroupFacebook = await GroupFacebook.findOne( { "_id": req.body.content.id } );

        if ( !foundGroupFacebook ) {
          return res.status( 403 ).json( jsonResponse( "Group facebook không tồn tại!", null ) );
        }
        findPostGroup.content.push( req.body.content );
        await findPostGroup.save();
      }
      const foundPageFacebook = await PageFacebook.findOne( { "_id": req.body.content.id } );

      if ( !foundPageFacebook ) {
        return res.status( 403 ).json( jsonResponse( "Page facebook không tồn tại!", null ) );
      }
      findPostGroup.content.push( req.body.content );
      await findPostGroup.save();
    }
    const dataPostGroupUpdate = await PostGroup.findByIdAndUpdate( req.query._pgrId, { "$set": req.body }, { "new": true } );

    res.status( 201 ).json( jsonResponse( "Cập nhật nhóm mục tiêu thành công!", dataPostGroupUpdate ) );
  },
  /**
   * Delete post group
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findPostGroup = await PostGroup.findById( req.query._pgrId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findPostGroup ) {
      return res.status( 403 ).json( jsonResponse( "Nhóm mục tiêu không tồn tại!", null ) );
    }
    if ( req.query._contentId ) {
      if ( findPostGroup.content.indexOf( req.query._contentId ) <= -1 ) {
        return res.status( 403 ).json( jsonResponse( "Item không tồn tại!", null ) );
      }
      findPostGroup.content.pull( req.query._contentId );
      await findPostGroup.save();
      return res.status( 200 ).json( jsonResponse( "Xóa item content thành công!", findPostGroup ) );
    }
    await PostGroup.findByIdAndDelete( req.query._pgrId );
    res.status( 200 ).json( jsonResponse( "Xóa nhóm mục tiêu thành công!", null ) );
  }
};
