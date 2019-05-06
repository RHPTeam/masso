export default {
  data() {
    return {
      isShowCreateGroup: false,
      isShowBtnCreate: true
    };
  },
  methods: {
    closeAddPopup() {
      this.$emit( "closeAddPopup", false );
    },
    showCreateGroupTrue() {
      this.isShowCreateGroup = true;
    },
    async showCreateGroup() {
      await this.showCreateGroupTrue();
      this.isShowBtnCreate = false;
      this.$refs.newGroup.focus();
    },
    cancelCreateGroup() {
      this.isShowCreateGroup = false;
      this.isShowBtnCreate = true;
    },
    async createGroup() {
      this.scrollToEnd();
    },
    scrollToEnd() {
      let scroll = this.$el.querySelector( "#groupListScroll" );

      scroll.scrollTop = scroll.scrollHeight;
    }
  }
};
