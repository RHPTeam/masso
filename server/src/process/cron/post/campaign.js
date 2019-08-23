const CronJob = require( "cron" ).CronJob;
const Facebook = require( "../../../models/Facebook.model" );
const EventSchedule = require( "../../../models/post/EventSchedule.model" );
const Campaign = require( "../../../models/post/Campaign.model" );
const Event = require( "../../../models/post/Event.model" );
const Post = require( "../../../models/post/Post.model" );

// Facebook Service Core
const { createNewFeed } = require( "../../../controllers/core/posts.core" ),
  convertDataPostFacebook = async ( location, mixPost = {}, post, targetID ) => {
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
  },
  handlePostProcess = async ( listEventSchedule, i ) => {
    const campaignInfo = await Campaign.findOne( { "_id": listEventSchedule[ i ]._campaign } ),
      eventInfo = await Event.findOne( { "_id": listEventSchedule[ i ]._event } ),
      postInfo = await Post.findOne( { "_id": listEventSchedule[ i ].postID } ).lean(),
      facebookInfo = await Facebook.findOne( { "_id": listEventSchedule[ i ].facebookID } ).lean(),
      mixPost = {};

    if ( campaignInfo.status === false ) {
      console.log( "🚫🚫🚫🚫 Campaign contain this event schedule which is turn off... 🚫🚫🚫🚫" );
      await EventSchedule.updateOne( { "_id": listEventSchedule[ i ]._id }, { "status": 2 }, ( err ) => {
        if ( err ) {
          throw Error( "Xảy ra lỗi trong quá trình cập nhật lại event schedule...." );
        }
      } );
    } else {
      console.log(
        "\x1b[32m%s\x1b[0m",
        "SUCCESS:",
        "Passed! Starting schedule to Cache of system..."
      );

      // Change status event schedule - running...
      await EventSchedule.updateOne( { "_id": listEventSchedule[ i ]._id }, { "status": 5 }, ( err ) => {
        if ( err ) {
          throw Error( "Xảy ra lỗi trong quá trình cập nhật lại event schedule...." );
        }
      } );

      // Check if user use advance mix post to post feed
      if ( listEventSchedule[ i ].mixOpen ) {
        const listPost = ( await Post.find( { "_categories": listEventSchedule[ i ].mixOpen } ).lean() ).map( ( post ) => post._id ),
          postSelectedID = listPost[ Math.floor( Math.random() * listPost.length ) ];

        mixPost.mixOpen = await Post.findOne( { "_id": postSelectedID } ).lean();
      }

      if ( listEventSchedule[ i ].mixClose ) {
        const listPost = ( await Post.find( { "_categories": listEventSchedule[ i ].mixClose } ).lean() ).map( ( post ) => post._id ),
          postSelectedID = listPost[ Math.floor( Math.random() * listPost.length ) ];

        mixPost.mixClose = await Post.findOne( { "_id": postSelectedID } ).lean();
      }

      // Do something new version - Convert JSON To Facebook
      const feed = await convertDataPostFacebook( listEventSchedule[ i ].location, mixPost, postInfo, listEventSchedule[ i ].targetID ),

        // Do something new version - Post Feed To Facebook
        // eslint-disable-next-line new-cap
        resFacebookResponse = await createNewFeed( {
          "cookie": facebookInfo.cookie,
          "feed": feed
        } );

      // Do something new version - Check Result Facebook Which Return
      if ( resFacebookResponse ) {

        // Successfully
        if ( resFacebookResponse.error.code === 200 ) {
          campaignInfo.logs.total += 1;
          campaignInfo.logs.content.push( {
            "message": `[Sự kiện: ${eventInfo.title}] Đăng bài viết thành công với ID: ${resFacebookResponse.results.postID}`,
            "createdAt": new Date()
          } );

          console.log( "✅✅✅✅ Post To Facebook Successfully..." );
          console.log( `--------------- ${resFacebookResponse.results.postID} ---------------` );

          await EventSchedule.updateOne( { "_id": listEventSchedule[ i ]._id }, { "status": 3 }, ( err ) => {
            if ( err ) {
              throw Error( "Xảy ra lỗi trong quá trình cập nhật lại event schedule...." );
            }
          } );
        } else if ( resFacebookResponse.error.code === 8889 ) { // Handle error post to facebook that account facebook is expired...
          campaignInfo.logs.total += 1;
          campaignInfo.logs.content.push( {
            "message": `[Tài khoản] Facebook - ${facebookInfo.userInfo.name} đã bị đăng xuất! Hệ thống tự động tắt chiến dịch.`,
            "createdAt": new Date()
          } );

          await Campaign.updateOne( { "_id": listEventSchedule[ i ]._campaign }, { "status": false }, ( err ) => {
            if ( err ) {
              throw Error( "Xảy ra lỗi trong quá trình cập nhật lại chiến dịch khi tài khoản facebook bị đăng xuất." );
            }
          } );

          console.log( `❌❌❌❌ Have error: ${resFacebookResponse.error.text}` );

          await EventSchedule.updateOne( { "_id": listEventSchedule[ i ]._id }, { "status": 4 }, ( err ) => {
            if ( err ) {
              throw Error( "Xảy ra lỗi trong quá trình cập nhật lại event schedule...." );
            }
          } );
        } else { // Handle error post to facebook failed...
          campaignInfo.logs.total += 1;
          campaignInfo.logs.content.push( {
            "message": `[Sự kiện: ${eventInfo.title}] Đăng bài viết thất bại! Lỗi: ${resFacebookResponse.error.text}`,
            "createdAt": new Date()
          } );

          console.log( `❌❌❌❌ Have error: ${resFacebookResponse.error.text}` );

          await EventSchedule.updateOne( { "_id": listEventSchedule[ i ]._id }, { "status": 4 }, ( err ) => {
            if ( err ) {
              throw Error( "Xảy ra lỗi trong quá trình cập nhật lại event schedule...." );
            }
          } );
        }
        await campaignInfo.save();
      }
    }

    // eslint-disable-next-line one-var
    const index = i + 1;

    if ( listEventSchedule.length > index ) {
      await handlePostProcess( listEventSchedule, index );
    }
  };

( async () => {
  console.log( "\x1b[34m%s\x1b[0m", "Schedule Service For Campaign Starting..." );
  // eslint-disable-next-line no-new
  new CronJob(
    "1 * * * * *",
    async function() {

      // Get 20 minutes from past to present
      let dateTimeCurrent = new Date(),
        minDateTime = dateTimeCurrent.setTime(
          dateTimeCurrent.getTime() - 20 * 60000
        );

      console.log(
        "\x1b[32m%s\x1b[0m",
        "Step 01:",
        "Start - Get all event's user to handle with cron-schedule"
      );

      // Get all event schedule from mongodb after concat with event schedule of system
      const listEventSchedule = ( await EventSchedule.find( {
        "started_at": {
          "$gte": new Date( minDateTime ).toISOString(),
          "$lt": new Date().toISOString()
        }
      } ).lean() ).filter( ( item ) => item.status === 1 || item.status === null );

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

      // Handle sync code when open browser
      await handlePostProcess( listEventSchedule, 0 );

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
