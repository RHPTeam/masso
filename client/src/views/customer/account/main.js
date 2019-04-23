/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
import AppTop from "./desktop/top";
import UserInfo from "./desktop/info";

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
  components: {
    AppTop,
    UserInfo
  }
};
