/* eslint-disable prettier/prettier */
import AppTop from "./desktop/top";
import UserInfo from "./desktop/info";
import UserKeywords from "./desktop/keywords";

export default {
  data() {
    return {
    };
  },
  computed: {
    user() {
      if ( this.$store.getters.userInfo === undefined ) {
        return;
      }
      return this.$store.getters.userInfo;
    }
  },
  components: {
    AppTop,
    UserInfo,
    UserKeywords
  }
};
