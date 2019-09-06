export default {
  data() {
    return {
      custom: [],
      postTargetCategory: [],
      selectedGroups: {}
    }
  },
  computed: {
    allPostGroups(){
      return this.$store.getters.postGroups;
    },
    allAccountFB() {
      return this.$store.getters.facebookAccountMultiSelect;
    },
    event() {
      return this.$store.getters.event;
    },
    facebookGroups(){
      return this.$store.getters.facebookGroups;
    },
    facebookPages(){
      return this.$store.getters.facebookPages;
    },
    convertTargetCustomGroups() {
      return this.event.target_custom.filter(
        target => target.typeTarget === 0
      ).map( item => {
        if ( item.target ) {
          return {
            groupId: item.target.groupId,
            name: item.target.name,
            profile_picture: item.target.profile_picture
          }
        }
      } );
    },
    convertTargetCustomPages() {
      return this.event.target_custom.filter(
        target => target.typeTarget === 1
      ).map( item => {
        if ( item.target ) {
          return {
            pageId: item.target.pageId,
            name: item.target.name,
            profile_picture: item.target.profile_picture
          }
        }
      } );
    },
  },
  async created() {
    if ( this.facebookPages.length === 0 ) {
      await this.$store.dispatch( "getFacebookPages" );
    }
    if ( this.facebookGroups.length === 0 ) {
      await this.$store.dispatch( "getFacebookGroups" );
    }
    if ( this.allPostGroups.length === 0 ) {
      await this.$store.dispatch( "getAllPostGroups" );
    }
    if ( this.allAccountFB.length === 0 ) {
      await this.$store.dispatch( "getAccountsFB" );
    }

    // convert fb accounts in timeline
    if ( this.event.timeline.length > 0 && this.event.timeline[0].userInfo === undefined ) return;
    const fbAccounts = this.event.timeline.map( ( account ) => {
      return {
        _id: account._id,
        name: account.userInfo.name,
        thumbSrc: account.userInfo.thumbSrc
      };
    } );
    await this.$store.dispatch("setEvent", {
      key: "timeline",
      value: fbAccounts
    })
  },
  methods: {
    selectFacebookAccount(value){
      if(value) {
        this.$emit("setErrorLocation", false);
      }
      this.$store.dispatch("setEvent", {
        key: "timeline",
        value: value
      })
    },
    selectGroupFacebook( value ) {
      if ( value ) {
        this.$emit( "setErrorLocation", false );
      }
      const groupListSelect = value.map( group => {
        return {
          typeTarget: 0,
          target: {
            groupId: group.groupId,
            name: group.name,
            profile_picture: group.profile_picture
          }
        };
      } );

      this.$store.dispatch( "setEventSpecial", {
        key: "target_custom",
        typeTarget: 0,
        value: groupListSelect
      } )
    },
    selectPageFacebook( value ) {
      if ( value ) {
        this.$emit( "setErrorLocation", false );
      }
      const pageListSelect = value.map( page => {
        return {
          typeTarget: 1,
          target: {
            pageId: page.pageId,
            name: page.name,
            profile_picture: page.profile_picture
          }
        };
      } );

      this.$store.dispatch( "setEventSpecial", {
        key: "target_custom",
        typeTarget: 1,
        value: pageListSelect
      } );
    },
    selectFacebookGroup( value ) {
      if ( value ) {
        this.$emit("setErrorLocation", false);
      }
      this.selectedGroups = value;
      this.$store.dispatch( "setEvent", {
        key: "target_category",
        value: {
          _id: value._id,
          title: value.title
        }
      } );
    }
  },
}
