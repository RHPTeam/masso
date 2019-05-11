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
    let page = null, dataResponse = null;
    const authorization = req.headers.authorization,
      userId = secure( res, authorization );

    if ( req.query._id ) {
      dataResponse = await PostFacebook.find( { "_id": req.query._id, "_account": userId } ).populate( { "path": "_categories", "select": "_id title" } ).lean();
    } else if ( req.query._size && req.query._page ) {
      dataResponse = ( await PostFacebook.find( { "_account": userId } ).lean() ).slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
    } else if ( req.query._size ) {
      dataResponse = ( await PostFacebook.find( { "_account": userId } ).lean() ).slice( 0, Number( req.query._size ) );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Post.find( { "_account": userId } ).lean();
    }

    if ( req.query._size ) {
      if ( ( await Post.find( { "_account": userId } ) ).length % req.query._size === 0 ) {
        page = Math.floor( ( await Post.find( { "_account": userId } ) ).length / req.query._size );
      } else {
        page = Math.floor( ( await Post.find( { "_account": userId } ) ).length / req.query._size ) + 1;
      }

      return res
        .status( 200 )
        .json( jsonResponse( "success", { "results": dataResponse, "page": page } ) );
    }

    // Check when user get one
    if ( req.query._id ) {
      dataResponse = dataResponse[ 0 ];
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );
  
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
      if ( findItem.typeAttachment === 1 ) {
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
      if ( findItem.typeAttachment === 0 ) {
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
