/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
/**
 * Controller item block for project
 * author: hocpv
 * date up: 07/03/2019
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
const { findSubString } = require( "../../helpers/utils/functions/string" );

module.exports = {
  /**
   *  get all groupt block & item block by Id
   *  @param req
   *  @param res
   *
   */
  "index": async ( req, res ) => {
    let dataResponse = null;
    const authorization = req.headers.authorization;
    const role = findSubString( authorization, "cfr=", ";" );

    const userId = secure( res, authorization );
    const accountResult = await Account.findOne( { "_id": userId } );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    if ( role === "Member" ) {
      !req.query._id ? dataResponse = await GroupBlock.find( { "_account": userId } ).populate( { "path": "blocks", "select": "name" } ) : dataResponse = await GroupBlock.find( { "_id": req.query._id, "_account": userId } ).populate( { "path": "blocks", "select": "name" } );
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
   *  create block by user
   *  @param req
   *  @param res
   *
   */
  "create": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      foundUser = await Account.findOne( { "_id": userId } ).select( "-password" );

    if ( !foundUser ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const foundGroupBlock = await GroupBlock.find( { "_account": userId } );

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
    const indexCurrent = Math.max( ...nameArr );

    const newGroupBlock = await new GroupBlock();

    newGroupBlock.name = indexCurrent.toString() === "NaN" || foundGroupBlock.length === 0 || nameArr.length === 0 ? `${Dictionaries.GROUPBLOCK} 0` : `${Dictionaries.GROUPBLOCK} ${indexCurrent + 1}`;
    newGroupBlock._account = userId;
    await newGroupBlock.save();
    res.status( 200 ).json( jsonResponse( "Tạo nhóm block thành công!", newGroupBlock ) );
  },
  /**
   *  Add block by user
   *  @param req
   *  @param res
   *
   */
  "addBlock": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      foundUser = await Account.findOne( { "_id": userId } ).select( "-password" );

    if ( !foundUser ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const foundGroupBlock = await GroupBlock.findOne( { "_id": req.query._groupId, "_account": userId } );

    if ( !foundGroupBlock ) {
      return res.status( 403 ).json( jsonResponse( "Nhóm block không tồn tại!", null ) );
    }

    // Push block to item block and pull in item block before
    if ( req.query._blockId ) {
      const foundBlock = await Block.findOne( { "_id": req.query._blockId, "_account": userId } );

      if ( !foundBlock ) {
        return res.status( 403 ).json( jsonResponse( "Bạn không có kịch bản này!", null ) );
      }
      if ( foundBlock._groupBlock === undefined ) {
        return res.status( 405 ).json( jsonResponse( "Có lỗi xảy ra, vui lòng kiểm tra lại kịch bản muốn thêm!", null ) );
      }
      const foundGroup = await GroupBlock.findOne( { "_id": foundBlock._groupBlock, "_account": userId } );

      // Check block is already this item block
      const isInArray = foundGroupBlock.blocks.some( ( id ) => {
        return id.equals( req.query._blockId );
      } );

      if ( isInArray ) {
        return res.status( 403 ).json( jsonResponse( "Bạn đã thêm kịch bản vào nhóm kịch bản này!", null ) );
      }
      if ( foundGroup.name === "Chuỗi Kịch Bản" ) {
        const foundSequence = await Sequence.find( { "_account": userId } );
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
        return res.status( 200 ).json( jsonResponse( "Thêm kịch bản từ trình tự kịch bản vào nhóm kịch bản thành công!", {
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
      return res.status( 200 ).json( jsonResponse( "Thêm kịch bản từ nhóm kịch bản khác vào nhóm kịch bản này thành công!", {
        "groupBlock": foundGroupBlock,
        "block": foundBlock
      } ) );
    }
    // add new block from sequence
    const foundBlock = await Block.find( { "_account": userId } );
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
    newBlock._account = userId;
    newBlock._groupBlock = req.query._groupId;
    await newBlock.save();
    foundGroupBlock.blocks.push( newBlock._id );
    await foundGroupBlock.save();
    res.status( 200 ).json( jsonResponse( "Thêm block trong nhóm block thành công!", foundGroupBlock ) );
  },
  /**
   *  update item block by user
   *  @param req
   *  @param res
   *
   */
  "update": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      foundUser = await Account.findOne( { "_id": userId } ).select( "-password" );
    const {
      body,
      query
    } = req;

    if ( !foundUser ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    if ( JSON.stringify( userId ) !== JSON.stringify( foundUser._id ) ) {
      return res.status( 403 ).json( jsonResponse( "Lỗi truy cập!", null ) );
    }
    const dataGroupGroupUpdated = await GroupBlock.findOne( { "_id": query._groupId, "_account": userId } );
    const findAllGroup = await GroupBlock.find( { "_account": userId } );
    // check name item block exists
    let checkName = false;

    findAllGroup.map( ( val ) => {
      if ( val._account.toString() !== userId ) {
        if ( convertUnicode( val.name ).toString().toLowerCase() === convertUnicode( req.body.name ).toString().toLowerCase() ) {
          checkName = true;
          return checkName;
        }
      }
    } );
    if ( checkName ) {
      return res.status( 403 ).json( jsonResponse( "Tên item đã tồn tại!", null ) );
    }
    dataGroupGroupUpdated.name = body.name;
    await dataGroupGroupUpdated.save();
    res.status( 201 ).json( jsonResponse( "Cập nhật nhóm block thành công!", dataGroupGroupUpdated ) );
  },
  /**
   *  delete item block by user
   *  @param req
   *  @param res
   *
   */
  "delete": async ( req, res, next ) => {
    const userId = secure( res, req.headers.authorization ),
      foundUser = await Account.findOne( { "_id": userId } ).select( "-password" );

    if ( !foundUser ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const foundGroupBlock = await GroupBlock.findById( req.query._groupId );

    if ( !foundGroupBlock ) {
      return res.status( 404 ).json( jsonResponse( "Nhóm block không tồn tại!", null ) );
    }
    // Delete block in item block
    const foundDefaultGroup = await GroupBlock.findOne( { "name": "Mặc Định", "_account": userId } );

    if ( req.query._blockId ) {
      if ( foundGroupBlock.blocks.includes( req.query._blockId ) ) {
        foundGroupBlock.blocks.pull( req.query._blockId );
        await foundGroupBlock.save();
        foundDefaultGroup.push( req.query._blockId );
        await foundDefaultGroup.save();
        return res.status( 200 ).json( jsonResponse( "Xóa block trong nhóm block thành công! ", foundGroupBlock ) );
      }
      next();
    }
    foundGroupBlock.blocks.map( async ( value ) => {
      foundDefaultGroup.blocks.push( value );
      await foundDefaultGroup.save();
    } );
    await GroupBlock.findByIdAndRemove( req.query._groupId );
    res.status( 200 ).json( jsonResponse( "Xóa nhóm block thành công!", null ) );
  }
};
