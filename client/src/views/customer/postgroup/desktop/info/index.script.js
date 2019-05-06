import DeleteFriendsPopup from "../popup/delete/";
import AddGroupPopup from "../popup/addgroup";

export default {
  data() {
    return {
      showSequenceDropdown: false,
      isShowDeleteFrPopup: false,
      isShowAddtoGrPopup: false,
      search: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },

  methods: {
    closeSequenceDropdown() {
      this.showSequenceDropdown = false;
    },
    showDeleteFrPopup() {
      this.isShowDeleteFrPopup = true;
    },
    showAddtoGrPopup() {
      this.isShowAddtoGrPopup = true;
    },
    updateAccountSelected() {}
  },
  components: {
    DeleteFriendsPopup,
    AddGroupPopup
  }
};
