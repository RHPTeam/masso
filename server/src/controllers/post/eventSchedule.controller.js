const GroupFacebook = require( "../../models/post/GroupFacebook.model" );
const PageFacebook = require( "../../models/post/PageFacebook.model" );
const Post = require( "../../models/post/Post.model" );
const PostGroup = require( "../../models/post/PostGroup.model" );
const EventSchedule = require( "../../models/post/EventSchedule.model" ),
  { removeObjectDuplicates } = require( "../../helpers/utils/functions/array" ),

  // handle convert to event schedule. | location: 0 - profile, 1 - group, 2 - page
  convert = ( type, value ) => {
    return { type, value };
  };

module.exports = {
  "create": async ( event, campaignId ) => {
    let listPost = [], startedAtObject = new Date( event.started_at ), startAt = startedAtObject.setMinutes( startedAtObject.getMinutes() - event.break_point );

    if ( event.post_custom && event.post_custom.length > 0 ) {
      listPost = event.post_custom;
    } else {
      listPost = ( await Post.find( { "_categories": event.post_category } ).lean() ).map( ( post ) => post._id );
    }

    if ( listPost.length > 0 ) {
      let listTarget = [];

      // Do something new version - Handle get all target
      if ( listTarget.length === 0 ) {
        // Get all target and merge to one array and remove duplicate

        // Check target profile
        if ( event && event.timeline.length > 0 ) {
          listTarget = listTarget.concat( await Promise.all( event.timeline.map( async ( profile ) => {
            return convert( 0, profile );
          } ) ) );
        }

        // Check target category
        if ( event && event.target_category ) {
          const postGroupInfo = await PostGroup.findOne( { "_id": event.target_category } ).lean();

          if ( postGroupInfo ) {
            // Handle Page
            listTarget = listTarget.concat( await Promise.all( postGroupInfo._pages.map( async ( page ) => {
              return convert( 2, page );
            } ) ) );

            // Handle Group
            listTarget = listTarget.concat( await Promise.all( postGroupInfo._groups.map( async ( group ) => {
              return convert( 1, group );
            } ) ) );
          }
        }

        // Check target custom
        if ( event && event.target_custom.length > 0 ) {
          // Handle Page
          listTarget = listTarget.concat( await Promise.all( event.target_custom.filter( ( target ) => target.typeTarget === 1 ).map( ( item ) => item.id ).map( async ( page ) => {
            return convert( 2, page );
          } ) ) );

          // Handle Group
          listTarget = listTarget.concat( await Promise.all( event.target_custom.filter( ( target ) => target.typeTarget === 0 ).map( ( item ) => item.id ).map( async ( group ) => {
            return convert( 1, group );
          } ) ) );
        }
      } else {
        console.log( "\x1b[31m%s\x1b[0m", "Error: ", "Haven't error with cache of server!" );
      }

      // Do something new version - Remove item duplicate
      if ( listTarget.length > 0 ) {
        listTarget = removeObjectDuplicates( listTarget, "value" );
      }

      // Do something new version - convert data model
      if ( listTarget.length > 0 ) {
        await Promise.all( listTarget.map( async ( target, index ) => {
          // Random post from list post
          let postID = listPost[ Math.floor( Math.random() * listPost.length ) ],
            startedAtPostToFacebook = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + ( event.break_point * ( index + 1 ) ) ),
            facebookID, location = target.type, newEventSchedule, mixPost = {};

          // Check if user use advance mix post before upload to facebook.
          if ( event.plugins && event.plugins.mix ) {
            mixPost.mixOpen = event.plugins.mix.open;
            mixPost.mixClose = event.plugins.mix.close;
          }

          // Timeline
          if ( target.type === 0 ) {
            facebookID = target.value;
          }

          // Group
          if ( target.type === 1 ) {
            const groupInfo = await GroupFacebook.findOne( { "groupId": target.value, "_account": event._account } ).lean();

            facebookID = groupInfo._facebook;
          }

          // Page
          if ( target.type === 2 ) {
            const pageInfo = await PageFacebook.findOne( { "pageId": target.value, "_account": event._account } ).lean();

            facebookID = pageInfo._facebook;
          }

          // new value from model to insertMany() to mongodb
          newEventSchedule = new EventSchedule( {
            "postID": postID,
            "mixOpen": mixPost.mixOpen,
            "mixClose": mixPost.mixClose,
            "facebookID": facebookID,
            "location": location,
            "targetID": target.value,
            "started_at": startedAtPostToFacebook,
            "_account": event._account,
            "_event": event._id,
            "_campaign": campaignId
          } );

          // Save to mongodb
          await newEventSchedule.save();
        } ) );
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
