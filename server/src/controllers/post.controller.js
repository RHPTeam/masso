/* eslint-disable one-var */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/**
 * Controller post (profile) for project
 * author: hoc-anms
 * date up: 20/04/2019
 * date to: ___
 * team: BE-RHP
 */
const Account = require( "../models/Account.model" );
const Post = require( "../models/Post.model" );
const PostCategory = require( "../models/PostCategory.model" );

const jsonResponse = require( "../configs/res" );
const secure = require( "../helpers/utils/secure.util" );
const decodeRole = require( "../helpers/utils/decodeRole.util" );
const config = require( "../configs/server" );
const dictionary = require( "../configs/dictionaries" );

module.exports = {
  /**
   * Get All (query or not)
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "index": async ( req, res ) => {
    let page = null;
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
      // eslint-disable-next-line no-nested-ternary
      req.query._id ? ( dataResponse = await Post.find( { "_id": req.query._id, "_account": userId } ) ) : req.query._size && req.query._page ? ( dataResponse = ( await Post.find( { "_account": userId } ) ).slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) ) ) : req.query._size ? ( dataResponse = ( await Post.find( { "_account": userId } ) ).slice( 0, Number( req.query._size ) ) ) : ( dataResponse = await Post.find( { "_account": userId } ) );
      if ( !dataResponse ) {
        return res.status( 403 ).json( jsonResponse( "Thuộc tính không tồn tại" ) );
      }
      if ( req.query._size ) {
        page = ( ( await Post.find( { "_account": userId } ) ).length % req.query._size ) === 0 ? Math.floor( ( await Post.find( { "_account": userId } ) ).length / req.query._size ) : Math.floor( ( await Post.find( { "_account": userId } ) ).length / req.query._size ) + 1;
      }
      dataResponse = dataResponse.map( ( item ) => {
        if ( item._account.toString() === userId ) {
          return { "data": item, "page": page };
        }
      } );
    }
    res
      .status( 200 )
      .json( jsonResponse( "Lấy dữ liệu thành công =))", dataResponse ) );
  },
  /**
   * Create Post
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "create": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const findPostCategory = await PostCategory.findOne( { "_account": userId, "title": dictionary.DEFAULT_POSTCATEGORY } ),
      newPost = await new Post( req.body );

    newPost._account = userId;
    newPost._categories.push( findPostCategory._id );
    await newPost.save();
    
    res.status( 200 ).json( jsonResponse( "Tạo bài viết thành công!", newPost ) );
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
      findPost = await Post.findById( req.query._postId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findPost ) {
      return res.status( 403 ).json( jsonResponse( "Bài viết không tồn tại!", null ) );
    }
    // Add attachment type link video
    if ( req.query._type === "0" ) {
      findPost.attachments.push( { "link": "", "typeAttachment": 0 } );
      await findPost.save();
      return res.status( 201 ).json( jsonResponse( "Tạo link video của bài viết thành công!", findPost ) );
    }
    // Add attachment type link image
    if ( req.query._type === "1" ) {
      findPost.attachments.push( { "link": "", "typeAttachment": 1 } );
      await findPost.save();
      return res.status( 201 ).json( jsonResponse( "Tạo ảnh của bài viết thành công!", findPost ) );
    }
  },
  /**
   * Update Post
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "update": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findPost = await Post.findById( req.query._postId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findPost ) {
      return res.status( 403 ).json( jsonResponse( "Bài viết không tồn tại!", null ) );
    }
    // Update _categories to post
    if ( req.query._type === "1" && req.query._cateId ) {
      const findPostCategory = await PostCategory.findOne( { "_id": req.query._cateId } ),
        findDefaultPostCategory = await PostCategory.findOne( { "_account": userId, "title": dictionary.DEFAULT_POSTCATEGORY } );
      
      if ( !findPostCategory ) {
        return res.status( 403 ).json( jsonResponse( "Bộ sưu tập không tồn tại!", null ) );
      }
      if ( findPost._categories.indexOf( findPostCategory._id ) <= -1 ) {
        findPost._categories.pull( findDefaultPostCategory._id );
        findPost._categories.push( findPostCategory._id );
        await findPost.save();
        return res.status( 201 ).json( jsonResponse( "Cập nhật bài viết thành công!", findPost ) );
      }
      return res.status( 405 ).json( jsonResponse( "Bạn đã thêm bộ sưu tập này vào bài viêt!", null ) );
    }
    // Update link video to post
    if ( req.query._type === "2" && req.query._attachId ) {
      const findItem = findPost.attachments.filter( ( x ) => x.id === req.query._attachId )[ 0 ];

      if ( typeof findItem === undefined ) {
        return res.status( 403 ).json( jsonResponse( "Nội dung không tồn tại trong bài viết này!", null ) );
      }
      if ( findItem.typeAttachment === 0 ) {
        return res.status( 405 ).json( jsonResponse( "Bạn không thể cập nhật loại link video vào attachment loại ảnh!", null ) );
      }
      findItem.link = req.body.link;
      await findPost.save();
      return res.status( 201 ).json( jsonResponse( "Cập nhật attachment trong bài viết thành công!", findPost ) );
    }
    // Update link image to post
    if ( req.query._type === "3" && req.query._attachId && req.file ) {
      const findItem = findPost.attachments.filter( ( x ) => x.id === req.query._attachId )[ 0 ];

      if ( typeof findItem === undefined ) {
        return res.status( 403 ).json( jsonResponse( "Nội dung không tồn tại trong bài viết này!", null ) );
      }
      if ( findItem.typeAttachment === 1 ) {
        return res.status( 405 ).json( jsonResponse( "Bạn không thể cập nhật loại link image vào link video loại ảnh!", null ) );
      }
      findItem.link = `${config.url}/${ req.file.path.replace( /\\/gi, "/" )}`;
      await findPost.save();
      return res.status( 201 ).json( jsonResponse( "Cập nhật attachment trong bài viết thành công!", findPost ) );
    }
    // Update content of post
    const dataPostUpdate = await Post.findByIdAndUpdate( req.query._postId, { "$set": req.body }, { "new": true } );

    res.status( 201 ).json( jsonResponse( "Cập nhật bài viết thành công!", dataPostUpdate ) );
  },
  /**
   * Delete Post
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findPost = await Post.findById( req.query._postId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findPost ) {
      return res.status( 403 ).json( jsonResponse( "Bài viết không tồn tại!", null ) );
    }
    // Remove categories from post
    if ( req.query._type === "1" && req.query._cateId ) {
      const findPostCategory = await PostCategory.findOne( { "_id": req.query._cateId } );
      
      if ( !findPostCategory ) {
        return res.status( 403 ).json( jsonResponse( "Bộ sưu tập không tồn tại!", null ) );
      }
      if ( findPost._categories.indexOf( findPostCategory._id ) > -1 ) {
        findPost._categories.pull( findPostCategory._id );
        await findPost.save();
        return res.status( 201 ).json( jsonResponse( "Xóa bộ sưu tập thành công!", findPost ) );
      }
      return res.status( 405 ).json( jsonResponse( "Bài viết không nằm trong bộ sưu tập này!", null ) );
    }
    // Remove item type link video & type image
    if ( req.query._type === "2" && req.query._attachId ) {
      const findItem = findPost.attachments.filter( ( x ) => x.id === req.query._attachId )[ 0 ];

      if ( typeof findItem === undefined ) {
        return res.status( 403 ).json( jsonResponse( "Nội dung không tồn tại trong bài viết này!", null ) );
      }
      findPost.attachments.pull( findItem );
      await findPost.save();
      return res.status( 201 ).json( jsonResponse( "Cập nhật attachment trong bài viết thành công!", findPost ) );
    }
    // Remove post
    await Post.findOneAndRemove( { "_id": req.query._postId } );
    res.status( 200 ).json( jsonResponse( "Xóa bài viết thành công!", null ) );
  }
};
