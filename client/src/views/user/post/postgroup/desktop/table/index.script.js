
export default {
  props: [ "groupSelected", "typeFilterSelected", "search" ],
  data() {
    return {
      groupsSelectedArr: [],
      isShowDeleteCampaignPopup: false,
      pagesSelectedArr: []
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    accountsFB() {
      return this.$store.getters.accountsFB;
    },
    facebookGroups() {
      return this.$store.getters.facebookGroups;
    },
    facebookGroupsSearch(){
      return this.facebookGroups.filter( ( item ) => {
        return item.name.toString().toLowerCase().includes( this.search.toString().toLowerCase() );
      } );
    },
    facebookGroupsStatus() {
      return this.$store.getters.facebookGroupsStatus;
    },
    facebookPages() {
      return this.$store.getters.facebookPages;
    },
    facebookPagesSearch(){
      return this.facebookPages.filter( ( item ) => {
        return item.name.toString().toLowerCase().includes( this.search.toString().toLowerCase() );
      } );
    },
    facebookPagesStatus() {
      return this.$store.getters.facebookPagesStatus;
    },
    postGroupDetail() {
      return this.$store.getters.postGroupDetail;
    },
    postGroupDetailPage(){
      return this.postGroupDetail._pages.filter( ( item ) => {
        return item.name.toString().toLowerCase().includes( this.search.toString().toLowerCase() );
      } );
    },
    postGroupDetailGroup(){
      return this.postGroupDetail._groups.filter( ( item ) => {
        return item.name.toString().toLowerCase().includes( this.search.toString().toLowerCase() );
      } );
    },
    postGroupDetailProfile(){
      return this.postGroupDetail._timeline.filter( ( item ) => {
        return item.userInfo.name.toString().toLowerCase().includes( this.search.toString().toLowerCase() );
      } );
    },
    postGroupDetailStatus() {
      return this.$store.getters.postGroupDetailStatus;
    },
    postGroupGroupsSelected: {
      get() {
        return this.$store.getters.postGroupGroupsSelected;
      },
      set( val ) {
        this.$store.dispatch( "postGroupGroupsSelected", val );
      }
    },
    postGroupPagesSelected: {
      get() {
        return this.$store.getters.postGroupPagesSelected;
      },
      set( val ) {
        this.$store.dispatch( "postGroupPagesSelected", val );
      }
    },
    selectedProfile: {
      get() {
        return this.$store.getters.postProfileSelected;
      },
      set( val ) {
        this.$store.dispatch( "postProfileSelected", val );
      }
    },
    selectAllGroups: {
      get() {
        if (this.groupSelected === false) {
          return this.facebookGroups
            ? this.postGroupGroupsSelected().length === this.facebookGroups.length
            : false;
        } else {
          return this.postGroupDetail._groups
            ? this.postGroupGroupsSelected.length === this.postGroupDetail._groups.length
            : false;
        }
      },
      set( value ) {
        let selected = [];
        if (this.groupSelected === false) {
          if (value) {
            this.facebookGroups.forEach( ( group ) => {
              selected.push( group.groupId );
            });
          }
        } else {
          if (value) {
            this.postGroupDetail._groups.forEach( ( group ) => {
              selected.push( group.groupId );
            });
          }
        }

        this.groupsSelectedArr = selected;
        this.$store.dispatch( "postGroupGroupsSelected", this.groupsSelectedArr );
      }
    },
    selectAllPages: {
      get() {
        if (this.groupSelected === false) {
          return this.facebookPages
            ? this.postGroupPagesSelected.length === this.facebookPages.length
            : false;
        } else {
          return this.postGroupDetail._pages
            ? this.postGroupPagesSelected.length === this.postGroupDetail._pages.length
            : false;
        }
      },
      set( value ) {
        let selected = [];
        if (this.groupSelected === false) {
          if (value) {
            this.facebookPages.forEach( ( page ) => {
              selected.push( page.pageId );
            });
          }
        } else {
          if (value) {
            this.postGroupDetail._pages.forEach( ( page ) => {
              selected.push( page.pageId );
            });
          }
        }

        this.pagesSelectedArr = selected;
        this.$store.dispatch( "postGroupPagesSelected", this.pagesSelectedArr );
      }
    }
  },
  methods: {
    seeAllUsers() {
      this.$emit( "updateGroupSelected", false );
    }
  },
  async created() {
    const facebookGroupsNo = this.$store.getters.facebookGroups;
    const facebookPagesNo = this.$store.getters.facebookPages;
    const facebookProfileNo = this.$store.getters.accountsFB;


    if(facebookProfileNo.length === 0){
      await this.$store.dispatch( "getAccountsFB" );
    }
    if ( facebookGroupsNo.length === 0 ) {
      await this.$store.dispatch( "getFacebookGroups" );
    }
    if ( facebookPagesNo.length === 0 ) {
      await this.$store.dispatch( "getFacebookPages" );
    }
  }
};
