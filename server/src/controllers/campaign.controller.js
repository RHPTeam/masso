/**
 * Controller campaign (profile) for project
 * author: hoc-anms
 * date up: 23/04/2019
 * date to: ___
 * team: BE-RHP
 */
const Campaign = require( "../models/Campaign.model" );
const Event = require( "../models/Event.model" );
const Facebook = require( "../models/Facebook.model" );
const PostGroup = require( "../models/PostGroup.model" );
const GroupFacebook = require( "../models/GroupFacebook.model" );
const PageFacebook = require( "../models/PageFacebook.model" );

const { createPost } = require( "../controllers/core/posts.core" );
const { getRandom } = require( "../helpers/utils/arrayFunction.util" );
const { agent } = require( "../configs/crawl" );

const jsonResponse = require( "../configs/res" );
const secure = require( "../helpers/utils/secure.util" );
const GLOBAL = require( "../databases/variables.global" ), CronJob = require( "cron" ).CronJob;


module.exports = {
  /**
   * Get all (query)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "index": async ( req, res ) => {
    let page = null, dataResponse = null;
    const authorization = req.headers.authorization,
      userId = secure( res, authorization );

    if ( req.query._id ) {
      dataResponse = await Campaign.find( { "_id": req.query._id, "_account": userId } ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account" } ).lean();
    } else if ( req.query._size && req.query._page ) {
      dataResponse = ( await Campaign.find( { "_account": userId } ).lean() ).slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
    } else if ( req.query._size ) {
      dataResponse = ( await Campaign.find( { "_account": userId } ).lean() ).slice( 0, Number( req.query._size ) );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Campaign.find( { "_account": userId } ).lean();
    }

    if ( req.query._size ) {
      if ( ( await Campaign.find( { "_account": userId } ) ).length % req.query._size === 0 ) {
        page = Math.floor( ( await Campaign.find( { "_account": userId } ) ).length / req.query._size );
      } else {
        page = Math.floor( ( await Campaign.find( { "_account": userId } ) ).length / req.query._size ) + 1;
      }

      return res
        .status( 200 )
        .json( jsonResponse( "success", { "results": dataResponse, "page": page } ) );
    }

    // Check when user get one
    if ( req.query._id ) {
      dataResponse = dataResponse[ 0 ];
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );
  },
  /**
   * Create campaign
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "create": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề chiến dịch không được bỏ trống!" } } );
    }

    // Handle create campaign
    const userId = secure( res, req.headers.authorization ),
      objSave = {
        "title": req.body.title,
        "description": req.body.description ? req.body.description : "",
        "started_at": req.body.started_at ? req.body.started_at : Date.now(),
        "finished_at": req.body.finished_at ? req.body.finished_at : "",
        "_account": userId
      },
      newCampaign = await new Campaign( objSave );

    await newCampaign.save();

    res.status( 200 ).json( jsonResponse( "success", newCampaign ) );
  },
  /**
   * update campaign
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề chiến dịch không được bỏ trống!" } } );
    }

    const userId = secure( res, req.headers.authorization ),
      findCampaign = await Campaign.findById( req.query._campaignId ).populate( { "path": "_events", "select": "-__v -finished_at -created_at -_account" } );

    // Check catch when update campaign
    if ( !findCampaign ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không tồn tại!" } );
    } else if ( findCampaign._account.toString() !== userId ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho chiến dịch này!" } );
    }

    // Start Campaign
    if ( req.query._type && parseInt( req.query._type ) === 1 ) {
      // Handle cron
      // Handle error campaign not contain event
      if ( findCampaign._events.length === 0 ) {
        return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không thể bắt đầu! Không có sự kiện trong chiến dịch này!" } );
      } else if ( findCampaign._events.length > 0 ) {
        const errors = [];

        await Promise.all( findCampaign._events.map( ( event ) => {
          // Handle over date now for event
          const dateNow = Date.now();

          if ( dateNow > event.started_at ) {
            errors.push( event.title );
          }
        } ) );

        if ( errors.length > 0 ) {
          return res.status( 404 ).json( { "status": "error", "message": `Sự kiện "${errors[ 0 ]}" không hợp lệ vì thời gian bắt đầu không đúng!` } );
        }

        await Promise.all( findCampaign._events.map( ( event ) => {
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

        findCampaign.status = 1;
        await findCampaign.save();
        return res.status( 201 ).json( jsonResponse( "success", findCampaign ) );
      }
      return res.status( 404 ).json( { "status": "error", "message": "Có vấn đề xảy ra trong quá trình bắt đầu chiến dịch!" } );
    }

    // Stop Campaign or Cancel Campaign
    if ( req.query._type && parseInt( req.query._type ) === 0 ) {
      await Promise.all( findCampaign._events.map( ( event ) => {
        GLOBAL.get( event._id ).stop();
      } ) );

      findCampaign.status = 0;
      await findCampaign.save();

      return res.status( 200 ).json( jsonResponse( "success", "Dừng chiến dịch thành công!" ) );
    }

    res.status( 201 ).json( jsonResponse( "success", await Campaign.findByIdAndUpdate( req.query._campaignId, { "$set": req.body }, { "new": true } ) ) );
  },
  /**
   * Delete campaign
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      findCampaign = await Campaign.findById( req.query._campaignId );

    // Check catch when delete campaign
    if ( !findCampaign ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không tồn tại!" } );
    } else if ( findCampaign._account.toString() !== userId ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền cho chiến dịch mục này!" } );
    }

    // delete all event in campain
    findCampaign._events.map( async ( event ) => await Event.findByIdAndDelete( event ) );

    await Campaign.findByIdAndDelete( req.query._campaignId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
