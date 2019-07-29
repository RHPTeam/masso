<template>
  <div class="header--mobile position_relative" :data-theme="currentTheme">
    <transition name="popup--mobile">
      <app-sidebar-mobile
        v-if="isShowPopup === true"
        :data-theme="currentTheme"
        :popupData="isShowPopup"
        @closePopup="isShowPopup = $event"
      />
      <popup-create-agency
        v-if="isShowPopupCreateAgency === true"
        @closePopup="isShowPopupCreateAgency = $event"
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
      <setup-info 
        v-if="isShowPopupSetupInfo === true"
        @closePopup="isShowPopupSetupInfo = $event"
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
          <div
            class="all-posts d_flex align_items_center"
            v-if="gestureUser === 11 || gestureUser === 14"
          >
            <!-- <div class="action mr_1" @click="showPopupHistory">
              <icon-base icon-name="History" width="24" height="24" viewBox="0 0 480 480">
                <icon-history />
              </icon-base>
            </div>-->
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

        <!-- Start: Action in Agency -->
        <div class="add action account--fb" v-if="this.$route.name === 'post_agency'">
          <span @click="showPopupSetupInfo">
            <icon-base
              class="icon--setting mr_2"
              icon-name="menu"
              width="24"
              height="24"
              viewBox="0 0 265 265"
            >
              <icon-setting />
            </icon-base>
          </span>
          <span @click="showPopupCreateAgency">
            <icon-base icon-name="Add" width="24" height="24" viewBox="0 0 68 68">
              <icon-plus />
            </icon-base>
          </span>
        </div>
        <!-- End: Action in Agency -->
      </div>
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
<script src="./index.script.js">
</script>
<style lang="scss" scoped>
@import "./index.style";
.upgrade-pro-popup {
  background: none !important;
  box-shadow: none !important;
  z-index: 99 !important;
}
</style>
