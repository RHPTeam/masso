/**
 * Controller post facebook for project
 * author: hoc-anms
 * updater: sky albert
 * date up: 24/04/2019
 * date to: 11/05/2019
 * team: BE-RHP
 */
const Account = require( "../models/Account.model" );
const PostFacebook = require( "../models/PostFacebook.model" );

const jsonResponse = require( "../configs/res" );
const dictionary = require( "../configs/dictionaries" );
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
    if ( req.headers.cfr === undefined ) {
      return res.status( 405 ).json( { "status": "error", "message": "Không thể xác thực được quyền của bạn!" } );
    }

    let page = null, dataResponse = null;
    const authorization = req.headers.authorization,
      role = req.headers.cfr,
      userId = secure( res, authorization );

    if ( decodeRole( role, 10 ) !== 1 && decodeRole( role, 10 ) !== 2 ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho chức năng này!" } );
    }

    if ( req.query._id ) {
      dataResponse = await PostFacebook.find( { "_id": req.query._id } ).populate( { "path": "_account", "select": "_id name" } ).lean();
    } else if ( req.query._size && req.query._page ) {
      dataResponse = ( await PostFacebook.find( {} ).populate( { "path": "_account", "select": "_id name" } ).lean() ).slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
    } else if ( req.query._size ) {
      dataResponse = ( await PostFacebook.find( {} ).populate( { "path": "_account", "select": "_id name" } ).lean() ).slice( 0, Number( req.query._size ) );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await PostFacebook.find( req.query ).populate( { "path": "_account", "select": "_id name" } ).lean();
    }

    if ( req.query._size ) {
      if ( ( await PostFacebook.find( { "_account": userId } ) ).length % req.query._size === 0 ) {
        page = Math.floor( ( await PostFacebook.find( { "_account": userId } ) ).length / req.query._size );
      } else {
        page = Math.floor( ( await PostFacebook.find( { "_account": userId } ) ).length / req.query._size ) + 1;
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
   * Add new post
   * @param req
   * @param res
   * @returns {Promise<*|Promise<any>>}
   */
  "create": async ( req, res ) => {
    if ( req.headers.cfr === undefined ) {
      return res.status( 405 ).json( { "status": "error", "message": "Không thể xác thực được quyền của bạn!" } );
    }

    const userId = secure( res, req.headers.authorization ),
      role = req.headers.cfr;

    if ( decodeRole( role, 10 ) !== 1 && decodeRole( role, 10 ) !== 2 ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho chức năng này!" } );
    }
    // eslint-disable-next-line one-var
    const newPostFacebook = new PostFacebook( { "title": dictionary.DEFAULT_NAMEPOST, "_account": userId } );

    newPostFacebook.save();

    res.status( 200 ).json( jsonResponse( "success", newPostFacebook ) );
  },
  /**
   * update post facebook
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {
    if ( req.headers.cfr === undefined ) {
      return res.status( 405 ).json( { "status": "error", "message": "Không thể xác thực được quyền của bạn!" } );
    }
    const role = req.headers.cfr,
      findPost = await PostFacebook.findById( req.query._postFacebookId );

    if ( decodeRole( role, 10 ) !== 1 && decodeRole( role, 10 ) !== 2 ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho chức năng này!" } );
    }

    // Check catch
    if ( !findPost ) {
      return res.status( 404 ).json( { "status": "error", "message": "Bài đăng không tồn tại!" } );
    }

    // Check update post if user upload file
    if ( req.files && req.files.length > 0 ) {
      const attachmentsList = req.files.map( ( file ) => {
        if ( file.fieldname === "attachments" && file.mimetype.includes( "image" ) ) {
          return {
            "link": `${url}/${file.path}`,
            "typeAttachment": 1
          };
        }
      } );

      findPost.attachments = findPost.attachments.concat( attachmentsList );
      await findPost.save();
      return res.status( 201 ).json( jsonResponse( "success", findPost ) );
    }

    // Check validator
    if ( !req.body.title || req.body.title.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "title": "Tiêu đề bài đăng không được bỏ trống!" } );
    } else if ( req.body.scrape && /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test( req.body.scrape ) === false ) {
      return res.status( 403 ).json( { "status": "fail", "scrape": "Dữ liệu không đúng định dạng!" } );
    }

    res.status( 201 ).json( jsonResponse( "success", await PostFacebook.findByIdAndUpdate( req.query._postFacebookId, { "$set": req.body }, { "new": true } ) ) );
  },
  /**
   * Delete post facebook
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {
    // Check if don't use query
    if ( req.query._postFacebookId === undefined && req.query._postFacebookId === "" ) {
      return res.status( 403 ).json( { "status": "fail", "_postFacebookId": "Vui lòng cung cấp query _postFacebookId!" } );
    }
    if ( req.headers.cfr === undefined ) {
      return res.status( 405 ).json( { "status": "error", "message": "Không thể xác thực được quyền của bạn!" } );
    }
    const role = req.headers.cfr,
      findPost = await PostFacebook.findById( req.query._postFacebookId );

    if ( decodeRole( role, 10 ) !== 1 && decodeRole( role, 10 ) !== 2 ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho chức năng này!" } );
    }

    // Check catch when delete campaign
    if ( !findPost ) {
      return res.status( 404 ).json( { "status": "error", "message": "Bài đăng không tồn tại!" } );
    }

    // Remove a file attachments in post
    if ( req.query._attachmentId ) {
      const findPostOfAttachment = await PostFacebook.findOne( { "attachments._id": req.query._attachmentId } );

      if ( !findPostOfAttachment ) {
        return res.status( 404 ).json( { "status": "error", "message": "Ảnh không tồn tại trong bài đăng này!" } );
      }
      PostFacebook.updateOne( { "_id": req.query._postFacebookId }, { "$pull": { "attachments": { "_id": req.query._attachmentId } } }, ( err ) => {
        if ( err ) {
          return res.status( 500 ).json( { "status": "error", "message": "Hệ thống xảy ra lỗi trong quá trình xóa" } );
        }
      } );
      return res.status( 200 ).json( jsonResponse( "success", null ) );
    }

    // Remove post
    await _postFacebookId.findOneAndRemove( { "_id": req.query._postFacebookId } );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
