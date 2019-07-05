/**
 * Controller event for project
 * author: hoc-anms
 * date up: 23/04/2019
 * date to: ___
 * team: BE-RHP
 */
const ObjectId = require( "mongoose" ).Types.ObjectId;
// eslint-disable-next-line no-unused-vars
const Event = require( "../../models/post/Event.model" );
const GroupFacebook = require( "../../models/post/GroupFacebook.model" );
const PageFacebook = require( "../../models/post/PageFacebook.model" );
const { logUserAction } = require( "../../microservices/synchronize/log.service" );


const jsonResponse = require( "../../configs/response" );
const convertUnicode = require( "../../helpers/utils/functions/unicode" );

module.exports = {
  "index": async ( req, res ) => {
    let page = null, dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await Event.find( { "_id": req.query._id, "_account": req.uid } ).populate( { "path": "target_category", "select": "_id title" } ).populate( { "path": "post_category", "select": "_id title" } ).populate( { "path": "post_custom", "select": "_id title content _categories", "populate": { "path": "_categories", "select": "_id title" } } ).lean();
      // eslint-disable-next-line camelcase
      dataResponse[ 0 ].target_custom = await Promise.all( dataResponse[ 0 ].target_custom.map( async ( target ) => {
        if ( target.typeTarget === 0 ) {
          return {
            "_id": target._id,
            "typeTarget": target.typeTarget,
            "target": await GroupFacebook.findOne( { "groupId": target.id } ).select( "-_id groupId name" ).lean()
          };
        } else if ( target.typeTarget === 1 ) {
          return {
            "_id": target._id,
            "typeTarget": target.typeTarget,
            "target": await PageFacebook.findOne( { "pageId": target.id } ).select( "-_id pageId name" ).lean()
          };
        }
      } ) );
    } else if ( req.query._size && req.query._page ) {
      dataResponse = await Event.find( { "_id": req.query._id, "_account": req.uid } ).populate( { "path": "target_category", "select": "_id title" } ).populate( { "path": "post_category", "select": "_id title" } ).populate( { "path": "post_custom", "select": "_id title content _categories", "populate": { "path": "_categories", "select": "_id title" } } ).lean();
      // eslint-disable-next-line camelcase
      dataResponse[ 0 ].target_custom = await Promise.all( dataResponse[ 0 ].target_custom.map( async ( target ) => {
        if ( target.typeTarget === 0 ) {
          return {
            "_id": target._id,
            "typeTarget": target.typeTarget,
            "target": await GroupFacebook.findOne( { "groupId": target.id } ).select( "-_id groupId name" ).lean()
          };
        } else if ( target.typeTarget === 1 ) {
          return {
            "_id": target._id,
            "typeTarget": target.typeTarget,
            "target": await PageFacebook.findOne( { "pageId": target.id } ).select( "-_id pageId name" ).lean()
          };
        }
      } ) );
    } else if ( req.query._size ) {
      dataResponse = ( await Event.find( { "_account": req.uid } ).lean() ).slice( 0, Number( req.query._size ) );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Event.find( { "_account": req.uid } ).lean();
    }

    if ( req.query._size ) {
      if ( ( await Event.find( { "_account": req.uid } ) ).length % req.query._size === 0 ) {
        page = Math.floor( ( await Event.find( { "_account": userId } ) ).length / req.query._size );
      } else {
        page = Math.floor( ( await Event.find( { "_account": userId } ) ).length / req.query._size ) + 1;
      }

      return res
        .status( 200 )
        .json( jsonResponse( "success", { "results": dataResponse, "page": page } ) );
    }

    // Check when user get one
    if ( req.query._id ) {
      if ( dataResponse.length === 0 ) {
        return res.status( 404 ).json( { "status": "error", "message": "Sự kiện không tồn tại!" } );
      }
      dataResponse = dataResponse[ 0 ];
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );

  },
  "create": async ( req, res ) => {
    // Check validator
    if ( req.body.type_event === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "type_event": "Loại sự kiện không được bỏ trống! [1: Auto, 0: Custom]" } } );
    } else if ( req.body.type_event === 0 ) {
      if ( req.body.post_category === undefined && req.body.post_custom === undefined ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "content": "Nội dung tối thiểu chọn ít nhất một bài đăng hoặc một danh mục! [post_category | post_custom]" } } );
      } else if ( req.body.break_point < 5 ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "break_point": "Thời gian chờ tối thiếu 5 phút! Điều này giúp tài khoản của bạn an toàn hơn!" } } );
      } else if ( req.body.started_at === undefined ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "started_at": "Thời gian bắt đầu chưa được thiết lập!" } } );
      } else if ( Date.now() > req.body.started_at ) {
        return res.status( 404 ).json( { "status": "error", "message": "Thời gian bắt đầu bạn thiết lập đã ở trong quá khứ!" } );
      }
    }

    req.body._account = req.uid;
    // eslint-disable-next-line one-var
    const newEvent = await new Event( req.body );

    await newEvent.save();
    /** ********************** Log Action Of User For Admin ****************************** **/
    let objectLog = {
        "data": [
          {
            "logs": {
              "content": `Người dùng tạo sự kiện "${newEvent.title}" ở chiến dịch mặc định thành công.`,
              "createdAt": new Date(),
              "info": {
                "eventId": newEvent._id
              },
              "status": 0
            }
          },
          {
            "logs": {
              "content": `Người dùng cài đặt sự kiện "${newEvent.title}" ở chiến dịch mặc định với thời gian giữa các lần đăng là ${newEvent.break_point} được đăng trên ${ newEvent.timeline.length > 0 ? "profile cá nhân với ID:" + newEvent.timeline.toString() : "" } ${newEvent.target_category ? ", nhóm người dùng cài đặt với ID:" + newEvent.target_category : ""} ${newEvent.target_custom.length > 0 ? ", nhóm và trang facebook với ID:" + newEvent.target_custom.toString() : "" } sẽ bắt đầu vào ${ newEvent.started_at }`,
              "createdAt": new Date(),
              "info": {
                "eventId": newEvent._id
              },
              "status": 0
            }
          } ],
        "_account": req.uid
      },

      resLogSync = await logUserAction( "log", objectLog, { "Authorization": req.headers.authorization } );

    if ( resLogSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }
    /** **************************************************************************** **/

    res.status( 200 ).json( jsonResponse( "success", newEvent ) );
  },
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.type_event === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "type_event": "Loại sự kiện không được bỏ trống! [0: Custom, 1: Auto]" } } );
    } else if ( req.body.type_event === 0 ) {
      if ( !req.body.post_category && req.body.post_custom.length === 0 ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "content": "Nội dung tối thiểu chọn ít nhất một bài đăng hoặc một danh mục! [post_category | post_custom]" } } );
      } else if ( req.body.break_point < 5 ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "break_point": "Thời gian chờ tối thiếu 5 phút! Điều này giúp tài khoản của bạn an toàn hơn!" } } );
      } else if ( !req.body.started_at ) {
        return res.status( 403 ).json( { "status": "fail", "data": { "started_at": "Thời gian bắt đầu chưa được thiết lập!" } } );
      } else if ( Date.now() > req.body.started_at ) {
        return res.status( 404 ).json( { "status": "error", "message": "Thời gian bắt đầu bạn thiết lập đã ở trong quá khứ!" } );
      }
    }

    const findEvent = await Event.findOne( { "_id": req.query._eventId, "_account": req.uid } );

    // Check catch when update event
    if ( !findEvent ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sự kiện không tồn tại!" } );
    }

    // Check exception update event
    if ( req.body.target_category === undefined ) {
      // eslint-disable-next-line camelcase
      findEvent.target_category = undefined;
    }
    if ( req.body.post_category === undefined ) {
      // eslint-disable-next-line camelcase
      findEvent.post_category = undefined;
    }
    /** ********************** Log Action Of User For Admin ****************************** **/
    let objectLog = {
        "data": [
          {
            "logs": {
              "content": `Người dùng cập nhật sự kiện "${findEvent.title}" ở chiến dịch mặc định thành công.`,
              "createdAt": new Date(),
              "info": {
                "eventId": findEvent._id
              },
              "status": 0
            }
          },
          {
            "logs": {
              "content": `Người dùng cài đặt sự kiện "${findEvent.title}" ở chiến dịch mặc định với thời gian giữa các lần đăng là ${findEvent.break_point} được đăng trên ${ findEvent.timeline.length > 0 ? "profile cá nhân với ID:" + findEvent.timeline.toString() : "" } ${findEvent.target_category ? ", nhóm người dùng cài đặt với ID:" + findEvent.target_category : ""} ${findEvent.target_custom.length > 0 ? ", nhóm và trang facebook với ID:" + findEvent.target_custom.toString() : "" } sẽ bắt đầu vào ${ findEvent.started_at }`,
              "createdAt": new Date(),
              "info": {
                "eventId": findEvent._id
              },
              "status": 0
            }
          } ],
        "_account": req.uid
      },

      resLogSync = await logUserAction( "log", objectLog, { "Authorization": req.headers.authorization } );

    if ( resLogSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }
    /** **************************************************************************** **/


    // Save to db mongodb ( Resolve :D )
    await findEvent.save();

    res.status( 201 ).json( jsonResponse( "success", await Event.findByIdAndUpdate( req.query._eventId, { "$set": req.body }, { "new": true } ) ) );
  },
  "delete": async ( req, res ) => {
    const findEvent = await Event.findOne( { "_id": req.query._eventId, "_account": req.uid } );

    // Check catch when delete event
    if ( !findEvent ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sự kiện không tồn tại!" } );
    }

    /** ********************** Log Action Of User For Admin ****************************** **/
    let objectLog = {
        "data": [
          {
            "logs": {
              "content": `Người dùng xóa sự kiện "${findEvent.title}" ở chiến dịch mặc định thành công.`,
              "createdAt": new Date(),
              "info": {
                "eventId": findEvent._id
              },
              "status": 0
            }
          } ],
        "_account": req.uid
      },

      resLogSync = await logUserAction( "log", objectLog, { "Authorization": req.headers.authorization } );

    if ( resLogSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }
    /** **************************************************************************** **/

    await Event.findByIdAndDelete( req.query._eventId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
