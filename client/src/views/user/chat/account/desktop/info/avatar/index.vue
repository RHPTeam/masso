<template>
  <div class="avatar--wrapper">
    <!-- Start: Wrapper Top -->
    <div class="wrapper--top position_relative d_flex align_content_center">
      <div class="title">{{ $t("chat.account.sidebar.title") }}</div>
      <div class="change--icon ml_auto mr_2">
        <div class="icon" @click="isDropZone = true">
          <icon-base icon-name="Chỉnh sửa" viewBox="0 0 20 20">
            <icon-edit />
          </icon-base>
        </div>
      </div>
      <div class="icon remove--avatar" @click="isShowDeleteCampaignPopup = true">
        <icon-base width="20" height="20" viewBox="0 0 15 15">
          <icon-remove />
        </icon-base>
      </div>
      <!--Start: Dropzone Component-->
    <!-- <dropzone :status="isDropZone" @close="isDropZone = $event" /> -->
      <div class="position_absolute file--avatar">
        <input type="file" id="useravatar">
      </div>
    <!--End: Dropzone Component-->
    </div>
    <!-- End: Wrapper Top -->
    <!-- Start: Wrapper Content -->
    <div class="wrapper--content">
      <!-- Start: Content Avatar -->
      <div class="content--avatar position_relative" v-if="user.imageAvatar">
        <div
          class="avatar--bg d_flex justify_content_center align_items_center"
          :style="{
            backgroundImage: 'url(' + user.imageAvatar + ')'
          }"
        ></div>
        <div
          class="avatar--img position_absolute"
          :style="{
            backgroundImage: 'url(' + user.imageAvatar + ')'
          }"
        ></div>
      </div>
      <!-- End: Content Avatar -->
      <!-- Start: Content Default -->
      <div class="content--default position_relative" v-else>
        <div
          class="default--bg d_flex justify_content_center align_items_center"
        ></div>
        <div
          class="default--img position_absolute d_flex justify_content_center align_items_center"
        >
          {{ user.name | getFirstLetter }}
        </div>
      </div>
      <!-- End: Content Default -->
    </div>
    <!-- End: Wrapper Content -->

    <!-- Start: Popup Delete Avatar -->
    <transition name="popup">
      <delete-campaign-popup
        v-if="isShowDeleteCampaignPopup === true"
        :data-theme="currentTheme"
        title="Xoá Avatar"
        @closePopup="isShowDeleteCampaignPopup = $event"
        storeActionName="deleteAvatar"
        typeName="avatar"
      ></delete-campaign-popup>
    </transition>
    <!-- End: Popup Delete Avatar -->
  </div>
</template>

<script>
import DeleteCampaignPopup from "@/components/popups/delete";

export default {
  filters: {
    getFirstLetter( string ) {
      if ( typeof string == "undefined" ) {
        return;
      }
      if ( string.length === 0 ) {
        return;
      }
      return string.charAt( 0 ).toUpperCase();
    }
  },
  components: {
    DeleteCampaignPopup
  },
  props: [ "user" ],
  data() {
    return {
      isDropZone: false,
      isShowDeleteCampaignPopup: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }    
  }

};
</script>

<style lang="scss" scoped>
@import "style";
</style>
