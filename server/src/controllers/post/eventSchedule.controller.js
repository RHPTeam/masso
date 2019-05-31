const ObjectId = require( "mongoose" ).Types.ObjectId;
const Campaign = require( "../../models/post/Campaign.model" );
const Facebook = require( "../../models/Facebook.model" );
const GroupFacebook = require( "../../models/post/GroupFacebook.model" );
const PageFacebook = require( "../../models/post/PageFacebook.model" );
const Post = require( "../../models/post/Post.model" );
const PostGroup = require( "../../models/post/PostGroup.model" );
const EventSchedule = require( "../../models/post/EventSchedule.model" );

let listPost, listEventSchedule = [];

module.exports = {
  "create": async ( event, campaignId ) => {
    console.log( event );
    let startedAtObject = new Date( event.started_at ), startAt = startedAtObject.setMinutes( startedAtObject.getMinutes() - event.break_point );
    const campaignContainEvent = await Campaign.findOne( { "_id": campaignId } ).lean();

    if ( event.post_custom.length > 0 ) {
      listPost = event.post_custom;
    } else {
      listPost = ( await Post.find( { "_categories": new ObjectId( event.post_category ) } ).lean() ).map( ( post ) => post._id );
    }

    console.log( listPost );

    // Check target profile
    if ( event.timeline.length > 0 ) {
      listEventSchedule = Promise.all( event.timeline.map( async ( profile ) => {
        const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
          accountFacebookInfo = await Facebook.findOne( { "_id": profile } ).lean();

        let photos;

        if ( postSelectedFromRandom.attachments.length > 0 ) {
          photos = postSelectedFromRandom.attachments.map( ( file ) => {
            if ( file.typeAttachment === 1 ) {
              return file.link;
            }
          } );
        }

        startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );

        return {
          "cookie": accountFacebookInfo.cookie,
          "feed": {
            "photos": photos,
            "scrape": postSelectedFromRandom.scrape,
            "activity": {
              "type": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.typeActivity.id : "",
              "id": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.id : "",
              "text": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.text : ""
            },
            "color": postSelectedFromRandom.color ? postSelectedFromRandom.color.id : "",
            "content": postSelectedFromRandom.content,
            "location": {
              "type": 0,
              "value": ""
            },
            "place": postSelectedFromRandom.place ? postSelectedFromRandom.place.id : "",
            "tags": postSelectedFromRandom.tags ? postSelectedFromRandom.tags.map( ( tag ) => tag.uid ) : ""
          },
          "started_at": startAt,
          "status": event.status,
          "_event": event._id,
          "_campaign": campaignContainEvent._id
        };
      } ) );
    }

    // Check target category
    if ( event.target_category ) {
      const postGroupInfo = await PostGroup.findOne( { "_id": event.target_category } ).lean();

      // Handle Page
      listEventSchedule = listEventSchedule.concat( postGroupInfo._pages.map( async ( page ) => {
        const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
          pageFacebookInfo = await PageFacebook.find( { "pageId": page } ).populate( { "path": "_facebook", "select": "cookie -_id" } ).lean();

        let photos;

        if ( postSelectedFromRandom.attachments.length > 0 ) {
          photos = postSelectedFromRandom.attachments.map( ( file ) => {
            if ( file.typeAttachment === 1 ) {
              return file.link;
            }
          } );
        }

        startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );

        return {
          "cookie": pageFacebookInfo[ 0 ]._facebook.cookie,
          "feed": {
            "photos": photos,
            "scrape": postSelectedFromRandom.scrape,
            "activity": {
              "type": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.typeActivity.id : "",
              "id": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.id : "",
              "text": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.text : ""
            },
            "color": postSelectedFromRandom.color ? postSelectedFromRandom.color.id : "",
            "content": postSelectedFromRandom.content,
            "location": {
              "type": 0,
              "value": ""
            },
            "place": postSelectedFromRandom.place ? postSelectedFromRandom.place.id : "",
            "tags": postSelectedFromRandom.tags ? postSelectedFromRandom.tags.map( ( tag ) => tag.uid ) : ""
          },
          "started_at": startAt,
          "status": event.status,
          "_event": event._id,
          "_campaign": campaignContainEvent._id
        };
      } ) );

      // Handle Group
      listEventSchedule = listEventSchedule.concat( postGroupInfo._groups.map( async ( group ) => {
        const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
          groupFacebookInfo = await GroupFacebook.find( { "groupId": group } ).populate( { "path": "_facebook", "select": "cookie -_id" } ).lean();

        let photos;

        if ( postSelectedFromRandom.attachments.length > 0 ) {
          photos = postSelectedFromRandom.attachments.map( ( file ) => {
            if ( file.typeAttachment === 1 ) {
              return file.link;
            }
          } );
        }

        startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );

        return {
          "cookie": groupFacebookInfo[ 0 ]._facebook.cookie,
          "feed": {
            "photos": photos,
            "scrape": postSelectedFromRandom.scrape,
            "activity": {
              "type": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.typeActivity.id : "",
              "id": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.id : "",
              "text": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.text : ""
            },
            "color": postSelectedFromRandom.color ? postSelectedFromRandom.color.id : "",
            "content": postSelectedFromRandom.content,
            "location": {
              "type": 0,
              "value": ""
            },
            "place": postSelectedFromRandom.place ? postSelectedFromRandom.place.id : "",
            "tags": postSelectedFromRandom.tags ? postSelectedFromRandom.tags.map( ( tag ) => tag.uid ) : ""
          },
          "started_at": startAt,
          "status": event.status,
          "_event": event._id,
          "_campaign": campaignContainEvent._id
        };
      } ) );
    }

    // Check target custom
    if ( event.target_custom.length > 0 ) {
      // Handle Page
      listEventSchedule = listEventSchedule.concat( event.target_custom.filter( ( target ) => target.typeTarget === 1 ).map( ( item ) => item.id ).map( async ( page ) => {
        const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
          pageFacebookInfo = await PageFacebook.find( { "pageId": page } ).populate( { "path": "_facebook", "select": "cookie -_id" } ).lean();

        let photos;

        if ( postSelectedFromRandom.attachments.length > 0 ) {
          photos = postSelectedFromRandom.attachments.map( ( file ) => {
            if ( file.typeAttachment === 1 ) {
              return file.link;
            }
          } );
        }

        startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );

        return {
          "cookie": pageFacebookInfo[ 0 ]._facebook.cookie,
          "feed": {
            "photos": photos,
            "scrape": postSelectedFromRandom.scrape,
            "activity": {
              "type": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.typeActivity.id : "",
              "id": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.id : "",
              "text": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.text : ""
            },
            "color": postSelectedFromRandom.color ? postSelectedFromRandom.color.id : "",
            "content": postSelectedFromRandom.content,
            "location": {
              "type": 0,
              "value": ""
            },
            "place": postSelectedFromRandom.place ? postSelectedFromRandom.place.id : "",
            "tags": postSelectedFromRandom.tags ? postSelectedFromRandom.tags.map( ( tag ) => tag.uid ) : ""
          },
          "started_at": startAt,
          "status": event.status,
          "_event": event._id,
          "_campaign": campaignContainEvent._id
        };
      } ) );

      // Handle Group
      listEventSchedule = listEventSchedule.concat( event.target_custom.filter( ( target ) => target.typeTarget === 0 ).map( ( item ) => item.id ).map( async ( group ) => {
        const postSelectedFromRandom = await Post.findOne( { "_id": listPost[ Math.floor( Math.random() * listPost.length ) ] } ).lean(),
          groupFacebookInfo = await GroupFacebook.find( { "groupId": group } ).populate( { "path": "_facebook", "select": "cookie -_id" } ).lean();

        let photos;

        if ( postSelectedFromRandom.attachments.length > 0 ) {
          photos = postSelectedFromRandom.attachments.map( ( file ) => {
            if ( file.typeAttachment === 1 ) {
              return file.link;
            }
          } );
        }

        startAt = ( new Date( startAt ) ).setMinutes( ( new Date( startAt ) ).getMinutes() + event.break_point );

        return {
          "cookie": groupFacebookInfo[ 0 ]._facebook.cookie,
          "feed": {
            "photos": photos,
            "scrape": postSelectedFromRandom.scrape,
            "activity": {
              "type": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.typeActivity.id : "",
              "id": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.id : "",
              "text": postSelectedFromRandom.activity ? postSelectedFromRandom.activity.text : ""
            },
            "color": postSelectedFromRandom.color ? postSelectedFromRandom.color.id : "",
            "content": postSelectedFromRandom.content,
            "location": {
              "type": 0,
              "value": ""
            },
            "place": postSelectedFromRandom.place ? postSelectedFromRandom.place.id : "",
            "tags": postSelectedFromRandom.tags ? postSelectedFromRandom.tags.map( ( tag ) => tag.uid ) : ""
          },
          "started_at": startAt,
          "status": event.status,
          "_event": event._id,
          "_campaign": campaignContainEvent._id
        };
      } ) );
    }

    if ( listEventSchedule.length > 0 ) {
      // Save by insertMany()
      EventSchedule.insertMany( listEventSchedule, function ( error ) {
        if ( error ) {
          console.log( error );
        }
      } );
    }
  }
};
