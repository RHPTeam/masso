export default {
  data() {
    return {
      selectedGroups: []
    };
  },
  computed: {
    postGroups() {
      return this.$store.getters.postGroups;
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
  methods: {
    addToGroup() {
      this.selectedGroups.forEach( ( item ) => {
        const postGroup = this.getPostGroupById( item )[ 0 ],
          dataSender = {
            postGroupId: item,
            title: postGroup.title,
            _pages: this.postGroupPagesSelected,
            _groups: this.postGroupGroupsSelected,
            _timeline: this.postProfileSelected
          };

        this.$store.dispatch( "addToPostGroup" , dataSender );
      } );

      this.$emit( "closePopup", false );

      this.$store.dispatch( "postGroupGroupsSelected", [] );
      this.$store.dispatch( "postGroupPagesSelected", [] );
      this.$store.dispatch( "postProfileSelected", [] );
    },
    closePopup() {
      this.$emit( "closePopup", false );
    },
    getPostGroupById( id ) {
      return this.postGroups.filter( ( item ) => {
        return item._id === id;
      } );
    }
  }
};
