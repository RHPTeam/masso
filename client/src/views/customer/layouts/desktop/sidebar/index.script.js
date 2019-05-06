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
        to: ""
      },
      {
        text: "Bài đăng",
        icon: {
          iconName: "script",
          tagName: "icon-script",
          width: 20,
          height: 20,
          viewBox: "0 0 24 24"
        },
        to: "posts"
      },
      {
        text: "Chiến dịch",
        icon: {
          iconName: "broadcast",
          tagName: "icon-broadcast",
          width: 21,
          height: 21,
          viewBox: "0 0 24 24"
        },
        to: "campaigns"
      },
      {
        text: "Quản lý nhóm",
        icon: {
          iconName: "friend",
          tagName: "icon-friend",
          width: 20,
          height: 20,
          viewBox: "0 0 24 24"
        },
        to: "target-groups"
      },
      {
        text: "Bạn bè",
        icon: {
          iconName: "friend",
          tagName: "icon-friend",
          width: 20,
          height: 20,
          viewBox: "0 0 24 24"
        },
        to: "f_friends"
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
        to: "f_account"
      }
      ]
    };
  }
};
