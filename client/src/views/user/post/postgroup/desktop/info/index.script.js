import DeletePopup from "@/components/popups/delete";
import AddGroupPopup from "../popup/addgroup";

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
      isShowUpdateFanpage: false,
      isShowUpdateGroup: false,
      search: "",
      targetDeletePopupData: {},
    };
  },
  computed: {
    accountsFB() {
      return this.$store.getters.accountsFB;
    },
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
    postProfileSelected() {
      return this.$store.getters.postProfileSelected;
    }
  },
  async created() {
    await this.$store.dispatch( "getAccountsFB" );
  },
  methods: {
    closeUpdateFanpage(){
      this.isShowUpdateFanpage = false;
    },
    closeUpdateGroup(){
      this.isShowUpdateGroup  = false;
    },
    closeShowDropdown(){
      this.showDropdown = false;
    },
    showDeletePopup() {
      this.isShowDeletePopup = true;

      this.targetDeletePopupData = {
        id: this.postGroupDetail._id,
        _pages: this.postGroupPagesSelected,
        _groups: this.postGroupGroupsSelected,
        _timeline: this.postProfileSelected
      };
    },
    showAddtoGrPopup() {
      this.isShowAddtoGrPopup = true;
    },
    /*async updateGroupsAndPages() {
      await this.$store.dispatch( "getAccountsFB" );
      await this.$store.dispatch( "updateFacebookPages" );
      await this.$store.dispatch( "updateFacebookGroups" );
    },*/
    async updateFanpageFacebook(val) {
      await this.$store.dispatch( "updateFacebookPages", val._id );
      this.closeUpdateFanpage();
    },
    async updateGroupFacebook(val) {
      await this.$store.dispatch( "updateFacebookGroups", val._id );
      this.closeUpdateGroup();
    },
    updateSearch() {
      this.$emit( "updateSearch", this.search );
    },
    updateTypeSelected( val ) {
      this.$emit( "updateFilterSelected", val );
      this.showDropdown = false
    }
  }
};
