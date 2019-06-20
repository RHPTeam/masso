// Core Service
const CronJob = require( "cron" ).CronJob;
const EventSchedule = require( "../../../models/post/EventSchedule.model" );

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

          console.log(
            "\x1b[32m%s\x1b[0m",
            "SUCCESS:",
            "Passed! Starting schedule to RAM of system..."
          );
          const resFacebookResponse = await createPost( {
            "cookie": eventSchedule.cookie,
            agent,
            "feed": eventSchedule.feed
          } );

          if ( resFacebookResponse ) {
            if ( resFacebookResponse.error.code === 200 ) {
              listEventSchedule.splice( index, 1 );
              await EventSchedule.deleteOne(
                { "_id": eventSchedule._id },
                ( error ) => {
                  return new Error( error );
                }
              );
            }
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
