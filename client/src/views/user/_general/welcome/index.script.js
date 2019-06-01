import IconBase from "@/components/icons/IconBase";
import IconArrowDown from "@/components/icons/IconArrowDown";
import IconAccount from "@/components/icons/IconAccount";
import IconLogout from "@/components/icons/IconLogout";

export default {
  data() {
    return {
      showdropdown: false,
      avatar: "",
      imagePage: require( "@/assets/images/zinbee-logo-orange.svg" ),
      imageChat: require( "@/assets/images/zinbee-chat-icon.svg" ),
      imagePost: require( "@/assets/images/zinbee-post-icon.svg" ),
      tools: [
        {
          name: "Zinbee Chat",
          icon: require( "@/assets/images/zinbee-chat-icon.svg" )
        },
        {
          name: "Zinbee Post",
          icon: require( "@/assets/images/zinbee-post-icon.svg" )
        }
      ]
    };
  },
  components: {
    IconBase,
    IconArrowDown,
    IconAccount,
    IconLogout
  },
  computed: {
    user() {
      return this.$store.getters.userInfo;
    },
    allAccountFb() {
      return this.$store.getters.accountsFB;
    }
  },
  async created() {
    // Get User Info
    await this.$store.dispatch( "getUserInfo" );
    // Get User FB Accounts
    await this.$store.dispatch( "getAccountsFB" );
  },
  methods: {
    async logOut() {
      await this.$store.dispatch( "logOut" );
      window.location = process.env.VUE_APP_PARENT_URL;
    },
    showDropdown() {
      this.showdropdown = !this.showdropdown;
    },
    closeDropdownUser() {
      this.showdropdown = false;
    },
    gotoHomePost() {
      if ( this.allAccountFb.length === 0 ) {
        const routeData = this.$router.resolve( { name: "post_fbaccount" } );

        window.open(routeData.href, '_blank');
      } else {
        const routeData = this.$router.resolve( "/post" );

        window.open(routeData.href, '_blank');
      }
    },
    gotoHomeChat(){
      if ( this.allAccountFb.length === 0 ) {
        const routeData = this.$router.resolve( { name: "facebook" } );

        window.open(routeData.href, '_blank');
      } else {
        const routeData = this.$router.resolve( { name: "scripts" } );

        window.open(routeData.href, '_blank');
      }
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
