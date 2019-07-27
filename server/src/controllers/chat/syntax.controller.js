/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
/**
 * Controller vocate for project
 * author: Tran Toan (Sky Albert)
 * date up: 18/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Syntax = require( "../../models/chat/Syntax.model" );

const jsonResponse = require( "../../configs/response" );
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

    if ( req.query._id ) {
      dataResponse = await Syntax.findOne( { "_id": req.query._id, "_account": req.uid } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Syntax.find( { "_account": req.uid } ).lean();
    }
    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
  },

  /**
   * 	When user create, system auto generate name of syntax. Currently, when user setup, system will apply for all their customer
   *  @param req
   *  @param res
   *
   */
  "create": async ( req, res ) => {
    const syntaxCurrentDatabase = await Syntax.find( { "_account": req.uid } );
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
        "_account": req.uid,
        "created_at": Date.now()
      },
      syntaxResult = await new Syntax( syntaxObjectSaver );

    await syntaxResult.save();
    res.status( 201 ).json( jsonResponse( "success", syntaxResult ) );
  },

  /**
   *  Update a syntax using default query _id. Ex: localhost/syntax?_id=1
   *  @param req
   *  @param res
   *
   */
  "update": async ( req, res ) => {
    if ( !req.query._id ) {
      return res.status( 403 ).json( jsonResponse( "fail", `Cú pháp query sai, vui lòng kiểm tra lại! ${req.query}` ) );
    }

    const syntaxObjectSaver = {
      "name": req.body.name ? req.body.name : [],
      "title": req.body.title,
      "_account": req.uid,
      "updated_at": Date.now()
    };

    req.body.content ? syntaxObjectSaver.content = req.body.content : [];
    req.body._facebook ? syntaxObjectSaver._facebook = req.body._facebook : [];

    const syntaxResult = await Syntax.findByIdAndUpdate( req.query._id, { "$set": syntaxObjectSaver }, { "new": true } );

    await syntaxResult.save();
    res.status( 200 ).json( jsonResponse( "success", syntaxResult ) );
  },

  /**
   *  Delete a syntax using query _syntaxId. Ex: localhost/syntax?_syntaxId=1
   *  @param req
   *  @param res
   *
   */
  "delete": async ( req, res ) => {
    if ( !req.query._id ) {
      return res.status( 403 ).json( jsonResponse( "fail", `Cú pháp query sai, vui lòng kiểm tra lại! query:${req.query}` ) );
    }
    const syntaxResult = await Syntax.findOne( { "_id": req.query._id } );

    if ( !syntaxResult ) {
      res.status( 403 ).json( jsonResponse( "fail", "Cú pháp này không tồn tại!" ) );
    }
    if ( syntaxResult._account.toString() !== req.uid ) {
      return res.status( 405 ).json( jsonResponse( "fail", "Bạn không có quyền cho mục này!" ) );
    }
    await syntaxResult.remove();
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
