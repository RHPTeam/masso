/* eslint-disable no-unused-expressions */
/**
 * Controller facebook for project
 * author: hocpv
 * date up: 09/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require( "../../models/Account.model" );
const Vocate = require( "../../models/chat/Vocate.model" );
const Facebook = require( "../../models/Facebook.model" );

const jsonResponse = require( "../../configs/response" );
const secure = require( "../../helpers/utils/secures/jwt" );
const { removeObjectDuplicates } = require( "../../helpers/utils/functions/array" );
const { agent } = require( "../../configs/crawl" );
const { getAllFriends } = require( "../../controllers/core/facebook.core" );
const { findSubString } = require( "../../helpers/utils/functions/string" );

module.exports = {
  /**
   * Get All data from Friend collection
   * @param req
   * @param res
   * Note: Api define admin and members, if u're admin then u can get all data, on the contrary u just can get data of you created before
   *
   */
  "index": async ( req, res ) => {
    let dataResponse = [];
    const authorization = req.headers.authorization,
      role = findSubString( authorization, "cfr=", ";" ),
      userId = secure( res, authorization ),
      accountResult = await Account.findOne( { "_id": userId } );

    if ( role === "Member" ) {
      Promise.all( accountResult._accountfb.map( async ( facebook ) => {
        let findFacebook = await Facebook.findOne( { "_id": facebook } ),
          friendsList = await getAllFriends( { "cookie": findFacebook.cookie, agent } );

        dataResponse = dataResponse.concat( friendsList.results, dataResponse );

        return dataResponse;
      } ) ).then( ( data ) => {
        dataResponse = [];
        // Concat element children of array
        const dataFriend = [].concat.apply( [], data );

        Promise.all( removeObjectDuplicates( dataFriend, "uid" ).map( async ( friend ) => {
          let vocate = await Vocate.find( { "_account": userId, "_friends": friend.uid.toString() } );

          vocate.length === 0 ? friend.vocate = "Chưa thiết lập" : friend.vocate = vocate[ 0 ].name;
          friend.photo = `http://graph.facebook.com/${friend.uid}/picture?type=large`;
          return friend;
        } ) ).then( async ( item ) => {
          return res.status( 200 ).json( jsonResponse( "Lấy dữ liệu thành công =))", item ) );
        } );

      } );
    }
    // if ( role === "Member" ) {
    // }
  }
};
