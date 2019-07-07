/* eslint-disable one-var */
// Core Service
const CronJob = require( "cron" ).CronJob;
const Facebook = require( "../../../models/Facebook.model" );
const EventSchedule = require( "../../../models/post/EventSchedule.model" );
const Campaign = require( "../../../models/post/Campaign.model" );
const Event = require( "../../../models/post/Event.model" );
const Post = require( "../../../models/post/Post.model" );
const { startedSchedule, finishedSchedule, deletedScheduleProcess } = require( "../../../helpers/utils/functions/scheduleLog" );

// Facebook Service Core
const { agent } = require( "../../../configs/crawl" ),
  { createPost } = require( "../../../controllers/core/posts.core" );

// Function Support Core
const convertDataPostFacebook = async ( location, post, targetID ) => {
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
  console.log( "\x1b[34m%s\x1b[0m", "Schedule Service For Campaign Starting..." );
  // eslint-disable-next-line no-new
  new CronJob(
    "1 * * * * *",
    async function() {

      // Get 20 minutes from past to present
      let dateTimeCurrent = new Date(),
        minDateTime = dateTimeCurrent.setTime(
          dateTimeCurrent.getTime() - 20 * 60000
        );


      console.log(
        "\x1b[32m%s\x1b[0m",
        "Step 01:",
        "Start - Get all event's user to handle with cron-schedule"
      );

      // Get all event schedule from mongodb after concat with event schedule of system
      const listEventSchedule = await EventSchedule.find( {
        "started_at": {
          "$gte": new Date( minDateTime ).toISOString(),
          "$lt": new Date().toISOString()
        }
      } ).lean();

      console.log(
        "\x1b[32m%s\x1b[0m",
        "Step 01:",
        "Finnish - Get all event's user to handle with cron-schedule"
      );

      if ( listEventSchedule.length === 0 ) {
        console.log(
          "\x1b[31m%s\x1b[0m",
          "ERROR:",
          "Haven't event schedule yet!"
        );
        return false;
      }

      await Promise.all(
        listEventSchedule.map( async ( eventSchedule ) => {
          const campaignInfo = await Campaign.findOne( { "_id": eventSchedule._campaign } ),
            eventInfo = await Event.findOne( { "_id": eventSchedule._event } ),
            postInfo = await Post.findOne( { "_id": eventSchedule.postID } ).lean(),
            facebookInfo = await Facebook.findOne( { "_id": eventSchedule.facebookID } ).lean();

          console.log(
            "\x1b[32m%s\x1b[0m",
            "SUCCESS:",
            "Passed! Starting schedule to Cache of system..."
          );

          // Do something new version - Log
          startedSchedule( eventSchedule, __dirname );

          // Do something new version - Delete Event Schedule
          await EventSchedule.deleteOne(
            { "_id": eventSchedule._id },
            ( err ) => {
              if ( err ) {
                throw Error( `Xảy ra lỗi trong quá trình xóa [EventSchedule] có ID: ${eventSchedule._id}.` );
              }
            }
          );
          deletedScheduleProcess( eventSchedule, __dirname );

          // Do something new version - Convert JSON To Facebook
          const feed = await convertDataPostFacebook( eventSchedule.location, postInfo, eventSchedule.targetID );

          // Do something new version - Post Feed To Facebook
          const resFacebookResponse = await createPost( {
            "cookie": facebookInfo.cookie,
            agent,
            "feed": feed
          } );

          // Do something new version - Check Result Facebook Which Return
          if ( resFacebookResponse ) {
            
            // Successfully
            if ( resFacebookResponse.error.code === 200 ) {
              finishedSchedule( eventSchedule, __dirname );

              campaignInfo.logs.total += 1;
              campaignInfo.logs.content.push( {
                "message": `[Sự kiện: ${eventInfo.title}] Đăng bài viết thành công với ID: ${resFacebookResponse.results.postID}`,
                "createdAt": new Date()
              } );

              console.log( `Post To Facebook Successfully with ID: ${resFacebookResponse.results.postID}` );
            } else if ( resFacebookResponse.error.code === 8188 ) {
              campaignInfo.logs.total += 1;
              campaignInfo.logs.content.push( {
                "message": `[Facebook] ${resFacebookResponse.error.text}`,
                "createdAt": new Date()
              } );

              console.log( `Lỗi đếu gì thế đếu tìm ra được =.= Dỗi vler :)) Bọn Facebook trả về là: ${resFacebookResponse.error.text}` );
            } else if ( resFacebookResponse.error.code === 1037 ) {
              campaignInfo.logs.total += 1;
              campaignInfo.logs.content.push( {
                "message": `[Tài khoản] Facebook - ${facebookInfo.userInfo.name} đã bị đăng xuất! Hệ thống tự động tắt chiến dịch.`,
                "createdAt": new Date()
              } );

              await Campaign.updateOne( { "_id": eventSchedule._campaign }, { "status": false }, ( err ) => {
                if ( err ) {
                  throw Error( "Xảy ra lỗi trong quá trình cập nhật lại chiến dịch khi tài khoản facebook bị đăng xuất." );
                }
              } );

              console.log( `Have error: ${resFacebookResponse.error.text}` );
            } else {
              campaignInfo.logs.total += 1;
              campaignInfo.logs.content.push( {
                "message": `[Sự kiện: ${eventInfo.title}] Đăng bài viết thất bại tại địa điểm có ID: ${eventSchedule.feed.location.value}. Lỗi: ${resFacebookResponse.error.text}`,
                "createdAt": new Date()
              } );

              // Handle when account facebook is logged out
              await Campaign.updateOne( { "_id": eventSchedule._campaign }, { "status": false }, ( err ) => {
                if ( err ) {
                  throw Error( "Xảy ra lỗi trong quá trình cập nhật lại chiến dịch khi tài khoản facebook bị đăng xuất." );
                }
              } );

              console.log( `Have error: ${resFacebookResponse.error.text}` );
            }
            await campaignInfo.save();
          }
        } )
      );
      console.log(
        "\x1b[32m%s\x1b[0m",
        "SUCCESS:",
        "Finished! System again assign schedule for event next..."
      );
    },
    null,
    true,
    "Asia/Ho_Chi_Minh",
    null,
    true
  );
} )();
