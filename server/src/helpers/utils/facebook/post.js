module.exports = {
  "clickToPopup": async ( page, timer ) => {
    if ( timer <= 0 ) {
      return false;
    } else if ( await page.$( "textarea.navigationFocus" ) != null ) {
      await page.click( "textarea.navigationFocus" );
      return true;
    } else if ( await page.$( 'div[data-testid="react-composer-root"]' ) ) {
      await page.click( 'div[data-testid="react-composer-root"]' );
      return true;
    }
    const timerCount = timer - 1000;

    return module.exports.clickToPopup( timerCount );
  },
  "copyTextToClipboard": async ( page, text ) => {
    await page.evaluate( ( content ) => {
      const el = document.createElement( "textarea" );

      el.value = content;
      el.setAttribute( "readonly", "" );
      el.style = {
        "position": "absolute",
        "left": "-9999px"
      };
      document.body.appendChild( el );
      el.select();
      document.execCommand( "copy" );
      document.body.removeChild( el );
    }, text );
  },
  "pasteTextFromKeyboard": async ( page ) => {
    await page.keyboard.down( "Control" );
    await page.keyboard.down( "KeyV" );
  },
  "uploadImage": async ( imagesList, page, timer ) => {
    let imageCount = imagesList.length;

    if ( timer <= 0 ) {
      return false;
    } else if ( await page.$( 'input[data-testid="media-sprout"]' ) ) {
      await page.click( 'input[data-testid="media-sprout"]' );
      const input = await page.$( 'input[data-testid="media-sprout"]' );

      for ( let i = 0; i < imageCount; i++ ) {
        await input.uploadFile( imagesList[ i ] );
        await page.waitForSelector( "div.fbScrollableArea" );
        await page.waitForSelector(
          'div.fbScrollableAreaContent div[data-testid="media-attachment-photo"]'
        );
      }
      return true;
    } else if ( await page.$( 'div[data-testid="photo-video-button"]' ) ) {
      await page.click( 'div[data-testid="photo-video-button"]' );
      await page.waitForSelector( 'input[name="composer_photo"]' );
      await page.click( 'input[name="composer_photo"]' );
      const input = await page.$( 'input[name="composer_photo"]' );

      for ( let i = 0; i < imageCount; i++ ) {
        await input.uploadFile( imagesList[ i ] );
        await page.waitForSelector( "div.fbScrollableArea" );
        await page.waitForSelector(
          'div.fbScrollableAreaContent div[data-testid="media-attachment-photo"]'
        );
      }
      return true;
    }
    const timerCount = timer - 1000;

    return module.exports.uploadImage( imagesList, page, timerCount );
  },
  "clickToPost": async ( page, timer ) => {
    if ( await page.$( 'a[data-testid="dialog_title_close_button"]' ) !== null ) {
      await page.click( 'a[data-testid="dialog_title_close_button"]' );
    }

    if ( timer <= 0 ) {
      return false;

    } else if ( await page.$( 'div[data-testid="react-composer-root"] button[data-testid="react-composer-post-button"]' ) ) {
      await page.waitForFunction(
        'document.querySelector(\'div[data-testid="react-composer-root"] button[data-testid="react-composer-post-button"]\').disabled === false'
      );
      await page.click( 'div[data-testid="react-composer-root"] button[data-testid="react-composer-post-button"]' );
      return true;
    }
    await page.waitFor( 1000 );
    const timerCount = timer - 1000;

    return module.exports.clickToPost( page, timerCount );
  },
  "getIDPostPreview": async ( browser, feed, page ) => {
    try {
      await page.waitForSelector( 'div[data-ft*="mf_story_key"]' );
      // eslint-disable-next-line one-var
      const previewInfo = await page.$eval(
          'div[data-ft*="mf_story_key"]',
          ( div ) => div.getAttribute( "data-ft" )
        ),
        start = '"mf_story_key":"',
        end = '"';

      return {
        "error": {
          "code": 200,
          "text": null
        },
        "results": {
          "postID": previewInfo.substring(
            previewInfo.indexOf( start ) + start.length,
            previewInfo.indexOf( end, previewInfo.indexOf( start ) + start.length )
          ),
          "type":
          // eslint-disable-next-line no-nested-ternary
            feed.location.type === 0 ? "timeline" : feed.location.type === 1 ? "group" : feed.location.type === 2 ? "page" : null
        }
      };
    } catch ( e ) {
      await browser.close();
      console.log( "❎❎❎❎ Have error get ID preview post facebook but post is posted..." );
      return {
        "error": {
          "code": 200,
          "text": null
        },
        "results": {
          "postID": feed.location.type === 0 ? findSubString( cookie, "c_user=", ";" ) : feed.location.value,
          "type":
          // eslint-disable-next-line no-nested-ternary
            feed.location.type === 0 ? "timeline" : feed.location.type === 1 ? "group" : feed.location.type === 2 ? "page" : null
        }
      };
    }
  }
};
