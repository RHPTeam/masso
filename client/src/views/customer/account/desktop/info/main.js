/* eslint-disable prettier/prettier */
import UserAvatar from "./avatar";
import UserPersonalInfo from "./personalinfo";

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
