import DeleteGroupPopup from "../popup/delete";

export default {
  data() {
    return {
      isActive: true,
      isShowDeletePopup: false,
      groupFriend: [
        "Khách Hàng Tiềm Năng",
        "Nhóm Bạn Bè 1",
        "Nhóm Bạn Bè 2"
      ]
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }

  },
  methods: {
    createGroup() {

    },
    showDeletePopup() {
      this.isShowDeletePopup = true;
    },
    seeAllUsers() {

    }

  },
  components: {
    DeleteGroupPopup
  }
};
