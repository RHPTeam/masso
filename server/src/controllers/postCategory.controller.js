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
const dictionary = require( "../configs/dictionaries" );

module.exports = {
  /**
   * Get post category (query or not)
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
      req.query._id ? ( dataResponse = await PostCategory.find( { "_id": req.query._id, "_account": userId } ) ) : req.query._size && req.query._page ? ( dataResponse = ( await PostCategory.find( { "_account": userId } ) ).slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) ) ) : req.query._size ? ( dataResponse = ( await PostCategory.find( { "_account": userId } ) ).slice( 0, Number( req.query._size ) ) ) : ( dataResponse = await PostCategory.find( { "_account": userId } ) );
      if ( !dataResponse ) {
        return res.status( 403 ).json( jsonResponse( "Thuộc tính không tồn tại" ) );
      }
      const findPost = await Post.find( { "_account": userId } );

      if ( req.query._size ) {
        page = ( ( await PostCategory.find( { "_account": userId } ) ).length % req.query._size ) === 0 ? Math.floor( ( await PostCategory.find( { "_account": userId } ) ).length / req.query._size ) : Math.floor( ( await PostCategory.find( { "_account": userId } ) ).length / req.query._size ) + 1;
      }
      dataResponse = dataResponse.map( ( item ) => {
        if ( item._account.toString() === userId ) {
          const num = findPost.filter( ( post ) => post._categories.indexOf( item._id ) > -1 ).length;

          return { "data": item, "num": num, "page": page };
        }
      } );
    }
    res
      .status( 200 )
      .json( jsonResponse( "Lấy dữ liệu thành công =))", dataResponse ) );
  },
  /**
   * Create Post Category
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

    const objSave = {
        "title": req.body.title,
        "description": req.body.description,
        "_account": userId
      },
      newPostCategory = await new PostCategory( objSave );

    await newPostCategory.save();

    res.status( 200 ).json( jsonResponse( "Tạo bộ sưu tập bài viết thành công!", newPostCategory ) );
  },
  /**
   * Update Post Category
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "update": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findPostCategory = await PostCategory.findById( req.query._pcId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findPostCategory ) {
      return res.status( 403 ).json( jsonResponse( "Bộ sưu tập bài viết không tồn tại!", null ) );
    }
    const dataPostCategoryUpdate = await PostCategory.findByIdAndUpdate( req.query._pcId, { "$set": req.body }, { "new": true } );

    res.status( 201 ).json( jsonResponse( "Cập nhật bộ sưu tập bài viết thành công!", dataPostCategoryUpdate ) );
  },
  /**
   * Delete Post Category
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findById( userId ),
      findPostCategory = await PostCategory.findById( req.query._pcId );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !findPostCategory ) {
      return res.status( 403 ).json( jsonResponse( "Bộ sưu tập bài viết không tồn tại!", null ) );
    }
    if ( findPostCategory.title === dictionary.DEFAULT_POSTCATEGORY ) {
      return res.status( 405 ).json( jsonResponse( "Bạn không được xóa bộ sưu tập bài viết này!", null ) );
    }
    const findPost = await Post.find( { "_account": userId } );

    if ( findPost.length > 0 ) {
      Promise.all( findPost.map( async ( post ) => {
        if ( post._categories.indexOf( req.query._pcId ) > -1 ) {
          post._categories.pull( req.query._pcId );
          await post.save();
        }
      } ) );
    }
    await PostCategory.findByIdAndRemove( req.query._pcId );
    res.status( 200 ).json( jsonResponse( "Xóa bộ sưu tập bài viết thành công!", null ) );
  }
};
