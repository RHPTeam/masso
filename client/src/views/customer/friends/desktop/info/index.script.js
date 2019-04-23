import DeleteFriendsPopup from "../popup/delete/";
import AddGroupPopup from "../popup/add-group";
import AppTooltip from "./tooltip";

export default {
  data() {
    return {
      showSequenceDropdown: false,
      isShowDeleteFrPopup: false,
      isShowAddtoGrPopup: false,
      search: "",
      groupName: "Khách Hàng Tiềm Năng"
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
    AddGroupPopup,
    AppTooltip
  }
};
