import DeleteFriendsPopup from "../../../../../../components/popups/delete/index";
import AddGroupPopup from "../popup/addgroup/index";

export default {
  props: [ "groupSelected", "typeFilterSelected" ],
  data() {
    return {
      showDropdown: false,
      isShowDeleteFrPopup: false,
      isShowAddtoGrPopup: false,
      search: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    facebookGroups() {
      return this.$store.getters.facebookGroups;
    },
    facebookPages() {
      return this.$store.getters.facebookPages;
    },
    postGroupDetail() {
      return this.$store.getters.postGroupDetail;
    },
    postGroupGroupsSelected() {
      return this.$store.getters.postGroupGroupsSelected;
    },
    postGroupPagesSelected() {
      return this.$store.getters.postGroupPagesSelected;
    },
  },

  methods: {
    showDeleteFrPopup() {
      this.isShowDeleteFrPopup = true;
    },
    showAddtoGrPopup() {
      this.isShowAddtoGrPopup = true;
    },
    updateTypeSelected( val ) {
      this.$emit( "updateFilterSelected", val );
      this.showDropdown = false
    },
    closeShowDropdown(){
      this.showDropdown = false;
    }
  },
  components: {
    DeleteFriendsPopup,
    AddGroupPopup
  }
};
