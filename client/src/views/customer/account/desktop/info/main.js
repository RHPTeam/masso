/* eslint-disable prettier/prettier */
import UserAvatar from "./avatar";
import UserPersonalInfo from "./personalinfo";

export default {
  props: [ "user" ],
  computed: {
    // user() {
    //   if ( this.$store.getters.userInfo === undefined ) {
    //     return;
    //   }
    //   return this.$store.getters.userInfo;
    // },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    UserAvatar,
    UserPersonalInfo
  }
};
