<template>
  <div class="avatar--wrapper">
    <div v-if="user.imageAvatar">
      <div class="user--info d_flex flex_column justify_content_center align_items_center mt_3">
        <div
          class="user--info-avatar"
          :style="{
                backgroundImage: 'url(' + user.imageAvatar + ')'
              }"
        ></div>
        <div class="user--info-title mt-2">{{ user.name }}</div>
        <div class="user--info-sub mb_3">{{ user.email }}</div>
      </div>
      <!--End: User Info Component-->
      <div
        class="popup--wrap-head position_absolute"
        :style="{
              backgroundImage: 'url(' + user.imageAvatar + ')'
            }"
      ></div>
    </div>
    <div v-else>
      <div class="user--info d_flex flex_column justify_content_center align_items_center mt_3">
        <div
          class="user--info-avatar text_center d_flex align_items_center justify_content_center"
        >{{ user.name | getFirstLetter }}</div>
        <div class="user--info-title mt-2">{{ user.name }}</div>
        <div class="user--info-sub mb_3">{{ user.email }}</div>
      </div>
      <!--End: User Info Component-->
      <div class="popup--wrap-head position_absolute"></div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    getFirstLetter(string) {
      if (typeof string == "undefined") {
        return;
      }
      if (string.length === 0) {
        return;
      }
      return string.charAt(0).toUpperCase();
    }
  },
  props: ["user"],
  data() {
    return {
      isDropZone: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
  .popup--wrap-head {
    // top: -62%;
    // left: calc(-1 * (400px - (100vw/2)));
    // z-index: -1;
    // width: 800px;
    // height: 800px;
    // border-radius: 50%;
    // background-color: #ffb94a;
    // background-position: center;
    // background-size: cover;
    // opacity: .5;
  }
.user--info {
  position: relative;
    color: #ffffff;
      .user--info-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #ffb94a;
        background-position: center;
        background-size: cover;
        font-size: 80px;
        font-weight: 800;
        color: #444444;
      }
    .user--info-title {
      font-size: 24px;
      font-weight: 700;
    }
    .user--info-sub {
      font-size: 14px;
    }
  }
</style>
