
export default {
  props: ["popupData"],
  data() {
    return {
      menus: [
        {
          text: "Bảng điều khiển",
          icon: {
            name: "icon-home",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "",
          IconComp: "IconHome"
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
          IconComp: "IconChat"
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
          IconComp: "IconAutoReply"
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
          IconComp: "IconTimer"
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
          IconComp: "IconScript"
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
          IconComp: "IconFriend"
        },
        // {
        //   text: "Tài khoản Facebook",
        //   icon: {
        //     name: "icon-user",
        //     width: 20,
        //     height: 20,
        //     viewBox: "0 0 25 25"
        //   },
        //   // to: "f_account",
        //   IconComp: "IconUser"
        // },
        // {
        //   text: "Thư viện",
        //   icon: {
        //     name: "icon-libs",
        //     width: 20,
        //     height: 20,
        //     viewBox: "0 0 25 25"
        //   },
        //   // to: "f_libraries",
        //   IconComp: "IconLibs"
        // }
      ],
      privateData: [
        {
          text: "Tùy chỉnh",
          icon: {
            name: "icon-home",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          // to: "c_dashboard",
          IconComp: "IconHome"
        },
        {
          text: "Riêng tư",
          icon: {
            name: "icon-user",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          // to: "c_dashboard",
          IconComp: "IconUser"
        }
      ]
    };
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    }
  }
};
