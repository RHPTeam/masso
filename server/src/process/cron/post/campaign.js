/* eslint-disable one-var */
/* eslint-disable no-new */
const to = ( promise ) => {
  return promise.then( ( data ) => {
    return [ null, data ];
  } )
    .catch( ( err ) => [ err ] );
};
const convertDataPostFacebook = async ( location, mixPost = {}, post, targetID ) => {
  let photos = [];

  // Check convert images to array format
  if ( post.attachments.length > 0 ) {
    photos = await Promise.all( post.attachments.map( ( file ) => {
      if ( file.typeAttachment === 1 ) {
        return file.link;
      }
    } ) );
  }

  // Check if feed contain text and scrape link
  if ( post.scrape && post.scrape.length > 0 && photos.length > 0 ) {
    post.scrape = "";
  }

  // Check if user use advance mix post
  if ( mixPost.mixOpen || mixPost.mixClose ) {
    // Check open mix post
    if ( mixPost.mixOpen ) {
      // Check if mix post open have content
      if ( mixPost.mixOpen.content.length > 0 ) {
        post.content = `${mixPost.mixOpen.content} \n\n ${post.content}`;
      }
      // Check if mix post open have attachments
      if ( mixPost.mixOpen.attachments.length > 0 ) {
        const photoListMixPost = await Promise.all( mixPost.mixOpen.attachments.map( ( file ) => {
          if ( file.typeAttachment === 1 ) {
            return file.link;
          }
        } ) );

        photos = photoListMixPost.concat( photos );
      }
    }

    // Check close mix post
    if ( mixPost.mixClose ) {
      // Check if mix post open have content
      if ( mixPost.mixClose.content.length > 0 ) {
        post.content = `${post.content} \n\n ${mixPost.mixClose.content}`;
      }
      // Check if mix post open have attachments
      if ( mixPost.mixClose.attachments.length > 0 ) {
        const photoListMixPost = await Promise.all( mixPost.mixClose.attachments.map( ( file ) => {
          if ( file.typeAttachment === 1 ) {
            return file.link;
          }
        } ) );

        photos = photos.concat( photoListMixPost );
      }
    }
  }

  return {
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
      "value": location === 0 ? "" : targetID
    },
    "place": post.place ? post.place.id : "",
    "tags": post.tags ? post.tags.map( ( tag ) => tag.uid ) : ""
  };
};
const CronJob = require( "cron" ).CronJob;
const request = require( "axios" );
const Facebook = require( "../../../models/Facebook.model" );
const EventSchedule = require( "../../../models/post/EventSchedule.model" );
const Campaign = require( "../../../models/post/Campaign.model" );
const Event = require( "../../../models/post/Event.model" );
const Post = require( "../../../models/post/Post.model" );

const handleRequestToPostServer = async ( eventScheduleList, response ) => {
  return await Promise.all( response.data.data.map( async ( server, index ) => {
    const [ errorServer ] = await to( request.get( server.name ) );

    if ( errorServer ) {
      console.log( "⭕️ ⭕️ ⭕️ ⭕️ Have error checking post server running..." );
      await request.post( `${process.env.APP_PARENT_URL}/api/v1/server/post/${server.uid}/status`, { "status": false } ).catch( ( errorStatusPost ) => {
        if ( errorStatusPost ) {
          console.log( "🅾️ 🅾️ 🅾️ 🅾️ Update status post server failed when detected server not working..." );
        }
      } );
      return false;
    }

    await EventSchedule.updateOne( { "_id": eventScheduleList[ index ]._id }, { "status": 5 }, ( errorEventSchedule ) => {
      if ( errorEventSchedule ) {
        throw Error( "Xảy ra lỗi trong quá trình cập nhật lại event schedule...." );
      }
    } );

    // eslint-disable-next-line one-var
    const campaignInfo = await Campaign.findOne( { "_id": eventScheduleList[ index ]._campaign } ),
      eventInfo = await Event.findOne( { "_id": eventScheduleList[ index ]._event } ),
      postInfo = await Post.findOne( { "_id": eventScheduleList[ index ].postID } ).lean(),
      facebookInfo = await Facebook.findOne( { "_id": eventScheduleList[ index ].facebookID } ).lean(),
      mixPost = {};

    if ( campaignInfo.status === false ) {
      console.log( "🚫🚫🚫🚫 Campaign contain this event schedule which is turn off... 🚫🚫🚫🚫" );
      await EventSchedule.updateOne( { "_id": eventScheduleList[ index ]._id }, { "status": 2 }, ( errorEventSchedule ) => {
        if ( errorEventSchedule ) {
          throw Error( "Xảy ra lỗi trong quá trình cập nhật lại event schedule...." );
        }
      } );
    } else {
      if ( eventScheduleList[ index ].mixOpen ) {
        const listPost = ( await Post.find( { "_categories": eventScheduleList[ index ].mixOpen } ).lean() ).map( ( post ) => post._id ),
          postSelectedID = listPost[ Math.floor( Math.random() * listPost.length ) ];

        mixPost.mixOpen = await Post.findOne( { "_id": postSelectedID } ).lean();
      }

      if ( eventScheduleList[ index ].mixClose ) {
        const listPost = ( await Post.find( { "_categories": eventScheduleList[ index ].mixClose } ).lean() ).map( ( post ) => post._id ),
          postSelectedID = listPost[ Math.floor( Math.random() * listPost.length ) ];

        mixPost.mixClose = await Post.findOne( { "_id": postSelectedID } ).lean();
      }

      const feed = await convertDataPostFacebook( eventScheduleList[ index ].location, mixPost, postInfo, eventScheduleList[ index ].targetID ),
        responsePost = await request.post( `${server.name}/core/v1/post`, { "cookie": facebookInfo.cookie, "feed": feed } );

      if ( responsePost.data ) {

        // Successfully
        if ( responsePost.data.error.code === 200 ) {
          campaignInfo.logs.total += 1;
          campaignInfo.logs.content.push( {
            "message": `[Sự kiện: ${eventInfo.title}] Đăng bài viết thành công với ID: ${responsePost.data.results.postID}`,
            "createdAt": new Date()
          } );

          console.log( "✅✅✅✅ Post To Facebook Successfully..." );
          console.log( `--------------- ${responsePost.data.results.postID} ---------------` );

          await EventSchedule.updateOne( { "_id": eventScheduleList[ index ]._id }, { "status": 3 }, ( errorEventSchedule ) => {
            if ( errorEventSchedule ) {
              throw Error( "Xảy ra lỗi trong quá trình cập nhật lại event schedule...." );
            }
          } );
        } else if ( responsePost.data.error.code === 8889 ) { // Handle error post to facebook that account facebook is expired...
          campaignInfo.logs.total += 1;
          campaignInfo.logs.content.push( {
            "message": `[Tài khoản] Facebook - ${facebookInfo.userInfo.name} đã bị đăng xuất! Hệ thống tự động tắt chiến dịch.`,
            "createdAt": new Date()
          } );

          await Campaign.updateOne( { "_id": eventScheduleList[ index ]._campaign }, { "status": false }, ( errCampaign ) => {
            if ( errCampaign ) {
              throw Error( "Xảy ra lỗi trong quá trình cập nhật lại chiến dịch khi tài khoản facebook bị đăng xuất." );
            }
          } );

          console.log( `❌❌❌❌ Have error: ${responsePost.data.error.text}` );

          await EventSchedule.updateOne( { "_id": eventScheduleList[ index ]._id }, { "status": 4 }, ( errorEventSchedule ) => {
            if ( errorEventSchedule ) {
              throw Error( "Xảy ra lỗi trong quá trình cập nhật lại event schedule...." );
            }
          } );
        } else { // Handle error post to facebook failed...
          campaignInfo.logs.total += 1;
          campaignInfo.logs.content.push( {
            "message": `[Sự kiện: ${eventInfo.title}] Đăng bài viết thất bại! Lỗi: ${responsePost.data.error.text}`,
            "createdAt": new Date()
          } );

          console.log( `❌❌❌❌ Have error: ${responsePost.data.error.text}` );

          await EventSchedule.updateOne( { "_id": eventScheduleList[ index ]._id }, { "status": 4 }, ( errorEventSchedule ) => {
            if ( errorEventSchedule ) {
              throw Error( "Xảy ra lỗi trong quá trình cập nhật lại event schedule...." );
            }
          } );
        }
        await campaignInfo.save();
      }
    }
  } ) );
};

( async () => {
  console.log( "\x1b[34m%s\x1b[0m", "Schedule Service For Campaign Starting..." );
  new CronJob(
    "1 * * * * *",
    async function() {
      let dateTimeCurrent = new Date(),
        minDateTime = dateTimeCurrent.setTime(
          dateTimeCurrent.getTime() - 20 * 60000
        );

      const [ err, response ] = await to( request.get( `${process.env.APP_PARENT_URL}/api/v1/server/post?status=true` ) );
      
      if ( err ) {
        console.log( "⭕️ ⭕️ ⭕️ ⭕️ Have error get data post server..." );
        return false;
      }
      if ( response.data.data.length === 0 ) {
        console.log( "🅾️ 🅾️ 🅾️ 🅾️ Haven't post server running..." );
        return false;
      }

      const eventScheduleList = await EventSchedule.find( {
        "$or": [
          { "status": 1 },
          { "status": null } ],
        "started_at": {
          "$gte": new Date( minDateTime ).toISOString(),
          "$lt": new Date().toISOString()
        }
      } ).limit( response.data.data.length ).lean();

      await handleRequestToPostServer( eventScheduleList, response );
    },
    null,
    true,
    "Asia/Ho_Chi_Minh",
    null,
    true
  );
} )();
