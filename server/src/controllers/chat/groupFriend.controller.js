/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
/**
 * Controller item block for project
 * author: hocpv
 * date up: 13/03/2019
 * date to: ___
 * team: BE-RHP
 */

const GroupFriend = require( "../../models/chat/GroupFriend.model" );
const Friend = require( "../../models/chat/Friend.model" );

const jsonResponse = require( "../../configs/response" );
const Dictionaries = require( "../../configs/dictionaries" );
const { removeDuplicates } = require( "../../helpers/utils/functions/array" );

module.exports = {
  /**
   *  get all item friends & item friends by Id
   *  @param req
   *  @param res
   *
   */
  "index": async ( req, res ) => {
    let dataResponse = null, friends = null;

    if ( req.query._id ) {
      dataResponse = await GroupFriend.findOne( { "_id": req.query._id, "_account": req.uid } ).lean();
      if ( dataResponse && dataResponse._friends.length > 0 ) {
        friends = await Promise.all( dataResponse._friends.map( async ( friend ) => {
          const findFriend = await Friend.findOne( { "_account": req.uid, "userID": friend }, "-__v -created_at -_id -updated_at" ).lean();

          return findFriend;
        } ) );
      }
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await GroupFriend.find( { "_account": req.uid } ).lean();
    }
    res.status( 200 ).json( jsonResponse( "success", { "data": dataResponse, "friends": friends } ) );
  },
  /**
   *  create item friends
   *  @param req
   *  @param res
   *
   */
  "create": async ( req, res ) => {
    const foundGroupFriend = await GroupFriend.find( { "_account": req.uid } ),
      newGroupFriend = await new GroupFriend();

    if ( req.query._name === "true" ) {
      if ( req.body.name.trim() === "" || req.body.name === null || req.body.name === undefined ) {
        return res.status( 405 ).json( jsonResponse( "fail", "Vui lòng nhập tên nhóm bạn muốn sử dụng!" ) );
      }
      newGroupFriend.name = req.body.name;
      newGroupFriend._account = req.uid;
      await newGroupFriend.save();
      return res.status( 200 ).json( jsonResponse( "success", newGroupFriend ) );
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
    res.status( 200 ).json( jsonResponse( "success", newGroupFriend ) );
  },
  /**
   *  update item friends
   *  @param req
   *  @param res
   *
   */
  "update": async ( req, res ) => {
    const foundGroupFriend = await GroupFriend.findOne( { "_id": req.query._groupId, "_account": req.uid } ),
      foundAllGroupFriend = await GroupFriend.find( { "_account": req.uid } );

    if ( !foundGroupFriend ) {
      return res.status( 403 ).json( jsonResponse( "fail", "Nhóm bạn bè không tồn tại!" ) );
    }
    // Check name item friends is exist
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
      return res.status( 405 ).json( jsonResponse( "fail", "Tên nhóm bạn bè đã tồn tại, vui lòng đặt một tên khác" ) );
    }
    foundGroupFriend.name = req.body.name;
    await foundGroupFriend.save();
    const resGroupFriend = await GroupFriend.findOne( { "_id": req.query._groupId, "_account": req.uid } ).lean(),
      resultFriend = await Promise.all( resFriend.map( async ( friend ) => {
        const findFriend = await Friend.findOne( { "_account": req.uid, "userID": friend }, "-__v -created_at -_id -updated_at" ).lean();

        return findFriend;
      } ) );

    res.status( 201 ).json( jsonResponse( "success", { "groupFriend": resGroupFriend, "friends": resultFriend } ) );
  },
  /**
   *  add friends to item friends
   *  @param req
   *  @param res
   *
   */
  "addFriend": async ( req, res ) => {
    const foundGroupFriend = await GroupFriend.findOne( { "_id": req.query._groupId, "_account": req.uid } );

    if ( !foundGroupFriend ) {
      return res.status( 403 ).json( jsonResponse( "fail", "Nhóm bạn bè không tồn tại!" ) );
    }

    const friends = req.body.friendId,
      resFriend = removeDuplicates( friends.concat( friends, foundGroupFriend._friends ) );

    foundGroupFriend._friends = resFriend;
    await foundGroupFriend.save();
    const resGroupFriend = await GroupFriend.findOne( { "_id": req.query._groupId } ).lean(),
      resultFriend = await Promise.all( resFriend.map( async ( friend ) => {
        const findFriend = await Friend.findOne( { "_account": req.uid, "userID": friend }, "-__v -created_at -_id -updated_at" ).lean();

        return findFriend;
      } ) );

    res.status( 200 ).json( jsonResponse( "success", { "groupFriend": resGroupFriend, "friends": resultFriend } ) );
  },
  /**
   *  delete item friends
   *  @param req
   *  @param res
   *
   */
  "delete": async ( req, res ) => {
    const foundGroupFriend = await GroupFriend.findOne( { "_id": req.query._groupId, "_account": req.uid } );

    if ( !foundGroupFriend ) {
      return res.status( 403 ).json( jsonResponse( "fail", "Nhóm bạn bè không tồn tại!" ) );
    }
    if ( req.query._friend === "true" ) {
      const friends = req.body.friendId;
      let checkCon = false;

      friends.map( async ( val ) => {
        if ( foundGroupFriend._friends.indexOf( val ) < 0 ) {
          checkCon = true;
          return checkCon;
        }
      } );
      if ( checkCon ) {
        return res.status( 405 ).json( jsonResponse( "fail", "Bạn không có một trong những người bạn ở nhóm bạn bè này!" ) );
      }

      const checkFriend = removeDuplicates( friends );

      checkFriend.map( ( val ) => {
        foundGroupFriend._friends.pull( val );
      } );
      await foundGroupFriend.save();
      const resGroupFriend = await GroupFriend.findOne( { "_id": req.query._groupId, "_account": req.uid } ).lean(),
        resultFriend = await Promise.all( resGroupFriend._friends.map( async ( friend ) => {
          const findFriend = await Friend.findOne( { "_account": req.uid, "userID": friend }, "-__v -created_at -_id -updated_at" ).lean();

          return findFriend;
        } ) );

      return res.status( 200 ).json( jsonResponse( "success", { "groupFriend": resGroupFriend, "friends": resultFriend } ) );
    }
    await GroupFriend.findByIdAndRemove( req.query._groupId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
