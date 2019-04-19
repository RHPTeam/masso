/* eslint-disable strict */
const { agent } = require( "../configs/crawl" );
const pagesCore = require( "./core/pages.core" );
const groupsCore = require( "./core/groups.core" );
const { searchPost } = require( "./core/search.core" );
const { getPost } = require( "./core/posts.core" );

module.exports = {
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
