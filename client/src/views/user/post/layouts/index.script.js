import AppHeader from "./desktop/header";
import AppSidebar from "./desktop/sidebar";
import AppNotification from "./desktop/notification";
import AppExpire from "./desktop/expire";

import CookieFunction from "@/utils/functions/cookie";

import HeaderMobile from "./mobile/header";
import FooterMobile from "./mobile/footer";

export default {
  data() {
    return {
      statusNetwork: true,
      showExpire: false
    };
  },
  created() {

    // Check Login
    this.setCheckLogin();
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    setCheckLogin() {
      this.interval = setInterval(() => this.$socket.emit( "check_login", CookieFunction.getCookie( "uid" ) ), 5000);
    }
  },
  sockets: {
    async statusAccount(value) {
      if (value === 405) {
        this.$store.dispatch("getAccountsFB");
      } else if (value === 404) {
        this.statusNetwork = false;
      }
    }
  },
  components: {
    AppHeader,
    AppSidebar,
    AppNotification,
    HeaderMobile,
    FooterMobile
  }
};
