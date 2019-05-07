
import DeletePopup from "../popup/delete";

export default {
  props: [ "groupSelected", "typeFilterSelected" ],
  data() {
    return {
      campaignDelete: {},
      isShowDeleteCampaignPopup: false,
    };
  },
  created() {
    this.$store.dispatch( "getFacebookPages" );
    this.$store.dispatch( "getFacebookGroups" );
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    facebookGroups() {
      return this.$store.getters.facebookGroups;
    },
    facebookGroupsStatus() {
      return this.$store.getters.facebookGroupsStatus;
    },
    facebookPages() {
      return this.$store.getters.facebookPages;
    },
    facebookPagesStatus() {
      return this.$store.getters.facebookPagesStatus;
    },
    postGroupDetail() {
      return this.$store.getters.postGroupDetail;
    },
    postGroupDetailStatus() {
      return this.$store.getters.postGroupDetailStatus;
    },
    selectAll: {
      get() {
        if (this.groupSelected === false) {
          return this.users
            ? this.selectedUIDs.length === this.users.length
            : false;
        } else {
          return this.usersOfGroup
            ? this.selectedUIDs.length === this.usersOfGroup.length
            : false;
        }
      },
      set(value) {
        let selected = [];
        console.log("value");
        if (this.groupSelected === false) {
          if (value) {
            this.users.forEach(function(user) {
              selected.push(user._id);
            });
          }
        } else {
          if (value) {
            this.usersOfGroup.forEach(function(user) {
              selected.push(user._id);
            });
          }
        }

        this.selectedArr = selected;
        this.$store.dispatch("selectedUIDs", this.selectedArr);
      }
    },
  },
  methods: {
  },
  components: {
    DeletePopup
  }
};
