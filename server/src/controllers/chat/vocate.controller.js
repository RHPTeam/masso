/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
/**
 * Controller vocate for project
 * author: Tran Toan (Sky Albert)
 * date up: 10/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require( "../../models/Account.model" );
const Vocate = require( "../../models/chat/Vocate.model" );

const jsonResponse = require( "../../configs/response" );
const convertUnicode = require( "../../helpers/utils/functions/unicode" );
const ArrayFunction = require( "../../helpers/utils/functions/array" );
const { findSubString } = require( "../../helpers/utils/functions/string" );

module.exports = {
  /**
   *    What?
   *  @param req
   *  @param res
   *
   */
  "index": async ( req, res ) => {
    let dataResponse = null;
    const authorization = req.headers.authorization,
      role = findSubString( authorization, "cfr=", ";" ),
      accountResult = await Account.findOne( { "_id": req.uid } );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    if ( role === "Member" ) {
      !req.query ? dataResponse = await Vocate.find( { "_account": req.uid } ) : dataResponse = await Vocate.find( req.query );
      if ( !dataResponse ) {
        return res.status( 403 ).json( jsonResponse( "Danh xưng không tồn tại" ) );
      }
      dataResponse = dataResponse.map( ( item ) => {
        if ( item._account.toString() === req.uid ) {
          return item;
        }
      } ).filter( ( item ) => {
        if ( item === undefined ) {
          return;
        }
        return true;
      } );
    }
    res.status( 200 ).json( jsonResponse( "Lấy dữ liệu thành công =))", dataResponse ) );
  },
  /**
   * What?
   *  @param req
   *  @param res
   *
   */
  "create": async ( req, res ) => {
    const accountResult = await Account.findOne( { "_id": req.uid } );

    if ( !accountResult ) {
      res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    // Remove item same value in array _friends
    const friends = req.body._friends,
      friendsChecked = ArrayFunction.removeObjectDuplicates( friends, "uid" );


    const listVocates = await Vocate.find( { "_account": req.uid } );

    if ( listVocates.length === 0 ) {
      const objectSaver = {
          "name": req.body.name.toLowerCase(),
          "_friends": friendsChecked,
          "_account": req.uid,
          "updated_at": Date.now()
        },
        dataResponse = await new Vocate( objectSaver );

      await dataResponse.save();
      return res.status( 201 ).json( jsonResponse( "Tạo danh xưng thành công!", dataResponse ) );
    }

    // Check name is exists
    const nameConverted = convertUnicode( req.body.name ),
      resData = await Vocate.find( { "_account": req.uid } ),

      resultCheckCon = await Promise.all( listVocates.map( async ( vocate ) => {
        if ( nameConverted.toString().toLowerCase() === convertUnicode( vocate.name ).toString().toLowerCase() ) {
          const vocateFound = await Vocate.findOne( { "name": req.body.name.toLowerCase() } );

          await resData.filter( ( vocate ) => {
            if ( convertUnicode( vocate.name ).toString().toLowerCase() === convertUnicode( vocateFound.name ).toString().toLowerCase() ) {
              return;
            }
            return true;
          } ).map( ( item ) => {
            item._friends.map( ( friendItem, index, item ) => {
              friendsChecked.map( ( fi ) => {
                if ( fi.toString() === friendItem._id.toString() ) {
                  return item.pop( friendItem );
                }
              } );
            } );
          } );
          if ( resData.length === 0 ) {
            return;
          }
          resData.map( async ( vocate ) => {
            await vocate.save();
          } );
          await friendsChecked.map( ( friend ) => {
            const arrFriends = vocateFound._friends.map( function ( vocate ) {
              return vocate._id.toString();
            } );

            if ( arrFriends.includes( friend ) !== true ) {
              vocateFound._friends.push( friend );
            }
            return false;
          } );
          vocateFound._account = req.uid ;
          // eslint-disable-next-line camelcase
          vocateFound.updated_at = Date.now();
          return vocateFound;
        }
      } ) ).then( ( results ) => {
        const dataResult = results.filter( ( item ) => {
          if ( item === undefined ) {
            return;
          }
          return true;
        } ).map( ( item ) => {
          return item;
        } );

        if ( dataResult.length === 0 ) {
          return;
        }
        dataResult[ 0 ].save();
        return res.status( 200 ).json( jsonResponse( "Cập nhật danh xưng thành công!", dataResult[ 0 ] ) );
      } );

    if ( resultCheckCon === undefined ) {
      resData.map( ( item ) => {
        item._friends.map( ( friendItem, index, item ) => {
          friendsChecked.map( ( fi ) => {
            if ( fi.toString() === friendItem.toString() ) {
              return item.pop( friendItem );
            }
          } );
        } );
      } );
      resData.map( async ( vocate ) => {
        await vocate.save();
      } );

      const objectSaver = {
          "name": req.body.name.toLowerCase(),
          "_friends": friendsChecked,
          "_account": req.uid,
          "updated_at": Date.now()
        },

        dataResponse = await new Vocate( objectSaver );

      await dataResponse.save();
      res.status( 201 ).json( jsonResponse( "Thao tác danh xưng thành công!", dataResponse ) );
    }
  },

  /**
   *    What?
   *  @param req
   *  @param res
   *
   */
  "delete": async ( req, res ) => {
    const accountResult = await Account.findOne( { "_id": req.uid } );

    if ( !accountResult ) {
      res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !req.query._vocateId ) {
      return res.status( 404 ).json( jsonResponse( "Query thất bại! Vui lòng kiểm tra lại api", null ) );
    }
    const vocateResult = await Vocate.findOne( { "_id": req.query._vocateId } );

    if ( !vocateResult ) {
      res.status( 403 ).json( jsonResponse( "Danh xưng này không tồn tại!", null ) );
    }
    if ( vocateResult._account.toString() !== req.uid ) {
      return res.status( 405 ).json( jsonResponse( "Bạn không có quyền cho mục này!", null ) );
    }
    await vocateResult.remove();
    res.status( 200 ).json( jsonResponse( "Xóa dữ liệu thành công!", null ) );
  }
};
