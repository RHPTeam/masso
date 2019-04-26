/* eslint-disable strict */
const { agent } = require( "../configs/crawl" );
const pagesCore = require( "./core/pages.core" );
const groupsCore = require( "./core/groups.core" );
const { searchPost } = require( "./core/search.core" );
const { createPost, getPost } = require( "./core/posts.core" );

module.exports = {
  "createPost": async ( req, res ) => {
    const result = await createPost( {
      "cookie": req.body.cookie || null,
      "agent": agent,
      "content": req.body.content,
      "images": req.body.images ? req.body.images : [],
      "color": req.body.color || null,
      "location": req.body.location || null,
      "scrapeLink": req.body.scrapeLink ? req.body.scrapeLink : "",
      "youtube": req.body.youtube || null
    } );

    return res.send( result );
  },
  "gettAllPages": async ( req, res ) => {
    const result = await pagesCore( {
      "cookie": req.body.cookie || null,
      "agent": agent
    } );

    return res.send( result );
  },
  "getAllGroups": async ( req, res ) => {
    const result = await groupsCore( {
      "cookie": req.body.cookie || null,
      "agent": agent
    } );

    return res.send( result );
  },
  "getPost": async ( req, res ) => {
    const result = await getPost( {
      "cookie": req.body.cookie || null,
      "agent": agent,
      "id": req.params.id
    } );

    return res.send( result );
  },
  "searchPosts": async ( req, res ) => {
    const result = await searchPost( {
      "keyword": req.query.keyword,
      "number": req.query.number,
      "cookie": req.body.cookie || null,
      "agent": agent
    } );

    return res.send( result );
  },
  "searchGroups": async () => {},
  "searchPages": async () => {}
};
