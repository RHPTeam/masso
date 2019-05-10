
const { createPost } = require( "../controllers/core/posts.core" ),
  { getRandom } = require( "../helpers/utils/arrayFunction.util" ),
  { agent } = require( "../configs/crawl" ),
  GLOBAL = require( "../databases/variables.global" ),
  CronJob = require( "cron" ).CronJob;

// Import Model
const Campaign = require( "../models/Campaign.model" );
const Event = require( "../models/Event.model" );

( () => {
  GLOBAL.set( "default_cron", new CronJob( "*/5 * * * * *", async function () {
    // Get all campaign with status which is true
    const campaignList = await Campaign.find( { "status": 1 } ).populate( "_events" ).lean();

    // Handle one of campaigns with events
    await Promise.all( campaignList.map( async ( campaign ) => {
      await Promise.all( campaign._events.map( async ( event ) => {
        const dateNow = new Date();

        // Check started_at overtime now
        if ( dateNow > event.started_at ) {
          return false;
        }

        GLOBAL.set( event._id, new CronJob( new Date( event.started_at ), async function () {
          // Get all target to random one of posts
          await Promise.all( event._target.map( async ( target ) => {
            if ( target.typeTarget === 0 ) {
              // Check if target is group
              const groupInfo = await GroupFacebook.find( { "groupId": target.id, "_account": userId } ),
                postSelected = getRandom( event._posts, 1 ),
                feed = {
                  "location": {
                    "type": 1,
                    "value": groupInfo[ 0 ].groupId
                  },
                  "content": postSelected[ 0 ].content,
                  "photos": postSelected[ 0 ].attachments,
                  "scrape": postSelected[ 0 ].scrape,
                  "tags": postSelected[ 0 ].tags,
                  "place": postSelected[ 0 ].place,
                  "activity": {
                    "type": postSelected[ 0 ].typeActivity,
                    "id": postSelected[ 0 ].activity.id,
                    "text": postSelected[ 0 ].activity.text
                  }
                }, accountFacebookActive = await Facebook.findOne( { "_id": groupInfo[ 0 ]._facebook } );

              // Create new feed
              await createPost( { "cookie": accountFacebookActive.cookie, agent, feed } );
            } else if ( target.typeTarget === 1 ) {
              // Check if target is page
              const pageInfo = await PageFacebook.find( { "pageId": target.id, "_account": userId } ),
                postSelected = getRandom( event._posts, 1 ),
                feed = {
                  "location": {
                    "type": 2,
                    "value": pageInfo[ 0 ].pageId
                  },
                  "content": postSelected[ 0 ].content,
                  "photos": postSelected[ 0 ].attachments,
                  "scrape": postSelected[ 0 ].scrape,
                  "tags": postSelected[ 0 ].tags,
                  "place": postSelected[ 0 ].place,
                  "activity": {
                    "type": postSelected[ 0 ].typeActivity,
                    "id": postSelected[ 0 ].activity.id,
                    "text": postSelected[ 0 ].activity.text
                  }
                }, accountFacebookActive = await Facebook.findOne( { "_id": pageInfo[ 0 ]._facebook } );

              // Create new feed
              await createPost( { "cookie": accountFacebookActive.cookie, agent, feed } );
            } else if ( target.typeTarget === 2 ) {
              // Check if target is timeline
              const accountFacebookActive = await Facebook.findOne( { "_id": target.id, "_account": userId } ),
                postSelected = getRandom( event._posts, 1 ),
                feed = {
                  "location": {
                    "type": 0,
                    "value": ""
                  },
                  "content": postSelected[ 0 ].content,
                  "photos": postSelected[ 0 ].attachments,
                  "scrape": postSelected[ 0 ].scrape,
                  "tags": postSelected[ 0 ].tags,
                  "place": postSelected[ 0 ].place,
                  "activity": {
                    "type": postSelected[ 0 ].typeActivity,
                    "id": postSelected[ 0 ].activity.id,
                    "text": postSelected[ 0 ].activity.text
                  }
                };

              await createPost( { "cookie": accountFacebookActive.cookie, agent, feed } );
            } else if ( target.typeTarget === 3 ) {
              // Check if target is post group
              const postGroup = await PostGroup.findOne( { "_id": target.id } );

              // Handle pages
              await Promise.all( postGroup.pages.map( async ( page ) => {
                const pageInfo = await PageFacebook.find( { "pageId": page, "_account": userId } ),
                  postSelected = getRandom( event._posts, 1 ),
                  feed = {
                    "location": {
                      "type": 2,
                      "value": pageInfo[ 0 ].pageId
                    },
                    "content": postSelected[ 0 ].content,
                    "photos": postSelected[ 0 ].attachments,
                    "scrape": postSelected[ 0 ].scrape,
                    "tags": postSelected[ 0 ].tags,
                    "place": postSelected[ 0 ].place,
                    "activity": {
                      "type": postSelected[ 0 ].typeActivity,
                      "id": postSelected[ 0 ].activity.id,
                      "text": postSelected[ 0 ].activity.text
                    }
                  }, accountFacebookActive = await Facebook.findOne( { "_id": pageInfo[ 0 ]._facebook } );

                // Create new feed
                await createPost( { "cookie": accountFacebookActive.cookie, agent, feed } );
              } ) );

              // Handle groups
              await Promise.all( postGroup.groups.map( async ( group ) => {
                const groupInfo = await GroupFacebook.find( { "groupId": group, "_account": userId } ),
                  postSelected = getRandom( event._posts, 1 ),
                  feed = {
                    "location": {
                      "type": 1,
                      "value": groupInfo[ 0 ].groupId
                    },
                    "content": postSelected[ 0 ].content,
                    "photos": postSelected[ 0 ].attachments,
                    "scrape": postSelected[ 0 ].scrape,
                    "tags": postSelected[ 0 ].tags,
                    "place": postSelected[ 0 ].place,
                    "activity": {
                      "type": postSelected[ 0 ].typeActivity,
                      "id": postSelected[ 0 ].activity.id,
                      "text": postSelected[ 0 ].activity.text
                    }
                  }, accountFacebookActive = await Facebook.findOne( { "_id": groupInfo[ 0 ]._facebook } );

                // Create new feed
                await createPost( { "cookie": accountFacebookActive.cookie, agent, feed } );
              } ) );
            }
          } ) );
        }, true, "Asia/Ho_Chi_Minh" ) );
      } ) );
    } ) );
  }, null, true, "Asia/Ho_Chi_Minh" ) );
} )();
