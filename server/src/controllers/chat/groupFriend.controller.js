/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
/**
 * Controller item block for project
 * author: hocpv
 * date up: 13/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Account = require( "../../models/Account.model" );
const GroupFriend = require( "../../models/chat/GroupFriend.model" );

const jsonResponse = require( "../../configs/response" );
const Dictionaries = require( "../../configs/dictionaries" );
const ArrayFunction = require( "../../helpers/utils/functions/array" );
const { findSubString } = require( "../../helpers/utils/functions/string" );

const checkObjectExist = ( arr, property ) => {
  return arr.some( function( el ) {
    return el.uid === property;
  } );
};

module.exports = {
  /**
   *  get all item friends & item friends by Id
   *  @param req
   *  @param res
   *
   */
  "index": async ( req, res ) => {
    let dataResponse = null;

    const role = findSubString( req.headers.authorization, "cfr=", ";" );

    if ( role === "Member" ) {
      !req.query._id ? ( dataResponse = await GroupFriend.find( { "_account": req.uid } ).lean() ) : ( dataResponse = await GroupFriend.find( {
        "_id": req.query._id,
        "_account": req.uid
      } ).lean() );
      if ( !dataResponse ) {
        return res.status( 403 ).json( jsonResponse( "Thuộc tính không tồn tại" ) );
      }
      dataResponse = dataResponse.map( ( item ) => {
        if ( item._account.toString() === req.uid ) {
          return item;
        }
      } );
    }
    res
      .status( 200 )
      .json( jsonResponse( "Lấy dữ liệu thành công =))", dataResponse ) );
  },
  /**
   *  create item friends
   *  @param req
   *  @param res
   *
   */
  "create": async ( req, res ) => {
    const foundUser = await Account.findOne( { "_id": req.uid } ).select( "-password" );

    if ( !foundUser ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const foundGroupFriend = await GroupFriend.find( { "_account": req.uid } ),
      newGroupFriend = await new GroupFriend();

    if ( req.query._name === "true" ) {
      if ( req.body.name.trim() === "" || req.body.name === null || req.body.name === undefined ) {
        return res.status( 405 ).json( jsonResponse( "Vui lòng nhập tên nhóm bạn muốn sử dụng!", null ) );
      }
      newGroupFriend.name = req.body.name;
      newGroupFriend._account = req.uid;
      await newGroupFriend.save();
      return res.status( 200 ).json( jsonResponse( "Tạo nhóm bạn bè thành công!", newGroupFriend ) );
    }
    // handle num in name
    let nameArr = foundGroupFriend.map( ( groupFriend ) => {
      if ( groupFriend.name.toLowerCase().includes( Dictionaries.GROUPFRIEND.toLowerCase() ) === true ) {
        return groupFriend.name;
      }
    } ).filter( ( item ) => {
      if ( item === undefined ) {
        return;
      }
      return true;
    } ).map( ( item ) => parseInt( item.slice( Dictionaries.GROUPFRIEND.length ) ) );
    const indexCurrent = Math.max( ...nameArr );

    newGroupFriend.name = indexCurrent.toString() === "NaN" || foundGroupFriend.length === 0 || nameArr.length === 0 ? `${Dictionaries.GROUPFRIEND} 0` : `${Dictionaries.GROUPFRIEND} ${indexCurrent + 1}`;
    newGroupFriend._account = req.uid;
    await newGroupFriend.save();
    res.status( 200 ).json( jsonResponse( "Tạo nhóm bạn bè thành công!", newGroupFriend ) );
  },
  /**
   *  update item friends
   *  @param req
   *  @param res
   *
   */
  "update": async ( req, res ) => {
    const foundUser = await Account.findOne( { "_id": req.uid } ).select( "-password" );

    if ( !foundUser ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const foundGroupFriend = await GroupFriend.findById( req.query._groupId );

    if ( !foundGroupFriend ) {
      return res.status( 403 ).json( jsonResponse( "Nhóm bạn bè không tồn tại!", null ) );
    }
    // Check name item friends is exist
    const foundAllGroupFriend = await GroupFriend.find( { "_account": req.uid } );
    let checkName = false;

    foundAllGroupFriend.map( ( val ) => {
      if ( val._account.toString() !== req.uid ) {
        if ( val.name.toString() === req.body.name.toString() ) {
          checkName = true;
          return checkName;
        }
      }
    } );
    if ( checkName ) {
      return res.status( 405 ).json( jsonResponse( "Tên nhóm bạn bè đã tồn tại, vui lòng đặt một tên khác", null ) );
    }
    foundGroupFriend.name = req.body.name;
    await foundGroupFriend.save();
    const resGroupFriend = await GroupFriend.findOne( {
      "_id": req.query._groupId
    } ).lean();

    res.status( 201 ).json( jsonResponse( "Cập nhật nhóm bạn bè thành công!", resGroupFriend ) );
  },
  /**
   *  add friends to item friends
   *  @param req
   *  @param res
   *
   */
  "addFriend": async ( req, res ) => {
    const foundUser = await Account.findOne( { "_id": req.uid } ).select( "-password" );

    if ( !foundUser ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const foundGroupFriend = await GroupFriend.findById( req.query._groupId );

    if ( !foundGroupFriend ) {
      return res.status( 403 ).json( jsonResponse( "Nhóm bạn bè không tồn tại!", null ) );
    }

    const friends = req.body.friendId;
    let checkCon = false;

    friends.map( async ( val ) => {
      if ( checkObjectExist( foundGroupFriend._friends, val.uid ) ) {
        checkCon = true;
        return checkCon;
      }
    } );
    if ( checkCon ) {
      return res.status( 405 ).json( jsonResponse( "Bạn đã thêm một trong những bạn bè này!", null ) );
    }
    const checkFriend = ArrayFunction.removeObjectDuplicates( friends, "uid" );

    checkFriend.map( ( val ) => {
      foundGroupFriend._friends.push( val );
    } );
    await foundGroupFriend.save();
    const resGroupFriend = await GroupFriend.findOne( {
      "_id": req.query._groupId
    } );

    res.status( 200 ).json( jsonResponse( "Thêm bạn bè vào danh sách bạn bè thành công!", resGroupFriend ) );
  },
  /**
   *  delete item friends
   *  @param req
   *  @param res
   *
   */
  "delete": async ( req, res ) => {
    const foundUser = await Account.findOne( { "_id": req.uid } ).select( "-password" );

    if ( !foundUser ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const foundGroupFriend = await GroupFriend.findOne( {
      "_id": req.query._groupId
    } );

    if ( !foundGroupFriend ) {
      return res.status( 403 ).json( jsonResponse( "Nhóm bạn bè không tồn tại!", null ) );
    }
    if ( req.query._friend === "true" ) {
      const friends = req.body.friendId;
      let checkCon = false;

      friends.map( async ( val ) => {
        if ( checkObjectExist( foundGroupFriend._friends, val.uid ) === false ) {
          checkCon = true;
          return checkCon;
        }
      } );
      if ( checkCon ) {
        return res
          .status( 405 )
          .json(
            jsonResponse(
              "Bạn không có một trong những người bạn ở nhóm bạn bè này!",
              null
            )
          );
      }

      const checkFriend = ArrayFunction.removeObjectDuplicates( friends );

      checkFriend.map( ( val ) => {
        foundGroupFriend._friends.pull( val );
      } );
      await foundGroupFriend.save();
      const resGroupFriend = await GroupFriend.findById( req.query._groupId );

      return res.status( 200 ).json( jsonResponse( "Xóa bạn bè trong nhóm bạn bè thành công!", resGroupFriend ) );
    }
    await GroupFriend.findByIdAndRemove( req.query._groupId );
    res.status( 200 ).json( jsonResponse( "Xóa nhóm bạn bè thành công!", null ) );
  }
};
