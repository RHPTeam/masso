import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  data() {
    return {
      isShowTabFanpage: false,
      isShowTabGroup: false,
      isShowTabProfile: true
    }
  },
  components: {
    VuePerfectScrollbar
  },
  computed: {
    selectedProfile: {
      get() {
        return this.$store.getters.postProfileSelected;
      },
      set( val ) {
        this.$store.dispatch( "postProfileSelected", val );
      }
    },
    accountsFB() {
      return this.$store.getters.accountsFB;
    },
    facebookPages() {
      return this.$store.getters.facebookPages;
    },
    facebookGroups() {
      return this.$store.getters.facebookGroups;
    },
    facebookPages() {
      return this.$store.getters.facebookPages;
    },
    facebookGroups() {
      return this.$store.getters.facebookGroups;
    },
    postGroupGroupsSelected: {
      get() {
        return this.$store.getters.postGroupGroupsSelected;
      },
      set(val) {
        this.$store.dispatch("postGroupGroupsSelected", val);
      }
    },
    postGroupPagesSelected: {
      get() {
        return this.$store.getters.postGroupPagesSelected;
      },
      set(val) {
        this.$store.dispatch("postGroupPagesSelected", val);
      }
    }
  },
  methods: {
    showTabprofile() {
      this.isShowTabProfile = true;
      this.isShowTabFanpage = false;
      this.isShowTabGroup = false;
    },
    showTabFanpage() {
      this.isShowTabFanpage = true;
      this.isShowTabGroup = false;
      this.isShowTabProfile = false;
    },
    showTabGroup() {
      this.isShowTabGroup = true;
      this.isShowTabFanpage = false;
      this.isShowTabProfile = false;
    }
  },
  created() {
    // const facebookGroupsNo = this.$store.getters.facebookGroups;
    // const facebookPagesNo = this.$store.getters.facebookPages;
    // const facebookProfileNo = this.$store.getters.accountsFB;

    // if (facebookGroupsNo.length === 0) {
    //   this.$store.dispatch("getFacebookGroups");
    // }
    // if (facebookPagesNo.length === 0) {
    //   this.$store.dispatch("getFacebookPages");
    // }
    // if(facebookProfileNo.length === 0){
    //   this.$store.dispatch( "getAccountsFB" );
    // }
  }
}
