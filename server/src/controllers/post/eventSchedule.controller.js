const Campaign = require( "../../models/post/Campaign.model" );
const Facebook = require( "../../models/Facebook.model" );
const GroupFacebook = require( "../../models/post/GroupFacebook.model" );
const PageFacebook = require( "../../models/post/PageFacebook.model" );
const Post = require( "../../models/post/Post.model" );
const PostGroup = require( "../../models/post/PostGroup.model" );
const EventSchedule = require( "../../models/post/EventSchedule.model" ),

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

let listPost, listEventSchedule = [],
  resetEventSchedule = function () {
    listEventSchedule = [];
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
        listEventSchedule = listEventSchedule.concat( await Promise.all( event.timeline.map( async ( profile ) => {
          const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
            accountFacebookInfo = await Facebook.findOne( { "_id": profile } ).lean();

          startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );

          return convert( campaignContainEvent, event, postSelectedFromRandom, accountFacebookInfo.cookie, 0, "", startAt, account );
        } ) ) );
      }

      // Check target category
      if ( event.target_category ) {
        const postGroupInfo = await PostGroup.findOne( { "_id": event.target_category } ).lean();

        // Handle Page
        listEventSchedule = listEventSchedule.concat( await Promise.all( postGroupInfo._pages.map( async ( page ) => {
          const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
            pageFacebookInfo = await PageFacebook.find( { "pageId": page, "_account": account } ).populate( { "path": "_facebook", "select": "cookie -_id" } ).lean();

          startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );

          return convert( campaignContainEvent, event, postSelectedFromRandom, pageFacebookInfo[ 0 ]._facebook.cookie, 2, page, startAt, account );
        } ) ) );

        // Handle Group
        listEventSchedule = listEventSchedule.concat( await Promise.all( postGroupInfo._groups.map( async ( group ) => {
          const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
            groupFacebookInfo = await GroupFacebook.find( { "groupId": group, "_account": account } ).populate( { "path": "_facebook", "select": "cookie -_id" } ).lean();

          startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );

          return convert( campaignContainEvent, event, postSelectedFromRandom, groupFacebookInfo[ 0 ]._facebook.cookie, 1, group, startAt, account );
        } ) ) );
      }

      // Check target custom
      if ( event.target_custom.length > 0 ) {
        // Handle Page
        listEventSchedule = listEventSchedule.concat( await Promise.all( event.target_custom.filter( ( target ) => target.typeTarget === 1 ).map( ( item ) => item.id ).map( async ( page ) => {
          const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
            pageFacebookInfo = await PageFacebook.find( { "pageId": page, "_account": account } ).populate( { "path": "_facebook", "select": "cookie -_id" } ).lean();

          startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );
          return convert( campaignContainEvent, event, postSelectedFromRandom, pageFacebookInfo[ 0 ]._facebook.cookie, 2, page, startAt, account );
        } ) ) );

        // Handle Group
        listEventSchedule = listEventSchedule.concat( await Promise.all( event.target_custom.filter( ( target ) => target.typeTarget === 0 ).map( ( item ) => item.id ).map( async ( group ) => {
          const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
            groupFacebookInfo = await GroupFacebook.find( { "groupId": group, "_account": account } ).populate( { "path": "_facebook", "select": "cookie -_id" } ).lean();

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
        await insertManyEventSchedule( listEventSchedule );

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
