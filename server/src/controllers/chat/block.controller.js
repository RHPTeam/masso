/* eslint-disable no-unused-expressions */

/**
 * Controller block for project
 * author: hocpv
 * date up: 07/03/2019
 * date to: ___
 * team: BE-RHP
 */

const Block = require( "../../models/chat/Block.model" );
const GroupBlock = require( "../../models/chat/GroupBlock.model" );
const Attribute = require( "../../models/chat/Attribute.model" );

const jsonResponse = require( "../../configs/response" );

const Dictionaries = require( "../../configs/dictionaries" );

module.exports = {
  /**
   *  get all block & block by Id
   *  @param req
   *  @param res
   *
   */
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await Block.findOne( { "_id": req.query._id, "_account": req.uid } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await Block.find( { "_account": req.uid } ).lean();
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
    const foundBlock = await Block.find( { "_account": req.uid } ).lean();

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
    // eslint-disable-next-line one-var
    const indexCurrent = Math.max( ...nameArr ),

      foundDefaultGr = await GroupBlock.findOne( { "name": "Mặc Định", "_account": req.uid } ),
      block = await new Block( req.body );

    if ( req.query._groupId ) {
      const findGroup = await GroupBlock.findOne( { "_id": req.query._groupId, "_account": req.uid } );

      if ( !findGroup ) {
        return res.status( 403 ).json( jsonResponse( "fail", { "message": "Nhóm block không tồn tại!" } ) );
      }
      block.name = indexCurrent.toString() === "NaN" || foundBlock.length === 0 || nameArr.length === 0 ? `${Dictionaries.BLOCK} 1` : `${Dictionaries.BLOCK} ${indexCurrent + 1}`;
      block._account = req.uid;
      block._groupBlock = req.query._groupId;
      await block.save();
      findGroup.blocks.push( block._id );
      await findGroup.save();
      return res.status( 200 ).json( jsonResponse( "success", block ) );
    }
    block.name = indexCurrent.toString() === "NaN" || foundBlock.length === 0 || nameArr.length === 0 ? `${Dictionaries.BLOCK} 1` : `${Dictionaries.BLOCK} ${indexCurrent + 1}`;
    block._account = req.uid;
    block._groupBlock = foundDefaultGr._id;
    await block.save();
    foundDefaultGr.blocks.push( block._id );
    await foundDefaultGr.save();
    res.status( 200 ).json( jsonResponse( "success", block ) );
  },
  /**
   *  create item in block by user
   *  @param req
   *  @param res
   *
   */
  "createItem": async ( req, res ) => {
    const foundBlock = await Block.findOne( { "_id": req.query._blockId, "_account": req.uid } );

    if ( !foundBlock ) {
      return res.status( 403 ).json( jsonResponse( "fail", { "message": "Block không tồn tại!" } ) );
    }

    // with type item is image
    if ( req.query._type === "image" ) {
      if ( req.file === null || req.file === undefined ) {
        const content = {
          "valueText": "",
          "typeContent": "image"
        };

        foundBlock.contents.push( content );
        await foundBlock.save();
        return res.status( 200 ).json( jsonResponse( "success", foundBlock ) );
      }
      const content = {
        "valueText": `${process.env.APP_URL}:${process.env.PORT_BASE}/${ ( req.file.path ).replace( /\\/gi, "/" )}`,
        "typeContent": "image"
      };

      foundBlock.contents.push( content );
      await foundBlock.save();
      return res.status( 200 ).json( jsonResponse( "success", foundBlock ) );
    }

    // With type item is time
    if ( req.query._type === "time" ) {
      if ( ( req.body.valueText ).trim() === "" || req.body.valueText === null ) {
        const content = {
          "valueText": "5",
          "typeContent": "time"
        };

        foundBlock.contents.push( content );
        await foundBlock.save();
        return res.status( 200 ).json( jsonResponse( "success", foundBlock ) );
      }
      if ( isNaN( parseFloat( req.body.valueText ) ) || parseFloat( req.body.valueText ) < 4 || parseFloat( req.body.valueText ) > 20 ) {
        return res.status( 405 ).json( jsonResponse( "fail", { "message": "Thời gian nằm trong khoảng từ 5 - 20, định dạng là số!" } ) );
      }
      const content = {
        "valueText": req.body.valueText,
        "typeContent": "time"
      };

      foundBlock.contents.push( content );
      await foundBlock.save();
      return res.status( 200 ).json( jsonResponse( "success", foundBlock ) );
    }

    // With type item is attribute
    if ( req.query._type === "tag" ) {
      const newAttribute = await new Attribute();

      newAttribute.name = "";
      newAttribute.value = "";
      newAttribute._account = req.uid;
      await newAttribute.save();
      // eslint-disable-next-line one-var
      const content = {
        "valueText": newAttribute._id,
        "typeContent": "tag"
      };

      foundBlock.contents.push( content );
      await foundBlock.save();
      return res.status( 200 ).json( jsonResponse( "success", foundBlock ) );
    }

    // With type item is subscribe & unsubscribe
    if ( req.query._type === "subscribe" || req.query._type === "unsubscribe" ) {
      const content = {
        "valueText": "",
        "typeContent": req.query._type === "subscribe" ? "subscribe" : "unsubscribe"
      };

      foundBlock.contents.push( content );
      await foundBlock.save();
      return res.status( 200 ).json( jsonResponse( "success", foundBlock ) );
    }

    // with type item is text
    // eslint-disable-next-line one-var
    const content = {
      "valueText": "",
      "typeContent": "text"
    };

    foundBlock.contents.push( content );
    await foundBlock.save();
    return res.status( 200 ).json( jsonResponse( "success", foundBlock ) );
  },
  /**
   *  update block by user
   *  @param req
   *  @param res
   *
   */
  "update": async ( req, res ) => {
    const foundBlock = await Block.findOne( { "_id": req.query._blockId, "_account": req.uid } );

    if ( !foundBlock ) {
      return res.status( 404 ).json( jsonResponse( "fail", { "message": "Block không tồn tại!" } ) );
    }
    // update item in block
    if ( req.query._itemId ) {
      const findItem = foundBlock.contents.filter( ( x ) => x.id === req.query._itemId )[ 0 ];

      if ( typeof findItem === undefined ) {
        return res.status( 403 ).json( jsonResponse( "fail", { "message": "Nội dung không tồn tại trong block này!" } ) );
      }

      // with type item is image
      if ( findItem.typeContent === "image" ) {
        if ( findItem.valueText === "" ) {
          if ( req.file === null || req.file === undefined ) {
            findItem.valueText = "";
            findItem.typeContent = "image";
            await foundBlock.save();
            return res.status( 201 ).json( jsonResponse( "success", foundBlock ) );
          }
          findItem.valueText = `${process.env.APP_URL}:${process.env.PORT_BASE}/${ ( req.file.path ).replace( /\\/gi, "/" )}`;
          findItem.typeContent = "image";
          await foundBlock.save();
          return res.status( 201 ).json( jsonResponse( "success", foundBlock ) );

        }
        if ( req.file === null || req.file === undefined ) {
          findItem.valueText = "";
          findItem.typeContent = "image";
          await foundBlock.save();
          return res.status( 201 ).json( jsonResponse( "success", foundBlock ) );
        }
        findItem.valueText = `${process.env.APP_URL}:${process.env.PORT_BASE}/${ ( req.file.path ).replace( /\\/gi, "/" )}`;
        findItem.typeContent = "image";
        await foundBlock.save();
        return res.status( 201 ).json( jsonResponse( "success", foundBlock ) );
      }

      // With type item is time
      if ( findItem.typeContent === "time" ) {
        if ( ( req.body.valueText ).trim() === "" || req.body.valueText === null ) {
          findItem.valueText = "5";
          findItem.typeContent = "time";
          await foundBlock.save();
          return res.status( 201 ).json( jsonResponse( "success", foundBlock ) );
        }
        if ( isNaN( parseFloat( req.body.valueText ) ) || parseFloat( req.body.valueText ) < 5 || parseFloat( req.body.valueText ) > 20 ) {
          return res.status( 405 ).json( jsonResponse( "fail", { "message": "Thời gian nằm trong khoảng từ 5 - 20, định dạng là số!" } ) );
        }
        findItem.valueText = req.body.valueText;
        findItem.typeContent = "time";
        await foundBlock.save();
        return res.status( 201 ).json( jsonResponse( "success", foundBlock ) );
      }

      // With type item is attribute
      if ( findItem.typeContent === "tag" ) {
        const newAttribute = await new Attribute();

        newAttribute.name = "";
        newAttribute.value = "";
        newAttribute._account = userId;
        await newAttribute.save();
        findItem.valueText = `${findItem.valueText},${newAttribute._id}`;
        await foundBlock.save();
        return res.status( 201 ).json( jsonResponse( "success", foundBlock ) );
      }

      //  With type item is subscribe or unsubscribe
      if ( findItem.typeContent === "subscribe" || findItem.typeContent === "unsubscribe" ) {
        const sequences = req.body.valueText;
        let checkExist = false;

        sequences.map( async ( val ) => {
          if ( findItem.valueText.split( "," ).indexOf( val ) > -1 ) {
            checkExist = true;
            return checkExist;
          }
        } );
        if ( checkExist ) {
          return res.status( 405 ).json( jsonResponse( "fail", { "message": "Bạn đã thêm một trong những chuỗi kịch bản  này!" } ) );
        }

        findItem.valueText = findItem.valueText === "" ? req.body.valueText.toString() : `${findItem.valueText},${req.body.valueText.toString()}`;
        findItem.typeContent = findItem.typeContent === "subscribe" ? "subscribe" : "unsubscribe";
        await foundBlock.save();
        return res.status( 201 ).json( jsonResponse( "success", foundBlock ) );
      }

      // With type item is text
      findItem.valueText = req.body.valueText;
      findItem.typeContent = "text";
      await foundBlock.save();
      return res.status( 201 ).json( jsonResponse( "success", foundBlock ) );
    }
    // update name block
    foundBlock.name = req.body.name;
    await foundBlock.save();
    return res.status( 201 ).json( jsonResponse( "success", foundBlock ) );
  },
  /**
   *  delete block by user
   *  @param req
   *  @param res
   *
   */
  "delete": async ( req, res, next ) => {
    const foundBlock = await Block.findOne( { "_id": req.query._blockId, "_account": req.uid } );

    if ( !foundBlock ) {
      return res.status( 404 ).json( jsonResponse( "fail", { "message": "Block không tồn tại!" } ) );
    }
    // delete item in script using query
    if ( req.query._itemId ) {
      const findItem = foundBlock.contents.filter( ( x ) => x.id === req.query._itemId )[ 0 ];

      if ( typeof findItem === undefined ) {
        return res.status( 403 ).json( jsonResponse( "fail", { "message": "Nội dung block không tồn tại!" } ) );
      }
      if ( ( findItem.typeContent === "subscribe" && req.query._sequence ) || ( findItem.typeContent === "unsubscribe" && req.query._sequence ) ) {
        if ( findItem.valueText.split( "," ).indexOf( req.query._sequence ) < 0 ) {
          return res.status( 405 ).json( jsonResponse( "fail", "Không có trình tự kịch bản này trong item này! " ) );
        }
        findItem.valueText = findItem.valueText.split( "," ).filter( ( val ) => val !== req.query._sequence ).toString();
        await foundBlock.save();
        return res.status( 200 ).json( jsonResponse( "success", null ) );
      }
      if ( findItem.typeContent === "tag" && req.query._tag ) {
        if ( findItem.valueText.split( "," ).indexOf( req.query._tag ) < 0 ) {
          return res.status( 405 ).json( jsonResponse( "fail", "Không có attribute này trong item tag! " ) );
        }
        findItem.valueText = findItem.valueText.split( "," ).filter( ( val ) => val !== req.query._tag ).toString();
        await foundBlock.save();
        return res.status( 200 ).json( jsonResponse( "success", null ) );
      }
      foundBlock.contents.pull( findItem );
      await foundBlock.save();
      return res.status( 201 ).json( jsonResponse( "success", foundBlock ) );
    }
    // eslint-disable-next-line one-var
    const foundGroupBlock = await GroupBlock.find( { "_account": req.uid } );

    foundGroupBlock.map( async ( value ) => {
      if ( value._block.includes( foundBlock._id ) ) {
        value._block.pull( foundBlock._id );
        await value.save();
      }
      next();
    } );

    await Block.findByIdAndRemove( req.query._blockId );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  }
};
