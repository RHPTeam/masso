const ScheduleService = require( "node-schedule" );
const { startedSchedule, finishedSchedule } = require( "../../helpers/utils/functions/scheduleLog" );
const Campaign = require( "../../models/post/Campaign.model" );
const Facebook = require( "../../models/Facebook.model" );
const GroupFacebook = require( "../../models/post/GroupFacebook.model" );
const PageFacebook = require( "../../models/post/PageFacebook.model" );
const Post = require( "../../models/post/Post.model" );
const PostGroup = require( "../../models/post/PostGroup.model" );
const EventSchedule = require( "../../models/post/EventSchedule.model" ),
  { agent } = require( "../../configs/crawl" ),
  { createPost } = require( "../../controllers/core/posts.core" ),

  // handle convert to event schedule. | location: 0 - profile, 1 - group, 2 - page
  convert = ( campaign, event, post, cookie, location, target = "", time, account ) => {
    let photos;

    if ( post.attachments.length > 0 ) {
      photos = post.attachments.map( ( file ) => {
        if ( file.typeAttachment === 1 ) {
          return file.link;
        }
      } );
    }

    return {
      "_id": post._id,
      "cookie": cookie,
      "feed": {
        "photos": ( photos && photos.length > 0 ) ? photos : [],
        "scrape": post.scrape ? post.scrape : "",
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
          "value": location === 0 ? "" : target
        },
        "place": post.place ? post.place.id : "",
        "tags": post.tags ? post.tags.map( ( tag ) => tag.uid ) : ""
      },
      "started_at": new Date( time ),
      "status": event.status,
      "_account": account,
      "_event": event._id,
      "_campaign": campaign._id
    };
  },
  createSchedule = async ( listNewSchedule ) => {
    console.log( "\x1b[34m%s\x1b[0m", "Schedule Service Starting..." );

    console.log( "\x1b[32m%s\x1b[0m", "Step 01:", "Start - Get all event's user to handle with cron-schedule" );
    const listScheduleActive = listNewSchedule.filter( ( event ) => event.status === true ).filter( ( event ) => ( new Date( event.started_at ) > new Date() ) );

    console.log( "\x1b[32m%s\x1b[0m", "Step 01:", "Finnish - Get all event's user to handle with cron-schedule" );
    if ( listScheduleActive.length === 0 ) {
      console.log( "\x1b[31m%s\x1b[0m", "ERROR:", "Haven't event schedule yet!" );
      return false;
    }

    console.log( "\x1b[32m%s\x1b[0m", "Step 02:", "Start - Cron schedule specific date time." );
    await Promise.all( listScheduleActive.map( ( eventSchedule ) => {
      console.log( "\x1b[35m%s\x1b[0m", "Checking... Event Data Input Before Submit To Facebook." );
      // Log when start cron
      startedSchedule( eventSchedule, __dirname );
      console.log( "\x1b[32m%s\x1b[0m", "SUCCESS:", "Passed! Starting schedule to RAM of system..." );
      ScheduleService.scheduleJob( `rhp${eventSchedule._id.toString()}`, new Date( eventSchedule.started_at ), async function () {
        const resFacebookResponse = await createPost( { "cookie": eventSchedule.cookie, agent, "feed": eventSchedule.feed } );

        if ( resFacebookResponse.error.code === 200 ) {
          // Log when finish cron
          finishedSchedule( eventSchedule, __dirname );
        }
      } );

      console.log( "\x1b[32m%s\x1b[0m", "SUCCESS:", "Finished! System again assign schedule for event next..." );
    } ) );

    console.log( "\x1b[32m%s\x1b[0m", "Step 02:", "Finnish - Cron schedule specific date time." );
  },
  insertManyEventSchedule = ( data ) => {
    return new Promise( ( resolve ) => {
      EventSchedule.insertMany( data, function( error, docs ) {
        if ( error ) {
          throw new Error( error );
        }
        resolve( docs );
      } );
    } );
  };

let listPost, listEventSchedule = [], newListEventSchedule = [],
  resetEventSchedule = function () {
    listEventSchedule = [];
    newListEventSchedule = [];
  };

module.exports = {
  "create": async ( event, campaignId, account ) => {
    let startedAtObject = new Date( event.started_at ), startAt = startedAtObject.setMinutes( startedAtObject.getMinutes() - event.break_point );
    const campaignContainEvent = await Campaign.findOne( { "_id": campaignId } ).lean();

    if ( event.post_custom.length > 0 ) {
      listPost = event.post_custom;
    } else {
      listPost = ( await Post.find( { "_categories": event.post_category } ).lean() ).map( ( post ) => post._id );
    }

    if ( listPost.length > 0 ) {
      // Check target profile
      if ( event.timeline.length > 0 ) {
        listEventSchedule = await Promise.all( event.timeline.map( async ( profile ) => {
          const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
            accountFacebookInfo = await Facebook.findOne( { "_id": profile } ).lean();

          startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );

          return convert( campaignContainEvent, event, postSelectedFromRandom, accountFacebookInfo.cookie, 0, "", startAt, account );
        } ) );
      }

      // Check target category
      if ( event.target_category ) {
        const postGroupInfo = await PostGroup.findOne( { "_id": event.target_category } ).lean();

        // Handle Page
        listEventSchedule = listEventSchedule.concat( await Promise.all( postGroupInfo._pages.map( async ( page ) => {
          const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
            pageFacebookInfo = await PageFacebook.find( { "pageId": page } ).populate( { "path": "_facebook", "select": "cookie -_id" } ).lean();

          startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );

          return convert( campaignContainEvent, event, postSelectedFromRandom, pageFacebookInfo[ 0 ]._facebook.cookie, 2, page, startAt, account );
        } ) ) );

        // Handle Group
        listEventSchedule = listEventSchedule.concat( await Promise.all( postGroupInfo._groups.map( async ( group ) => {
          const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
            groupFacebookInfo = await GroupFacebook.find( { "groupId": group } ).populate( { "path": "_facebook", "select": "cookie -_id" } ).lean();

          startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );

          return convert( campaignContainEvent, event, postSelectedFromRandom, groupFacebookInfo[ 0 ]._facebook.cookie, 1, group, startAt, account );
        } ) ) );
      }

      // Check target custom
      if ( event.target_custom.length > 0 ) {
        // Handle Page
        listEventSchedule = listEventSchedule.concat( await Promise.all( event.target_custom.filter( ( target ) => target.typeTarget === 1 ).map( ( item ) => item.id ).map( async ( page ) => {
          const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
            pageFacebookInfo = await PageFacebook.find( { "pageId": page } ).populate( { "path": "_facebook", "select": "cookie -_id" } ).lean();

          startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );

          return convert( campaignContainEvent, event, postSelectedFromRandom, pageFacebookInfo[ 0 ]._facebook.cookie, 2, page, startAt, account );
        } ) ) );

        // Handle Group
        listEventSchedule = listEventSchedule.concat( await Promise.all( event.target_custom.filter( ( target ) => target.typeTarget === 0 ).map( ( item ) => item.id ).map( async ( group ) => {
          const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
            groupFacebookInfo = await GroupFacebook.find( { "groupId": group } ).populate( { "path": "_facebook", "select": "cookie -_id" } ).lean();

          startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );

          return convert( campaignContainEvent, event, postSelectedFromRandom, groupFacebookInfo[ 0 ]._facebook.cookie, 1, group, startAt, account );
        } ) ) );
      }

      if ( listEventSchedule.length > 0 ) {
        // Remove Object
        listEventSchedule = await Promise.all( listEventSchedule.map( ( eventSchedule ) => {
          delete eventSchedule._id;
          return eventSchedule;
        } ) );

        // insert many
        newListEventSchedule = await insertManyEventSchedule( listEventSchedule );

        await createSchedule( newListEventSchedule );
        resetEventSchedule();
      } else {
        console.log( "\x1b[31m%s\x1b[0m", "Error: ", "Haven't list event schedule to insert!" );
        return false;
      }
    } else {
      console.log( "\x1b[31m%s\x1b[0m", "Error: ", "Not found posts to random." );
      return false;
    }
  }
};
