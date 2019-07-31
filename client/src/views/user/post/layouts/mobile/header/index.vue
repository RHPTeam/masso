<template>
  <div class="header--mobile position_relative" :data-theme="currentTheme">
    <transition name="popup--mobile">
      <app-sidebar-mobile
        v-if="isShowPopup === true"
        :data-theme="currentTheme"
        :popupData="isShowPopup"
        @closePopup="isShowPopup = $event"
      />
      <popup-create-category
        v-if="isShowPopupCreateCategory === true"
        @closePopupNewCategory="isShowPopupCreateCategory = $event"
      />
      <popup-create-post
        :post="post"
        v-if="isShowPopupCreatePost === true"
        @closePopup="isShowPopupCreatePost = $event"
      />
      <popup-add-account-facebook
        v-if="isShowPopupAddAccountFb === true"
        @closeAddPopup="isShowPopupAddAccountFb = $event"
      />
      <popup-create-campaign
        v-if="isShowPopupCreateCampaign=== true"
        @closePopup="isShowPopupCreateCampaign = $event"
      />
      <popup-add-group
        v-if="isShowPopupAddGroup === true"
        @closePopupAddGroup="isShowPopupAddGroup = $event"
      />
      <popup-filter-by-category
        v-if="isShowDropdownFilterByCategory === true"
        @closePopup="isShowDropdownFilterByCategory = $event"
      />
    </transition>
    <div class="header--mobile-top d_flex justify_content_between align_items_center">
      <div class="d_flex justify_content_start align_items_center mr_auto">
        <div class="header--mobile-img text_left" @click.prevent="isShowPopup = true">
          <div
            v-if="user.imageAvatar"
            class="avatar--content avatar--img position_relative d_block"
            :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
          ></div>
          <div v-else class="avatar--content avatar--default position_relative d_block">
            <span class="position_absolute">
              {{
              user.name | getFirstLetter
              }}
            </span>
          </div>
        </div>
        <div class="header--mobile-title text_left">{{ changeTitlePage }}</div>
      </div>
      <div class="d_flex align_items_center ml_auto action--right position_relative">
        <!-- Start: Action in Posts -->
        <div
          class="posts d_flex align_items_center"
          v-if="this.$route.name === 'post_posts' || this.$route.name === 'post_postCategories' || this.$route.name === 'categories_default' "
        >
          <div class="all-posts d_flex align_items_center" v-if="gestureUser === 11 || gestureUser === 14">
            <!-- <div class="action mr_1" @click="showPopupHistory">
              <icon-base icon-name="History" width="24" height="24" viewBox="0 0 480 480">
                <icon-history />
              </icon-base>
            </div> -->
            <div class="filter--posts" @click="showDropdownFilterByCategory">
              <icon-base
                class="mt_1"
                icon-name="Create new"
                width="24"
                height="24"
                viewBox="0 0 450 450"
              >
                <icon-filter />
              </icon-base>
            </div>
            <div class="add posts action ml_2" @click="showPopupCreatePost">
              <icon-base icon-name="Add" width="24" height="24" viewBox="0 0 68 68">
                <icon-plus />
              </icon-base>
            </div>
          </div>
          <div
            class="add category action"
            @click="showPopupCreateCategory"
            v-if="gestureUser === 12"
          >
            <icon-base icon-name="Add" width="24" height="24" viewBox="0 0 68 68">
              <icon-plus />
            </icon-base>
          </div>
        </div>
        <!-- End: Action in Posts -->

        <!-- Start: Action in campaign -->
        <div
          class="add action campaign"
          @click="showPopupCreateCampaign"
          v-if="this.$route.name === 'post_campaigns'"
        >
          <icon-base icon-name="Add" width="24" height="24" viewBox="0 0 68 68">
            <icon-plus />
          </icon-base>
        </div>
        <!-- End: Action in campaign -->

        <!-- Start: Action in PostGroup -->
        <div
          class="post--group d_flex align_items_center"
          v-if="this.$route.name === 'post_group' "
        >
          <div class="update action" @click="updateGroupsAndPages">
            <icon-base icon-name="Update" width="24" height="24" viewBox="0 0 250 250">
              <icon-update />
            </icon-base>
          </div>
          <div
            class="add action ml_2"
            @click="showPopupAddGroup"
            v-if="postGroupGroupsSelected.length > 0 || postGroupPagesSelected.length > 0 || postProfileSelected.length > 0"
          >
            <icon-base icon-name="Add" width="24" height="24" viewBox="0 0 68 68">
              <icon-plus />
            </icon-base>
          </div>
        </div>
        <!-- End: Action in PostGroup -->

        <!-- Start: Action in Acount FB -->
        <div
          class="add action account--fb"
          @click="showPopupAddAccountFb"
          v-if="gestureCursorMenuUser === 4 || this.$route.name === 'post_fbaccount'"
        >
          <icon-base icon-name="Add" width="24" height="24" viewBox="0 0 68 68">
            <icon-plus />
          </icon-base>
        </div>
        <!-- End: Action in Acount FB -->
      </div>
      <!-- <div
        class="d_flex justify_content_end align_items_center"
        v-if="this.$route.path === '/messenger'"
      >
         <div class="icon change--account" @click="showChangeAccount = true">
          <icon-base
            icon-name="change-account"
            width="26"
            height="26"
            viewBox="0 0 15.02 17.34"
          >
            <icon-change-account />
          </icon-base>
        </div>
        <div class="icon new--message" @click="showNewMessage = true">
          <icon-base
            icon-name="new-message"
            width="26"
            height="26"
            viewBox="0 0 20.6 20.2"
          >
            <icon-new-message />
          </icon-base>
        </div>
      </div>
      <div class="icon add--scripts" v-if="this.$route.path === '/f-scripts'">
        <icon-base icon-name="plus" width="24" height="24" viewBox="0 0 64 64">
          <icon-plus />
        </icon-base>
      </div>-->
    </div>
    <!-- Start: change account
    <transition name="popup">
      <change-account
        v-if="showChangeAccount === true"
        @closeModal="showChangeAccount = $event"
      />
    </transition>-->
    <!--    End: change account-->
    <!--    Start: Add new message-->
    <!-- <transition name="popup">
      <new-message
        v-if="showNewMessage === true"
        @closeAddNewMessage="showNewMessage = $event"
      />
    </transition>-->
    <!--    End: Add new message-->
    <!--    Start: Add new scripts-->
    <!-- <transition name="popup">
      <change-account
        v-if="showNewScript === true"
        @closeModal="showNewScript = $event"
      />
    </transition>-->
    <!--    End: Add new scripts-->
    <!-- Start: transition popup mobile -->
    <transition name="popup">
      <popup-history @close="isShowPopupHistory = $event" v-if="isShowPopupHistory === true" />
    </transition>
    <transition name="popup">
      <upgrade-pro-popup
        class="upgrade-pro-popup"
        v-if="isShowUpgradePro === true"
        :data-theme="currentTheme"
        :showUpgradePro="isShowUpgradePro"
        @closeAddPopup="isShowUpgradePro = $event"
      />
    </transition>
  </div>
</template>
<script>
import AppSidebarMobile from "../popup/menu";
import PopupCreateCategory from "../popup/posts/category";
import PopupCreatePost from "../popup/posts/post";
import PopupAddAccountFacebook from "../popup/facebook/addaccount";
import PopupCreateCampaign from "../popup/campaigns/create";
import PopupAddGroup from "../popup/postgroup/addgroup";
import PopupHistory from "../popup/posts/history";
import PopupFilterByCategory from "../popup/posts/filter";
// import ChangeAccount from "@/views/user/messagefacebook/mobile/change-account";
// import NewMessage from "@/views/user/messagefacebook/mobile/newmessage";
import UpgradeProPopup from "@/components/shared/layouts/upgradepro";

export default {
  components: {
    AppSidebarMobile,
    PopupCreateCategory,
    PopupCreatePost,
    PopupAddAccountFacebook,
    PopupCreateCampaign,
    PopupAddGroup,
    PopupHistory,
    PopupFilterByCategory,
    UpgradeProPopup
  },
  filters: {
    getFirstLetter(string) {
      if (typeof string == "undefined") return;
      if (string.length == 0) return;
      return string.charAt(0).toUpperCase();
    }
  },
  props: ["fbPost"],

  data() {
    return {
      isShowPopup: false,
      isShowDropdownFilterByCategory: false,
      isShowPopupCreateCategory: false,
      isShowPopupCreatePost: false,
      isShowPopupAddAccountFb: false,
      isShowPopupCreateCampaign: false,
      isShowPopupAddGroup: false,
      isShowPopupHistory: false,
      isShowUpgradePro: false
    };
  },
  computed: {
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
  async created() {
    await this.$store.dispatch( "getUserInfo" );
    this.$store.dispatch("actionCursor", 11);
  },
  methods: {
    closeDropdownFilterByCategory() {
      this.isShowDropdownFilterByCategory = false;
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
      // this.$router.push( {
      //   name: "post_update_post",
      //   params: { id: this.post._id }
      // } );
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
    showPopupHistory() {
      this.isShowPopupHistory = true;
    },
    updateGroupsAndPages() {
      this.$store.dispatch("updateFacebookPages");
      this.$store.dispatch("updateFacebookGroups");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
.upgrade-pro-popup {
  background: none !important;
  box-shadow: none !important;
  z-index: 99 !important;
}
</style>
