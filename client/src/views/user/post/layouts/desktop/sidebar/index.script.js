export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    collapseMenu() {
      return this.$store.getters.collapseMenu;
    }
  },
  data() {
    return {
      isShowFlagDropdown: false,
      menus: [ {
        text: "Bảng điều khiển",
        icon: {
          iconName: "Bảng điều khiển",
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
          iconName: "Kho nội dung",
          tagName: "icon-post",
          width: 20,
          height: 20,
          viewBox: "0 0 540 540"
        },
        to: "post_posts"
      },
      {
        text: "Chiến dịch",
        icon: {
          iconName: "Chiến dịch",
          tagName: "icon-broadcast",
          width: 21,
          height: 21,
          viewBox: "0 0 24 24"
        },
        to: "post_campaigns"
      },
      {
        text: "Nhóm & Trang",
        icon: {
          iconName: "Nhóm & Trang",
          tagName: "icon-friend",
          width: 20,
          height: 20,
          viewBox: "0 0 24 24"
        },
        to: "post_group"
      },
      {
        text: "Tài khoản Facebook",
        icon: {
          iconName: "Tài khoản Facebook",
          tagName: "icon-account",
          width: 20,
          height: 20,
          viewBox: "0 0 24 24"
        },
        to: "post_fbaccount"
      },
      {
        text: "Facebook tìm kiếm",
        icon: {
          iconName: "Facebook tìm kiếm",
          tagName: "icon-input-search",
          width: 22,
          height: 22,
          viewBox: "0 0 24 24"
        },
        to: "post_fb_search"
      }
      ]
    };
  },
  methods: {
    closeFlagDropdown(){
      this.isShowFlagDropdown = false;
    },
    showFlagDropdown(){
      this.isShowFlagDropdown = true;
    }
  },
};
