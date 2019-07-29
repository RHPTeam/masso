import AppHeader from "./desktop/header";
import AppSidebar from "./desktop/sidebar";
import AppNotification from "./desktop/notification";
import AppExpire from "./desktop/expire";
import GuidePopup from "./desktop/guide"

import HeaderMobile from "./mobile/header";
import FooterMobile from "./mobile/footer";

export default {
  data() {
    return {
      statusNetwork: true,
      showExpire: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    variableControlGuide(){
      return this.$store.getters.variableControlGuide;
    },
  },
  components: {
    AppHeader,
    AppSidebar,
    AppNotification,
    AppExpire,
    GuidePopup,
    HeaderMobile,
    FooterMobile
  }
};
