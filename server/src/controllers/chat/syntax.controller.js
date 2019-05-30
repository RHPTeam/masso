/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
/**
 * Controller vocate for project
 * author: Tran Toan (Sky Albert)
 * date up: 18/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require( "../../models/Account.model" );
const Syntax = require( "../../models/chat/Syntax.model" );

const jsonResponse = require( "../../configs/response" );
const secure = require( "../../helpers/utils/secures/jwt" );
const Dictionaries = require( "../../configs/dictionaries" );

module.exports = {

  /**
   *  Get All Syntax (Note: User only can get all syntax of them)
   *  @param req
   *  @param res
   *
   */
  "index": async ( req, res ) => {
    let dataResponse = null;
    const authorization = req.headers.authorization,
      role = req.headers.cfr,
      userId = secure( res, authorization ),
      accountResult = await Account.findOne( { "_id": userId } );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    if ( role === "Member" ) {
      !req.query ? dataResponse = await Syntax.find( { "_account": userId } ) : dataResponse = await Syntax.find( req.query );
      if ( !dataResponse ) {
        return res.status( 403 ).json( jsonResponse( "Cú pháp không tồn tại" ) );
      }
      dataResponse = dataResponse.map( ( item ) => {
        if ( item._account.toString() === userId ) {
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
   * 	When user create, system auto generate name of syntax. Currently, when user setup, system will apply for all their customer
   *  @param req
   *  @param res
   *
   */
  "create": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findOne( { "_id": userId } );

    if ( !accountResult ) {
      res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    const syntaxCurrentDatabase = await Syntax.find( { "_account": userId } );
    let nameArr = syntaxCurrentDatabase.map( ( syntax ) => {
      if ( syntax.title.toLowerCase().includes( Dictionaries.SYNTAX.toLowerCase() ) === true ) {
        return syntax.title;
      }
    } ).filter( ( item ) => {
      if ( item === undefined ) {
        return;
      }
      return true;
    } ).map( ( item ) => parseInt( item.slice( Dictionaries.SYNTAX.length ) ) );
    const indexCurrent = Math.max( ...nameArr ),
      syntaxObjectSaver = {
        "title": indexCurrent.toString() === "NaN" || syntaxCurrentDatabase.length === 0 || nameArr.length === 0 ? `${Dictionaries.SYNTAX} 0` : `${Dictionaries.SYNTAX} ${indexCurrent + 1}`,
        "_account": userId,
        "created_at": Date.now()
      },
      syntaxResult = await new Syntax( syntaxObjectSaver );

    await syntaxResult.save();
    res.status( 201 ).json( jsonResponse( "Tạo cú pháp thành công!", syntaxResult ) );
  },

  /**
   *  Update a syntax using default query _id. Ex: localhost/syntax?_id=1
   *  @param req
   *  @param res
   *
   */
  "update": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findOne( { "_id": userId } );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !req.query._id ) {
      return res.status( 403 ).json( jsonResponse( "Cú pháp query sai, vui lòng kiểm tra lại!", req.query ) );
    }

    const syntaxObjectSaver = {
      "name": req.body.name ? req.body.name : [],
      "title": req.body.title,
      "_account": userId,
      "updated_at": Date.now()
    };

    req.body.content ? syntaxObjectSaver.content = req.body.content : [];
    req.body._facebook ? syntaxObjectSaver._facebook = req.body._facebook : [];

    const syntaxResult = await Syntax.findByIdAndUpdate( req.query._id, { "$set": syntaxObjectSaver }, { "new": true } );

    await syntaxResult.save();
    res.status( 200 ).json( jsonResponse( "Cập nhật cú pháp thành công!", syntaxResult ) );
  },

  /**
   *  Delete a syntax using query _syntaxId. Ex: localhost/syntax?_syntaxId=1
   *  @param req
   *  @param res
   *
   */
  "delete": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findOne( { "_id": userId } );

    if ( !accountResult ) {
      res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( !req.query._id ) {
      return res.status( 404 ).json( jsonResponse( "Query thất bại! Vui lòng kiểm tra lại api", null ) );
    }
    const syntaxResult = await Syntax.findOne( { "_id": req.query._id } );

    if ( !syntaxResult ) {
      res.status( 403 ).json( jsonResponse( "Cú pháp này không tồn tại!", null ) );
    }
    if ( syntaxResult._account.toString() !== userId ) {
      return res.status( 405 ).json( jsonResponse( "Bạn không có quyền cho mục này!", null ) );
    }
    await syntaxResult.remove();
    res.status( 200 ).json( jsonResponse( "Xóa dữ liệu thành công!", null ) );
  }
};
