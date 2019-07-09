const CronJob = require( "cron" ).CronJob;
const PostSchedule = require( "../../../models/post/PostSchedule.model" );
const Post = require( "../../../models/post/Post.model" );
const Facebook = require( "../../../models/Facebook.model" );

// Facebook Service Core
const { removeObjectDuplicates } = require( "../../../helpers/utils/functions/array" ),
  { agent } = require( "../../../configs/crawl" ),
  { createPost } = require( "../../../controllers/core/posts.core" ),

  // Function Support Core
  convertDataPostFacebook = async ( location, post, targetID ) => {
    let photos = [];

    // Check convert images to array format
    if ( post.attachments.length > 0 ) {
      photos = await Promise.all( post.attachments.map( ( file ) => {
        if ( file.typeAttachment === 1 ) {
          return file.link;
        }
      } ) );
    }

    // Check if feed contain text and scrape link
    if ( post.scrape && post.scrape.length > 0 && photos.length > 0 ) {
      post.scrape = "";
    }

    return {
      "photos": ( photos && photos.length > 0 ) ? photos : [],
      "scrape": post.scrape && post.scrape.length > 0 ? post.scrape : "",
      "activity": {
        "type": post.activity ? post.activity.typeActivity.id : "",
        "id": post.activity ? post.activity.id.id : "",
        "text": ""
      },
      "color": post.color ? post.color.id : "",
      "content": post.content,
      "location": {
      // eslint-disable-next-line no-nested-ternary
        "type": location === 0 ? 0 : location === 1 ? 1 : 2,
        "value": location === 0 ? "" : targetID
      },
      "place": post.place ? post.place.id : "",
      "tags": post.tags ? post.tags.map( ( tag ) => tag.uid ) : ""
    };
  };

( async () => {
  console.log( "\x1b[34m%s\x1b[0m", "Schedule Service For Post Starting..." );
  // eslint-disable-next-line no-new
  new CronJob( "1 * * * * *", async function() {
    let dateTimeCurrent = new Date(), minDateTime = dateTimeCurrent.setTime( dateTimeCurrent.getTime() - 20 * 60000 );

    console.log( "\x1b[32m%s\x1b[0m", "Step 01:", "Start - Get all event's user to handle with cron-schedule" );
    const listPostSchedule = await PostSchedule.find( { "status": 1, "started_at": {
      "$gte": new Date( minDateTime ).toISOString(),
      "$lt": new Date().toISOString()
    } } );

    console.log( "\x1b[32m%s\x1b[0m", "Step 01:", "Finnish - Get all post's user to handle with cron-schedule" );

    if ( listPostSchedule.length === 0 ) {
      console.log( "\x1b[31m%s\x1b[0m", "ERROR:", "Haven't post schedule yet!" );
      return false;
    }

    console.log( "\x1b[35m%s\x1b[0m", "Checking... Event Data Input Before Submit To Facebook." );

    await Promise.all( removeObjectDuplicates( listPostSchedule, "_id" ).map( async ( postSchedule ) => {
      const postInfo = await Post.findOne( { "_id": postSchedule.postID } ).lean(),
        facebookInfo = await Facebook.findOne( { "_id": postSchedule.facebookID } ).lean();

      console.log( "\x1b[32m%s\x1b[0m", "SUCCESS:", "Passed! Starting schedule to RAM of system..." );

      // Do something new version - Delete Event Schedule
      await PostSchedule.deleteOne(
        { "_id": postSchedule._id },
        ( err ) => {
          if ( err ) {
            throw Error( `Xảy ra lỗi trong quá trình xóa [PostSchedule] có ID: ${postSchedule._id}.` );
          }
        }
      );

      // Do something new version - Convert JSON To Facebook
      // eslint-disable-next-line one-var
      const feed = await convertDataPostFacebook( postSchedule.location, postInfo, postSchedule.targetID );

      // eslint-disable-next-line one-var
      const resFacebookResponse = await createPost( { "cookie": facebookInfo.cookie, agent, "feed": feed } );

      if ( resFacebookResponse ) {
        // Handle when post feed successfully
        if ( resFacebookResponse.error.code === 200 ) {
          console.log( `post To Facebook Success: ${resFacebookResponse.results.postID}` );
        } else if ( resFacebookResponse.error.code === 8188 ) {
          console.log( `Lỗi đếu gì thế đếu tìm ra được =.= Dỗi vler :)) Bọn Facebook trả về là: ${resFacebookResponse.error.text}` );
        } else if ( resFacebookResponse.error.code === 1037 ) {
          console.log( `[Tài khoản] Facebook - ${facebookInfo.userInfo.name} đã bị đăng xuất! Hệ thống tự động tắt chiến dịch.` );
          console.log( `Have error: ${resFacebookResponse.error.text}` );
        } else {
          console.log( `post To Facebook Fail: ${resFacebookResponse.results.postID}` );
        }
      }
    } ) );
    console.log( "\x1b[32m%s\x1b[0m", "SUCCESS:", "Finished! System again assign schedule for event next..." );

  }, null, true, "Asia/Ho_Chi_Minh", null, true );
} )();
