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
    if ( findSubString( req.headers.authorization, "cfr=", ";" ) !== "Admin" && findSubString( req.headers.authorization, "cfr=", ";" ) !== "SuperAdmin" ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền thực hiện chức năng này!" } );
    }
    // Reading file backup
    // eslint-disable-next-line handle-callback-err
    fs.readFile( __dirname.includes( "/" ) ? __dirname.replace( "controllers", "databases\\backup\\backup_category.txt" ) : __dirname.replace( "controllers", "databases\\backup\\backup_category.txt" ), "utf8", async function ( err, contents ) {
      // Handle per element
      contents.split( ",," ).forEach( async ( item ) => {
        const itemObject = JSON.parse( item ),
          findUser = await Account.findOne( { "other01": itemObject.uid } );

        let objectRes, newCategory;

        // Check user of category
        if ( !findUser ) {
          return ;
        }
        // Save data follow format to moongoose
        objectRes = {
          "title": itemObject.name,
          "_account": findUser._id
        };

        newCategory = new PostCategory( objectRes );
        await newCategory.save();
      } );
    } );
    res.status( 200 ).json( jsonResponse( "Backup dữ liệu danh mục bài đăng của người dùng thành công!", null ) );
  },
  /**
   * Backup data from older zinbee
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  "backupPost": async ( req, res ) => {
    // Check admin using
    if ( findSubString( req.headers.authorization, "cfr=", ";" ) !== "Admin" && findSubString( req.headers.authorization, "cfr=", ";" ) !== "SuperAdmin" ) {
      return res.status( 405 ).json( { "status": "error", "message": "Bạn không có quyền thực hiện chức năng này!" } );
    }
    // Reading file backup
    fs.readFile( __dirname.includes( "/" ) ? __dirname.replace( "controllers", "databases\\backup\\backup_post.txt" ) : __dirname.replace( "controllers", "databases\\backup\\backup_post.txt" ), "utf8", async function ( err, contents ) {
      // Handle per element
      contents.split( ",," ).forEach( async ( item ) => {
        const itemObject = JSON.parse( item ),
          findUser = await Account.findOne( { "other01": itemObject.uid } ),
          findPostCategory = await PostCategory.findOne( { "title": dictionaries.DEFAULT_POSTCATEGORY, "_account": findUser._id } ).lean();

        let objectRes, newPost, linkImage = [];

        // Check user of category
        if ( !findUser ) {
          return ;
        }
        // Handle regex link image
        if ( itemObject.type === "images" ) {
          let resImage = await Promise.all( itemObject.image.replace( /\\\//gi, "/" ).split( "," ).map( ( image ) => {
            return {
              "link": `${process.env.APP_URL}:${process.env.PORT_BASE}` + image.replace( /[\[\]"]+/g, "" ).replace( "https://srv2.zinbee.vn", "" ),
              "typeAttachment": 1
            };
          } ) );

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
        newPost._categories.push( findPostCategory._id );
        await newPost.save();
      } );
    } );
    res.status( 200 ).json( jsonResponse( "Backup dữ liệu bài đăng của người dùng thành công!", null ) );
  }
};
