/* eslint-disable prettier/prettier */
export default {
  data() {
    return {
      statusCollapse: false,
      showdropdown: false
    };
  },
  async created() {
    // await this.$store.dispatch( "getUserInfo" );
  },
  computed: {
    user() {
      if ( this.$store.getters.userInfo === undefined ) {
        return;
      }
      return this.$store.getters.userInfo;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    collapseMenu() {
      this.statusCollapse = this.$store.getters.collapseMenu;
    },
    newPost() {
      return this.$store.getters.newPost;
    }
  },

  methods: {
    async logOut() {
      await this.$store.dispatch( "logOut" );
      this.$router.push( "/signin" );
    },
    toogleSidebar() {
      this.statusCollapse = !this.statusCollapse;
      this.$store.dispatch( "changeMenu", this.statusCollapse );
    },
    showDropdown: function() {
      this.showdropdown = !this.showdropdown;
    },
    closeDropdownUser() {
      this.showdropdown = false;
    },
    async createNewPost() {
      const dataSender = {};

      await this.$store.dispatch( "createNewPost", dataSender );
      this.$router.push( {
        name: "update_post",
        params: { id: this.newPost._id }
      } );
    }
  },

  filters: {
    getFirstLetter( string ) {
      if ( string === undefined ) {
        return;
      }
      return string.charAt( 0 ).toUpperCase();
    }
  }
};
