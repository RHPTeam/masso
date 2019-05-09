// Import Model
const Event = require( "../models/Event.model" );
const Facebook = require( "../models/Facebook.model" );
const GroupFacebook = require( "../models/GroupFacebook.model" );
const PageFacebook = require( "../models/PageFacebook.model" );
const Post = require( "../models/Post.model" );

const { createPost } = require( "../controllers/core/posts.core" ),
  { getRandom } = require( "../helpers/utils/arrayFunction.util" ),
  { agent } = require( "../configs/crawl" ),
  GLOBAL = require( "../databases/variables.global" ),
  CronJob = require( "cron" ).CronJob,
  /**
   *
   * @param data
   * @param target
   * @param type [0: , 1: , 2: ,3: ]
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

    if ( type === 1 ) {
      if ( target.typeTarget === 0 ) {
        feed.location.type = 1;
      } else if ( target.typeTarget === 1 ) {
        feed.location.type = 2;
      }
    }
    return feed;
  },
  handleManyTarget = async ( input, data, point ) => {
    await Promise.all( data.map( async ( target ) => {
      GLOBAL.set( target._id, new CronJob( `* ${point} * * * *`, async function () {
        // Handle custom post event choose custom
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
  };
  /**
   *
   * @param input
   * @param data
   * @param type [0: Group | 1: Page]
   * @returns {Promise<void>}
   */
// handleManyTargetCategory = async ( input, data, type ) => {
// let facebook = {},
//   postSelected = getRandom( input, 1 ), facebook = [];
//
// const groupInfo = await GroupFacebook.find( { "groupId": target.id } );
//
// facebook = await Facebook.findOne( { "_id": groupInfo[ 0 ]._facebook } );
// if ( type === 0 ) {
//
// }
//   feed = defineFeedFacebook( postSelected[ 0 ], data, 3 );
// };


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
      GLOBAL.set( event._id, new CronJob( new Date( event.started_at ), async function () {
        if ( event.type_event === 0 ) {
          // Handle auto post event choose auto
        } else if ( event.target_custom.length > 0 ) {
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

                } else if ( event.post_category ) {
                  const postListByCategory = await Post.find( { "_categories": event.post_category } );
                }
              }, function () {
                GLOBAL.get( page.pageId ).stop();
              }. true, "Asia/Ho_Chi_minh" ) );
            } );
          }

          // Groups
          event.target._groups.map( ( group ) => {

          } );
        }
      }, function () {
        GLOBAL.get( event._id ).stop();
        // Send notification to client
      }, true, "Asia/Ho_Chi_Minh" ) );

    } ) );

  }, null, true, "Asia/Ho_Chi_Minh" ) );

} )();
