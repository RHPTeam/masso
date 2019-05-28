import CookieFunction from "@/utils/functions/cookie";
import SecureFunction from "@/utils/functions/decode";
import router from '../../routes'
import store from '../../store'

/** ******************* SECURED ROUTER ************************/
router.beforeEach( ( to, from, next ) => {
  if ( to.matched.some( ( record ) => record.meta.requiredAuth ) ) {
    if ( CookieFunction.getCookie( "sid" ) && CookieFunction.getCookie( "cfr" ) && CookieFunction.getCookie( "uid" ) ) {
      next();
      return;
    }
    window.location = process.env.VUE_APP_PARENT_URL;
  } else if (
    store.getters.mailSender === "" && to.path === "/reset-password/step-2"
  ) {
    next( "/reset-password" );
  } else if (
    store.getters.mailSender === "" && to.path === "/reset-password/step-3"
  ) {
    next( "/reset-password" );
  } else {
    next();
  }
} );
