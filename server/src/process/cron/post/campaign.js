// Core Service
const CronJob = require( "cron" ).CronJob;
const EventSchedule = require( "../../../models/post/EventSchedule.model" );
const Campaign = require( "../../../models/post/Campaign.model" );
const Event = require( "../../../models/post/Event.model" );

// Facebook Service Core
const { removeObjectDuplicates } = require( "../../../helpers/utils/functions/array" ),
  { agent } = require( "../../../configs/crawl" ),
  { createPost } = require( "../../../controllers/core/posts.core" );

/**
 * Cron every a minute, range specific date time 20 minute ( if server crash which cron can re-active )
 */

( async () => {
  let listEventSchedule = [];

  console.log( "\x1b[34m%s\x1b[0m", "Schedule Service For Campaign Starting..." );
  // eslint-disable-next-line no-new
  new CronJob(
    "1 * * * * *",
    async function() {
      let dateTimeCurrent = new Date(),
        minDateTime = dateTimeCurrent.setTime(
          dateTimeCurrent.getTime() - 20 * 60000
        );

      console.log(
        "\x1b[32m%s\x1b[0m",
        "Step 01:",
        "Start - Get all event's user to handle with cron-schedule"
      );
      listEventSchedule = listEventSchedule.concat( await EventSchedule.find( {
        "status": 1,
        "started_at": {
          "$gte": new Date( minDateTime ).toISOString(),
          "$lt": new Date().toISOString()
        }
      } ).lean() );

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

      console.log( "\x1b[35m%s\x1b[0m", "Checking... Event Data Input Before Submit To Facebook." );
      listEventSchedule = removeObjectDuplicates( listEventSchedule, "_id" );

      await Promise.all(
        listEventSchedule.map( async ( eventSchedule, index ) => {
          const campaignInfo = await Campaign.findOne( { "_id": eventSchedule._campaign } ),
            eventInfo = await Event.findOne( { "_id": eventSchedule._event } );

          console.log(
            "\x1b[32m%s\x1b[0m",
            "SUCCESS:",
            "Passed! Starting schedule to RAM of system..."
          );
          // eslint-disable-next-line one-var
          const resFacebookResponse = await createPost( {
            "cookie": eventSchedule.cookie,
            agent,
            "feed": eventSchedule.feed
          } );

          if ( resFacebookResponse ) {

            console.log( resFacebookResponse );

            // Handle when post feed successfully
            if ( resFacebookResponse.error.code === 200 ) {
              campaignInfo.logs.total += 1;
              campaignInfo.logs.content.push( {
                "message": `[Sự kiện: ${eventInfo.title}] Đăng bài viết thành công với ID: ${resFacebookResponse.results.postID}`,
                "createdAt": new Date()
              } );

              listEventSchedule.splice( index, 1 );
              await EventSchedule.deleteOne(
                { "_id": eventSchedule._id },
                ( err ) => {
                  if ( err ) {
                    throw Error( `Xảy ra lỗi trong quá trình xóa [EventSchedule] có ID: ${eventSchedule._id}.` );
                  }
                }
              );
              console.log( `Post To Facebook Successfully with ID: ${resFacebookResponse.results.postID}` );
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

              listEventSchedule.splice( index, 1 );
              await EventSchedule.deleteOne(
                { "_id": eventSchedule._id },
                ( err ) => {
                  if ( err ) {
                    throw Error( `Xảy ra lỗi trong quá trình xóa [EventSchedule] có ID: ${eventSchedule._id}.` );
                  }
                }
              );

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
