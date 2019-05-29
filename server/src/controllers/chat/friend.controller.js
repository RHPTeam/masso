/**
 * Controller facebook for project
 * author: hocpv
 * date up: 09/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require( "../../models/Account.model" );
const Vocate = require( "../../models/chat/Vocate.model" );

const jsonResponse = require( "../../configs/response" );
const secure = require( "../../helpers/utils/secures/jwt" );
const { agent } = require( "../../configs/crawl" );

module.exports = {
  /**
   * Get All data from Friend collection
   * @param req
   * @param res
   * Note: Api define admin and members, if u're admin then u can get all data, on the contrary u just can get data of you created before
   *
   */
  "index": async ( req, res ) => {
    let dataResponse = null;
    const authorization = req.headers.authorization,
      role = req.headers.cfr,

      userId = secure( res, authorization ),
      accountResult = await Account.findOne( { "_id": userId } );

    if ( !accountResult ) {
      return res.status( 404 ).json( { "status": "errors.js", "message": "Không tìm thấy người dùng!" } );
    }
    if ( role === "Member" ) {

    }

  }
};
