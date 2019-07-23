/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable one-var */
/**
 * Controller broadcast for project
 * author: hocpv
 * date up: 12/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Broadcast = require( "../../models/chat/Broadcast.model" );
const Friend = require( "../../models/chat/Friend.model" );
const Sequence = require( "../../models/chat/Sequence.model" );

const jsonResponse = require( "../../configs/response" );
const ArrayFunction = require( "../../helpers/utils/functions/array" );

module.exports = {
  /**
   * Get all(id) broadcast
   * @param: req
   * @param: res
   */
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await Broadcast.findOne( { "_id": req.query._id, "_account": req.uid } ).lean();
    }
    if ( req.query._id && req.query._blockId ) {
      Promise.all( dataResponse.blocks.map( async ( block ) => {
        if ( block._id.toString() === req.query._blockId ) {
          block._friends = await Promise.all( block._friends.map( async ( friend ) => {
            const findFriend = await Friend.findOne( { "userID": friend, "_account": req.uid }, "-__v -created_at -updated_at" ).lean();

            return findFriend;
          } ) );
          return block;
        }
      } ).filter( ( val ) => {
        if ( val !== undefined ) {
          return true;
        }
      } ) ).then( ( item ) => {
        return res.status( 200 ).json( jsonResponse( "success", item ) );
      } );
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Broadcast.find( { "_account": req.uid } ).lean();
      return res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
    }
  },
  /**
   * Create broadcast
   * @param: req
   * @param: res
   */
  "create": async ( req, res ) => {
    const foundBroadcast = await Broadcast.findOne( {
      "typeBroadCast": "Tin nhắn gửi ngay",
      "_account": req.uid
    } );

    if ( foundBroadcast ) {
      return res
        .status( 405 )
        .json( jsonResponse( "Bạn đã tạo broadcast trước đó!", null ) );
    }
    const newBroadcast = await new Broadcast();

    newBroadcast.typeBroadCast = "Tin nhắn gửi ngay";
    newBroadcast._account = req.uid;
    await newBroadcast.save();
    res.status( 200 ).json( jsonResponse( "success", newBroadcast ) );
  },
  /**
   * Update broadcast
   * @param: req
   * @param: res
   */
  "update": async ( req, res ) => {
    const foundBroadcast = await Broadcast.findOne( { "_id": req.query._bcId, "_account": req.uid } );

    if ( !foundBroadcast ) {
      return res.status( 403 ).json( jsonResponse( "fail", "Broadcast không tồn tại!" ) );
    }

    if ( foundBroadcast.typeBroadCast === "Tin nhắn gửi ngay" ) {
      const result = foundBroadcast.blocks[ 0 ];

      if ( req.query._blockId !== result._id.toString() ) {
        return res.status( 403 ).json( jsonResponse( "Không tìm thấy block!", null ) );
      }
      const contentItem = foundBroadcast.blocks[ 0 ].content.filter( ( id ) => id.id === req.query._contentId )[ 0 ];

      if ( !contentItem ) {
        return res.status( 405 ).json( jsonResponse( "fail", "Không có nội dung này trong block" ) );
      }
      // Add type image in block
      if ( contentItem.typeContent === "image" ) {
        if ( req.file === null || req.file === undefined ) {
          contentItem.valueText = "";
          contentItem.typeContent = "image";
          await foundBroadcast.save();
          return res.status( 200 ).json( jsonResponse( "success", foundBroadcast ) );
        }
        contentItem.valueText = `${process.env.APP_URL}:${ process.env.PORT_BASE }/${req.file.path.replace( /\\/gi, "/" )}`,
        contentItem.typeContent = "image";
        await foundBroadcast.save();
        return res.status( 200 ).json( jsonResponse( "success", foundBroadcast ) );
      }

      // add type time in block
      if ( contentItem.typeContent === "time" ) {
        if ( req.body.valueText === "" || req.body.valueText === null || req.body.valueText === undefined ) {
          contentItem.valueText = "5";
          contentItem.typeContent = "time";
          await foundBroadcast.save();
          return res.status( 200 ).json( jsonResponse( "success", foundBroadcast ) );
        }
        if ( isNaN( parseFloat( req.body.valueText ) ) || parseFloat( req.body.valueText ) < 5 || parseFloat( req.body.valueText ) > 20 ) {
          return res.status( 405 ).json( jsonResponse( "fail", "Thời gian nằm trong khoảng từ 5 - 20, định dạng là số!" ) );
        }
        contentItem.valueText = req.body.valueText;
        contentItem.typeContent = "time";
        await foundBroadcast.save();
        return res.status( 201 ).json( jsonResponse( "success", foundBroadcast ) );
      }
      // With type item is subscribe & unsubscribe
      if ( contentItem.typeContent === "subscribe" || contentItem.typeContent === "unsubscribe" ) {
        if ( req.body.valueText.length === 0 ) {
          contentItem.valueText = "";
          contentItem.typeContent = contentItem.typeContent === "subscribe" ? "subscribe" : "unsubscribe";
          await foundBroadcast.save();
          return res.status( 200 ).json( jsonResponse( "success", foundBroadcast ) );
        }

        const sequences = req.body.valueText;
        let checkExist = false;

        await Promise.all( sequences.map( async ( val ) => {
          const foundSequence = await Sequence.findOne( { "_account": req.uid, "_id": val } );

          return foundSequence === null;
        } ) ).then( ( data ) => {
          data.map( ( value ) => {
            if ( value === true ) {
              checkExist = true;
              return checkExist;
            }
          } );
        } );
        if ( checkExist ) {
          return res.status( 405 ).json( jsonResponse( "fail", "Một trong số các chuỗi kịch bản không có trong tài khoản của bạn!" ) );
        }
        const checkSequences = ArrayFunction.removeDuplicates( sequences );

        contentItem.valueText = checkSequences.toString();
        contentItem.typeContent = contentItem.typeContent === "subscribe" ? "subscribe" : "unsubscribe" ;
        await foundBroadcast.save();
        return res.status( 200 ).json( jsonResponse( "success", foundBroadcast ) );
      }
      if ( contentItem.typeContent === "text" ) {
        // Add type text in block
        contentItem.valueText = req.body.valueText ? req.body.valueText : "" ;
        contentItem.typeContent = "text";
        await foundBroadcast.save();
        return res.status( 201 ).json( jsonResponse( "success", foundBroadcast ) );
      }
      foundBroadcast.blocks[ 0 ].timeSetting.dateMonth = req.body.dateMonth ? req.body.dateMonth : block.timeSetting.dateMonth;
      foundBroadcast.blocks[ 0 ].timeSetting.hour = req.body.hour ? req.body.hour : block.timeSetting.hour;
      await foundBroadcast.save();
      res.status( 201 ).json( jsonResponse( "success", foundBroadcast ) );
    }

    if ( req.query._blockId ) {
      const block = foundBroadcast.blocks.filter( ( id ) => id.id === req.query._blockId )[ 0 ];

      if ( !block ) {
        return res.status( 403 ).json( jsonResponse( "fail", "Block không tồn tại ở Broadcast này!" ) );
      }
      if ( req.query._status === "true" ) {
        block.status = !block.status;
        await foundBroadcast.save();
        return res.status( 201 ).json( jsonResponse( "success", block ) );
      }
      // Update item in block with type schedule broadcast
      if ( req.query._contentId ) {
        const contentItem = block.content.filter( ( id ) => id.id === req.query._contentId )[ 0 ];

        if ( !contentItem ) {
          return res.status( 405 ).json( jsonResponse( "fail", "Không có nội dung này trong block" ) );
        }
        // Add type image in block
        if ( contentItem.typeContent === "image" ) {
          if ( req.file === null || req.file === undefined ) {
            contentItem.valueText = "";
            contentItem.typeContent = "image";
            await foundBroadcast.save();
            return res.status( 200 ).json( jsonResponse( "success", block ) );
          }
          contentItem.valueText = `${process.env.APP_URL}:${process.env.PORT_BASE}/${req.file.path.replace( /\\/gi, "/" )}`;
          contentItem.typeContent = "image";
          await foundBroadcast.save();
          return res.status( 200 ).json( jsonResponse( "success", block ) );
        }

        // add type time in block
        if ( contentItem.typeContent === "time" ) {
          if ( req.body.valueText === "" || req.body.valueText === null || req.body.valueText === undefined ) {
            contentItem.valueText = "5";
            contentItem.typeContent = "time";
            await foundBroadcast.save();
            return res.status( 200 ).json( jsonResponse( "success", block ) );
          }
          if ( isNaN( parseFloat( req.body.valueText ) ) || parseFloat( req.body.valueText ) < 5 || parseFloat( req.body.valueText ) > 20 ) {
            return res.status( 405 ).json( jsonResponse( "fail", "Thời gian nằm trong khoảng từ 5 - 20, định dạng là số!" ) );
          }
          contentItem.valueText = req.body.valueText;
          contentItem.typeContent = "time";
          await foundBroadcast.save();
          return res.status( 201 ).json( jsonResponse( "success", foundBroadcast ) );
        }
        // With type item is subscribe & unsubscribe
        if ( contentItem.typeContent === "subscribe" || contentItem.typeContent === "unsubscribe" ) {
          if ( req.body.valueText.length === 0 ) {
            contentItem.valueText = "";
            contentItem.typeContent = contentItem.typeContent === "subscribe" ? "subscribe" : "unsubscribe";
            await foundBroadcast.save();
            return res.status( 200 ).json( jsonResponse( "success", block ) );
          }

          const sequences = req.body.valueText;
          let checkExist = false;

          await Promise.all( sequences.map( async ( val ) => {
            const foundSequence = await Sequence.findOne( { "_account": req.uid, "_id": val } );

            return foundSequence === null;
          } )
          ).then( ( result ) => {
            result.map( ( value ) => {
              if ( value === true ) {
                checkExist = true;
                return checkExist;
              }
            } );
          } );
          if ( checkExist ) {
            return res.status( 405 ).json( jsonResponse( "fail", "Một trong số các chuỗi kịch bản không có trong tài khoản của bạn!" ) );
          }
          const checkSequences = ArrayFunction.removeDuplicates( sequences );

          contentItem.valueText = checkSequences.toString();
          contentItem.typeContent = contentItem.typeContent === "subscribe" ? "subscribe" : "unsubscribe";
          await foundBroadcast.save();
          return res.status( 200 ).json( jsonResponse( "success", foundBroadcast ) );
        }
        if ( contentItem.typeContent === "text" ) {
          // Add type text in block
          contentItem.valueText = req.body.valueText ? req.body.valueText : "";
          contentItem.typeContent = "text";
          await foundBroadcast.save();
          return res.status( 200 ).json( jsonResponse( "success", block ) );
        }
      }
      if ( req.body.hour || req.body.dateMonth || ( req.body.hour && req.body.dateMonth ) ) {
        const scheduleDate = req.body.hour && req.body.dateMonth ? `${req.body.dateMonth} ${req.body.hour}` : req.body.hour ? `${block.timeSetting.dateMonth} ${req.body.hour}` : `${req.body.dateMonth} ${block.timeSetting.hour}`;
        const checkDate = new Date( scheduleDate.replace( /-/g, "/" ) );

        if ( Date.parse( checkDate ) <= Date.now() ) {
          return res.status( 405 ).json( jsonResponse( "fail", "Thời gian cập nhật không được nhỏ hơn thời gian hiện tại" ) );
        }
      }
      // Choose type cron for timer block
      // eslint-disable-next-line default-case
      switch ( req.query._type ) {
        case "0":
          if ( req.body.hour || req.body.dateMonth || ( req.body.hour && req.body.dateMonth ) ) {
            const scheduleDate = req.body.hour && req.body.dateMonth ? `${req.body.dateMonth} ${req.body.hour}` : req.body.hour ? `${block.timeSetting.dateMonth} ${req.body.hour}` : `${req.body.dateMonth} ${block.timeSetting.hour}`;
            const checkDate = new Date( scheduleDate.replace( /-/g, "/" ) );

            if ( Date.parse( checkDate ) <= Date.now() ) {
              return res.status( 405 ).json( jsonResponse( "fail", "Thời gian cập nhật không được nhỏ hơn thời gian hiện tại" ) );
            }
          }
          req.body.dateMonth ? ( block.timeSetting.dateMonth = req.body.dateMonth ) : block.timeSetting.dateMonth;
          req.body.hour ? ( block.timeSetting.hour = req.body.hour ) : block.timeSetting.hour;
          block.timeSetting.repeat.typeRepeat = "Không";
          block.timeSetting.repeat.valueRepeat = "";
          await foundBroadcast.save();
          break;
        case "1":
          if ( req.body.hour || req.body.dateMonth || ( req.body.hour && req.body.dateMonth ) ) {
            const scheduleDate = req.body.hour && req.body.dateMonth ? `${req.body.dateMonth} ${req.body.hour}` : req.body.hour ? `${block.timeSetting.dateMonth} ${req.body.hour}` : `${req.body.dateMonth} ${block.timeSetting.hour}`;
            const checkDate = new Date( scheduleDate.replace( /-/g, "/" ) );

            if ( Date.parse( checkDate ) <= Date.now() ) {
              return res.status( 405 ).json( jsonResponse( "fail", "Thời gian cập nhật không được nhỏ hơn thời gian hiện tại" ) );
            }
          }
          req.body.dateMonth ? ( block.timeSetting.dateMonth = req.body.dateMonth ) : block.timeSetting.dateMonth;
          req.body.hour ? ( block.timeSetting.hour = req.body.hour ) : block.timeSetting.hour;
          block.timeSetting.repeat.typeRepeat = "Hằng ngày";
          // 0,1,2,3,4,5,6 match day of week 'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'
          block.timeSetting.repeat.valueRepeat = "0,1,2,3,4,5,6";
          await foundBroadcast.save();
          break;
        case "2":
          if ( req.body.hour || req.body.dateMonth || ( req.body.hour && req.body.dateMonth ) ) {
            const scheduleDate = req.body.hour && req.body.dateMonth ? `${req.body.dateMonth} ${req.body.hour}` : req.body.hour ? `${block.timeSetting.dateMonth} ${req.body.hour}` : `${req.body.dateMonth} ${block.timeSetting.hour}`;
            const checkDate = new Date( scheduleDate.replace( /-/g, "/" ) );

            if ( Date.parse( checkDate ) <= Date.now() ) {
              return res.status( 405 ).json( jsonResponse( "fail", "Thời gian cập nhật không được nhỏ hơn thời gian hiện tại" ) );
            }
          }
          req.body.dateMonth ? ( block.timeSetting.dateMonth = req.body.dateMonth ) : block.timeSetting.dateMonth;
          req.body.hour ? ( block.timeSetting.hour = req.body.hour ) : block.timeSetting.hour;
          block.timeSetting.repeat.typeRepeat = "Cuối tuần";
          block.timeSetting.repeat.valueRepeat = "0,6";
          await foundBroadcast.save();
          break;
        case "3":
          if ( req.body.hour || req.body.dateMonth || ( req.body.hour && req.body.dateMonth ) ) {
            const scheduleDate = req.body.hour && req.body.dateMonth ? `${req.body.dateMonth} ${req.body.hour}` : req.body.hour ? `${block.timeSetting.dateMonth} ${req.body.hour}` : `${req.body.dateMonth} ${block.timeSetting.hour}`;
            const checkDate = new Date( scheduleDate.replace( /-/g, "/" ) );

            if ( Date.parse( checkDate ) <= Date.now() ) {
              return res.status( 405 ).json( jsonResponse( "fail", "Thời gian cập nhật không được nhỏ hơn thời gian hiện tại" ) );
            }
          }
          req.body.dateMonth ? ( block.timeSetting.dateMonth = req.body.dateMonth ) : block.timeSetting.dateMonth;
          req.body.hour ? ( block.timeSetting.hour = req.body.hour ) : block.timeSetting.hour;
          block.timeSetting.repeat.typeRepeat = "Hằng tháng";
          block.timeSetting.repeat.valueRepeat = "";
          await foundBroadcast.save();
          break;
        case "4":
          if ( req.body.hour || req.body.dateMonth || ( req.body.hour && req.body.dateMonth ) ) {
            const scheduleDate = req.body.hour && req.body.dateMonth ? `${req.body.dateMonth} ${req.body.hour}` : req.body.hour ? `${block.timeSetting.dateMonth} ${req.body.hour}` : `${req.body.dateMonth} ${block.timeSetting.hour}`;
            const checkDate = new Date( scheduleDate.replace( /-/g, "/" ) );

            if ( Date.parse( checkDate ) <= Date.now() ) {
              return res.status( 405 ).json( jsonResponse( "fail", "Thời gian cập nhật không được nhỏ hơn thời gian hiện tại" ) );
            }
          }
          req.body.dateMonth ? ( block.timeSetting.dateMonth = req.body.dateMonth ) : block.timeSetting.dateMonth;
          req.body.hour ? ( block.timeSetting.hour = req.body.hour ) : block.timeSetting.hour;
          block.timeSetting.repeat.typeRepeat = "Ngày làm việc";
          block.timeSetting.repeat.valueRepeat = "1,2,3,4,5";
          await foundBroadcast.save();
          break;
        case "5":
          switch ( req.body.day ) {
            case "0,1,2,3,4,5,6":
              if ( req.body.hour || req.body.dateMonth || ( req.body.hour && req.body.dateMonth ) ) {
                const scheduleDate = req.body.hour && req.body.dateMonth ? `${req.body.dateMonth} ${req.body.hour}` : req.body.hour ? `${block.timeSetting.dateMonth} ${req.body.hour}` : `${req.body.dateMonth} ${block.timeSetting.hour}`;
                const checkDate = new Date( scheduleDate.replace( /-/g, "/" ) );

                if ( Date.parse( checkDate ) <= Date.now() ) {
                  return res.status( 405 ).json( jsonResponse( "fail", "Thời gian cập nhật không được nhỏ hơn thời gian hiện tại" ) );
                }
              }
              req.body.dateMonth ? ( block.timeSetting.dateMonth = req.body.dateMonth ) : block.timeSetting.dateMonth;
              req.body.hour ? ( block.timeSetting.hour = req.body.hour ) : block.timeSetting.hour;
              block.timeSetting.repeat.typeRepeat = "Hằng ngày";
              block.timeSetting.repeat.valueRepeat = "0,1,2,3,4,5,6";
              await foundBroadcast.save();
              break;
            case "0,6":
              if ( req.body.hour || req.body.dateMonth || ( req.body.hour && req.body.dateMonth ) ) {
                const scheduleDate = req.body.hour && req.body.dateMonth ? `${req.body.dateMonth} ${req.body.hour}` : req.body.hour ? `${block.timeSetting.dateMonth} ${req.body.hour}` : `${req.body.dateMonth} ${block.timeSetting.hour}`;
                const checkDate = new Date( scheduleDate.replace( /-/g, "/" ) );

                if ( Date.parse( checkDate ) <= Date.now() ) {
                  return res.status( 405 ).json( jsonResponse( "fail", "Thời gian cập nhật không được nhỏ hơn thời gian hiện tại" ) );
                }
              }
              req.body.dateMonth ? ( block.timeSetting.dateMonth = req.body.dateMonth ) : block.timeSetting.dateMonth;
              req.body.hour ? ( block.timeSetting.hour = req.body.hour ) : block.timeSetting.hour;
              block.timeSetting.repeat.typeRepeat = "Cuối tuần";
              block.timeSetting.repeat.valueRepeat = "0,6";
              await foundBroadcast.save();
              break;
            case "1,2,3,4,5":
              if ( req.body.hour || req.body.dateMonth || ( req.body.hour && req.body.dateMonth ) ) {
                const scheduleDate = req.body.hour && req.body.dateMonth ? `${req.body.dateMonth} ${req.body.hour}` : req.body.hour ? `${block.timeSetting.dateMonth} ${req.body.hour}` : `${req.body.dateMonth} ${block.timeSetting.hour}`;
                const checkDate = new Date( scheduleDate.replace( /-/g, "/" ) );

                if ( Date.parse( checkDate ) <= Date.now() ) {
                  return res.status( 405 ).json( jsonResponse( "fail", "Thời gian cập nhật không được nhỏ hơn thời gian hiện tại" ) );
                }
              }
              req.body.dateMonth ? ( block.timeSetting.dateMonth = req.body.dateMonth ) : block.timeSetting.dateMonth;
              req.body.hour ? ( block.timeSetting.hour = req.body.hour ) : block.timeSetting.hour;
              block.timeSetting.repeat.typeRepeat = "Ngày làm việc";
              block.timeSetting.repeat.valueRepeat = "1,2,3,4,5";
              await foundBroadcast.save();
              break;
            default:
              if ( req.body.hour || req.body.dateMonth || ( req.body.hour && req.body.dateMonth ) ) {
                const scheduleDate = req.body.hour && req.body.dateMonth ? `${req.body.dateMonth} ${req.body.hour}` : req.body.hour ? `${block.timeSetting.dateMonth} ${req.body.hour}` : `${req.body.dateMonth} ${block.timeSetting.hour}`;
                const checkDate = new Date( scheduleDate.replace( /-/g, "/" ) );

                if ( Date.parse( checkDate ) <= Date.now() ) {
                  return res.status( 405 ).json( jsonResponse( "fail", "Thời gian cập nhật không được nhỏ hơn thời gian hiện tại" ) );
                }
              }
              req.body.dateMonth ? ( block.timeSetting.dateMonth = req.body.dateMonth ) : block.timeSetting.dateMonth;
              req.body.hour ? ( block.timeSetting.hour = req.body.hour ) : block.timeSetting.hour;
              block.timeSetting.repeat.typeRepeat = "Tùy chỉnh";
              block.timeSetting.repeat.valueRepeat = req.body.day;
              await foundBroadcast.save();
              break;
          }
          break;
      }
      block.timeSetting.dateMonth = req.body.dateMonth ? req.body.dateMonth : block.timeSetting.dateMonth;
      block.timeSetting.hour = req.body.hour ? req.body.hour : block.timeSetting.hour;
      await foundBroadcast.save();
      return res.status( 201 ).json( jsonResponse( "success", block ) );
    }
  },
  /**
   * add block to broadcast
   * @param: req
   * @param: res
   */
  "addBlock": async ( req, res ) => {
    const foundBroadcast = await Broadcast.findOne( { "_id": req.query._bcId, "_account": req.uid } );

    if ( !foundBroadcast ) {
      return res.status( 403 ).json( jsonResponse( "fail", "Broadcast không tồn tại!" ) );
    }
    /**
     *  With type broadcast === thiết lập bộ hẹn
     */
    if ( foundBroadcast.typeBroadCast === "Thiết lập bộ hẹn" ) {
      const block = foundBroadcast.blocks.filter( ( id ) => id.id === req.query._blockId )[ 0 ];

      // add friends to block in broadcast
      if ( req.query._blockId ) {
        if ( !block ) {
          return res.status( 403 ).json( jsonResponse( "fail", "Block không tồn tại ở Broadcast này!" ) );
        }
        if ( req.query._typeItem === "image" ) {
          block.content.push( { "valueText": "", "typeContent": "image" } );
          await foundBroadcast.save();
          return res.status( 200 ).json( jsonResponse( "success", block ) );
        }
        if ( req.query._typeItem === "time" ) {
          block.content.push( { "valueText": "5", "typeContent": "time" } );
          await foundBroadcast.save();
          return res.status( 200 ).json( jsonResponse( "success", foundBroadcast ) );
        }
        if ( req.query._typeItem === "text" ) {
          block.content.push( { "valueText": "", "typeContent": "text" } );
          await foundBroadcast.save();
          return res.status( 200 ).json( jsonResponse( "success", block ) );
        }
        // With type item is subscribe & unsubscribe
        if (
          req.query._typeItem === "subscribe" || req.query._typeItem === "unsubscribe"
        ) {
          const content = {
            "valueText": "",
            "typeContent":
              req.query._typeItem === "subscribe" ? "subscribe" : "unsubscribe"
          };

          block.content.push( content );
          await foundBroadcast.save();
          return res.status( 200 ).json( jsonResponse( "success", foundBroadcast ) );
        }

        let result = null;

        foundBroadcast.blocks.map( ( val ) => {
          if ( val._id.toString() === req.query._blockId ) {
            result = val;
            return result;
          }
        } );
        result._friends = [];
        await foundBroadcast.save();
        const friends = req.body.friendId;
        let checkCon = false;

        friends.map( ( val ) => {
          if ( result._friends.indexOf( val ) > -1 ) {
            checkCon = true;
            return checkCon;
          }
        } );
        if ( checkCon ) {
          return res.status( 405 ).json( jsonResponse( "fail", "Bạn đã thêm một trong những bạn bè này!" ) );
        }
        const checkFriend = ArrayFunction.removeDuplicates( friends );

        checkFriend.map( ( val ) => {
          result._friends.push( val );
        } );
        await foundBroadcast.save();
        return res.status( 200 ).json( jsonResponse( "success", foundBroadcast ) );
      }
      // add new block in broadcast

      const date = new Date();

      date.setHours( 12, 0, 0 );
      date.setDate( date.getDate() + 1 );
      foundBroadcast.blocks.push( {
        "timeSetting": {
          "dateMonth": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          "hour": `${date.getHours() }:0${ date.getMinutes()}`,
          "repeat": {
            "typeRepeat": "Không",
            "valueRepeat": ""
          }
        }
      } );
      await foundBroadcast.save();
      return res.status( 200 ).json( jsonResponse( "success", foundBroadcast ) );
    }
    /**
     *  With type broadcast === tin nhắn gửi ngay
     */
    // add friends to block in broadcast
    if ( req.query._blockId ) {
      const result = foundBroadcast.blocks[ 0 ];

      if ( req.query._blockId !== result._id.toString() ) {
        return res.status( 403 ).json( jsonResponse( "fail", "Không tìm thấy block!" ) );
      }
      // Add type image in block
      if ( req.query._typeItem === "image" ) {
        foundBroadcast.blocks[ 0 ].content.push( {
          "valueText": "",
          "typeContent": "image"
        } );
        await foundBroadcast.save();
        return res.status( 200 ).json( jsonResponse( "success", foundBroadcast.blocks[ 0 ] ) );
      }

      // add type time in block
      if ( req.query._typeItem === "time" ) {
        foundBroadcast.blocks[ 0 ].content.push( {
          "valueText": "5",
          "typeContent": "time"
        } );
        await foundBroadcast.save();
        return res.status( 200 ).json( jsonResponse( "success", foundBroadcast.blocks[ 0 ] ) );
      }
      // With type item is subscribe & unsubscribe
      if ( req.query._typeItem === "subscribe" || req.query._typeItem === "unsubscribe" ) {
        const content = {
          "valueText": "",
          "typeContent":
            req.query._typeItem === "subscribe" ? "subscribe" : "unsubscribe"
        };

        foundBroadcast.blocks[ 0 ].content.push( content );
        await foundBroadcast.save();
        return res.status( 200 ).json( jsonResponse( "success", foundBroadcast.blocks[ 0 ] ) );
      }

      // Add type text in block
      if ( req.query._typeItem === "text" ) {
        foundBroadcast.blocks[ 0 ].content.push( {
          "valueText": "",
          "typeContent": "text"
        } );
        await foundBroadcast.save();
        return res.status( 200 ).json( jsonResponse( "success", foundBroadcast.blocks[ 0 ] ) );
      }

      const friends = req.body.friendId;
      let checkCon = false;

      friends.map( ( val ) => {
        if ( result._friends.indexOf( val ) > -1 ) {
          checkCon = true;
          return checkCon;
        }
      } );
      if ( checkCon ) {
        return res.status( 405 ).json( jsonResponse( "fail", "Bạn đã thêm một trong những bạn bè này!" ) );
      }
      const checkFriend = ArrayFunction.removeDuplicates( friends );

      checkFriend.map( ( val ) => {
        result._friends.push( val );
      } );
      await foundBroadcast.save();
      return res.status( 200 ).json( jsonResponse( "success", foundBroadcast ) );
    }
    res.status( 405 ).json( jsonResponse( "fail", "Mục tin nhắn gửi ngay không sử dụng được chức năng này" ) );
  },
  /**
   * Delete broadcast
   * @param: req
   * @param: res
   */
  "delete": async ( req, res ) => {
    const foundBroadcast = await Broadcast.findOne( { "_id": req.query._bcId, "_account": req.uid } );

    if ( !foundBroadcast ) {
      return res.status( 403 ).json( jsonResponse( "fail", "Broadcast không tồn tại!" ) );
    }

    // delete friends in block
    if ( req.query._blockId ) {
      const findBlock = foundBroadcast.blocks.filter( ( x ) => x.id === req.query._blockId )[ 0 ];

      if ( !findBlock ) {
        return res.status( 403 ).json( jsonResponse( "fail", "Broadcast của bạn không chứa block này!" ) );
      }
      if ( req.query._friend === "true" ) {
        const friends = req.body.friendId;
        let checkCon = false;
        let checkExist = false;

        await Promise.all( friends.map( async ( val ) => {
          const foundFriend = await Friend.findOne( { "_account": req.uid, "_id": val } );

          return foundFriend === null;
        } )
        ).then( ( result ) => {
          result.map( ( value ) => {
            if ( value === true ) {
              checkExist = true;
              return checkExist;
            }
          } );
        } );
        if ( checkExist ) {
          return res.status( 405 ).json( jsonResponse( "fail", "Một trong số các bạn bè không có trong tài khoản của bạn!" ) );
        }
        friends.map( async ( val ) => {
          if ( findBlock._friends.indexOf( val ) < 0 ) {
            checkCon = true;
            return checkCon;
          }
        } );
        if ( checkCon ) {
          return res.status( 405 ).json( jsonResponse( "fail", "Không tồn tại một trong các bạn bè bạn muốn xóa ở nhớm bạn bè này!" ) );
        }
        const checkFriend = ArrayFunction.removeDuplicates( friends );

        checkFriend.map( ( val ) => {
          findBlock._friends.pull( val );
        } );
        await foundBroadcast.save();
        return res.status( 200 ).json( jsonResponse( "success", findBlock ) );
      }
      if ( req.query._contentId ) {
        const findContent = findBlock.content.filter( ( x ) => x.id === req.query._contentId )[ 0 ];

        if ( !findContent ) {
          return res.status( 403 ).json( jsonResponse( "fail", "Broadcast của bạn có block không chứa này!" ) );
        }
        if ( ( findContent.typeContent === "subscribe" && req.query._sequence === "true" ) || ( findContent.typeContent === "unsubscribe" && req.query._sequence === "true" ) ) {
          if ( findContent.valueText.split( "," ).indexOf( req.body.valueText ) < 0 ) {
            return res.status( 405 ).json( jsonResponse( "fail", "Không có trình tự kịch bản này trong item này! " ) );
          }
          findContent.valueText = findContent.valueText
            .split( "," )
            .filter( ( val ) => val !== req.body.valueText )
            .toString();
          await foundBroadcast.save();
          return res.status( 200 ).json( jsonResponse( "success", null ) );
        }
        findBlock.content.pull( findContent );
        await foundBroadcast.save();
        return res.status( 200 ).json( jsonResponse( "success", findBlock ) );
      }
      foundBroadcast.blocks.pull( findBlock );
      await foundBroadcast.save();
      return res.status( 200 ).json( jsonResponse( "success", foundBroadcast ) );
    }
    await Broadcast.findByIdAndRemove( req.query._bcId );
    res.status( 200 ).json( jsonResponse( "success", foundBroadcast ) );
  }
};
