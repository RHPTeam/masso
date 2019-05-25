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
      menus: [ {
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
          iconName: "broadcasts",
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
          iconName: "friend",
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
          iconName: "fbaccount",
          tagName: "icon-account",
          width: 20,
          height: 20,
          viewBox: "0 0 24 24"
        },
        to: "post_fbaccount"
      }
      ]
    };
  }
};
