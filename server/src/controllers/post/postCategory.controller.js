/**
 * Controller post categories for project
 * author: hoc-anms
 * updater: trantoan
 * date up: 20/04/2019
 * date to: 02/05/2019
 * team: BE-RHP
 */
const Post = require( "../../models/post/Post.model" );
const PostCategory = require( "../../models/post/PostCategory.model" );

const jsonResponse = require( "../../configs/response" );
const dictionary = require( "../../configs/dictionaries" );

module.exports = {
  /**
   * Get post auto (query or not)
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "index": async ( req, res ) => {
    let page = null, dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await PostCategory.find( { "_id": req.query._id, "_account": req.uid } ).lean();
    } else if ( req.query._size && req.query._page ) {
      dataResponse = ( await PostCategory.find( { "_account": req.uid } ).lean() ).slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
    } else if ( req.query._size ) {
      dataResponse = ( await PostCategory.find( { "_account": req.uid } ).lean() ).slice( 0, Number( req.query._size ) );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await PostCategory.find( { "_account": req.uid } ).lean();
    }

    // Check ammout post of auto
    dataResponse = dataResponse.map( async ( item ) => {
      if ( item._account.toString() === req.uid ) {
        const findPost = await Post.find( { "_account": req.uid } );

        item.ammout = findPost.filter( ( post ) => post._categories.indexOf( item._id ) > -1 ).length;

        return item;
      }
    } );
    dataResponse = await Promise.all( dataResponse );

    // If get size server will auto paginate and return page ammout
    if ( req.query._size ) {
      if ( ( await PostCategory.find( { "_account": req.uid } ) ).length % req.query._size === 0 ) {
        page = Math.floor( ( await PostCategory.find( { "_account": req.uid } ) ).length / req.query._size );
      } else {
        page = Math.floor( ( await PostCategory.find( { "_account": req.uid } ) ).length / req.query._size ) + 1;
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
   * Create Post Category
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "create": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề danh mục không được bỏ trống!" } } );
    }

    // Handle create with mongodb
    const newPostCategory = await new PostCategory( {
      "title": req.body.title,
      "description": req.body.description,
      "_account": req.uid
    } );

    // Save mongodb
    await newPostCategory.save();

    res.status( 200 ).json( jsonResponse( "success", newPostCategory ) );
  },
  /**
   * Update Post Category
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề danh mục không được bỏ trống!" } } );
    }

    const findPostCategory = await PostCategory.findOne( { "_id": req.query._categoryId, "_account": req.uid } );

    // Check catch when update post categories
    if ( !findPostCategory ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục không tồn tại!" } );
    }

    res.status( 201 ).json( jsonResponse( "success", await PostCategory.findByIdAndUpdate( req.query._categoryId, { "$set": req.body }, { "new": true } ) ) );
  },
  /**
   * Delete Post Category
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "delete": async ( req, res ) => {
    const findPostCategory = await PostCategory.findOne( { "_id": req.query._categoryId, "_account": req.uid } ),
      findPost = await Post.find( { "_account": req.uid, "_categories": req.query._categoryId } );

    // Check ctach when delete post categories
    if ( !findPostCategory ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục không tồn tại!" } );
    } else if ( findPostCategory.title === dictionary.DEFAULT_POSTCATEGORY ) {
      return res.status( 405 ).json( { "status": "error", "message": "Danh mục mặc định không thể bị xóa!" } );
    }

    // When delete auto which all of post of that auto will deleted
    if ( findPost.length > 0 ) {
      // add to un_ categories
      const unCategory = await PostCategory.findOne( { "_account": req.uid, "title": dictionary.DEFAULT_POSTCATEGORY } );

      await Promise.all( findPost.map( async ( post ) => {
        post._categories.pull( req.query._categoryId );
        post._categories.push( unCategory._id );
        await post.save();
      } ) );
    }


    await PostCategory.findByIdAndRemove( req.query._categoryId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
