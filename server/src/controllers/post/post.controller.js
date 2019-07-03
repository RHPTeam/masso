/**
 * Controller post (profile) for project
 * author: hoc-anms
 * date up: 20/04/2019
 * date to: ___
 * team: BE-RHP
 */
const Post = require( "../../models/post/Post.model" );
const PostCategory = require( "../../models/post/PostCategory.model" );
const PostSchedule = require( "../../models/post/PostSchedule.model" );
const Facebook = require( "../../models/Facebook.model" );
const request = require( "axios" );

const jsonResponse = require( "../../configs/response" );
const dictionary = require( "../../configs/dictionaries" ),
  ScheduleService = require( "node-schedule" );

module.exports = {
  "index": async ( req, res ) => {
    let dataResponse = null;

    // Check if query get one item from _id
    if ( req.query._id ) {
      dataResponse = await Post.findOne( { "_id": req.query._id, "_account": req.uid }, "-_account -created_at -updated_at" ).populate( { "path": "_categories", "select": "title" } ).lean();
      return res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
    } else if ( req.query._categoryId ) {
      dataResponse = await Post.find( { "_account": req.uid, "_categories": req.query._categoryId }, "-_account -created_at -updated_at" ).populate( { "path": "_categories", "select": "title" } ).lean();
      return res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
    }

    // Handle get items by pagination from database
    if ( req.query._size && req.query._page ) {
      const pageNo = parseInt( req.query._page ),
        size = parseInt( req.query._size ),
        query = {},
        totalPosts = await Post.countDocuments( { "_account": req.uid } );

      // Check catch
      if ( pageNo < 0 || pageNo === 0 ) {
        return res.status( 403 ).json( { "status": "error", "message": "Dữ liệu số trang không đúng, phải bắt đầu từ 1." } );
      }

      // Handle input data before connect to mongodb
      query.skip = size * ( pageNo - 1 );
      query.limit = size;
      query.sort = { "$natural": -1 };

      // Handle with mongodb
      dataResponse = await Post.find( { "_account": req.uid }, "-_account -created_at -updated_at -__v", query ).populate( { "path": "_categories", "select": "title" } ).lean();

      return res.status( 200 ).json( jsonResponse( "success", { "results": dataResponse, "page": Math.ceil( totalPosts / size ), "size": size } ) );
    }

    res.status( 304 ).json( jsonResponse( "fail", "API này không được cung cấp!" ) );
  },
  "create": async ( req, res ) => {
    const findPostCategory = await PostCategory.findOne( {
        "_account": req.uid,
        "title": dictionary.DEFAULT_POSTCATEGORY
      } ),
      newPost = await new Post( {
        "title": dictionary.DEFAULT_NAMEPOST,
        "_account": req.uid
      } );

    newPost._categories.push( findPostCategory._id );
    findPostCategory.totalPosts++;
    await newPost.save();
    await findPostCategory.save();
    res.status( 200 ).json( jsonResponse( "success", newPost ) );
  },
  "createPost": async ( req, res ) => {
    req.body._account = req.uid;
    const newPost = await new Post( req.body );

    await newPost.save();
    res.status( 201 ).json( jsonResponse( "success", newPost ) );
  },
  "update": async ( req, res ) => {
    const findPost = await Post.findOne( {
      "_id": req.query._postId,
      "_account": req.uid
    } );

    // Check catch when delete campaign
    if ( !findPost ) {
      return res
        .status( 404 )
        .json( { "status": "error", "message": "Bài đăng không tồn tại!" } );
    }

    // Check update post if user upload file
    if ( req.files && req.files.length > 0 ) {
      const attachmentsList = req.files.map( ( file ) => {
        if (
          file.fieldname === "attachments" && file.mimetype.includes( "image" )
        ) {
          return {
            "link": `${process.env.APP_URL}:${
              process.env.PORT_BASE
            }/${file.path.replace( /\\/gi, "/" )}`,
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
      return res.status( 403 ).json( {
        "status": "fail",
        "title": "Tiêu đề bài đăng không được bỏ trống!"
      } );
    } else if (
      req.body.scrape && /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(
        req.body.scrape
      ) === false
    ) {
      return res
        .status( 403 )
        .json( { "status": "fail", "scrape": "Dữ liệu không đúng định dạng!" } );
    }

    req.body.content = req.body.content
      .replace( /(<br \/>)|(<br>)/gm, "\n" )
      .replace( /(<\/p>)|(<\/div>)/gm, "\n" )
      .replace( /(<([^>]+)>)/gm, "" );

    // Handle post category
    await Promise.all( req.body._categories.map( async ( category ) => {
      const categoryInfo = await PostCategory.findOne( { "_id": category._id } ),
        totalPostsOfCategory = await Post.countDocuments( { "_categories": category._id } );

      categoryInfo.totalPosts = totalPostsOfCategory;
      categoryInfo.save();
    } ) );

    res
      .status( 201 )
      .json(
        jsonResponse(
          "success",
          await Post.findByIdAndUpdate(
            req.query._postId,
            { "$set": req.body },
            { "new": true }
          )
        )
      );
  },
  "delete": async ( req, res ) => {
    // Check if don't use query
    if ( !req.query._postId || req.query._postId === "" ) {
      return res
        .status( 403 )
        .json( { "status": "fail", "_postId": "Vui lòng cung cấp query _postId!" } );
    }

    const findPost = await Post.findOne( {
        "_id": req.query._postId,
        "_account": req.uid
      } ),
      listPostOldSchedule = await PostSchedule.find( {
        "_post": req.query._postId,
        "_account": req.uid
      } ).lean();

    // Check catch when delete campaign
    if ( !findPost ) {
      return res
        .status( 404 )
        .json( { "status": "error", "message": "Bài đăng không tồn tại!" } );
    }

    // Remove a file attachments in post
    if ( req.query._attachmentId ) {
      const findPostOfAttachment = await Post.findOne( {
        "attachments._id": req.query._attachmentId
      } );

      if ( !findPostOfAttachment ) {
        return res.status( 404 ).json( {
          "status": "error",
          "message": "Ảnh không tồn tại trong bài đăng này!"
        } );
      }
      Post.updateOne(
        { "_id": req.query._postId },
        { "$pull": { "attachments": { "_id": req.query._attachmentId } } },
        ( err ) => {
          if ( err ) {
            return res.status( 500 ).json( {
              "status": "error",
              "message": "Hệ thống xảy ra lỗi trong quá trình xóa"
            } );
          }
        }
      );
      return res.status( 200 ).json( jsonResponse( "success", null ) );
    }

    /**
     * Delete cron schedule
     */
    await Promise.all(
      listPostOldSchedule.map( ( postSchedule ) => {
        if ( ScheduleService.scheduleJob[ postSchedule._id ] ) {
          ScheduleService.scheduleJob[ `rhp${postSchedule._id}` ].cancel();
        }
      } )
    );
    await PostSchedule.deleteMany( { "_post": req.query._postId } );

    await Promise.all( findPost._categories.map( async ( category ) => {
      const categoryInfo = await PostCategory.findOne( { "_id": category } );

      categoryInfo.totalPosts -= 1;
      categoryInfo.save();
    } ) );

    // Remove post
    await Post.findOneAndRemove( { "_id": req.query._postId } );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "getPostSchedule": async ( req, res ) => {
    const findPostSchedule = await PostSchedule.find( { "_account": req.uid } )
        .populate( { "path": "_post", "select": "title" } )
        .lean(),
      resData = await Promise.all(
        findPostSchedule.map( async ( postSchedule ) => {
          let findAccountFacebook = await Facebook.findOne( {
            "_account": req.uid,
            "cookie": postSchedule.cookie
          } )
            .select( "-cookie" )
            .lean();

          return {
            "facebookInfo": findAccountFacebook,
            "post": {
              "feed": postSchedule.feed,
              "status": postSchedule.status,
              "started_at": postSchedule.started_at,
              "postID": postSchedule.postID,
              "_post": postSchedule._post
            }
          };
        } )
      );

    res.status( 200 ).json( jsonResponse( "success", resData ) );
  },
  "createPostSchedule": async ( req, res ) => {
    const findPost = await Post.findOne( {
        "_id": req.query._postId,
        "_account": req.uid
      } ).lean(),
      location = req.body.location;

    let photos,
      objectFeed,
      startedAtObject = new Date(),
      startAt = startedAtObject.setMinutes(
        startedAtObject.getMinutes() + 1 - req.body.break_point
      );

    // Check photos in post
    if ( findPost.attachments.length > 0 ) {
      photos = findPost.attachments.map( ( file ) => {
        if ( file.typeAttachment === 1 ) {
          return file.link;
        }
      } );
    }

    // Define object save to post schedule collection
    objectFeed = {
      "activity": {
        "type": findPost.activity ? findPost.activity.typeActivity.id : "",
        "id": findPost.activity ? findPost.activity.id.id : "",
        "text": ""
      },
      "color": findPost.color ? findPost.color.id : "",
      "content": findPost.content,
      "location": {
        // eslint-disable-next-line no-nested-ternary
        "type": location === 0 ? 0 : location === 1 ? 1 : 2,
        "value": ""
      },
      "photos": photos && photos.length > 0 ? photos : [],
      "place": findPost.place ? findPost.place.id : "",
      "scrape": findPost.scrape ? findPost.scrape : "",
      "tags": findPost.tags ? findPost.tags.map( ( tag ) => tag.uid ) : ""
    };

    // check break point
    if ( req.body.break_point < 5 ) {
      return res.status( 403 ).json( {
        "status": "fail",
        "message": "Bạn không thể cài đặt thời gian giữa các lần đăng nhỏ hơn 5p"
      } );
    }
    if ( req.body._facebookId ) {
      await Promise.all(
        req.body._facebookId.map( async ( facebook ) => {
          let findAccountFacebook = await Facebook.findOne( {
              "_id": facebook,
              "_account": req.uid
            } ),
            newPostSchedule = await new PostSchedule( {
              "cookie": findAccountFacebook.cookie,
              "feed": objectFeed,
              "_account": req.uid,
              "status": 1,
              "_post": req.query._postId
            } );

          startAt = new Date( startAt ).setMinutes(
            new Date( startAt ).getMinutes() + req.body.break_point
          );
          // eslint-disable-next-line camelcase
          newPostSchedule.started_at = startAt;
          await newPostSchedule.save();
          return newPostSchedule;
        } )
      );

      return res.status( 200 ).json( jsonResponse( "success", null ) );
    }
  },
  "createSyncFromMarket": async ( req, res ) => {
    req.body._account = req.uid;

    const findPostCategory = await PostCategory.findOne( {
        "_account": req.uid,
        "title": dictionary.DEFAULT_POSTCATEGORY
      } ),
      newPost = await new Post( req.body );

    newPost._categories.push( findPostCategory._id );
    await newPost.save();

    res.send( { "status": "success", "data": newPost } );
  },
  "search": async ( req, res ) => {
    if ( req.query.keyword === undefined ) {
      return res
        .status( 404 )
        .json( {
          "status": "fail",
          "keyword": "Vui lòng cung cấp từ khóa để tìm kiếm!"
        } );
    }

    let page = null, dataResponse = null, data = ( await Post.find( { "$text": { "$search": `\"${req.query.keyword}\"`, "$language": "none" }, "_account": req.uid } ).populate( { "path": "_categories", "select": "_id title" } ).lean() );

    if ( req.query._size && req.query._page ) {
      dataResponse = data.slice(
        ( Number( req.query._page ) - 1 ) * Number( req.query._size ),
        Number( req.query._size ) * Number( req.query._page )
      );
    } else if ( req.query._size ) {
      dataResponse = data.slice( 0, Number( req.query._size ) );
    }

    if ( req.query._size ) {
      if ( data.length % req.query._size === 0 ) {
        page = Math.floor( data.length / req.query._size );
      } else {
        page = Math.floor( data.length / req.query._size ) + 1;
      }
    }

    res.status( 200 ).json( { "status": "success", "data": { "results": dataResponse, "page": page, "total": data.length } } );
  },
  "getNewestPosts": async ( req, res ) => {
    const data = await Post.find( { "_account": req.uid } )
      .sort( { "$natural": -1 } )
      .limit( parseInt( req.query.number ) ).populate( { "path": "_categories", "select": "_id title" } );

    res.status( 200 ).json( jsonResponse( "success", data ) );
  },
  "syncDuplicatePostInFolderExample": async ( req, res ) => {
    const findPostCategoryDefault = await PostCategory.findOne( { "_account": req.uid, "title": dictionary.DEFAULT_POSTCATEGORY } ),
      newPost = new Post( req.body );

    newPost._categories.push( findPostCategoryDefault._id );
    await newPost.save();

    let findPostAfterAdd = await Post.findOne( { "_id": newPost._id } ).populate( { "path": "_categories", "select": "_id title" } );

    res.send( { "status": "success", "data": findPostAfterAdd } );
  },
  "syncDuplicateFolderExample": async ( req, res ) => {
    const findCategoryExample = await PostCategory.findOne( { "idFolderExample": req.body.categoryPost._id.toString(), "_account": req.uid } );

    // Category not exist
    if ( !findCategoryExample ) {
      const idFolderExample = req.body.categoryPost._id;

      delete req.body.categoryPost._id;

      // eslint-disable-next-line one-var
      const newCategoryExample = new PostCategory( req.body.categoryPost );

      newCategoryExample.postExample = [ ...new Set( [ ... newCategoryExample.postExample, ...req.body.postId ] ) ];
      newCategoryExample.totalPosts = newCategoryExample.postExample.length;
      newCategoryExample.idFolderExample = idFolderExample.toString();
      await newCategoryExample.save();
      let resData = await Promise.all( req.body.postList.map( async ( item ) => {

        delete item._id;
        let newPost = new Post( item );

        newPost._categories.push( newCategoryExample._id );
        await newPost.save();
        return newPost;
      } ) );

      return res.send( { "status": "success", "data": { "category": newCategoryExample, "postList": resData } } );
    }

    // Category is existed
    let resData = await Promise.all( req.body.postList.map( async ( item ) => {

      // check id exist in category in field post example
      if ( findCategoryExample.postExample.indexOf( item._id ) === -1 ) {
        delete item._id;
        let newPost = new Post( item );

        newPost._categories.push( findCategoryExample._id );
        await newPost.save();
        return newPost;

      }
    } ) );

    findCategoryExample.postExample = [ ...new Set( [ ... findCategoryExample.postExample, ...req.body.postId ] ) ];
    findCategoryExample.totalPosts = findCategoryExample.postExample.length;
    await findCategoryExample.save();
    res.send( { "status": "success", "data": { "category": findCategoryExample, "postList": resData.filter( function ( el ) {
      return el != null;
    } ) } } );
  },
  "upload": async ( req, res ) => {
    if ( !req.files || req.files.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "photos": "Không có ảnh upload, vui lòng kiểm tra lại!" } );
    }
    const attachmentList = req.files.map( ( file ) => {
      if ( file.fieldname === "attachments" && file.mimetype.includes( "image" ) ) {
        return `${process.env.APP_URL}:${process.env.PORT_BASE}/${file.path.replace( /\\/gi, "/" )}`;
      }
    } );

    return res.status( 200 ).json( { "status": "success", "data": attachmentList } );
  },
  "removeImageNotExist": async ( req, res ) => {
    const findPost = await Post.find( {} );

    for ( let i = 0; i < findPost.length ; i++ ) {

      findPost[ i ].attachments.map( async ( item ) => {
        if ( item.typeAttachment === 1 ) {
          try {
            let response = await request.get( item.link );

            if ( response.data === "API running!" ) {
              findPost[ i ].attachments.pull( item );
              await findPost[ i ].save();
            }
          } catch ( error ) {
            console.error( error );
          }
        }
      } );
    }
    return res.status( 200 ).json( { "status": "success", "data": null } );

  }
};
