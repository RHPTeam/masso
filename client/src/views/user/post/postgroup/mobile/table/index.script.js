import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  data() {
    return {
      isShowTabFanpage: true,
      isShowTabGroup: false
    }
  },
  components: {
    VuePerfectScrollbar
  },
  computed: {
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
    showTabFanpage() {
      this.isShowTabFanpage = true;
      this.isShowTabGroup = false;
    },
    showTabGroup() {
      this.isShowTabGroup = true;
      this.isShowTabFanpage = false;
    }
  },
  created() {
    const facebookGroupsNo = this.$store.getters.facebookGroups;
    const facebookPagesNo = this.$store.getters.facebookPages;

    if (facebookGroupsNo.length === 0) {
      this.$store.dispatch("getFacebookGroups");
    }
    if (facebookPagesNo.length === 0) {
      this.$store.dispatch("getFacebookPages");
    }
  }
}
