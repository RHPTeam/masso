/* eslint-disable one-var */
/**
 * Controller item block for project
 * author: hocpv
 * date up: 07/03/2019
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
   *  get all groupt block & item block by Id
   *  @param req
   *  @param res
   *
   */
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await GroupBlock.find( { "_id": req.query._id, "_account": req.uid } ).populate( { "path": "blocks", "select": "name" } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await GroupBlock.find( { "_account": req.uid } ).populate( { "path": "blocks", "select": "name" } ).lean();
    }

    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
  },
  /**
   *  create block by user
   *  @param req
   *  @param res
   *
   */
  "create": async ( req, res ) => {
    const foundGroupBlock = await GroupBlock.find( { "_account": req.uid } ).lean();

    // handle num for name
    let nameArr = foundGroupBlock.map( ( groupBlock ) => {
      if ( groupBlock.name.toLowerCase().includes( Dictionaries.GROUPBLOCK.toLowerCase() ) === true ) {
        return groupBlock.name;
      }
    } ).filter( ( item ) => {
      if ( item === undefined ) {
        return;
      }
      return true;
    } ).map( ( item ) => parseInt( item.slice( Dictionaries.GROUPBLOCK.length ) ) );
    const indexCurrent = Math.max( ...nameArr ),

      newGroupBlock = await new GroupBlock();

    newGroupBlock.name = indexCurrent.toString() === "NaN" || foundGroupBlock.length === 0 || nameArr.length === 0 ? `${Dictionaries.GROUPBLOCK} 0` : `${Dictionaries.GROUPBLOCK} ${indexCurrent + 1}`;
    newGroupBlock._account = req.uid;
    await newGroupBlock.save();
    res.status( 200 ).json( jsonResponse( "success", newGroupBlock ) );
  },
  /**
   *  Add block by user
   *  @param req
   *  @param res
   *
   */
  "addBlock": async ( req, res ) => {
    const foundGroupBlock = await GroupBlock.findOne( { "_id": req.query._groupId, "_account": req.uid } );

    if ( !foundGroupBlock ) {
      return res.status( 403 ).json( jsonResponse( "fail", "Nhóm block không tồn tại!" ) );
    }

    // Push block to item block and pull in item block before
    if ( req.query._blockId ) {
      const foundBlock = await Block.findOne( { "_id": req.query._blockId, "_account": req.uid } );

      if ( !foundBlock ) {
        return res.status( 403 ).json( jsonResponse( "fail", "Bạn không có kịch bản này!" ) );
      }
      if ( foundBlock._groupBlock === undefined ) {
        return res.status( 405 ).json( jsonResponse( "fail", "Có lỗi xảy ra, vui lòng kiểm tra lại kịch bản muốn thêm!" ) );
      }
      const foundGroup = await GroupBlock.findOne( { "_id": foundBlock._groupBlock, "_account": req.uid } ),

        // Check block is already this item block
        isInArray = foundGroupBlock.blocks.some( ( id ) => {
          return id.equals( req.query._blockId );
        } );

      if ( isInArray ) {
        return res.status( 403 ).json( jsonResponse( "fail", "Bạn đã thêm kịch bản vào nhóm kịch bản này!" ) );
      }
      if ( foundGroup.name === "Chuỗi Kịch Bản" ) {
        const foundSequence = await Sequence.find( { "_account": req.uid } );
        let result = null;

        await Promise.all( foundSequence.map( ( val ) => {
          const found = ( val.sequences ).some( ( el ) => el._block.toString() === req.query._blockId );

          if ( found ) {
            result = val;
            return result;
          }
        } ) );
        let idItem = null;

        result.sequences.map( ( val ) => {
          if ( val._block.toString() === req.query._blockId ) {
            idItem = val._id;
            return idItem;
          }
        } );
        result.sequences.pull( idItem );
        await result.save();
        foundBlock._groupBlock = req.query._groupId;
        await foundBlock.save();
        foundGroup.blocks.pull( req.query._blockId );
        await foundGroup.save();
        foundGroupBlock.blocks.push( req.query._blockId );
        await foundGroupBlock.save();
        return res.status( 200 ).json( jsonResponse( "success", {
          "groupBlock": foundGroupBlock,
          "sequence": result,
          "block": foundBlock
        } ) );
      }
      foundBlock._groupBlock = req.query._groupId;
      await foundBlock.save();
      foundGroup.blocks.pull( req.query._blockId );
      await foundGroup.save();
      foundGroupBlock.blocks.push( req.query._blockId );
      await foundGroupBlock.save();
      return res.status( 200 ).json( jsonResponse( "success", {
        "groupBlock": foundGroupBlock,
        "block": foundBlock
      } ) );
    }
    // add new block from sequence
    const foundBlock = await Block.find( { "_account": req.uid } );
    // num block only exist in block
    let num = 1;

    foundBlock.map( ( val ) => {
      if ( val._groupBlock ) {
        num++;
        return num;
      }
    } );
    const newBlock = new Block();

    newBlock.name = `Kịch Bản ${num}`;
    newBlock._account = req.uid;
    newBlock._groupBlock = req.query._groupId;
    await newBlock.save();
    foundGroupBlock.blocks.push( newBlock._id );
    await foundGroupBlock.save();
    res.status( 200 ).json( jsonResponse( "success", foundGroupBlock ) );
  },
  /**
   *  update item block by user
   *  @param req
   *  @param res
   *
   */
  "update": async ( req, res ) => {
    const dataGroupGroupUpdated = await GroupBlock.findOne( { "_id": req.query._groupId, "_account": req.uid } ),
      findAllGroup = await GroupBlock.find( { "_account": req.uid } ).lean();
    // check name item block exists
    let checkName = false;

    findAllGroup.map( ( val ) => {
      if ( val._account.toString() !== req.uid ) {
        if ( convertUnicode( val.name ).toString().toLowerCase() === convertUnicode( req.body.name ).toString().toLowerCase() ) {
          checkName = true;
          return checkName;
        }
      }
    } );
    if ( checkName ) {
      return res.status( 403 ).json( jsonResponse( "fail", "Tên item đã tồn tại!" ) );
    }
    dataGroupGroupUpdated.name = req.body.name;
    await dataGroupGroupUpdated.save();
    res.status( 201 ).json( jsonResponse( "success", dataGroupGroupUpdated ) );
  },
  /**
   *  delete item block by user
   *  @param req
   *  @param res
   *
   */
  "delete": async ( req, res, next ) => {
    const foundGroupBlock = await GroupBlock.findOne( { "_id": req.query._groupId, "_account": req.uid } );

    if ( !foundGroupBlock ) {
      return res.status( 404 ).json( jsonResponse( "fail", "Nhóm block không tồn tại!" ) );
    }
    // Delete block in item block
    const foundDefaultGroup = await GroupBlock.findOne( { "name": "Mặc Định", "_account": req.uid } );

    if ( req.query._blockId ) {
      if ( foundGroupBlock.blocks.includes( req.query._blockId ) ) {
        foundGroupBlock.blocks.pull( req.query._blockId );
        await foundGroupBlock.save();
        foundDefaultGroup.push( req.query._blockId );
        await foundDefaultGroup.save();
        return res.status( 200 ).json( jsonResponse( "success", foundGroupBlock ) );
      }
      next();
    }
    foundGroupBlock.blocks.map( async ( value ) => {
      foundDefaultGroup.blocks.push( value );
      await foundDefaultGroup.save();
    } );
    await GroupBlock.findByIdAndRemove( req.query._groupId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
