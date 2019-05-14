/**
 * Analysis for project
 * author: sky albert
 * updater: _________
 * date up: 14/05/2019
 * date to: _________
 * team: BE-RHP
 */
const Campaign = require( "../models/Campaign.model" );
const GroupFacebook = require( "../models/GroupFacebook.model" );
const PageFacebook = require( "../models/PageFacebook.model" );
const Post = require( "../models/Post.model" );

const jsonResponse = require( "../configs/res" );
const secure = require( "../helpers/utils/secure.util" );

module.exports = {
  "statistic": async ( req, res ) => {
    const authorization = req.headers.authorization,
      userId = secure( res, authorization ),
      campaignList = await Campaign.find( { "_account": userId } ).lean(),
      groupList = await GroupFacebook.find( { "_account": userId } ).lean(),
      pageList = await PageFacebook.find( { "_account": userId } ).lean(),
      postList = await Post.find( { "_account": userId } ).lean();

    res.status( 200 ).json( jsonResponse( "success", {
      "campaign": campaignList.length,
      "group": groupList.length,
      "page": pageList.length,
      "post": postList.length
    } ) );
  },
  "statisticCampaign": async ( req, res ) => {
    const authorization = req.headers.authorization,
      userId = secure( res, authorization ),
      statisticList = [];

    for ( let i = 0; i <= 6; i++ ) {
      const dateActive = new Date( ( new Date() ).setDate( ( new Date() ).getDate() - i ) ),
        dateActiveBehind = new Date( ( new Date() ).setDate( ( new Date() ).getDate() - i ) );

      dateActive.setHours( 0, 0, 0, 0 );
      dateActiveBehind.setHours( 23, 59, 59, 999 );

      // eslint-disable-next-line one-var
      const campaignList = await Campaign.find( { "_account": userId, "started_at": {
        "$gte": dateActive,
        "$lte": dateActiveBehind
      } } ).lean();

      statisticList.push( {
        "date": dateActive,
        "amount": campaignList.length
      } );
    }

    res.status( 200 ).json( jsonResponse( "success", statisticList ) );
  }
};
