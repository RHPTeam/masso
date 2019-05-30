/* eslint-disable no-unused-expressions */
/**
 * Controller attribute for project
 * author: Tran Toan (Sky Albert)
 * date up: 08/03/2019
 * date to: ___
 * team: BE-RHP
 */
/* eslint-disable one-var */
const Account = require( "../../models/Account.model" );
const Friend = require( "../../models/chat/Friend.model" );
const Attribute = require( "../../models/chat/Attribute.model" );

const jsonResponse = require( "../../configs/response" );
const secure = require( "../../helpers/utils/secures/jwt" );
const ArrayFunction = require( "../../helpers/utils/functions/array" );
const { findSubString } = require( "../../helpers/utils/functions/string" );

module.exports = {
  /**
   *	Get All data from Attribute collection
   *  @param req
   *  @param res
   *	Note: Api define admin and members, if u're admin then u can get all data, on the contrary u just can get data of you created before
   */
  "index": async ( req, res ) => {
    let dataResponse = null;
    const authorization = req.headers.authorization,
      role = findSubString( authorization, "cfr=", ";" ),
      userId = secure( res, authorization ),
      accountResult = await Account.findOne( { "_id": userId } );

    if ( !accountResult ) {
      return res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    if ( role === "Member" ) {
      !req.query ? dataResponse = await Attribute.find( { "_account": userId } ).populate( { "path": "_friends", "select": "-_account -_facebook" } ) : dataResponse = await Attribute.find( req.query ).populate( { "path": "_friends", "select": "-_account -_facebook" } );
      if ( !dataResponse ) {
        return res.status( 403 ).json( jsonResponse( "Thuộc tính không tồn tại" ) );
      }
      dataResponse = dataResponse.map( ( item ) => {
        if ( item._account.toString() === userId ) {
          return item;
        }
      } ).filter( ( item ) => item !== undefined );
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
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findOne( { "_id": userId } );

    if ( !accountResult ) {
      res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const objectSaver = {
        "name": req.body.name,
        "value": req.body.value
      },
      attribute = await new Attribute( objectSaver );

    attribute._account = userId;
    await attribute.save();
    res.status( 201 ).json( jsonResponse( "Tạo thuộc tính thành công =))", attribute ) );
  },
  /**
   *	What?
   *  @param req
   *  @param res
   *
   */
  "update": async ( req, res ) => {
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findOne( { "_id": userId } );

    if ( !accountResult ) {
      res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }
    const attrResult = await Attribute.findOne( { "_id": req.query._attrId } );

    if ( attrResult._account.toString() !== userId ) {
      return res.status( 405 ).json( jsonResponse( "Bạn không có quyền cho mục này!", null ) );
    }
    if ( !attrResult ) {
      res.status( 403 ).json( jsonResponse( "Thuộc tính này không tồn tại!", null ) );
    }
    const objectSaver = {
      "name": req.body.name,
      "value": req.body.value,
      "updated_at": Date.now()
    };

    objectSaver._friends = req.body._friends ? req.body._friends : [];
    const newAttribute = await Attribute.findByIdAndUpdate( req.query._attrId, { "$set": objectSaver }, { "new": true } );

    res.status( 200 ).json( jsonResponse( "Cập nhật thuộc tính thành công!", newAttribute ) );
  },
  /**
   *	What?
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
    const attrResult = await Attribute.findOne( { "_id": req.query._attrId } );

    if ( !attrResult ) {
      res.status( 403 ).json( jsonResponse( "Thuộc tính này không tồn tại!", null ) );
    }
    if ( attrResult._account.toString() !== userId ) {
      return res.status( 405 ).json( jsonResponse( "Bạn không có quyền cho mục này!", null ) );
    }
    await attrResult.remove();
    res.status( 200 ).json( jsonResponse( "Xóa dữ liệu thành công!", null ) );
  },
  /**
   *	Filter
   *  @param req
   *  @param res
   *
   */
  "filter": async ( req, res ) => {
    let data = [];
    const userId = secure( res, req.headers.authorization ),
      accountResult = await Account.findOne( { "_id": userId } );

    if ( !accountResult ) {
      res.status( 403 ).json( jsonResponse( "Người dùng không tồn tại!", null ) );
    }

    // Filter attribute by name
    if ( req.body.name && !req.body.value && !req.query._type ) {
      const foundAttribute = await Attribute.find( { "_account": accountResult._id, "name": req.body.name } );

      if ( foundAttribute.length < 0 ) {
        return res.status( 403 ).json( jsonResponse( "Không tìm thấy attribue", null ) );
      }
      Promise.all( foundAttribute.map( async ( attribute ) => {
        attribute._friends.map( ( friend ) => {
          data.push( friend.toString() );
        } );
      } ) );
      data = ArrayFunction.removeDuplicates( data );
      Promise.all( data.map( async ( friend ) => {
        const foundFriend = await Friend.findById( friend );

        return foundFriend;
      } ) ).then( async ( item ) => {
        // Get vocate of friends before return to client
        const friendsFixed = item.map( async ( friend ) => {
            let vocate = await Vocate.find( { "_account": userId, "_friends": friend._id } );

            vocate.length === 0 ? friend.vocate = "Chưa thiết lập" : friend.vocate = vocate[ 0 ].name;
            return friend;
          } ),
          friends = await Promise.all( friendsFixed );

        return res.status( 200 ).json( jsonResponse( "Lấy dữ liệu thành công =))", friends ) );
      } );
    }
    // Filter attribute by name, value
    if ( req.body.name && req.body.value && req.query._type === "is" ) {
      const foundAttribute = await Attribute.find( { "_account": accountResult._id, "name": req.body.name, "value": req.body.value } );

      if ( foundAttribute.length < 0 ) {
        return res.status( 403 ).json( jsonResponse( "Không tìm thấy attribue", null ) );
      }
      Promise.all( foundAttribute.map( async ( attribute ) => {
        attribute._friends.map( ( friend ) => {
          data.push( friend.toString() );
        } );
      } ) );
      data = ArrayFunction.removeDuplicates( data );
      Promise.all( data.map( async ( friend ) => {
        const foundFriend = await Friend.findById( friend );

        return foundFriend;
      } ) ).then( async ( item ) => {
        // Get vocate of friends before return to client
        const friendsFixed = item.map( async ( friend ) => {
            let vocate = await Vocate.find( { "_account": userId, "_friends": friend._id } );

            vocate.length === 0 ? friend.vocate = "Chưa thiết lập" : friend.vocate = vocate[ 0 ].name;
            return friend;
          } ),
          friends = await Promise.all( friendsFixed );

        return res.status( 200 ).json( jsonResponse( "Lấy dữ liệu thành công =))", friends ) );
      } );
    }
    // Filter attribute by name, not value
    if ( req.body.name && req.body.value && req.query._type === "is_not" ) {
      const foundAttribute = await Attribute.find( { "_account": accountResult._id, "name": req.body.name } );

      if ( foundAttribute.length < 0 ) {
        return res.status( 403 ).json( jsonResponse( "Không tìm thấy attribue", null ) );
      }
      Promise.all( foundAttribute.map( async ( attribute ) => {
        if ( attribute.value !== req.body.value ) {
          attribute._friends.map( ( friend ) => {
            data.push( friend.toString() );
          } );
        }
      } ) );
      data = ArrayFunction.removeDuplicates( data );
      Promise.all( data.map( async ( friend ) => {
        const foundFriend = await Friend.findById( friend );

        return foundFriend;
      } ) ).then( async ( item ) => {
        // Get vocate of friends before return to client
        const friendsFixed = item.map( async ( friend ) => {
            let vocate = await Vocate.find( { "_account": userId, "_friends": friend._id } );

            vocate.length === 0 ? friend.vocate = "Chưa thiết lập" : friend.vocate = vocate[ 0 ].name;
            return friend;
          } ),
          friends = await Promise.all( friendsFixed );

        return res.status( 200 ).json( jsonResponse( "Lấy dữ liệu thành công =))", friends ) );
      } );
    }
  }
};
