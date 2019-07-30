import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Loading from "@/components/shared/loading";
import AppNotification from "./desktop/notification";
import AppHeader from "./desktop/header";
import AppSidebar from "./desktop/sidebar";
import AppExpire from "./desktop/expire";

export default {
  data() {
    return {
      statusNetwork: true,
      isShowPopupExpire: false
    };
  },
  created() {
    this.$store.dispatch("getUserInfo");
    this.$store.dispatch("getAccountsFB");
    this.$store.dispatch( "getAllFriendFacebook" );
  },
  computed: {
    status() {
      return this.$store.getters.authStatus;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    VuePerfectScrollbar,
    Loading,
    AppHeader,
    AppSidebar,
    AppNotification,
    AppExpire
  }
};
