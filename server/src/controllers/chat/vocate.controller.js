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

const Vocate = require( "../../models/chat/Vocate.model" );

const jsonResponse = require( "../../configs/response" );
const convertUnicode = require( "../../helpers/utils/functions/unicode" );
const ArrayFunction = require( "../../helpers/utils/functions/array" );

module.exports = {
  /**
   *    What?
   *  @param req
   *  @param res
   *
   */
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await Vocate.findOne( { "_id": req.query._id, "_account": req.uid } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Vocate.find( { "_account": req.uid } ).lean();
    }
    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
  },
  /**
   * What?
   *  @param req
   *  @param res
   *
   */
  "create": async ( req, res ) => {
    // Remove item same value in array _friends
    const friends = req.body._friends,
      friendsChecked = ArrayFunction.removeDuplicates( friends );

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
                if ( fi.toString() === friendItem.toString() ) {
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
        return res.status( 200 ).json( jsonResponse( "success", dataResult[ 0 ] ) );
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
      res.status( 201 ).json( jsonResponse( "success", dataResponse ) );
    }
  },

  /**
   *    What?
   *  @param req
   *  @param res
   *
   */
  "delete": async ( req, res ) => {
    if ( !req.query._vocateId ) {
      return res.status( 404 ).json( jsonResponse( "fail", "Query thất bại! Vui lòng kiểm tra lại api" ) );
    }
    const vocateResult = await Vocate.findOne( { "_id": req.query._vocateId } );

    if ( !vocateResult ) {
      res.status( 403 ).json( jsonResponse( "fail", "Danh xưng này không tồn tại!" ) );
    }
    if ( vocateResult._account.toString() !== req.uid ) {
      return res.status( 405 ).json( jsonResponse( "fail", "Bạn không có quyền cho mục này!" ) );
    }
    await vocateResult.remove();
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
