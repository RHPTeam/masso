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

const jsonResponse = require( "../../configs/response" );
const dictionary = require( "../../configs/dictionaries" ),
  ScheduleService = require( "node-schedule" ),
  { agent } = require( "../../configs/crawl" ),
  { createPost } = require( "../../controllers/core/posts.core" ),
  // handle convert to event schedule. | location: 0 - profile, 1 - group, 2 - page
  createSchedule = async ( listNewSchedule ) => {
    console.log( "\x1b[34m%s\x1b[0m", "Schedule Post Service Starting..." );

    console.log(
      "\x1b[32m%s\x1b[0m",
      "Step 01:",
      "Start - Get all post's user to handle with cron-schedule"
    );
    const listScheduleActive = listNewSchedule
      .filter( ( post ) => post.status === true )
      .filter( ( post ) => new Date( post.started_at ) > new Date() );

    console.log(
      "\x1b[32m%s\x1b[0m",
      "Step 01:",
      "Finnish - Get all post's user to handle with cron-schedule"
    );
    if ( listScheduleActive.length === 0 ) {
      console.log( "\x1b[31m%s\x1b[0m", "ERROR:", "Haven't post schedule yet!" );
      return false;
    }

    console.log(
      "\x1b[32m%s\x1b[0m",
      "Step 02:",
      "Start - Cron post schedule specific date time."
    );
    await Promise.all(
      listScheduleActive.map( ( postSchedule ) => {
        console.log(
          "\x1b[35m%s\x1b[0m",
          "Checking... Post Data Input Before Submit To Facebook."
        );

        console.log(
          "\x1b[32m%s\x1b[0m",
          "SUCCESS:",
          "Passed! Starting post schedule to RAM of system..."
        );
        ScheduleService.scheduleJob(
          `rhp${postSchedule._id}`,
          new Date( postSchedule.started_at ),
          async function() {
            const resFacebookResponse = await createPost( {
              "cookie": postSchedule.cookie,
              agent,
              "feed": postSchedule.feed
            } );

            if ( resFacebookResponse ) {
              if (
                resFacebookResponse.error.code === 200 && resFacebookResponse.error.text === "Trả về id bài viết thành công!"
              ) {
                postSchedule.status = 0;
                await postSchedule.save();
              }
            }
          }
        );
        console.log(
          "\x1b[32m%s\x1b[0m",
          "SUCCESS:",
          "Finished! System again assign schedule for event next..."
        );
      } )
    );
    console.log(
      "\x1b[32m%s\x1b[0m",
      "Step 02:",
      "Finnish - Cron schedule specific date time."
    );
  };

module.exports = {
  "index": async ( req, res ) => {
    let page = null,
      dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await Post.find( { "_id": req.query._id, "_account": req.uid } )
        .populate( { "path": "_categories", "select": "_id title" } )
        .lean();
    } else if ( req.query._categoryId ) {
      dataResponse = await Post.find( { "_categories": req.query._categoryId } )
        .populate( { "path": "_categories", "select": "_id title" } )
        .lean();
    } else if ( req.query._size && req.query._page ) {
      dataResponse = ( await Post.find( { "_account": req.uid } )
        .populate( { "path": "_categories", "select": "_id title" } )
        .lean() ).slice(
        ( Number( req.query._page ) - 1 ) * Number( req.query._size ),
        Number( req.query._size ) * Number( req.query._page )
      );
    } else if ( req.query._size ) {
      dataResponse = ( await Post.find( { "_account": req.uid } )
        .populate( { "path": "_categories", "select": "_id title" } )
        .lean() ).slice( 0, Number( req.query._size ) );
    } else if (
      Object.entries( req.query ).length === 0 && req.query.constructor === Object
    ) {
      dataResponse = await Post.find( { "_account": req.uid } )
        .populate( { "path": "_categories", "select": "_id title" } )
        .lean();
    }

    if ( req.query._size ) {
      if (
        ( await Post.find( { "_account": req.uid } ) ).length % req.query._size === 0
      ) {
        page = Math.floor(
          ( await Post.find( { "_account": req.uid } ) ).length / req.query._size
        );
      } else {
        page = Math.floor(
          ( await Post.find( { "_account": req.uid } ) ).length / req.query._size
        ) + 1;
      }

      return res
        .status( 200 )
        .json( jsonResponse( "success", { "results": dataResponse, "page": page } ) );
    }

    // Check when user get one
    if ( req.query._id ) {
      dataResponse = dataResponse[ 0 ];
    }

    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
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
    await newPost.save();

    res.status( 200 ).json( jsonResponse( "success", newPost ) );
  },
  "update": async ( req, res ) => {
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
      return res
        .status( 403 )
        .json( {
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

    req.body.content = req.body.content.replace( /(<br \/>)|(<br>)/gm, "\n" ).replace( /(<\/p>)|(<\/div>)/gm, "\n" ).replace( /(<([^>]+)>)/gm, "" );

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
        return res
          .status( 404 )
          .json( {
            "status": "error",
            "message": "Ảnh không tồn tại trong bài đăng này!"
          } );
      }
      Post.updateOne(
        { "_id": req.query._postId },
        { "$pull": { "attachments": { "_id": req.query._attachmentId } } },
        ( err ) => {
          if ( err ) {
            return res
              .status( 500 )
              .json( {
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

    // Remove post
    await Post.findOneAndRemove( { "_id": req.query._postId } );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "getPostSchedule": async ( req, res ) => {
    const findPostSchedule = await PostSchedule.find( { "_account": req.uid } )
        .populate( { "path": "_post", "select": "title" } )
        .lean(),
      resData = await Promise.all( findPostSchedule.map( async ( postSchedule ) => {
        let findAccountFacebook = await Facebook.findOne( {
          "_account": req.uid,
          "cookie": postSchedule.cookie
        } ).select( "-cookie" ).lean();

        return {
          "facebookInfo": findAccountFacebook,
          "post": {
            "feed": postSchedule.feed,
            "status": postSchedule.status,
            "started_at": postSchedule.started_at,
            "_post": postSchedule._post
          }
        };
      } ) );

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
      "color": findPost.color ? findPost.color : "",
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
      return res
        .status( 403 )
        .json( {
          "status": "fail",
          "message":
            "Bạn không thể cài đặt thời gian giữa các lần đăng nhỏ hơn 5p"
        } );
    }
    if ( req.body._facebookId ) {
      const listPostSchedule = await Promise.all(
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

      await createSchedule( listPostSchedule );
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
  }
};
