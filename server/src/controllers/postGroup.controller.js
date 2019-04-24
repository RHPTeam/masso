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
      !req.query._id ? ( dataResponse = await PostGroup.find( { "_account": userId } ) ) : ( dataResponse = await PostGroup.find( {
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
   * Create post group
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
    const newPostGroup = await new PostGroup( { "title": req.body.title } );
    
    newPostGroup._account = userId;
    await newPostGroup.save();
 
    res.status( 200 ).json( jsonResponse( "Tạo nhóm mục tiêu thành công!", newPostGroup ) );

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
