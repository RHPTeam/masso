import VuePerfectScrollbar from "vue-perfect-scrollbar";
import CookieFunction from "@/utils/functions/cookie";
export default {
  props: ["popupData"],
  components: {
    VuePerfectScrollbar
  },
  data() {
    return {
      helpCenterUrl: `${process.env.VUE_APP_PARENT_URL}/#/help`,
      file: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    async logout() {
      await this.$store.dispatch('logout');
      window.location.href = `${process.env.VUE_APP_PARENT_URL}/#/redirect`;
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.sendFile();
    },
    sendFile() {
      const formData = new FormData();

      formData.append("profileUrl", this.file);
      this.$store.dispatch("sendFile", formData);
    },
    showAgency() {
      this.$emit("closePopup", false);
      this.$router.push({ name: "post_agency" });
    },
    showDashboard() {
      this.$emit("closePopup", false);
      this.$store.dispatch("actionCursorMenu", 0);
      this.$router.push({ name: "post_dashboard" });
    },
    showPosts() {
      this.$emit("closePopup", false);
      this.$store.dispatch("actionCursorMenu", 1);
      this.$store.dispatch("actionCursor", 11);
      this.$router.push({ name: "post_posts", query: { size: 25, page: 1 } });
    },
    showCampaign() {
      this.$emit("closePopup", false);
      this.$store.dispatch("actionCursorMenu", 2);
      this.$router.push({ name: "post_campaigns", query: { size: 25, page: 1 } });
    },
    showPostgroup() {
      this.$emit("closePopup", false);
      this.$store.dispatch("actionCursorMenu", 3);
      this.$router.push({ name: 'post_group' });
    },
    showAccountFb() {
      this.$emit("closePopup", false);
      this.$store.dispatch("actionCursorMenu", 4);
      this.$router.push({ name: 'post_fbaccount' });
    },
    showSearchFb() {
      this.$emit("closePopup", false);
      this.$store.dispatch("actionCursorMenu", 5);
      this.$router.push({ name: 'post_fb_search' });
    },
    showSetupAccount() {
      this.$emit("closePopup", false);
      this.$store.dispatch("actionCursorMenu", 6);
      this.$router.push({ name: 'post_account' });
    }
  },
  created() {    
    const res = CookieFunction.getCookie("cfr");
    this.roles = res;
  },
  filters: {
    getFirstLetter(string) {
      if (typeof string == "undefined") return;
      if (string.length == 0) return;
      return string.charAt(0).toUpperCase();
    }
  }
};
