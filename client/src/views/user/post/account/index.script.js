/* eslint-disable prettier/prettier */
import AppDesktop from "./desktop";
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
    AppDesktop,
    AppHeaderMobile,
    AppMainMobile
  }
};
