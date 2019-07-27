/**
 * Controller backup account
 * author: hoc-anms
 * date up: 05/06/2019
 * date to: ___
 * team: BE-RHP
 */
const fs = require( "fs" );
const jsonResponse = require( "../configs/response" );
const dictionaries = require( "../configs/dictionaries" );

const Account = require( "../models/Account.model" );
const Post = require( "../models/post/Post.model" );
const PostCategory = require( "../models/post/PostCategory.model" ),
  { findSubString } = require( "../helpers/utils/functions/string" );

module.exports = {
  /**
   * Backup data from older zinbee
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*|Promise<any>>}
   */
  "backupCategory": async ( req, res ) => {
    // Check admin using
    if (
      findSubString( req.headers.authorization, "cfr=", ";" ) !== "Admin" && findSubString( req.headers.authorization, "cfr=", ";" ) !== "SuperAdmin"
    ) {
      return res
        .status( 405 )
        .json( {
          "status": "error",
          "message": "Bạn không có quyền thực hiện chức năng này!"
        } );
    }
    // Reading file backup
    // eslint-disable-next-line handle-callback-err
    fs.readFile(
      __dirname.includes( "/" ) ? __dirname.replace(
        "controllers",
        "databases/backup/backup_category.txt"
      ) : __dirname.replace(
        "controllers",
        "databases\\backup\\backup_category.txt"
      ),
      "utf8",
      // eslint-disable-next-line handle-callback-err
      async function( err, contents ) {
        // Handle per element
        contents.split( ",,,," ).forEach( async ( item ) => {
          const itemObject = JSON.parse( item ),
            findUser = await Account.findOne( { "other01": itemObject.uid } );

          let objectRes, newCategory;

          // Check user of category
          if ( findUser ) {
            const findCategory = await Account.findOne( {
              "title": itemObject.name,
              "_account": findUser._id,
              "other01": itemObject.id
            } );

            if ( !findCategory ) {
              // Save data follow format to moongoose
              objectRes = {
                "title": itemObject.name,
                "_account": findUser._id,
                "other01": itemObject.id
              };

              newCategory = await new PostCategory( objectRes );
              await newCategory.save();
            }
          }
        } );
      }
    );
    res
      .status( 200 )
      .json(
        jsonResponse(
          "Backup dữ liệu danh mục bài đăng của người dùng thành công!",
          null
        )
      );
  },
  /**
   * Backup data from older zinbee
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  "backupPost": async ( req, res ) => {
    // Check admin using
    if (
      findSubString( req.headers.authorization, "cfr=", ";" ) !== "Admin" && findSubString( req.headers.authorization, "cfr=", ";" ) !== "SuperAdmin"
    ) {
      return res
        .status( 405 )
        .json( {
          "status": "error",
          "message": "Bạn không có quyền thực hiện chức năng này!"
        } );
    }
    // Reading file backup
    // eslint-disable-next-line handle-callback-err
    fs.readFile(
      __dirname.includes( "/" ) ? __dirname.replace( "controllers", "databases/backup/backup_post.txt" ) : __dirname.replace(
        "controllers",
        "databases\\backup\\backup_post.txt"
      ),
      "utf8",
      // eslint-disable-next-line handle-callback-err
      async function( err, contents ) {
        // Handle per element
        console.log( contents.split( ",,,,,," ).length );
        for ( let i = 0; i < 15015; i++ ) {
          const itemObject = JSON.parse( contents.split( ",,,,,," )[ i ] ),
            findUser = await Account.findOne( { "other01": itemObject.uid } );

          let objectRes,
            newPost,
            linkImage = [];

          // Check user of category
          if ( findUser ) {
            let findPostDefaultCategory = await PostCategory.findOne( {
                "title": dictionaries.DEFAULT_POSTCATEGORY,
                "_account": findUser._id
              } ).lean(),
              findPostCategory = await PostCategory.findOne( {
                "other01": itemObject.user_category,
                "_account": findUser._id
              } ).lean();

            // Handle regex link image
            if ( itemObject.type === "images" ) {
              let resImage = await Promise.all(
                itemObject.image
                  .replace( /\\\//gi, "/" )
                  .split( "," )
                  .map( ( image ) => {
                    return {
                      // eslint-disable-next-line prefer-template
                      "link": image.replace( /[\[\]"]+/g, "" ),
                      "typeAttachment": 1
                    };
                  } )
              );

              linkImage = linkImage.concat( linkImage, resImage );
            }
            // Save data follow format to moongoose
            objectRes = {
              "title": itemObject.name,
              "content": itemObject.message,
              "attachments": linkImage,
              "_account": findUser._id
            };
            if ( itemObject.type === "video" ) {
              objectRes.scrape = itemObject.image.replace( /\\\//gi, "/" );
            }


            newPost = await new Post( objectRes );
            // eslint-disable-next-line no-unused-expressions
            findPostCategory ? newPost._categories.push( findPostCategory._id ) : newPost._categories.push( findPostDefaultCategory._id );
            await newPost.save();
          }
        }
      }
    );
    res
      .status( 200 )
      .json(
        jsonResponse( "Backup dữ liệu bài đăng của người dùng thành công!", null )
      );
  },
  // "backupPostU981": async ( req, res ) => {
  //   await fs.readFile(
  //     __dirname.includes( "/" ) ? __dirname.replace( "controllers", "databases/backup/postwrite.txt" ) : __dirname.replace(
  //       "controllers",
  //       "databases\\backup\\postwrite.txt"
  //     ),
  //     "utf8",
  //     // eslint-disable-next-line handle-callback-err
  //     async function( err, contents ) {
  //       // Handle per element
  //       let data = contents.split( ",,,,,," );
  //
  //       for ( let i = 0; i < 508; i++ ) {
  //         const itemObject = JSON.parse( contents.split( ",,,,,," )[ i ] );
  //
  //         let findExistPost = await Post.findOne( { "_account": "5cfe56d99bda01c8901801c2", "title": itemObject.title } );
  //
  //
  //         if ( !findExistPost ) {
  //           let objectSave = {
  //               "title": itemObject.title,
  //               "content": itemObject.content,
  //               "_account": "5cfe56d99bda01c8901801c2",
  //               "tags": itemObject.tags
  //             },
  //             newPost = await new Post( objectSave );
  //
  //           if ( itemObject._categories.length > 0 ) {
  //             newPost._categories.push( itemObject._categories[ 0 ].$oid );
  //           }
  //           if ( itemObject.attachments.length > 0 ) {
  //             newPost.attachments.push( { "link": itemObject.attachments[ 0 ].link, "typeAttachment": 1 } );
  //           }
  //           await newPost.save();
  //           console.log( newPost._id );
  //         }
  //       }
  //
  //     }
  //   );
  //   res
  //     .status( 200 )
  //     .json(
  //       jsonResponse( "Backup dữ liệu bài đăng của người dùng thành công!", null )
  //     );
  // }
};
