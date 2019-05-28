/* eslint-disable prettier/prettier */
import HeaderNotification from "./notification/index";

export default {
  components: {
    HeaderNotification
  },
  data() {
    return {
      statusCollapse: false,
      isShowProfileDropdown: false,
      isShowNotificationDropdown: false,
      notifications: [
        {
          image: "data:image/png;base64,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",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          time: "2 phút",
          status: true
        },
        {
          image: "data:image/jpeg;base64,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",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          time: "10 phút",
          status: false
        },
        {
          image: "data:image/png;base64,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",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          time: "2 phút",
          status: false
        },
        {
          image: "data:image/jpeg;base64,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",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          time: "10 phút",
          status: false
        }
      ]
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
      window.location = process.env.VUE_APP_PARENT_URL;
    },
    toogleSidebar() {
      this.statusCollapse = !this.statusCollapse;
      this.$store.dispatch( "changeMenu", this.statusCollapse );
    },
    showNotificationDropdown() {
      this.isShowProfileDropdown = false;
      this.isShowNotificationDropdown = !this.isShowNotificationDropdown;
    },
    showProfileDropdown() {
      this.isShowProfileDropdown = !this.isShowProfileDropdown;
      this.isShowNotificationDropdown = false;
    },
    closeDropdownUser() {
      this.showdropdown = false;
    },
    async createNewPost() {
      const dataSender = {};

      await this.$store.dispatch( "createNewPost", dataSender );
      this.$router.push( {
        name: "post_update_post",
        params: { id: this.newPost._id }
      } );
    },
    redirectToHelp() {
      window.location = `${process.env.VUE_APP_PARENT_URL}help`;
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
