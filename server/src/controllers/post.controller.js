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
    let page = null, dataResponse = null;
    const authorization = req.headers.authorization,
      userId = secure( res, authorization );

    if ( req.query._id ) {
      dataResponse = await Post.find( { "_id": req.query._id, "_account": userId } ).lean();
    } else if ( req.query._size && req.query._page ) {
      dataResponse = ( await Post.find( { "_account": userId } ).lean() ).slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
    } else if ( req.query._size ) {
      dataResponse = ( await Post.find( { "_account": userId } ).lean() ).slice( 0, Number( req.query._size ) );
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
   * Create Post
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "create": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      findPostCategory = await PostCategory.findOne( { "_account": userId, "title": dictionary.DEFAULT_POSTCATEGORY } ),
      newPost = await new Post( { "title": dictionary.DEFAULT_NAMEPOST, "_account": userId } );

    newPost._categories.push( findPostCategory._id );
    await newPost.save();

    res.status( 200 ).json( jsonResponse( "success", newPost ) );
  },
  /**
   * Add attachment to Post
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "addAttachment": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      findPost = await Post.findById( req.query._postId );

    // Check catch when update post categories
    if ( !findPostCategory ) {
      return res.status( 404 ).json( { "status": "error", "message": "Bài đăng không tồn tại!" } );
    } else if ( findPost._account.toString() !== userId ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho bài đăng này!" } );
    }

    // Add attachment type link video
    if ( req.query._type === "0" ) {
      findPost.attachments.push( { "link": "", "typeAttachment": 0 } );
      await findPost.save();
      return res.status( 201 ).json( jsonResponse( "success", findPost ) );
    }
    // Add attachment type link image
    if ( req.query._type === "1" ) {
      findPost.attachments.push( { "link": "", "typeAttachment": 1 } );
      await findPost.save();
      return res.status( 201 ).json( jsonResponse( "success", findPost ) );
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
      findPost = await Post.findById( req.query._postId );

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
      if ( findItem.typeAttachment === 1 ) {
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
      if ( findItem.typeAttachment === 0 ) {
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
      const findPostCategory = await PostCategory.findOne( { "_id": req.query._cateId } ),
        findDefaultPostCategory = await PostCategory.findOne( { "_account": userId, "title": dictionary.DEFAULT_POSTCATEGORY } );

      if ( !findPostCategory ) {
        return res.status( 403 ).json( jsonResponse( "Bộ sưu tập không tồn tại!", null ) );
      }
      if ( findPost._categories.indexOf( findPostCategory._id ) > -1 ) {
        // Catch when delete categories in post if have 1 catgorie push default category again
        if ( findPost._categories.length === 1 ) {
          findPost._categories.pull( findPostCategory._id );
          findPost._categories.push( findDefaultPostCategory._id );
          await findPost.save();
          return res.status( 201 ).json( jsonResponse( "Xóa bộ sưu tập thành công!", findPost ) );
        }
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
