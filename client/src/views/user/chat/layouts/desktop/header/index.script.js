import HeaderMessenger from "./messenger/index";
import HeaderNotification from "./notification/index";
import HelpNotification from "./help";

export default {
  components: {
    HeaderMessenger,
    HeaderNotification,
    HelpNotification
  },
  data() {
    return {
      statusCollapse: false,
      isShowFlagDropdown: false,
      isShowProfileDropdown: false,
      isShowMessengerDropdown: false,
      isShowNotificationDropdown: false,
      isShowOptionsMoreDropdown: false,
      isShowPopup: false,
      notifications: [
        {
          image: "http://hexagonview.com/wp/wp-content/uploads/2016/09/correcive-maintenance.jpg",
          content: "Hệ thống đang bảo trì một số chức năng",
          time: "vừa xong",
          status: true
        }
      ]
    };
  },
  async created() {
    await this.$store.dispatch( "getUserInfo" );
    // Get User FB Accounts
    this.$store.dispatch( "getAccountsFB" );
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
    toogleSidebar() {
      this.statusCollapse = !this.statusCollapse;
      this.$store.dispatch( "changeMenu", this.statusCollapse );
    },
    closeMessengerDropdown() {
      this.isShowMessengerDropdown = false;
    },
    closeNotificationDropdown() {
      this.isShowNotificationDropdown = false;
    },
    closeProfileDropdown() {
      this.isShowProfileDropdown = false;
    },
    redirectToHelp() {
      window.location = `${process.env.VUE_APP_PARENT_URL}help`;
    },
    redirectToGetCookie(){
      window.location.href = "https://chrome.google.com/webstore/detail/zinbee/cldgcfaoiieljdbcbhljginnlknaojib";
    },
    showMessengerDropdown() {
      this.isShowMessengerDropdown = !this.isShowMessengerDropdown;
    },
    showNotificationDropdown() {
      this.isShowNotificationDropdown = !this.isShowNotificationDropdown;
    },
    showProfileDropdown() {
      this.isShowProfileDropdown = !this.isShowProfileDropdown;
    },
    showOptionsMoreDropdown(){
      this.isShowOptionsMoreDropdown = true;
    },
    closeOptionsMoreDropdown(){
      this.isShowOptionsMoreDropdown = false;
    },
    showWarnMessager(){
      this.isShowPopupWarnMesseger = true;
    },
    closeShowWarnMessager( value ){
      this.isShowPopupWarnMesseger = false;
      console.log(this.isShowPopupWarnMesseger);
    },
    async logOut() {
      await this.$store.dispatch( "logOut" );
      // window.location = process.env.VUE_APP_PARENT_URL;
      window.location.href = `${process.env.VUE_APP_PARENT_URL}/#/redirect`;
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
        const routeData = this.$router.resolve( { name: "facebook" } );

        window.open(routeData.href, '_blank');
      } else {
        const routeData = this.$router.resolve( { name: "scripts" } );

        window.open(routeData.href, '_blank');
      }
      this.isShowOptionsMoreDropdown = false;
    },
    goToMessenger() {
      this.$router.push({ name: "messenger" });
    },
    formatDate( d ) {
      const dateTime = new Date( d ),
        date = String( dateTime.getDate() ).padStart( 2, "0" ),
        month = String( dateTime.getMonth() + 1 ).padStart( 2, "0" ),
        year = dateTime.getFullYear();

      return `${date}/${month}/${year}`;
    },
    async openExpireModal(){
      await this.$emit("openExpire", true);
      this.closeProfileDropdown()
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
