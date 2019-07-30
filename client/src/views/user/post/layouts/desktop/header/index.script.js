/* eslint-disable prettier/prettier */
import HeaderNotification from "./components/notification/index";
import HelpNotification from "./components/help";

export default {
  components: {
    HeaderNotification,
    HelpNotification
  },
  data() {
    return {
      statusCollapse: false,
      isShowProfileDropdown: false,
      isShowNotificationDropdown: false,
      isShowOptionsMoreDropdown: false,
      isShowNotificationHelp: false,
      notifications: [
        {
          image: "http://hexagonview.com/wp/wp-content/uploads/2016/09/correcive-maintenance.jpg",
          content: "Hệ thống đang bảo trì một số chức năng",
          time: "vừa xong",
          status: true
        }
      ],
      marketUrl: `${process.env.VUE_APP_PARENT_URL}/#/market`,
      urlGetCookie: "https://chrome.google.com/webstore/detail/zinbee/cldgcfaoiieljdbcbhljginnlknaojib"
    };
  },
  async created() {
    await this.$store.dispatch( "getUserInfo" );
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
    allAccountFb() {
      return this.$store.getters.accountsFB;
    }
  },

  methods: {
    async logOut() {
      await this.$store.dispatch( "logOut" );
      window.location.href = `${process.env.VUE_APP_PARENT_URL}/#/redirect`;
    },
    formatDate( d ) {
      const dateTime = new Date( d ),
        date = String( dateTime.getDate() ).padStart( 2, "0" ),
        month = String( dateTime.getMonth() + 1 ).padStart( 2, "0" ),
        year = dateTime.getFullYear();

      return `${date}/${month}/${year}`;
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
    closeProfileDropdown(){
      this.isShowProfileDropdown = false;
    },
    closeNotificationDropdown() {
      this.isShowNotificationDropdown = false;
    },
    closeDropdownUser() {
      this.showdropdown = false;
    },
    redirectToHelp() {
      const routes = `${process.env.VUE_APP_PARENT_URL}/#/help`;
      window.open(routes, '_blank');
    },
    redirectToGetCookie(){
      const routes = "https://chrome.google.com/webstore/detail/zinbee/cldgcfaoiieljdbcbhljginnlknaojib";
      window.open(routes, '_blank');
    },
    showOptionsMoreDropdown(){
      this.isShowOptionsMoreDropdown = true;
    },
    closeOptionsMoreDropdown(){
      this.isShowOptionsMoreDropdown = false;
    },
    gotoHomePost() {
      if ( this.allAccountFb.length === 0 ) {
        const routeData = this.$router.resolve( { name: "post_fbaccount" } );

        window.open(routeData.href, '_blank');
      } else {
        const routeData = this.$router.resolve( "/post" );

        window.open(routeData.href, '_blank');
      }
      this.isShowOptionsMoreDropdown = false;
    },
    gotoHomeChat(){
      if ( this.allAccountFb.length === 0 ) {
        const routeData = this.$router.resolve( { name: "chat_account" } );

        window.open(routeData.href, '_blank');
      } else {
        const routeData = this.$router.resolve( { name: "scripts" } );

        window.open(routeData.href, '_blank');
      }
      this.isShowOptionsMoreDropdown = false;
    },
    async openExpireModal(){
      await this.$emit("openExpire", true);
      this.closeDropdownUser()
    },
    showGuidePopup(){
      this.$store.dispatch("setVariableControlGuide", 1);
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
