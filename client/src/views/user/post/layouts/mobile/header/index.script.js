import AppSidebarMobile from "./components/menu";
import PopupCreateAgency from "./components/agency/create";
import PopupCreateCategory from "./components/posts/category";
import PopupCreatePost from "./components/posts/post";
import PopupAddAccountFacebook from "./components/facebook/addaccount";
import PopupCreateCampaign from "./components/campaigns/create";
import PopupAddGroup from "./components/postgroup/addgroup";
import PopupFilterByCategory from "./components/posts/filter";
import PopupHistory from "./components/posts/history";
import PopupExpireCode from "./components/expire";
import UpgradeProPopup from "@/components/shared/layouts/upgradepro";
import SetupInfo from "./components/agency/setup";

export default {
  props: ["fbPost"],
  components: {
    AppSidebarMobile,
    PopupCreateAgency,
    PopupCreateCategory,
    PopupCreatePost,
    PopupAddAccountFacebook,
    PopupCreateCampaign,
    PopupAddGroup,
    PopupHistory,
    PopupFilterByCategory,
    PopupExpireCode,
    UpgradeProPopup,
    SetupInfo
  },
  data() {
    return {
      isShowPopup: false,
      isShowDropdownFilterByCategory: false,
      isShowPopupCreateAgency: false,
      isShowPopupCreateCategory: false,
      isShowPopupCreatePost: false,
      isShowPopupAddAccountFb: false,
      isShowPopupCreateCampaign: false,
      isShowPopupAddGroup: false,
      isShowPopupHistory: false,
      isShowUpgradePro: false,
      isShowPopupSetupInfo: false,
      isShowPopupExpireCode: false,
      isShowUpdatePopup: false
    };
  },
  computed: {
    accountsFb(){
      return this.$store.getters.accountsFB;
    },
    post() {
      return this.$store.getters.newPost;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    user() {
      return this.$store.getters.userInfo;
    },
    changeTitlePage() {
      if (this.$route.name === "post_dashboard") {
        return "Bảng Điều Khiển";
      }
      if (
        this.$route.name === "post_posts" ||
        this.$route.name === "post_postCategories" ||
        this.$route.name === "categories_default"
      ) {
        return "Kho Nội Dung";
      }
      if (this.$route.name === "post_campaigns") {
        return "Chiến Dịch";
      }
      if (this.$route.name === "post_group") {
        return "Nhóm & Trang";
      }
      if (this.$route.name === "post_fbaccount") {
        return "Tài Khoản Facebook";
      }
      if (this.$route.name === "post_fb_search") {
        return "Facebook Tìm Kiếm";
      }
      if (this.$route.name === "post_account") {
        return "Thiết lập tài khoản";
      }
      if (this.$route.name === "campaigns_default") {
        return "Chiến dịch mẫu";
      }
      if (this.$route.name === "post_agency") {
        return "Quản lý thành viên";
      }
      if (this.$route.name === "pricing_plan") {
        return "Gia hạn tài khoản";
      }
    },
    gestureUser() {
      return this.$store.getters.gestureUser;
    },
    gestureCursorMenuUser() {
      return this.$store.getters.gestureCursorMenuUser;
    },
    postGroupGroupsSelected() {
      return this.$store.getters.postGroupGroupsSelected;
    },
    postGroupPagesSelected() {
      return this.$store.getters.postGroupPagesSelected;
    },
    postProfileSelected() {
      return this.$store.getters.postProfileSelected;
    },
    accountsFB() {
      return this.$store.getters.accountsFB;
    }
  },
  filters: {
    getFirstLetter(string) {
      if (typeof string == "undefined") return;
      if (string.length === 0) return;
      return string.charAt(0).toUpperCase();
    }
  },
  methods: {
    closePopupSelectAccount(){
      this.isShowUpdatePopup = false;
    },
    closeDropdownFilterByCategory() {
      this.isShowDropdownFilterByCategory = false;
    },
    showPopupCreateAgency() {
        this.isShowPopupCreateAgency = true;
    },
    showDropdownFilterByCategory() {
      this.isShowDropdownFilterByCategory = true;
    },
    showPopupCreateCategory() {
      this.isShowPopupCreateCategory = true;
    },
    async showPopupCreatePost() {
      const dataSender = {};

      await this.$store.dispatch("createNewPost", dataSender);
      await this.$store.dispatch("getPostById", this.post._id);
      await this.$store.dispatch("actionCursor", 15);
      this.isShowPopupCreatePost = true;
    },
    showPopupAddAccountFb() {
      if (this.accountsFB.length >= this.user.maxAccountFb) {
        this.isShowUpgradePro = true;
      } else {
        this.isShowPopupAddAccountFb = true;
      }
    },
    showPopupCreateCampaign() {
      this.isShowPopupCreateCampaign = true;
    },
    showPopupAddGroup() {
      this.isShowPopupAddGroup = true;
    },
    showPopupExpireCode() {
      this.isShowPopupExpireCode = true;
    },
    showPopupHistory() {
      this.isShowPopupHistory = true;
    },
    updateGroupsAndPages() {
      this.$store.dispatch("updateFacebookPages");
      this.$store.dispatch("updateFacebookGroups");
    },
    async updateFanpageAndGroup(val){
      await this.$store.dispatch( "updateFacebookPages", val._id );
      await this.$store.dispatch( "updateFacebookGroups", val._id );
      this.isShowUpdatePopup = false;
    },
    showPopupSetupInfo() {
      this.isShowPopupSetupInfo = true;
    }
  },
  created() {
    this.$store.dispatch( "getAccountsFB" );
    this.$store.dispatch("actionCursor", 11);
    this.$store.dispatch( "getUserInfo" );
  }
};
