const ScheduleClasses = require( "../../../helpers/utils/usecases/schedule" );
const ScheduleService = require( "node-schedule" );
const EventSchedule = require( "../../../models/post/EventSchedule.model" );

// Facebook Service Core
const { agent } = require( "../../../configs/crawl" ),
  { createPost } = require( "../../../controllers/core/posts.core" );

( async () => {
  let listEventSchedule;

  console.log( "\x1b[34m%s\x1b[0m", "Schedule Service Starting..." );

  console.log( "\x1b[32m%s\x1b[0m", "Step 01:", "Start - Get all event's user to handle with cron-schedule" );
  listEventSchedule = await EventSchedule.find( { "status": 1, "started_at": { "$gt": new Date() } } );
  console.log( "\x1b[32m%s\x1b[0m", "Step 01:", "Finnish - Get all event's user to handle with cron-schedule" );

  if ( listEventSchedule.length === 0 ) {
    console.log( "\x1b[31m%s\x1b[0m", "ERROR:", "Haven't event schedule yet!" );
    // return false;
  }

  console.log( "\x1b[32m%s\x1b[0m", "Step 02:", "Start - Cron schedule specific date time." );
  Promise.all( listEventSchedule.map( ( eventSchedule ) => {
    console.log( "\x1b[35m%s\x1b[0m", "Checking... Event Data Input Before Submit To Facebook." );

    console.log( "\x1b[32m%s\x1b[0m", "SUCCESS:", "Passed! Starting schedule to RAM of system..." );
    ScheduleClasses.set( eventSchedule._id, ScheduleService.scheduleJob( new Date( eventSchedule.started_at ), async function () {
      const resFacebookResponse = await createPost( { "cookie": eventSchedule.cookie, agent, "feed": eventSchedule.feed } );

      console.log( resFacebookResponse );
    } ) );
    console.log( "\x1b[32m%s\x1b[0m", "SUCCESS:", "Finished! System again assign schedule for event next..." );
  } ) );
  console.log( "\x1b[32m%s\x1b[0m", "Step 02:", "Finnish - Cron schedule specific date time." );
} )();
