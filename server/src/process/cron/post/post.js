const CronJob = require( "cron" ).CronJob;
const PostSchedule = require( "../../../models/post/PostSchedule.model" );

// Facebook Service Core
const { removeObjectDuplicates } = require( "../../../helpers/utils/functions/array" ),
  { agent } = require( "../../../configs/crawl" ),
  { createPost } = require( "../../../controllers/core/posts.core" );

( async () => {
  let listPostSchedule = [];

  console.log( "\x1b[34m%s\x1b[0m", "Schedule Service For Post Starting..." );
  // eslint-disable-next-line no-new
  new CronJob( "1 * * * * *", async function() {
    let dateTimeCurrent = new Date(), minDateTime = dateTimeCurrent.setTime( dateTimeCurrent.getTime() - 20 * 60000 );

    console.log( "\x1b[32m%s\x1b[0m", "Step 01:", "Start - Get all event's user to handle with cron-schedule" );
    listPostSchedule = listPostSchedule.concat( await PostSchedule.find( { "status": 1, "started_at": {
      "$gte": new Date( minDateTime ).toISOString(),
      "$lt": new Date().toISOString()
    } } ) );
    console.log( "\x1b[32m%s\x1b[0m", "Step 01:", "Finnish - Get all post's user to handle with cron-schedule" );

    if ( listPostSchedule.length === 0 ) {
      console.log( "\x1b[31m%s\x1b[0m", "ERROR:", "Haven't post schedule yet!" );
      return false;
    }

    console.log( "\x1b[35m%s\x1b[0m", "Checking... Event Data Input Before Submit To Facebook." );
    listPostSchedule = removeObjectDuplicates( listPostSchedule, "_id" );

    await Promise.all( listPostSchedule.map( async ( postSchedule, index ) => {
      console.log( "\x1b[32m%s\x1b[0m", "SUCCESS:", "Passed! Starting schedule to RAM of system..." );
      const resFacebookResponse = await createPost( { "cookie": postSchedule.cookie, agent, "feed": postSchedule.feed } );

      if ( resFacebookResponse ) {
        // Handle when upload image error or issues
        // if ( resFacebookResponse.error.code === 1036 ) {}

        // Handle when post feed successfully
        if ( resFacebookResponse.error.code === 200 ) {
          listPostSchedule.splice( index, 1 );
          postSchedule.status = 0;
          postSchedule.postID = resFacebookResponse.results.postID;
          await postSchedule.save();
          console.log( `post To Facebook Success: ${resFacebookResponse.results.postID}` );
        }
      }
    } ) );
    console.log( "\x1b[32m%s\x1b[0m", "SUCCESS:", "Finished! System again assign schedule for event next..." );

  }, null, true, "Asia/Ho_Chi_Minh", null, true );
} )();
