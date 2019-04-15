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
          to: ""
        },
        {
          text: "Kịch bản",
          icon: {
            iconName: "script",
            tagName: "icon-script",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: ""
        },
        {
          text: "Trò chuyện",
          icon: {
            iconName: "chat",
            tagName: "icon-chat",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: ""
        },
        {
          text: "Trả lời tự động",
          icon: {
            iconName: "auto-answer",
            tagName: "icon-auto-answer",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: ""
        },
        {
          text: "Bạn bè",
          icon: {
            iconName: "friend",
            tagName: "icon-friend",
            width: 22,
            height: 22,
            viewBox: "0 0 24 24"
          },
          to: ""
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
          to: ""
        },

        {
          text: "Tài khoản Facebook",
          icon: {
            iconName: "account",
            tagName: "icon-account",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: ""
        }
      ]
    };
  }
};
