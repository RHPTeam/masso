<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content">
        <!-- Start: Modal Header -->
        <app-header
          :event="event"
          @close="$emit( 'close', $event )"
        />
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div class="body" v-if="event">
          <custom-post />
        </div>
        <!-- End: Modal Body -->
        <div class="bottom d_flex align_items_center justify_content_end py_4 px_3">
          <div class="left position_relative mr_3">
            <label @click="isShowOptionTime = true">Tùy chỉnh thời gian đăng</label>
            <div class="select--time position_absolute" v-if="isShowOptionTime === true">
              <select-time @close="isShowOptionTime = $event" />
            </div>
          </div>
          <div class="right">
            <label>Tạo mới</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/header/index";
import CustomPost from "./components/custompost";
import SelectTime from "./components/time";

export default {
  components: {
    AppHeader,
    CustomPost,
    SelectTime
  },
  data() {
    return {
      isShowOptionTime: false
    }
  },
  // data () {
  //   return {
  //     isTypeEvent: false,
  //   }
  // },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    event() {
      return this.$store.getters.event;
    }
  },
  methods: {
    close() {
      this.isShowOptionTime = false;
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "index.style";
</style>
