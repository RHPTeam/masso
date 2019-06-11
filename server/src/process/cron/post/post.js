const ScheduleService = require( "node-schedule" );
const PostSchedule = require( "../../../models/post/PostSchedule.model" );

// Facebook Service Core
const { agent } = require( "../../../configs/crawl" ),
  { createPost } = require( "../../../controllers/core/posts.core" );

( async () => {
  let listPostSchedule;

  console.log( "\x1b[34m%s\x1b[0m", "Schedule Service For Post Starting..." );

  console.log( "\x1b[32m%s\x1b[0m", "Step 01:", "Start - Get all post's user to handle with cron-schedule" );
  listPostSchedule = await PostSchedule.find( { "status": 1, "started_at": { "$gt": new Date() } } );
  console.log( "\x1b[32m%s\x1b[0m", "Step 01:", "Finnish - Get all post's user to handle with cron-schedule" );

  if ( listPostSchedule.length === 0 ) {
    console.log( "\x1b[31m%s\x1b[0m", "ERROR:", "Haven't post schedule yet!" );
    // return false;
  }

  console.log( "\x1b[32m%s\x1b[0m", "Step 02:", "Start - Cron post schedule specific date time." );
  await Promise.all( listPostSchedule.map( ( postSchedule ) => {
    console.log( "\x1b[35m%s\x1b[0m", "Checking... Post Data Input Before Submit To Facebook." );

    console.log( "\x1b[32m%s\x1b[0m", "SUCCESS:", "Passed! Starting schedule to RAM of system..." );
    ScheduleService.scheduleJob( `rhp${postSchedule._id}`, new Date( postSchedule.started_at ), async function () {
      const resFacebookResponse = await createPost( { "cookie": postSchedule.cookie, agent, "feed": postSchedule.feed } );

      if ( resFacebookResponse ) {
        if ( resFacebookResponse.error.code === 200 && resFacebookResponse.error.text === "Trả về id bài viết thành công!" ) {
          postSchedule.status = 0;
          await postSchedule.save();
        }
      }
    } );
    console.log( "\x1b[32m%s\x1b[0m", "SUCCESS:", "Finished! System again assign schedule for post next..." );
  } ) );
  console.log( "\x1b[32m%s\x1b[0m", "Step 02:", "Finnish - Cron post schedule specific date time." );
} )();
