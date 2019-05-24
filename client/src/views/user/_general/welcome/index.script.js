/* eslint-disable global-require */
/* eslint-disable prettier/prettier */
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
    }
  },
  async created() {
    await this.$store.dispatch( "getUserInfo" );
  },
  methods: {
    async logOut() {
      await this.$store.dispatch( "logOut" );
      this.$router.push( "/signin" );
    },
    gotoHomePost() {
      this.$router.push( "/post" );
    },
    showDropdown() {
      this.showdropdown = !this.showdropdown;
    },
    closeDropdownUser() {
      this.showdropdown = false;
    },

    // go to home chat
    gotoHomeChat(){
      this.$router.push( "/chat" );
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
