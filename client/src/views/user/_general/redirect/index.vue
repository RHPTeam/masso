<template>
    <div>
        Redirecting...
    </div>
</template>
<script>
import axios from "axios";
import CookieFunction from "@/utils/functions/cookie";
import StringFunction from "@/utils/functions/string";
export default {
  async created() {
    const statusRedirect = await this.checkRedirect();
    if ( statusRedirect === true ) {
      this.$router.push( "/welcome" );
    }
  },
  methods: {
    async checkRedirect() {
      const query = this.$route.query;
      if ( query.hasOwnProperty( "authorization" ) ) {
        CookieFunction.setCookie( "sid", StringFunction.findSubString( query.authorization, "sid=", ";" ) );
        CookieFunction.setCookie( "uid", StringFunction.findSubString( query.authorization, "uid=", ";" ) );
        CookieFunction.setCookie( "cfr", StringFunction.findSubString( query.authorization, "cfr=", ";" ) );
        CookieFunction.setCookie( "token", "w,e#$oUFC99|_ADQ&,jv,9fd*Z4N<\"4!m.]s<3//Hy?oSTmZ.xj&'Y2..J47W+n" );
        CookieFunction.setCookie( "__v", "1.0.4" );
        axios.defaults.headers.common.Authorization = query.authorization;
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>
