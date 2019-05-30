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
  created() {
    const query = this.$route.query;
    if ( query.hasOwnProperty( "authorization" ) ) {
      CookieFunction.setCookie( "sid", StringFunction.findSubString( query.authorization, "sid=", ";" ) );
      CookieFunction.setCookie( "uid", StringFunction.findSubString( query.authorization, "uid=", ";" ) );
      CookieFunction.setCookie( "cfr", StringFunction.findSubString( query.authorization, "cfr=", ";" ) );
      CookieFunction.setCookie( "token", "kdsjfkajsdfp7983uhfe787878vhjfhvwpreterdjfhasjhfjashfja" );
      CookieFunction.setCookie( "__v", "1.0.0" );

      axios.defaults.headers.common.Authorization = query.authorization;

      this.$router.push( "/welcome" );
    }
  }
}
</script>
