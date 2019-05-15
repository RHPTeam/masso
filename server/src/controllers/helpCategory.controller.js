/**
 * Controller help categories for project
 * author: hoc-anms
 * updater:
 * date up: 15/05/2019
 * date to:
 * team: BE-RHP
 */

const BlogHelp = require( "../models/BlogHelp.model" );
const HelpCategory = require( "../models/HelpCategory.model" );

const jsonResponse = require( "../configs/res" );
const secure = require( "../helpers/utils/secure.util" );
const dictionary = require( "../configs/dictionaries" );

module.exports = {
  /**
   * Get category help (all or query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    let dataResponse = null;
    const authorization = req.headers.authorization,
      userId = secure( res, authorization );

    // Handle get all group from mongodb
    if ( req.query._id ) {
      dataResponse = await HelpCategory.find( { "_id": req.query._id, "_account": userId } ).lean();
      dataResponse = dataResponse[ 0 ];
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await HelpCategory.find( { "_account": userId } ).lean();
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );
  },
  /**
   * create category help
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "create": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" || !req.body.title ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề blog không được bỏ trống!" } } );
    }

    // Handle create with mongodb
    const userId = secure( res, req.headers.authorization ), objSave = {
        "title": req.body.title,
        "_account": userId
      },
      newHelpCategory = await new HelpCategory( objSave );

    // Save mongodb
    await newHelpCategory.save();

    res.status( 200 ).json( jsonResponse( "success", newHelpCategory ) );
  },
  /**
   * Update category help
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" || !req.body.title ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề danh mục help không được bỏ trống!" } } );
    }

    const userId = secure( res, req.headers.authorization ),
      findHelpCategory = await HelpCategory.findById( req.query._categoryId );

    // Check catch when update post categories
    if ( !findHelpCategory ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục help không tồn tại!" } );
    } else if ( findHelpCategory._account.toString() !== userId ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho danh mục này!" } );
    }
    if ( req.body.blogHelp ) {
      findHelpCategory._blogHelp.push( req.body.blogHelp );
      await findHelpCategory.save();
    }

    res.status( 201 ).json( jsonResponse( "success", await HelpCategory.findByIdAndUpdate( req.query._categoryId, { "$set": req.body }, { "new": true } ) ) );

  },
  /**
   * Delete category help
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      findHelpCategory = await HelpCategory.findById( req.query._categoryId ),
      findBlogHelp = await BlogHelp.find( { "_account": userId, "_categories": req.query._categoryId } );

    // Check ctach when delete help categories
    if ( !findHelpCategory ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục không tồn tại!" } );
    }

    // When delete auto which all of post of that auto will deleted
    if ( findBlogHelp.length > 0 ) {
      await Promise.all( findBlogHelp.map( async ( blog ) => {
        await blog.remove();
      } ) );
    }


    await HelpCategory.findByIdAndRemove( req.query._categoryId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
