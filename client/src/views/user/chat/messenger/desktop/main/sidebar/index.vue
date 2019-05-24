<template>
  <div role="right">
    <vue-perfect-scrollbar ref="infoBar" :style="{ height: windowHeight + 'px' }">
      <div role="wrap" aria-label="wrap of right sidebar">
        <!--Start: Info-->
        <div class="info d_flex flex_column align_items_center py_3 px_3">
          <div class="img"></div>
          <h2>Liu Kang</h2>
          <div role="time">Hoạt động từ thời xa xưa</div>
        </div>
        <!--End: Info-->

        <!--Start: Option more-->
        <app-option />
        <!--End: Option more-->

        <!--Start: Support other-->
        <div class="suport">

        </div>
        <!--End: Support other-->

        <!--Start: image shared-->
        <div class="shared">
          <app-shared/>
        </div>
        <!--End: image shared-->
      </div>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import AppOption from "./option";
import AppShared from "./shared";
export default {
  components: {
    AppOption,
    AppShared
  },
  data() {
    return {
      windowHeight: 0
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowHeight);
      this.getWindowHeight()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowHeight);
  },
  methods: {
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight - 60;
    }
  }
}
</script>

<style lang="scss" scoped>
div[role="right"] {
  div[role="wrap"] {
    box-sizing: border-box;
    margin: 0 auto;
    padding-top: 14px;
  }
  .info {
    padding: 0 14px 16px 14px;
    word-break: break-word;
    .img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #00c853;
    }
  }
}
</style>
