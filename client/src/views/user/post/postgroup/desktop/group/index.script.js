import CreateGroupPopup from "../popup/creategroup/index";
import DeleteGroupPopup from "@/components/popups/delete";

let typingTimer;
export default {
  components: {
    CreateGroupPopup,
    DeleteGroupPopup
  },
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
    clearTypingTimer() {
      clearTimeout( typingTimer );
    },
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
      this.$store.dispatch( "postGroupGroupsSelected", [] );
      this.$store.dispatch( "postGroupPagesSelected", [] );
    },
    async upTypingText( gr ) {
      await clearTimeout( typingTimer );

      typingTimer = await setTimeout( this.updatePostGroup( gr ), 1000);
    },
    updatePostGroup( gr ) {
      const objSender = {
        postGroupId: gr._id,
        title: gr.title,
        _pages: gr._pages,
        _groups: gr._groups
      };

      this.$store.dispatch("updatePostGroup", objSender);
    }
  }
};
