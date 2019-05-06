import DeleteGroupPopup from "../popup/delete";

export default {
  data() {
    return {
      isActive: true,
      isShowDeletePopup: false,
      groupFriend: [
        "Mỹ phẩm và Làm đẹp",
        "Tương tác lớn",
        "Du lịch"
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
