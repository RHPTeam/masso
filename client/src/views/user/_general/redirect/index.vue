<template>
    <div>
        Redirecting...
    </div>
</template>
<script>
import axios from "axios";
import CookieFunction from "@/utils/functions/cookie";
import StringFunction from "@/utils/functions/string";

const checkRedirect = ( query ) => {
  return new Promise( (resolve) => {
    if ( query.hasOwnProperty( "authorization" ) ) {
      CookieFunction.setCookie( "sid", StringFunction.findSubString( query.authorization, "sid=", ";" ) );
      CookieFunction.setCookie( "uid", StringFunction.findSubString( query.authorization, "uid=", ";" ) );
      CookieFunction.setCookie( "cfr", StringFunction.findSubString( query.authorization, "cfr=", ";" ) );
      CookieFunction.setCookie( "token", "w,e#$oUFC99|_ADQ&,jv,9fd*Z4N<\"4!m.]s<3//Hy?oSTmZ.xj&'Y2..J47W+n" );
      CookieFunction.setCookie( "__v", "1.0.4" );
      axios.defaults.headers[ "Authorization" ] = query.authorization;
      if ( query.authorization && CookieFunction.getCookie( "sid" ).length > 0 && axios.defaults.headers[ "Authorization" ].length > 30 ) {
        console.log( query.authorization)
        resolve( true );
      }
      resolve( false );
    }
  } );
};

export default {
  async created() {
    const query = this.$route.query;
    const statusRedirect = await checkRedirect( query );
    if ( statusRedirect === true ) {
      this.$router.push( "/welcome" );
    }
  }
}
</script>
