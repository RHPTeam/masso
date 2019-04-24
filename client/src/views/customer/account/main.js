/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
import AppTop from "./desktop/top";
import UserInfo from "./desktop/info";
import UserKeywords from "./desktop/keywords";

export default {
  data() {
    return {
      user: {
        name: "Yến Đặng",
        email: "dangthiyen103@gmail.com",
        expireDate: new Date(),
        imageAvatar: "http://source.unsplash.com/random/500x500",
        phone: "0987651344"
      }
    };
  },
  // async created() {
  //   await this.$store.dispatch( "getUserInfo" );
  // },
  computed: {
    users() {
      // console.log( this.$store.getters.user );
    }
  },
  components: {
    AppTop,
    UserInfo,
    UserKeywords
  }
};
