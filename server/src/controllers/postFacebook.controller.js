/* eslint-disable one-var */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/**
 * Controller post facebook for project
 * author: hoc-anms
 * date up: 24/04/2019
 * date to: ___
 * team: BE-RHP
 */
const Account = require( "../models/Account.model" );
const PostFacebook = require( "../models/PostFacebook.model" );

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
      !req.query._id ? ( dataResponse = await PostFacebook.find( { "_account": userId } ) ) : ( dataResponse = await PostFacebook.find( {
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
   * Add attachment to Post
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "addAttachment": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findPostFacebook = await PostFacebook.findById( req.query._pfId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findPostFacebook ) {
      return res.status( 403 ).json( jsonResponse( "Bài viết facebook không tồn tại!", null ) );
    }
    // Add attachment type link video
    if ( req.query._type === "0" ) {
      findPostFacebook.attachments.push( { "link": "", "typeAttachment": 0 } );
      await findPostFacebook.save();
      return res.status( 201 ).json( jsonResponse( "Tạo link video của bài viết facebok thành công!", findPostFacebook ) );
    }
    // Add attachment type link image
    if ( req.query._type === "1" ) {
      findPostFacebook.attachments.push( { "link": "", "typeAttachment": 1 } );
      await findPostFacebook.save();
      return res.status( 201 ).json( jsonResponse( "Tạo ảnh của bài viết facebook thành công!", findPostFacebook ) );
    }
  },
  /**
   * update post facebook
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findPostFacebook = await PostFacebook.findById( req.query._pfId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findPostFacebook ) {
      return res.status( 403 ).json( jsonResponse( "Bài viết facebook không tồn tại!", null ) );
    }
    // Update link video to post
    if ( req.query._type === "0" && req.query._attachId ) {
      const findItem = findPostFacebook.attachments.filter( ( x ) => x.id === req.query._attachId )[ 0 ];

      if ( typeof findItem === undefined ) {
        return res.status( 403 ).json( jsonResponse( "Nội dung không tồn tại trong bài viết facebook này!", null ) );
      }
      if ( findItem.typeAttachment === 0 ) {
        return res.status( 405 ).json( jsonResponse( "Bạn không thể cập nhật loại link video vào attachment loại ảnh!", null ) );
      }
      findItem.link = req.body.link;
      await findPostFacebook.save();
      return res.status( 201 ).json( jsonResponse( "Cập nhật attachment trong bài viết facebook thành công!", findPostFacebook ) );
    }
    // Update link image to post
    if ( req.query._type === "1" && req.query._attachId && req.file ) {
      const findItem = findPostFacebook.attachments.filter( ( x ) => x.id === req.query._attachId )[ 0 ];

      if ( typeof findItem === undefined ) {
        return res.status( 403 ).json( jsonResponse( "Nội dung không tồn tại trong bài viết này!", null ) );
      }
      if ( findItem.typeAttachment === 1 ) {
        return res.status( 405 ).json( jsonResponse( "Bạn không thể cập nhật loại link image vào link video loại ảnh!", null ) );
      }
      findItem.link = `${config.url}/${ req.file.path.replace( /\\/gi, "/" )}`;
      await findPostFacebook.save();
      return res.status( 201 ).json( jsonResponse( "Cập nhật attachment trong bài viết thành công!", findPostFacebook ) );
    }
    // Update content post facebook
    const dataPostFacebookUpdate = await PostFacebook.findByIdAndUpdate( req.query._pfId, { "$set": req.body }, { "new": true } );

    res.status( 201 ).json( jsonResponse( "Cập nhật bài viết facebook thành công!", dataPostFacebookUpdate ) );
  },
  /**
   * Delete post facebook
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findPostFacebook = await PostFacebook.findById( req.query._pfId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findPostFacebook ) {
      return res.status( 403 ).json( jsonResponse( "Bài viết facebook không tồn tại!", null ) );
    }

    // Remove item type link video & type image
    if ( req.query._type === "1" && req.query._attachId ) {
      const findItem = findPostFacebook.attachments.filter( ( x ) => x.id === req.query._attachId )[ 0 ];

      if ( typeof findItem === undefined ) {
        return res.status( 403 ).json( jsonResponse( "Nội dung không tồn tại trong bài viết này!", null ) );
      }
      findPostFacebook.attachments.pull( findItem );
      await findPostFacebook.save();
      return res.status( 201 ).json( jsonResponse( "Cập nhật attachment trong bài viết facebook thành công!", findPostFacebook ) );
    }
    // Remove post facebook
    await PostFacebook.findOneAndRemove( { "_id": req.query._pfId } );
    res.status( 200 ).json( jsonResponse( "Xóa bài viết facebook thành công!", null ) );
  }
};
