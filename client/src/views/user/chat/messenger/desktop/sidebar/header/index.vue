<template>
  <div class="header d_flex align_items_center justify_content_between">
    <div class="left" :style="{backgroundImage: 'url('+srcDefault+')'}">
    </div>
    <div class="desc">Messenger</div>
    <div class="right d_flex align_items_center position_relative">
      <div class="icon mr_2" @click="isShowAction = true">
        <icon-base
          icon-name="menu"
          width="24"
          height="24"
          viewBox="0 0 265 265"
        >
          <icon-setting />
        </icon-base>
      </div>
      <div class="icon">
        <icon-base
          icon-name="menu"
          width="24"
          height="24"
          viewBox="0 0 23 23"
        >
          <icon-edit />
        </icon-base>
      </div>
      <!-- Start: More Option Messenger -->
      <div class="action position_absolute" v-if="isShowAction === true" v-click-outside="close">
        <div class="item">Cài đặt</div>
        <div class="item">Trợ giúp</div>
        <div class="item">Báo cáo sự cố</div>
        <div class="item">Đăng xuất</div>
      </div>
      <!-- End: More Option Messenger -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      srcDefault: "https://images-na.ssl-images-amazon.com/images/I/81fd-3Fdc5L.jpg",
      isShowAction: false
    }
  },
  methods: {
    close() {
      this.isShowAction = false;
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
