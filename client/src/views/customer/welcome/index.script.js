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
      imagePage: require( "@/assets/images/zinbee-logo-orange.png" ),
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
  methods: {
    showDropdown() {
      this.showdropdown = !this.showdropdown;
    },
    closeDropdownUser() {
      this.showdropdown = false;
    }
  }
};
