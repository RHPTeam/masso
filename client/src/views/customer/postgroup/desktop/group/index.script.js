import CreateGroupPopup from "../popup/creategroup";
import DeleteGroupPopup from "../popup/delete";

export default {
  props: [ "groupSelected" ],
  data() {
    return {
      currentIndex: null,
      isShowCreateGroup: false,
      isShowDeletePopup: false,
      groupDelete: {}
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
    showDeletePopup( data ) {
      this.isShowDeletePopup = true;
      this.groupDelete = data;
    },
    seeAllUsers() {
      this.$emit( "updateGroupSelected", false );
      this.currentIndex = null;
    },
    showPostGroup( id, index ) {
      this.currentIndex = index;
      this.$emit( "updateGroupSelected", true );
      this.$store.dispatch( "getPostGroupById", id );
    }
  },
  components: {
    CreateGroupPopup,
    DeleteGroupPopup
  }
};
