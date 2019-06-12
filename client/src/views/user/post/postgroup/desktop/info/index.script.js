import DeletePopup from "../../../../../../components/popups/delete/index";
import AddGroupPopup from "../popup/addgroup/index";

export default {
  components: {
    DeletePopup,
    AddGroupPopup
  },
  props: [ "groupSelected", "typeFilterSelected" ],
  data() {
    return {
      showDropdown: false,
      isShowDeletePopup: false,
      isShowAddtoGrPopup: false,
      targetDeletePopupData: {},
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
    showDeletePopup() {
      this.isShowDeletePopup = true;

      this.targetDeletePopupData = {
        id: this.postGroupDetail._id,
        _pages: this.postGroupPagesSelected,
        _groups: this.postGroupGroupsSelected
      };
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
  }
};
