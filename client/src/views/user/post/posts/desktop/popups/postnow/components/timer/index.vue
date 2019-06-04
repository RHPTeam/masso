<template>
  <!--Section option hours-->
  <div class="timer--wrapper" :data-theme="currentTheme" >
    <div class="title mb_2">Thời gian chờ giữa các lần gửi</div>
    <div class="d_flex align_items_center justify_content_between">
      <!-- Start: Input Group -->
      <div class="input--group d_flex">
        <!-- Start: Input -->
        <div class="input--item d_flex align_items_center">
          <input class="text_center mr_2"
                 type="number"
                 min="0"
                 v-model="postBreakPoint">
          <span class="unit">phút</span>
        </div>
        <!-- End: Input -->
      </div>
      <!-- End: Input Group -->
      <!-- Start: Information -->
      <div class="information d_flex align_items_center pl_5">
        <div class="information--text mr_2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius mod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <div class="information--icon d_flex ml_auto">
          <icon-base
            class="icon--info"
            width="14"
            height="14"
            viewBox="0 0 18 18"
          >
            <icon-info/>
          </icon-base>
        </div>
      </div>
      <!-- End: Information -->
    </div>
  </div>
  <!--End Section option hours-->
</template>

<script>
export default {
  data() {
    return {
      postBreakPoint: 15,
      postDate: new Date(),
      postTime: {
        HH: new Date().getHours(),
        mm: new Date().getMinutes()
      },
      isActiveHeightPopupTimer: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },

  methods: {
    updatePostDate( date ) {
      this.postDate = date;
    },
    updatePostTime( val ) {
      this.postTime = val;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>

