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
      helpCenterUrl: `${process.env.VUE_APP_PARENT_URL}/#/help`,
      menus: [ {
        text: "Bảng điều khiển",
        icon: {
          iconName: "Bảng điều khiển",
          tagName: "icon-home",
          width: 20,
          height: 20,
          viewBox: "0 0 24 24"
        },
        to: { name: "post_dashboard" }
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
          to: { name: "post_fbaccount" }
        },
        {
          text: "Facebook Tìm kiếm",
          icon: {
            iconName: "Facebook tìm kiếm",
            tagName: "icon-input-search",
            width: 22,
            height: 22,
            viewBox: "0 0 24 24"
          },
          to: { name: "post_fb_search" }
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
        to: {
          name: "post_posts",
          query: { size: 25, page: 1 }
        }
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
          to: { name: "post_group" }
        },
      {
        text: "Đăng bài tự động",
        icon: {
          iconName: "Chiến dịch",
          tagName: "icon-broadcast",
          width: 21,
          height: 21,
          viewBox: "0 0 24 24"
        },
        to: {
          name: "post_campaigns",
          query: { size: 25, page: 1 }
        }
      },
        {
          text: "Quản lý đại lý",
          icon: {
            iconName: "Đại lý",
            tagName: "icon-broadcast",
            width: 21,
            height: 21,
            viewBox: "0 0 24 24"
          },
          to: {
            name: "post_agency"
            // query: { size: 25, page: 1 }
          }
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
