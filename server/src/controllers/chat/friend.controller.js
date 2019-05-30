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
    let dataResponse = [],
      page, dataRes;
    const role = findSubString( req.headers.authorization, "cfr=", ";" ),
      accountResult = await Account.findOne( { "_id": req.uid } );

    if ( role === "Member" ) {
      Promise.all(
        accountResult._accountfb.map( async ( facebook ) => {
          let findFacebook = await Facebook.findOne( { "_id": facebook } ),
            friendsList = await getAllFriends( {
              "cookie": findFacebook.cookie,
              agent
            } );

          dataResponse = dataResponse.concat( friendsList.results, dataResponse );

          return dataResponse;
        } )
      ).then( ( data ) => {
        dataResponse = [];
        // Concat element children of array
        // eslint-disable-next-line prefer-spread
        const dataFriend = [].concat.apply( [], data );

        Promise.all( removeObjectDuplicates( dataFriend, "uid" ).map( async ( friend ) => {
          let vocate = await Vocate.find( { "_account": req.uid, "_friends": friend.uid.toString() } );

          vocate.length === 0 ? friend.vocate = "Chưa thiết lập" : friend.vocate = vocate[ 0 ].name;
          friend.photo = `https://graph.facebook.com/${friend.uid}/picture?type=large`;
          return friend;
        } ) ).then( async ( item ) => {

          if ( req.query._size && req.query._page ) {
            dataRes = item.slice( ( Number( req.query._page ) - 1 ) * Number( req.query._size ), Number( req.query._size ) * Number( req.query._page ) );
          } else if ( req.query._size ) {
            dataRes = item.slice( 0, Number( req.query._size ) );
          }

          if ( req.query._size ) {
            if ( item.length % req.query._size === 0 ) {
              page = Math.floor( item.length / req.query._size );
            } else {
              page = Math.floor( item.length / req.query._size ) + 1;
            }

            return res
              .status( 200 )
              .json( jsonResponse( "success", { "results": dataRes, "page": page } ) );
          }

          res.status( 200 ).json( jsonResponse( "success", item ) );
        } );
      } );
    }

  }
};
