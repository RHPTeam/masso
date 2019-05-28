<template>
  <div class="avatar--wrapper">
    <!-- Start: Wrapper Top -->
    <div class="wrapper--top position_relative d_flex align_content_center">
      <div class="title">Ảnh đại diện</div>
      <div class="change--icon ml_auto">
        <div class="icon" @click="isDropZone = true">
          <icon-base icon-name viewBox="0 0 20 20">
            <icon-edit />
          </icon-base>
        </div>
      </div>
      <!--Start: Dropzone Component-->
    <dropzone :status="isDropZone" @close="isDropZone = $event" />
    <!--End: Dropzone Component-->
    </div>
    <!-- End: Wrapper Top -->
    <!-- Start: Wrapper Content -->
    <div v-if="!user"></div>
    <div v-else class="wrapper--content">
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
  </div>
</template>

<script>
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
  props: [ "user" ],
  data() {
    return {
      isDropZone: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import "style";
</style>
