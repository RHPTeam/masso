const puppeteer = require( "puppeteer" ),
  { convertCookieFacebook, findSubString } = require( "../../helpers/utils/functions/string" ),
  Facebook = require( "../../models/Facebook.model" );

let getPageList = ( { cookie } ) => {
  return new Promise( async ( resolve ) => {
    const browser = await puppeteer.launch( { "headless": false } );

    try {
      // Open browser
      const pageListArr = [],
        cookieConverted = await convertCookieFacebook( cookie ),
        // Open a new tab
        page = await browser.newPage(),
        // Define turn off notification popup
        context = browser.defaultBrowserContext();

      await context.overridePermissions( "https://www.facebook.com", [
        "notifications"
      ] );

      // Set cookie before access to facebook
      await page.setCookie( ...cookieConverted );

      // Go to facebook.com/pages
      await page.waitFor( 1000 );
      await page.goto(
        "https://www.facebook.com/bookmarks/pages?ref_type=logout_gear"
      );

      if ( await page.$( "form#login_form" ) !== null ) { // Check if account has cookie expired
        await browser.close();
        console.log( "🥵🥵🥵🥵 FB account expired! 🥵🥵🥵🥵" );

        await Facebook.updateOne( { "userInfo.id": findSubString( cookie, "c_user=", ";" ) }, { "status": false }, ( err ) => {
          if ( err ) {
            throw Error( "Xảy ra lỗi trong quá trình cập nhật lại tài khoản khi đã bị đăng xuất." );
          }
        } );

        resolve( {
          "error": {
            "code": 404,
            "text": "Mã kích hoạt đã hết hạn! Vui lòng lấy lại mã kích hoạt và thử lại.!"
          },
          "results": null
        } );
      }

      await page.waitForSelector( "#bookmarksSeeAllEntSection" );

      // eslint-disable-next-line one-var
      const pageListElement = await page.$$( "#bookmarksSeeAllEntSection li" );

      if ( pageListElement.length > 0 ) {
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
