const puppeteer = require( "puppeteer" ),
  { convertCookieFacebook } = require( "../../helpers/utils/functions/string" );

let getPageList = ( { cookie } ) => {
  return new Promise( async ( resolve ) => {
    try {
      // Open browser
      const pageListArr = [],
        cookieConverted = convertCookieFacebook( cookie ),
        browser = await puppeteer.launch( { "headless": false } ),
        // Open a new tab
        page = await browser.newPage(),
        // Define turn off notification popup
        context = browser.defaultBrowserContext();

      await context.overridePermissions( "https://www.facebook.com", [
        "notifications"
      ] );

      // set viewport
      await page.setViewport( { "width": 1366, "height": 768 } );

      // Set cookie before access to facebook
      await Promise.all(
        cookieConverted.map( ( element ) => {
          page.setCookie( element );
        } )
      );

      // Go to facebook.com/pages
      await page.waitFor( 1000 );
      await page.goto(
        "https://www.facebook.com/bookmarks/pages?ref_type=logout_gear"
      );

      await page.waitForSelector( "#bookmarksSeeAllEntSection" );

      // eslint-disable-next-line one-var
      const pageListElement = await page.$$( "#bookmarksSeeAllEntSection li" );

      for ( const pageElement of pageListElement ) {
        const uidGroup = await pageElement.$eval(
            'a[data-testid*="left_nav_item"]',
            ( a ) => {
              const shortInfoGroup = a.getAttribute( "data-gt" ),
                start = '"bmid":"',
                end = '"';

              return shortInfoGroup.substring(
                shortInfoGroup.indexOf( start ) + start.length,
                shortInfoGroup.indexOf(
                  end,
                  shortInfoGroup.indexOf( start ) + start.length
                )
              );
            }
          ),
          namePage = await pageElement.$eval(
            "div.linkWrap > span",
            ( span ) => span.innerText
          );

        pageListArr.push( {
          "id": uidGroup,
          "name": namePage
        } );
      }
      await browser.close();

      resolve( {
        "error": {
          "code": 200,
          "text": null
        },
        "results": pageListArr
      } );
    } catch ( error ) {
      await browser.close();
      resolve( {
        "error": {
          "code": 404,
          "text": "Xảy ra lỗi trong quá trình lấy thông tin bằng puppeteer!"
        },
        "results": error
      } );
    }
  } );
};

module.exports = async ( { cookie } ) => {
  return await getPageList( { cookie } );
};
