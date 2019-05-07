import DeleteFriendsPopup from "../popup/delete/";
import AddGroupPopup from "../popup/addgroup";

export default {
  props: [ "typeFilterSelected" ],
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
    updateTypeSelected( val ) {
      this.$emit( "updateFilterSelected", val );
      this.showSequenceDropdown = false
    }
  },
  components: {
    DeleteFriendsPopup,
    AddGroupPopup
  }
};
