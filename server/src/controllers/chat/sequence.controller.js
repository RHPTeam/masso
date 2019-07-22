/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
/**
 * Controller broadcast for project
 * author: hocpv
 * date up: 14/03/2019
 * date to: ___
 * team: BE-RHP
 */
const Block = require( "../../models/chat/Block.model" );
const GroupBlock = require( "../../models/chat/GroupBlock.model" );
const Sequence = require( "../../models/chat/Sequence.model" );

const jsonResponse = require( "../../configs/response" );
const convertUnicode = require( "../../helpers/utils/functions/unicode" );
const Dictionaries = require( "../../configs/dictionaries" );

module.exports = {
  /**
   * Get all(id) broadcast
   * @param: req
   * @param: res
   */
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = ( await Sequence.find( { "_id": req.query._id, "_account": req.uid } ).populate( { "path": "sequences._block", "select": "name" } ).lean() )[ 0 ];

    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Sequence.find( { "_account": req.uid } ).populate( { "path": "sequences._block", "select": "name" } ).lean();
    }

    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
  },
  /**
   * create sequence
   * @param: req
   * @param: res
   */
  "create": async ( req, res ) => {
    const foundAllSequence = await Sequence.find( { "_account": req.uid } );

    // handle num for name
    let nameArr = foundAllSequence.map( ( sequence ) => {
      if ( sequence.name.toLowerCase().includes( Dictionaries.SEQUENCE.toLowerCase() ) === true ) {
        return sequence.name;
      }
    } ).filter( ( item ) => {
      if ( item === undefined ) {
        return;
      }
      return true;
    } ).map( ( item ) => parseInt( item.slice( Dictionaries.SEQUENCE.length ) ) );
    const indexCurrent = Math.max( ...nameArr ),
      newSeq = await new Sequence();

    newSeq.name = indexCurrent.toString() === "NaN" || foundAllSequence.length === 0 || nameArr.length === 0 ? `${Dictionaries.SEQUENCE} 0` : `${Dictionaries.SEQUENCE} ${indexCurrent + 1}`;
    newSeq._account = req.uid;
    await newSeq.save();
    res.status( 200 ).json( jsonResponse( "success", newSeq ) );
  },
  /**
   * add block to sequence
   * @param: req
   * @param: res
   */
  "addBlock": async ( req, res ) => {
    const foundSequence = await Sequence.findOne( { "_id": req.query._sqId, "_account": req.uid } );

    if ( !foundSequence ) {
      return res.status( 403 ).json( jsonResponse( "fail", "Trình tự kịch bản không tồn tại!" ) );
    }
    const foundGroupSequence = await GroupBlock.findOne( { "name": "Chuỗi Kịch Bản", "_account": req.uid } );

    // take block item block to sequence
    if ( req.query._blockId ) {
      const foundBlock = await Block.findOne( { "_id": req.query._blockId, "_account": req.uid } );

      if ( !foundBlock ) {
        return res.status( 403 ).json( jsonResponse( "fail", "Kịch bản không tồn tại!" ) );
      }
      if ( foundBlock._groupBlock === undefined ) {
        return res.status( 405 ).json( jsonResponse( "fail", "Có lỗi xảy ra, vui lòng kiểm tra lại kịch bản muốn thêm!" ) );
      }
      const foundGroup = await GroupBlock.findOne( { "_id": foundBlock._groupBlock, "_account": req.uid } );
      let checkLoop = false;

      foundSequence.sequences.map( ( val ) => {
        if ( val._block.toString() === req.query._blockId ) {
          checkLoop = true;
          return checkLoop;
        }
      } );
      if ( checkLoop ) {
        return res.status( 405 ).json( jsonResponse( "fail", "Bạn đã thêm kịch bản này!" ) );
      }
      foundSequence.sequences.push( {
        "_block": req.query._blockId
      } );
      await foundSequence.save();
      if ( foundGroupSequence ) {
        foundGroupSequence.blocks.push( req.query._blockId );
        await foundGroupSequence.save();
        foundBlock._groupBlock = foundGroupSequence._id;
        await foundBlock.save();
        foundGroup.blocks.pull( req.query._blockId );
        await foundGroup.save();
      }
      return res.status( 200 ).json( jsonResponse( "success", foundSequence ) );
    }

    // add new block from sequence
    const foundBlock = await Block.find( { "_account": req.uid } );

    // num block only exist in block
    let nameArr = foundBlock.map( ( block ) => {
      if ( block.name.toLowerCase().includes( Dictionaries.BLOCK.toLowerCase() ) === true ) {
        return block.name;
      }
    } ).filter( ( item ) => {
      if ( item === undefined ) {
        return;
      }
      return true;
    } ).map( ( item ) => parseInt( item.slice( Dictionaries.BLOCK.length ) ) );
    const indexCurrent = Math.max( ...nameArr ),

      newBlock = new Block();

    newBlock.name = indexCurrent.toString() === "NaN" || foundBlock.length === 0 || nameArr.length === 0 ? `${Dictionaries.BLOCK} 1` : `${Dictionaries.BLOCK} ${indexCurrent + 1}`,
    newBlock._account = req.uid;
    await newBlock.save();
    if ( foundGroupSequence ) {
      newBlock._groupBlock = foundGroupSequence._id;
      await newBlock.save();
      foundGroupSequence.blocks.push( newBlock._id );
      await foundGroupSequence.save();
    }
    foundSequence.sequences.push( {
      "_block": newBlock._id
    } );
    await foundSequence.save();
    res.status( 200 ).json( jsonResponse( "success", {
      "sequence": foundSequence,
      "block": newBlock
    } ) );
  },
  /**
   * update sequence
   * @param: req
   * @param: res
   */
  "update": async ( req, res ) => {
    const foundSequence = await Sequence.findOne( { "_id": req.query._sqId, "_account": req.uid } );

    if ( !foundSequence ) {
      return res.status( 403 ).json( jsonResponse( "fail", "Trình tự kịch bản không tồn tại!" ) );
    }
    const foundAllSequence = await Sequence.find( { "_account": req.uid } );

    // update in array block
    if ( req.query._blockId ) {
      let checkExist = false;

      foundSequence.sequences.map( ( val ) => {
        if ( val._id.toString() === req.query._blockId ) {
          checkExist = true;
          return checkExist;
        }
      } );
      if ( !checkExist ) {
        return res.status( 403 ).json( jsonResponse( "fail", "Kịch bản không tồn tại trong trình tự này!" ) );
      }

      const result = foundSequence.sequences.filter( ( x ) => x.id === req.query._blockId )[ 0 ];

      result.time.numberTime = req.body.numberTime ? req.body.numberTime : result.time.numberTime;
      result.time.descTime = req.body.descTime ? req.body.descTime : result.time.descTime;
      await foundSequence.save();
      return res.status( 201 ).json( jsonResponse( "success", foundSequence ) );
    }

    // check name sequence exists
    let checkName = false;

    foundAllSequence.map( ( val ) => {
      if ( val._account.toString() !== req.uid ) {
        if ( convertUnicode( val.name ).toString().toLowerCase() === convertUnicode( req.body.name ).toString().toLowerCase() ) {
          checkName = true;
          return checkName;
        }
      }
    } );
    if ( checkName ) {
      return res.status( 405 ).json( jsonResponse( "fail", "Tên trình tự kịch bản với tên này đã tồn tại!" ) );
    }
    foundSequence.name = req.body.name;
    await foundSequence.save();
    res.status( 201 ).json( jsonResponse( "success", foundSequence ) );
  },
  /**
   * delete sequence
   * @param: req
   * @param: res
   */
  "delete": async ( req, res ) => {
    const foundSequence = await Sequence.findOne( { "_id": req.query._sqId, "_account": req.uid } );

    if ( !foundSequence ) {
      return res.status( 403 ).json( jsonResponse( "fail", "Trình tự kịch bản không tồn tại!" ) );
    }
    if ( req.query._blockId ) {
      let checkExist = false;

      foundSequence.sequences.map( ( val ) => {
        if ( val._id.toString() !== req.query._blockId ) {
          checkExist = true;
          return checkExist;
        }
      } );
      if ( !checkExist ) {
        return res.status( 403 ).json( jsonResponse( "fail", "Kịch bản không tồn tại trong trình tự này!" ) );
      }
      foundSequence.sequences.pull( req.query._blockId );
      await foundSequence.save();
      return res.status( 200 ).json( jsonResponse( "success", foundSequence ) );
    }
    foundSequence.sequences.map( async ( block ) => {
      await Block.findByIdAndRemove( block._block );
    } );
    await Sequence.findByIdAndRemove( req.query._sqId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
