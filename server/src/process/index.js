// Import Model
const Event = require( "../models/Event.model" );
const Facebook = require( "../models/Facebook.model" );
const GroupFacebook = require( "../models/GroupFacebook.model" );
const PageFacebook = require( "../models/PageFacebook.model" );
const Post = require( "../models/Post.model" );

const fs = require( "fs" ),
  { createPost } = require( "../controllers/core/posts.core" ),
  { getObjectDate } = require( "../helpers/utils/functions.util" ),
  { getRandom } = require( "../helpers/utils/arrayFunction.util" ),
  { agent } = require( "../configs/crawl" ),
  GLOBAL = require( "../databases/variables.global" ),
  CronJob = require( "cron" ).CronJob,
  /**
   * Restructure object feed before send to api post feed
   * @param data
   * @param target
   * @param type [0: , 1: Group & Page , 2: Group ,3: Page]
   * @returns {{scrape: (*|string|String|StringConstructor), activity: {id: (*|String|StringConstructor), text: (*|String|StringConstructor), type: (*|String|StringConstructor)}, location: {type: number, value: *}, place: (*|String|StringConstructor), photos: (*[]|Array|attachments|{typeAttachment, link}|*|$pull.attachments), content: *, tags: *}}
   */
  defineFeedFacebook = ( data, target, type ) => {
    const feed = {
      "location": {
        "type": 0,
        "value": target.id
      },
      "content": data.content,
      "photos": data.attachments,
      "scrape": data.scrape,
      "tags": data.tags,
      "place": data.place,
      "activity": {
        "type": data.typeActivity,
        "id": data.activity.id,
        "text": data.activity.text
      }
    };

    if ( type === 0 ) {
      feed.location.value = "";
    }

    if ( type === 1 ) {
      if ( target.typeTarget === 0 ) {
        feed.location.type = 1;
      } else if ( target.typeTarget === 1 ) {
        feed.location.type = 2;
      }
    }
    // Groups
    if ( type === 2 ) {
      feed.location.type = 1;
    }
    // Pages
    if ( type === 3 ) {
      feed.location.type = 2;
    }
    return feed;
  },
  /**
   * Handle multi target group and page
   * @param input
   * @param data
   * @param point
   * @returns {Promise<void>}
   */
  handleManyTarget = async ( input, data, point ) => {
    await Promise.all( data.map( async ( target ) => {
      GLOBAL.set( target._id, new CronJob( `* ${point} * * * *`, async function () {
        // Handle detail post event choose detail
        let facebook = {},
          postSelected = getRandom( input, 1 ),
          feed = defineFeedFacebook( postSelected[ 0 ], target, 1 );

        // Get Facebook account
        if ( target.typeTarget === 0 ) {
          const groupInfo = await GroupFacebook.find( { "groupId": target.id } );

          facebook = await Facebook.findOne( { "_id": groupInfo[ 0 ]._facebook } );
        } else if ( target.typeTarget === 1 ) {
          const pageInfo = await PageFacebook.find( { "pageId": target.id } );

          facebook = await Facebook.findOne( { "_id": pageInfo[ 0 ]._facebook } );
        }

        // Create new feed
        createPost( { "cookie": facebook.cookie, agent, feed } );
      }, function () {
        GLOBAL.get( target._id ).stop();
      }, true, "Asia/Ho_Chi_Minh" ) );
    } ) );
  },
  /**
   * Handle one of data with page or group
   * @param input
   * @param data
   * @param type [1: Group | 2: Page]
   * @returns {Promise<void>}
   */
  handleManyTargetCategory = async ( input, data, type ) => {
    let facebook = {},
      postSelected = getRandom( data, 1 ),
      feed = {};

    if ( type === 1 ) {
      const groupInfo = await GroupFacebook.find( { "groupId": input } );

      feed = defineFeedFacebook( postSelected[ 0 ], { "id": input }, 2 );
      facebook = await Facebook.findOne( { "_id": groupInfo[ 0 ]._facebook } );
    } else if ( type === 2 ) {
      const pageInfo = await PageFacebook.find( { "pageId": input } );

      feed = defineFeedFacebook( postSelected[ 0 ], { "id": input }, 3 );
      facebook = await Facebook.findOne( { "_id": pageInfo[ 0 ]._facebook } );
    }

    // Create new feed
    createPost( { "cookie": facebook.cookie, agent, feed } );
  };


( () => {
  GLOBAL.set( "default_cron", new CronJob( "*/5 * * * * *", async function () {
    // Get all event with status which is true and date not overtime date now
    const eventList = await Event.find( { "status": 1, "started_at": { "$gt": new Date() } } ).populate( "post_custom" ).populate( "target_category" );

    // Cron started_at
    await Promise.all( eventList.map( async ( event ) => {

      // Check exists object cron
      if ( GLOBAL.object_key_exists( event._id ) === true ) {
        return false;
      }
      // Auto
      if ( event.type_event === 0 ) {
        // Handle auto post event choose auto
        const postList = await Post.find( { "_account": event._account } ),
          postSelected = getRandom( postList, 1 ),
          feed = defineFeedFacebook( postSelected[ 0 ], { "id": "" }, 0 ),
          hour = JSON.parse( fs.readFileSync( "", "utf8" ) );

        await Promise.all( hour.goldTimeToCreateFeed.hour.map( async ( item ) => {
          const objectTime = getObjectDate( event.started_at ),
            facebookList = await Facebook.find( { "_account": event._account } );

          GLOBAL.set( event._id, new CronJob( new Date( objectTime.year, objectTime.month, objectTime.date, item, objectTime.minute ), async function () {
            await Promise.all( facebookList.map( ( facebook ) => {
              createPost( { "cookie": facebook.cookie, agent, feed } );
            } ) );
          }, function () {
            GLOBAL.get( event._id ).stop();
          }, true, "Asia/Ho_Chi_Minh" ) );
        } ) );
      }

      // Custom
      GLOBAL.set( event._id, new CronJob( new Date( event.started_at ), async function () {
        if ( event.target_custom.length > 0 ) {
          if ( event.post_custom.length > 0 ) {
            await handleManyTarget( event.post_custom, event.target_custom, event.break_point );
          } else if ( event.post_category ) {
            const postListByCategory = await Post.find( { "_categories": event.post_category } );

            await handleManyTarget( postListByCategory, event.target_custom, event.break_point );
          }
        } else if ( event.target_category ) {
          // Pages
          if ( event.target_category._pages.length > 0 ) {
            event.target_category._pages.map( async ( page ) => {
              GLOBAL.set( page.pageId, new CronJob( `* ${event.break_point} * * * *`, async function () {
                if ( event.post_custom.length > 0 ) {
                  await handleManyTargetCategory( page, event.post_custom, 2 );
                } else if ( event.post_category ) {
                  const postListByCategory = await Post.find( { "_categories": event.post_category } );

                  await handleManyTargetCategory( page, postListByCategory, 2 );
                }
              }, function () {
                GLOBAL.get( page.pageId ).stop();
              }. true, "Asia/Ho_Chi_Minh" ) );
            } );
          }

          // Groups
          if ( event.target_category._groups.length > 0 ) {
            event.target._groups.map( ( group ) => {
              GLOBAL.set( group.groupId, new CronJob( `* ${event.break_point} * * * *`, async function () {
                if ( event.post_custom.length > 0 ) {
                  await handleManyTargetCategory( group, event.post_custom, 1 );
                } else if ( event.post_category ) {
                  const postListByCategory = await Post.find( { "_categories": event.post_category } );

                  await handleManyTargetCategory( group, postListByCategory, 1 );
                }
              }, function () {
                GLOBAL.get( group.groupId ).stop();
              }. true, "Asia/Ho_Chi_Minh" ) );
            } );
          }
        }
      }, function () {
        GLOBAL.get( event._id ).stop();
        // Send notification to client
      }, true, "Asia/Ho_Chi_Minh" ) );

    } ) );

  }, null, true, "Asia/Ho_Chi_Minh" ) );


} )();
