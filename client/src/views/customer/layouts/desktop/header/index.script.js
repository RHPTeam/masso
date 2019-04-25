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
