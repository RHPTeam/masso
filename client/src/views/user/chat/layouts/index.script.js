import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Loading from "@/components/shared/loading";
import AppNotification from "@/components/shared/notification";
import AppHeader from "./desktop/header";
import AppSidebar from "./desktop/sidebar";

export default {
  data() {
    return {
      timer: ""
    };
  },
  created() {
    // this.startUpdateTimer();
    // await this.$store.dispatch("getUserInfo");
    // await this.$store.dispatch("getAccountsFB");
    // this.$store.dispatch( "getAllFriendFacebook" );
  },
  // beforeDestroy() {
  //   this.stopUpdateTimer();
  // },
  computed: {
    // status() {
    //   return this.$store.getters.authStatus;
    // },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    // infoAccount() {
    //   const results = this.$store.getters.accountsFB;
    //   return results.filter(item => item.status === false);
    // }
  },
  methods: {
    // setTimer() {
    //   this.timer = new Date(Date.now());
    // },
    // startUpdateTimer() {
    //   this.timer = setInterval(this.setTimer, 1000);
    // },
    // stopUpdateTimer() {
    //   clearInterval(this.timer);
    // }
  },
  // watch: {
  //   timer(value) {
  //     if (!value) return;
  //     if (typeof value === "number") return;
  //     if (parseInt(value.getHours()) > 5 && parseInt(value.getHours()) < 18) {
  //       this.$store.dispatch("changeThemeName", "light");
  //     } else if (
  //       (parseInt(value.getHours()) >= 18 &&
  //         parseInt(value.getHours()) <= 23) ||
  //       (parseInt(value.getHours()) >= 0 && parseInt(value.getHours()) <= 5)
  //     ) {
  //       this.$store.dispatch("changeThemeName", "dark");
  //     }
  //   }
  // },
  // sockets: {
  //   async checkLogout(value) {
  //     console.log(value);
  //     if (value.account.status == false && value.code === 1403) {
  //       this.$store.dispatch("getAccountsFB");
  //     }
  //   }
  // },
  components: {
    VuePerfectScrollbar,
    Loading,
    AppHeader,
    AppSidebar,
    AppNotification
  }
};
