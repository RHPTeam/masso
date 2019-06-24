import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  props: ["popupData"],
  components: {
    VuePerfectScrollbar
  },
  data() {
    return {
      helpCenterUrl: `${process.env.VUE_APP_PARENT_URL}/#/help`,
      menus: [
        {
          text: "Bảng điều khiển",
          icon: {
            iconName: "home",
            tagName: "icon-home",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: "post_dashboard"
        },
        {
          text: "Kho nội dung",
          icon: {
            iconName: "script",
            tagName: "icon-script",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: "post_posts"
        },
        {
          text: "Chiến dịch",
          icon: {
            iconName: "chat",
            tagName: "icon-chat",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: "post_campaigns"
        },
        {
          text: "Nhóm & Trang",
          icon: {
            iconName: "auto-answer",
            tagName: "icon-auto-answer",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: "post_group"
        },
        {
          text: "Tài khoản Facebook",
          icon: {
            iconName: "friend",
            tagName: "icon-friend",
            width: 22,
            height: 22,
            viewBox: "0 0 24 24"
          },
          to: "post_fbaccount"
        },
        {
          text: "Facebook tìm kiếm",
          icon: {
            iconName: "broadcast",
            tagName: "icon-broadcast",
            width: 21,
            height: 21,
            viewBox: "0 0 24 24"
          },
          to: "post_fb_search"
        }
      ]
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
