const CronJob = require( "cron" ).CronJob;
const PostSchedule = require( "../../../models/post/PostSchedule.model" );

// Facebook Service Core
const { agent } = require( "../../../configs/crawl" ),
  { createPost } = require( "../../../controllers/core/posts.core" );

( async () => {
  let listPostSchedule;

  console.log( "\x1b[34m%s\x1b[0m", "Schedule Service For Post Starting..." );
  // eslint-disable-next-line no-new
  new CronJob( "* 1 * * * *", async function() {
    let dateTimeCurrent = new Date(), minDateTime = dateTimeCurrent.setTime( dateTimeCurrent.getTime() - 20 * 60000 );

    console.log( "\x1b[32m%s\x1b[0m", "Step 01:", "Start - Get all event's user to handle with cron-schedule" );
    listPostSchedule = await PostSchedule.find( { "status": 1, "started_at": {
      "$gte": new Date( minDateTime ).toISOString(),
      "$lt": dateTimeCurrent.toISOString()
    } } );
    console.log( "\x1b[32m%s\x1b[0m", "Step 01:", "Finnish - Get all post's user to handle with cron-schedule" );

    if ( listPostSchedule.length === 0 ) {
      console.log( "\x1b[31m%s\x1b[0m", "ERROR:", "Haven't post schedule yet!" );
      return false;
    }

    await Promise.all( listPostSchedule.map( async ( postSchedule ) => {
      console.log( "\x1b[35m%s\x1b[0m", "Checking... Event Data Input Before Submit To Facebook." );

      console.log( "\x1b[32m%s\x1b[0m", "SUCCESS:", "Passed! Starting schedule to RAM of system..." );
      const resFacebookResponse = await createPost( { "cookie": postSchedule.cookie, agent, "feed": postSchedule.feed } );

      if ( resFacebookResponse ) {
        if ( resFacebookResponse.error.code === 200 ) {
          postSchedule.status = 0;
          await postSchedule.save();
        }
      }
    } ) );
    console.log( "\x1b[32m%s\x1b[0m", "SUCCESS:", "Finished! System again assign schedule for event next..." );

  }, null, true, "Asia/Ho_Chi_Minh", null, true );
} )();
