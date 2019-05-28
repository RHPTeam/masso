/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
/**
 * Controller broadcast for project
 * author: hocpv
 * date up: 14/03/2019
 * date to: ___
 * team: BE-RHP
 */
const Account = require( "../../models/Account.model" );
const Block = require( "../../models/chat/Block.model" );
const GroupBlock = require( "../../models/chat/GroupBlock.model" );
const Sequence = require( "../../models/chat/Sequence.model" );

const jsonResponse = require( "../../configs/response" );
const secure = require( "../../helpers/utils/secures/jwt" );
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
    const authorization = req.headers.authorization,
      role = req.headers.cfr,
      email = secure( res, authorization ),
      accountResult = await Account.findOne( { "email": email } ),
      userId = accountResult._id.toString();

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    if ( role === "Member" ) {
      !req.query._id ? dataResponse = await Sequence.find( { "_account": userId } ).populate( { "path": "sequences._block", "select": "name" } ) : dataResponse = await Sequence.find( { "_id": req.query._id, "_account": userId } ).populate( { "path": "sequences._block", "select": "name" } );
      if ( !dataResponse ) {
        return res.status( 403 ).json( jsonResponse( "Thuộc tính không tồn tại" ) );
      }
      dataResponse = dataResponse.map( ( item ) => {
        if ( item._account.toString() === userId ) {
          return item;
        }
      } );
    }
    res.status( 200 ).json( jsonResponse( "Lấy dữ liệu thành công =))", dataResponse ) );
  },
  /**
   * create sequence
   * @param: req
   * @param: res
   */
  "create": async ( req, res ) => {
    const email = secure( res, req.headers.authorization );
    const foundUser = await Account.findOne( { "email": email } ).select( "-password" ),
      userId = foundUser._id.toString();

    if ( !foundUser ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const foundAllSequence = await Sequence.find( { "_account": userId } );

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
    newSeq._account = userId;
    await newSeq.save();
    res.status( 200 ).json( jsonResponse( "Tạo trình tự kịch bản thành công!", newSeq ) );
  },
  /**
   * add block to sequence
   * @param: req
   * @param: res
   */
  "addBlock": async ( req, res ) => {
    const email = secure( res, req.headers.authorization );
    const foundUser = await Account.findOne( { "email": email } ).select( "-password" ),
      userId = foundUser._id.toString();

    if ( !foundUser ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const foundSequence = await Sequence.findOne( { "_id": req.query._sqId, "_account": userId } );

    if ( !foundSequence ) {
      return res.status( 403 ).json( jsonResponse( "Trình tự kịch bản không tồn tại!", null ) );
    }
    const foundGroupSequence = await GroupBlock.findOne( { "name": "Chuỗi Kịch Bản", "_account": userId } );

    // take block group block to sequence
    if ( req.query._blockId ) {
      const foundBlock = await Block.findOne( { "_id": req.query._blockId, "_account": userId } );

      if ( !foundBlock ) {
        return res.status( 403 ).json( jsonResponse( "Kịch bản không tồn tại!", null ) );
      }
      if ( foundBlock._groupBlock === undefined ) {
        return res.status( 405 ).json( jsonResponse( "Có lỗi xảy ra, vui lòng kiểm tra lại kịch bản muốn thêm!", null ) );
      }
      const foundGroup = await GroupBlock.findOne( { "_id": foundBlock._groupBlock, "_account": userId } );
      let checkLoop = false;

      foundSequence.sequences.map( ( val ) => {
        if ( val._block.toString() === req.query._blockId ) {
          checkLoop = true;
          return checkLoop;
        }
      } );
      if ( checkLoop ) {
        return res.status( 405 ).json( jsonResponse( "Bạn đã thêm kịch bản này!", null ) );
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
      return res.status( 200 ).json( jsonResponse( "Thêm kịch bản từ nhóm kịch bản vào trình tự thành công!", foundSequence ) );
    }

    // add new block from sequence
    const foundBlock = await Block.find( { "_account": userId } );

    console.log( foundBlock );
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
    newBlock._account = userId;
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
    res.status( 200 ).json( jsonResponse( "Tạo mới kịch bản từ trình tự kịch bản thành công!", {
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
    const email = secure( res, req.headers.authorization );
    const foundUser = await Account.findOne( { "email": email } ).select( "-password" ),
      userId = foundUser._id.toString();

    if ( !foundUser ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const foundSequence = await Sequence.findOne( { "_id": req.query._sqId, "_account": userId } );

    if ( !foundSequence ) {
      return res.status( 403 ).json( jsonResponse( "Trình tự kịch bản không tồn tại!", null ) );
    }
    const foundAllSequence = await Sequence.find( { "_account": userId } );

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
        return res.status( 403 ).json( jsonResponse( "Kịch bản không tồn tại trong trình tự này!", null ) );
      }

      const result = foundSequence.sequences.filter( ( x ) => x.id === req.query._blockId )[ 0 ];

      result.time.numberTime = req.body.numberTime ? req.body.numberTime : result.time.numberTime;
      result.time.descTime = req.body.descTime ? req.body.descTime : result.time.descTime;
      await foundSequence.save();
      return res.status( 201 ).json( jsonResponse( "Cập nhật kịch bản trong trình tự kịch bản thành công!", foundSequence ) );
    }

    // check name sequence exists
    let checkName = false;

    foundAllSequence.map( ( val ) => {
      if ( convertUnicode( val.name ).toString().toLowerCase() === convertUnicode( req.body.name ).toString().toLowerCase() ) {
        checkName = true;
        return checkName;
      }
    } );
    if ( checkName ) {
      return res.status( 405 ).json( jsonResponse( "Tên trình tự kịch bản với tên này đã tồn tại!", null ) );
    }
    foundSequence.name = req.body.name;
    await foundSequence.save();
    res.status( 201 ).json( jsonResponse( "Cập nhật trình tự kịch bản thành công!", foundSequence ) );
  },
  /**
   * delete sequence
   * @param: req
   * @param: res
   */
  "delete": async ( req, res ) => {
    const email = secure( res, req.headers.authorization );
    const foundUser = await Account.findOne( { "email": email } ).select( "-password" ),
      userId = foundUser._id.toString();

    if ( !foundUser ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const foundSequence = await Sequence.findOne( { "_id": req.query._sqId, "_account": userId } );

    if ( !foundSequence ) {
      return res.status( 403 ).json( jsonResponse( "Trình tự kịch bản không tồn tại!", null ) );
    }
    if ( req.query._blockId ) {
      let checkExist = false;

      foundSequence.sequences.map( ( val ) => {
        if ( val._id.toString() === req.query._blockId ) {
          checkExist = true;
          return checkExist;
        }
      } );
      if ( !checkExist ) {
        return res.status( 403 ).json( jsonResponse( "Kịch bản không tồn tại trong trình tự này!", null ) );
      }
      foundSequence.sequences.pull( req.query._blockId );
      await foundSequence.save();
      return res.status( 200 ).json( jsonResponse( "Xóa trình kịch bản trong trình tự thành công!", foundSequence ) );
    }
    foundSequence.sequences.map( async ( block ) => {
      await Block.findByIdAndRemove( block._block );
    } );
    await Sequence.findByIdAndRemove( req.query._sqId );
    res.status( 200 ).json( jsonResponse( "Xóa trình tự kịch bản thành công!", null ) );
  }
};
