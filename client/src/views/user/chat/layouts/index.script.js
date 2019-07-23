import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Loading from "@/components/shared/loading";
import AppNotification from "./desktop/notification";
import AppHeader from "./desktop/header";
import AppSidebar from "./desktop/sidebar";
import AppExpire from "./desktop/expire";

export default {
  data() {
    return {
      timer: "",
      statusNetwork: true,
      isShowPopupExpire: false
    };
  },
  created() {
    // this.startUpdateTimer();
    this.$store.dispatch("getUserInfo");
    this.$store.dispatch("getAccountsFB");
    this.$store.dispatch( "getAllFriendFacebook" );
  },
  beforeDestroy() {
    this.stopUpdateTimer();
  },
  computed: {
    status() {
      return this.$store.getters.authStatus;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    infoAccount() {
      const results = this.$store.getters.accountsFB;
      return results.filter(item => item.status === false);
    }
  },
  methods: {
    setTimer() {
      this.timer = new Date(Date.now());
    },
    startUpdateTimer() {
      this.timer = setInterval(this.setTimer, 1000);
    },
    stopUpdateTimer() {
      clearInterval(this.timer);
    }
  },
  watch: {
    timer(value) {
      if (!value) return;
      if (typeof value === "number") return;
      if (parseInt(value.getHours()) > 5 && parseInt(value.getHours()) < 18) {
        this.$store.dispatch("changeThemeName", "dark");
      } else if (
        (parseInt(value.getHours()) >= 18 &&
          parseInt(value.getHours()) <= 23) ||
        (parseInt(value.getHours()) >= 0 && parseInt(value.getHours()) <= 5)
      ) {
        this.$store.dispatch("changeThemeName", "dark");
      }
    }
  },
  sockets: {
    async statusAccount(value) {
      console.log(value);
      if (value === 405) {
        this.$store.dispatch("getAccountsFB");
      } else if (value === 404) {
        this.statusNetwork = false;
      }
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
