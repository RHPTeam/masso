/* eslint-disable one-var */
const PostCategory = require( "../../models/post/PostCategory.model" );
const Block = require( "../../models/chat/Block.model" );
const GroupBlock = require( "../../models/chat/GroupBlock.model" );
const BroadCast = require( "../../models/chat/Broadcast.model" );
const Sequence = require( "../../models/chat/Sequence.model" );

const dictionaries = require( "../../configs/dictionaries" );

module.exports = {
  "defaulSchema": async ( newUser ) => {
    // Create default postcategory
    const defaultPostCategory = await new PostCategory( {
      "title": dictionaries.DEFAULT_POSTCATEGORY,
      "_account": newUser._id
    } );

    await defaultPostCategory.save();

    // create group default when signup

    const defaultGroup = await new GroupBlock();

    defaultGroup.name = "Mặc Định";
    defaultGroup._account = newUser._id;
    await defaultGroup.save();

    // create block welcome in default

    const defaultBlock = await new Block();

    defaultBlock.name = "Welcome";
    defaultBlock._account = newUser._id;
    defaultBlock._groupBlock = defaultGroup._id;
    await defaultBlock.save();
    defaultGroup.blocks.push( defaultBlock._id );
    await defaultGroup.save();

    // Create block default in broadcast type schedule, deliver
    const defaultDel = await new BroadCast();

    // deliver
    defaultDel.typeBroadCast = "Tin nhắn gửi ngay";
    defaultDel._account = newUser._id;
    await defaultDel.save();
    // schedue
    const defaultSchedule = await new BroadCast();

    defaultSchedule.typeBroadCast = "Thiết lập bộ hẹn";
    defaultSchedule._account = newUser._id;
    await defaultSchedule.save();
    const date = new Date();

    date.setHours( 12, 0, 0 );
    date.setDate( date.getDate() + 1 );
    defaultSchedule.blocks.push( {
      "timeSetting": {
        "dateMonth": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        "hour": `${date.getHours() }:0${ date.getMinutes()}`,
        "repeat": {
          "typeRepeat": "Không",
          "valueRepeat": ""
        }
      }
    } );
    await defaultSchedule.save();

    // Create default sequence
    const newSeq = await new Sequence();

    newSeq.name = "Chuỗi kịch bản 0";
    newSeq._account = newUser._id;
    await newSeq.save();
  }
};
