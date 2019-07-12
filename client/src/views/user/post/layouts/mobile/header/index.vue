<template>
  <div class="header--mobile position_relative" :data-theme="currentTheme">
    <transition name="popup--mobile">
      <app-sidebar-mobile
        v-if="isShowPopup == true"
        :data-theme="currentTheme"
        :popupData="isShowPopup"
        @closePopup="isShowPopup = $event"
      />
      <popup-create-new-category
        v-if="isShowPopupCreateNewCategory === true"
        @closePopupNewCategory="isShowPopupCreateNewCategory = $event"
      />
      <popup-create-new-post
        :fbPost="fbPost" :post="post"
        v-if="isShowPopupCreateNewPost === true"
        @closePopup="isShowPopupCreateNewPost = $event"
      />
      <popup-add-account-facebook
        v-if="isShowPopupAddAccountFb === true"
        @closeAddPopup="isShowPopupAddAccountFb = $event"
      />
      <popup-create-new-campaign
        v-if="isShowPopupCreateNewCampaign=== true"
        @closePopupCreateNewCampaign="isShowPopupCreateNewCampaign = $event"
      />
      <popup-add-group
        v-if="isShowPopupAddGroup === true"
        @closePopupAddGroup="isShowPopupAddGroup = $event"
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
        <div class="posts d_flex align_items_center" v-if="gestureCursorMenuUser === 1">
          <div class="all-posts d_flex align_items_center" v-if="gestureUser === 11">
            <div class="action mr_1" @click="showPopupHistory">
              <icon-base icon-name="History" width="24" height="24" viewBox="0 0 480 480">
                <icon-history />
              </icon-base>
            </div>
            <div class="add posts action mx_1" @click="showPopupCreateNewPost">
              <icon-base icon-name="Add" width="24" height="24" viewBox="0 0 68 68">
                <icon-plus />
              </icon-base>
            </div>
            <div class="filter--posts" @click="showDropdownFilterPost">
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
          </div>
          <div
            class="add category action mx_1"
            @click="showPopupCreateNewCategory"
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
          @click="showPopupCreateNewCampaign"
          v-if="gestureCursorMenuUser === 2"
        >
          <icon-base icon-name="Add" width="24" height="24" viewBox="0 0 68 68">
            <icon-plus />
          </icon-base>
        </div>
        <!-- End: Action in campaign -->

        <!-- Start: Action in PostGroup -->
        <div class="post--group d_flex align_items_center" v-if="gestureCursorMenuUser === 3">
          <div class="update action">
            <icon-base icon-name="Update" width="24" height="24" viewBox="0 0 250 250">
              <icon-update />
            </icon-base>
          </div>
          <div class="add action ml_2" @click="showPopupAddGroup" v-if="postGroupGroupsSelected.length > 0 || postGroupPagesSelected.length > 0">
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
          v-if="gestureCursorMenuUser === 4"
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
      <div class="icon add--script" v-if="this.$route.path === '/f-script'">
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
    <!--    Start: Add new script-->
    <!-- <transition name="popup">
      <change-account
        v-if="showNewScript === true"
        @closeModal="showNewScript = $event"
      />
    </transition>-->
    <!--    End: Add new script-->
    <!-- Start: transition popup mobile -->
    <transition name="popup">
      <div
        class="dropdown--filter-post position_fixed"
        v-if="isShowDropdownFilterPost === true"
        v-click-outside="closeDropdownFilterPost"
      >
        <div class="all items" @click="closeDropdownFilterPost">Xem tat ca</div>
        <div class="all items" @click="closeDropdownFilterPost">Danh muc 1</div>
        <div class="all items" @click="closeDropdownFilterPost">Danh muc 2</div>
      </div>
      <popup-history @close="isShowPopupHistory = $event" v-if="isShowPopupHistory === true"/>
    </transition>
  </div>
</template>
<script>
import AppSidebarMobile from "../popup/menu";
import PopupCreateNewCategory from "../popup/posts/category";
import PopupCreateNewPost from "../popup/posts/post";
import PopupAddAccountFacebook from "../popup/facebook/addaccount";
import PopupCreateNewCampaign from "../popup/campaigns/create";
import PopupAddGroup from "../popup/postgroup/addgroup";
import PopupHistory from "../popup/posts/history";
// import ChangeAccount from "@/views/user/messagefacebook/mobile/change-account";
// import NewMessage from "@/views/user/messagefacebook/mobile/newmessage";
export default {
  components: {
    AppSidebarMobile,
    PopupCreateNewCategory,
    PopupCreateNewPost,
    PopupAddAccountFacebook,
    PopupCreateNewCampaign,
    PopupAddGroup,
    PopupHistory
  },
  data() {
    return {
      isShowPopup: false,
      isShowDropdownFilterPost: false,
      isShowPopupCreateNewCategory: false,
      isShowPopupCreateNewPost: false,
      isShowPopupAddAccountFb: false,
      isShowPopupCreateNewCampaign: false,
      isShowPopupAddGroup: false,
      isShowPopupHistory: false
    };
  },
  props: ["fbPost"],
  computed: {
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
      if (this.$route.name === "post_posts") {
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
    },
    gestureUser() {
      return this.$store.getters.gestureUser;
    },
    gestureCursorMenuUser() {
      return this.$store.getters.gestureCursorMenuUser;
    },
    post() {
      return this.$store.getters.defaultPost;
    },
    postGroupGroupsSelected() {
      return this.$store.getters.postGroupGroupsSelected;
    },
    postGroupPagesSelected() {
      return this.$store.getters.postGroupPagesSelected;
    }
  },
  filters: {
    getFirstLetter(string) {
      if (typeof string == "undefined") return;
      if (string.length == 0) return;
      return string.charAt(0).toUpperCase();
    }
  },
  methods: {
    showDropdownFilterPost() {
      this.isShowDropdownFilterPost = true;
    },
    closeDropdownFilterPost() {
      this.isShowDropdownFilterPost = false;
    },
    showPopupCreateNewCategory() {
      this.isShowPopupCreateNewCategory = true;
    },
    showPopupCreateNewPost() {
      this.isShowPopupCreateNewPost = true;
    },
    showPopupAddAccountFb() {
      this.isShowPopupAddAccountFb = true;
    },
    showPopupCreateNewCampaign() {
      this.isShowPopupCreateNewCampaign = true;
    },
    showPopupAddGroup() {
      this.isShowPopupAddGroup = true;
    },
    showPopupHistory() {
      this.isShowPopupHistory = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>
