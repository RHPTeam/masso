/* eslint-disable prettier/prettier */
import UserAvatar from "./avatar/index";
import UserPersonalInfo from "./personalinfo/index";

export default {
  props: [ "user" ],
  data() {
    return {
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    UserAvatar,
    UserPersonalInfo
  }
};
