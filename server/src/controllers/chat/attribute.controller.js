/* eslint-disable no-unused-expressions */
/**
 * Controller attribute for project
 * author: Tran Toan (Sky Albert)
 * date up: 08/03/2019
 * date to: ___
 * team: BE-RHP
 */
/* eslint-disable one-var */
const Friend = require( "../../models/chat/Friend.model" );
const Attribute = require( "../../models/chat/Attribute.model" );
const Vocate = require( "../../models/chat/Vocate.model" );

const jsonResponse = require( "../../configs/response" );
const { removeDuplicates } = require( "../../helpers/utils/functions/array" );

module.exports = {
  /**
   *	Get All data from Attribute collection
   *  @param req
   *  @param res
   *	Note: Api define admin and members, if u're admin then u can get all data, on the contrary u just can get data of you created before
   */
  "index": async ( req, res ) => {
    let dataResponse = null, page;

    // Object.entries( req.query ).length === 0 && req.query.constructor === Object
    if ( req.query._id ) {
      dataResponse = await Attribute.findOne( { "_id": req.query._id } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Attribute.find( {} ).lean();
    }
    if ( req.query._id && req.query._friend === "true" && req.query._size && req.query._page ) {
      const findAttribulte = await Attribute.findOne( { "_id": req.query._id } ).lean(),
        dataFriend = await Promise.all( findAttribulte._friends.map( async ( friend ) => {
          const findFriend = await Friend.findOne( { "userID": friend, "_account": req.uid }, "-_id -__v -created_at" ).lean(),
            vocate = await Vocate.find( { "_account": req.uid, "_friends": friend } ).lean();

          vocate.length === 0 ? ( findFriend.vocate = "Chưa thiết lập" ) : ( findFriend.vocate = vocate[ 0 ].name );
          return findFriend;
        } ) );

      dataResponse = dataFriend.slice(
        ( Number( req.query._page ) - 1 ) * Number( req.query._size ),
        Number( req.query._size ) * Number( req.query._page )
      );
      if ( dataResponse.length % req.query._size === 0 ) {
        page = Math.floor( dataResponse.length / req.query._size );
      } else {
        page = Math.floor( dataResponse.length / req.query._size ) + 1;
      }

      if ( !dataResponse ) {
        return res.status( 403 ).json( jsonResponse( "fail", null ) );
      }
      return res.status( 200 ).json( jsonResponse( "success", { "results": dataResponse, "page": page } ) );


    }
    if ( !dataResponse ) {
      return res.status( 403 ).json( jsonResponse( "fail", null ) );
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
    const objectSaver = {
        "name": req.body.name,
        "value": req.body.value
      },
      attribute = await new Attribute( objectSaver );

    attribute._account = req.uid;
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
    const attrResult = await Attribute.findOne( { "_id": req.query._attrId } );

    if ( attrResult._account.toString() !== req.uid ) {
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
    const attrResult = await Attribute.findOne( { "_id": req.query._attrId } );

    if ( !attrResult ) {
      res.status( 403 ).json( jsonResponse( "Thuộc tính này không tồn tại!", null ) );
    }
    if ( attrResult._account.toString() !== req.uid ) {
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

    // Filter attribute by name
    if ( req.body.name && !req.body.value && !req.query._type ) {
      const foundAttribute = await Attribute.find( { "_account": req.uid, "name": req.body.name } );

      if ( foundAttribute.length < 0 ) {
        return res.status( 403 ).json( jsonResponse( "Không tìm thấy attribue", null ) );
      }
      Promise.all( foundAttribute.map( async ( attribute ) => {
        attribute._friends.map( ( friend ) => {
          data.push( friend.toString() );
        } );
      } ) );
      data = await removeDuplicates( data );
      Promise.all( data.map( async ( friend ) => {
        const foundFriend = await Friend.findOne( { "userID": friend } );

        return foundFriend;
      } ) ).then( async ( item ) => {
        // Get vocate of friends before return to client
        const friendsFixed = item.map( async ( friend ) => {
            let vocate = await Vocate.find( { "_account": req.uid, "_friends": friend.userID } );

            vocate.length === 0 ? friend.vocate = "Chưa thiết lập" : friend.vocate = vocate[ 0 ].name;
            return friend;
          } ),
          friends = await Promise.all( friendsFixed );

        return res.status( 200 ).json( jsonResponse( "Lấy dữ liệu thành công =))", friends ) );
      } );
    }
    // Filter attribute by name, value
    if ( req.body.name && req.body.value && req.query._type === "is" ) {
      const foundAttribute = await Attribute.find( { "_account": req.uid, "name": req.body.name, "value": req.body.value } );

      if ( foundAttribute.length < 0 ) {
        return res.status( 403 ).json( jsonResponse( "Không tìm thấy attribue", null ) );
      }
      Promise.all( foundAttribute.map( async ( attribute ) => {
        attribute._friends.map( ( friend ) => {
          data.push( friend.toString() );
        } );
      } ) );
      data = await removeDuplicates( data );
      Promise.all( data.map( async ( friend ) => {
        const foundFriend = await Friend.findOne( { "userID": friend } );

        return foundFriend;
      } ) ).then( async ( item ) => {
        // Get vocate of friends before return to client
        const friendsFixed = item.map( async ( friend ) => {
            let vocate = await Vocate.find( { "_account": req.uid, "_friends": friend.userID } );

            vocate.length === 0 ? friend.vocate = "Chưa thiết lập" : friend.vocate = vocate[ 0 ].name;
            return friend;
          } ),
          friends = await Promise.all( friendsFixed );

        return res.status( 200 ).json( jsonResponse( "Lấy dữ liệu thành công =))", friends ) );
      } );
    }
    // Filter attribute by name, not value
    if ( req.body.name && req.body.value && req.query._type === "is_not" ) {
      const foundAttribute = await Attribute.find( { "_account": req.uid, "name": req.body.name } );

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
      data = removeDuplicates( data );
      Promise.all( data.map( async ( friend ) => {
        const foundFriend = await Friend.findOne( { "userID": friend } );

        return foundFriend;
      } ) ).then( async ( item ) => {
        // Get vocate of friends before return to client
        const friendsFixed = item.map( async ( friend ) => {
            let vocate = await Vocate.find( { "_account": req.uid, "_friends": friend.userID } );

            vocate.length === 0 ? friend.vocate = "Chưa thiết lập" : friend.vocate = vocate[ 0 ].name;
            return friend;
          } ),
          friends = await Promise.all( friendsFixed );

        return res.status( 200 ).json( jsonResponse( "Lấy dữ liệu thành công =))", friends ) );
      } );
    }
  }
};
