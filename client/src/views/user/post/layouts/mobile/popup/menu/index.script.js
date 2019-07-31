import VuePerfectScrollbar from "vue-perfect-scrollbar";
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
    showDashboard() {
      this.$store.dispatch("actionCursorMenu", 0);
      this.$router.push({ name: "post_dashboard" });
      this.$emit("closePopup", false);
    },
    showPosts() {
      this.$store.dispatch("actionCursorMenu", 1);
      this.$store.dispatch("actionCursor", 11);
      this.$router.push({ name: "post_posts", query: { size: 25, page: 1 } });
      this.$emit("closePopup", false);
    },
    showCampaign() {
      this.$store.dispatch("actionCursorMenu", 2);
      this.$router.push({ name: "post_campaigns", query: { size: 25, page: 1 } });
      this.$emit("closePopup", false);
    },
    showPostgroup() {
      this.$store.dispatch("actionCursorMenu", 3);
      this.$router.push({ name: 'post_group' });
      this.$emit("closePopup", false);
    },
    showAccountFb() {
      this.$store.dispatch("actionCursorMenu", 4);
      this.$router.push({ name: 'post_fbaccount' });
      this.$emit("closePopup", false);
    },
    showSearchFb() {
      this.$store.dispatch("actionCursorMenu", 5);
      this.$router.push({ name: 'post_fb_search' });
      this.$emit("closePopup", false);
    },
    showSetupAccount() {
      this.$store.dispatch("actionCursorMenu", 6);
      this.$router.push({ name: 'post_account' });
      this.$emit("closePopup", false);
    },
    showPricingPlan() {
      this.$store.dispatch("actionCursorMenu", 7);
      this.$router.push({ name: 'pricing_plan' });
      this.$emit("closePopup", false);
    }
  },
  filters: {
    getFirstLetter(string) {
      if (typeof string == "undefined") return;
      if (string.length == 0) return;
      return string.charAt(0).toUpperCase();
    }
  }
};
