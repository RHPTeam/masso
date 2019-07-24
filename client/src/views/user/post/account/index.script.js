/* eslint-disable prettier/prettier */
import AppTop from "./desktop/top/index";
import UserInfo from "./desktop/info/index";
import UserKeywords from "./desktop/keywords/index";
// -- App Mobile
import AppHeaderMobile from "./mobile/header";
import AppMainMobile from "./mobile/main";

export default {
  data() {
    return {
    };
  },
  computed: {
    user() {
      if (this.$store.getters.userInfo === undefined || this.$store.getters.userInfo === '') {
        return;
      }
      return this.$store.getters.userInfo;
    }
  },
  components: {
    AppTop,
    UserInfo,
    UserKeywords,
    AppHeaderMobile,
    AppMainMobile
  }
};
