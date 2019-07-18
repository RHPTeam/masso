/**
 * Controller post categories for project
 * author: hoc-anms
 * updater: trantoan
 * date up: 20/04/2019
 * date to: 19/06/2019
 * team: BE-RHP
 */
const Post = require( "../../models/post/Post.model" );
const PostCategory = require( "../../models/post/PostCategory.model" );

const jsonResponse = require( "../../configs/response" );
const dictionary = require( "../../configs/dictionaries" );

module.exports = {
  "index": async ( req, res ) => {
    let dataResponse = null;

    // Check if query get one item from _id
    if ( req.query._id ) {
      dataResponse = await PostCategory.findOne( { "_id": req.query._id, "_account": req.uid }, "title description totalPosts" ).lean();
      return res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await PostCategory.find( { "_account": req.uid }, "title description totalPosts", { "sort": { "$natural": -1 } } ).lean();
      return res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
    }

    // Handle get items by pagination from database
    if ( req.query._size && req.query._page ) {
      const pageNo = parseInt( req.query._page ),
        size = parseInt( req.query._size ),
        query = {},
        totalPosts = await PostCategory.countDocuments( { "_account": req.uid } );

      // Check catch
      if ( pageNo < 0 || pageNo === 0 ) {
        return res.status( 403 ).json( { "status": "error", "message": "Dữ liệu số trang không đúng, phải bắt đầu từ 1." } );
      }

      // Handle input data before connect to mongodb
      query.skip = size * ( pageNo - 1 );
      query.limit = size;
      query.sort = { "$natural": -1 };

      // Handle with mongodb
      dataResponse = await PostCategory.find( { "_account": req.uid }, "title description totalPosts", query ).lean();

      return res.status( 200 ).json( jsonResponse( "success", { "results": dataResponse, "page": Math.ceil( totalPosts / size ), "size": size } ) );
    }

    res.status( 304 ).json( jsonResponse( "fail", "API này không được cung cấp!" ) );
  },
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
  },
  "search": async ( req, res ) => {
    if ( req.query.keyword === undefined ) {
      return res.status( 404 ).json( { "status": "fail", "keyword": "Vui lòng cung cấp từ khóa để tìm kiếm!" } );
    }

    let dataResponse = null;

    // Handle get items by pagination from database
    if ( req.query._size && req.query._page ) {
      const pageNo = parseInt( req.query._page ),
        size = parseInt( req.query._size ),
        query = {},
        totalPosts = await PostCategory.countDocuments( { "$text": { "$search": `\"${req.query.keyword}\"`, "$language": "none" }, "_account": req.uid } );

      // Check catch
      if ( pageNo < 0 || pageNo === 0 ) {
        return res.status( 403 ).json( { "status": "error", "message": "Dữ liệu số trang không đúng, phải bắt đầu từ 1." } );
      }

      // Handle input data before connect to mongodb
      query.skip = size * ( pageNo - 1 );
      query.limit = size;

      // Handle with mongodb
      dataResponse = await PostCategory.find( { "$text": { "$search": `\"${req.query.keyword}\"`, "$language": "none" }, "_account": req.uid }, "title description totalPosts", query ).lean();

      return res.status( 200 ).json( jsonResponse( "success", { "results": dataResponse, "page": Math.ceil( totalPosts / size ), "size": size } ) );
    }

    res.status( 304 ).json( jsonResponse( "fail", "API này không được cung cấp!" ) );
  },
  "addToMix": async ( req, res ) => {
    const categoryInfo = await PostCategory.findOne( { "_id": req.params.categoryId, "_account": req.uid } );

    // Check catch
    if ( !categoryInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục này không tồn tại!" } );
    }

    categoryInfo.mix = true;
    await categoryInfo.save();

    res.status( 200 ).json( { "status": "success", "data": categoryInfo } );
  }
};
