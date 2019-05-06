import CreateGroupPopup from "../popup/creategroup";
import DeleteGroupPopup from "../popup/delete";

export default {
  data() {
    return {
      isActive: true,
      isShowCreateGroup: false,
      isShowDeletePopup: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    postGroups() {
      return this.$store.getters.postGroups;
    }
  },
  async created() {
    await this.$store.dispatch("getAllPostGroups");
  },
  methods: {
    showDeletePopup() {
      this.isShowDeletePopup = true;
    },
    seeAllUsers() {

    }

  },
  components: {
    CreateGroupPopup,
    DeleteGroupPopup
  }
};
