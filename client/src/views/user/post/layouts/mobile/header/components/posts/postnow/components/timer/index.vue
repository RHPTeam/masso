<template>
  <!--Section option hours-->
  <div class="timer--wrapper" :data-theme="currentTheme" >
    <div class="title mb_2">Thời gian chờ giữa các lần đăng <i class="note">( ít nhất 5 phút )</i></div>
    <div class="d_flex align_items_center justify_content_between">
      <!-- Start: Input Group -->
      <div class="input--group d_flex">
        <!-- Start: Input -->
        <div class="input--item d_flex align_items_center">
          <input class="text_center mr_2"
                 type="number"
                 min="5"
                 v-model="postSchedule.breakPoint"
                 @input="updatePostSchedule"
          >
          <span class="unit">phút</span>
        </div>
        <!-- End: Input -->
      </div>
      <!-- End: Input Group -->
      <!-- Start: Information -->
      <div class="information d_flex align_items_center pl_5">
        <div class="information--text mr_2">
          <i>Để tránh sự cố tiêu chuẩn cộng đồng trên facebook bạn nên xét thời gian giữa các lần đăng cho hợp lý</i>
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
  props: [ "postSchedule" ],
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    updatePostSchedule() {
      this.$emit( "updatePostSchedule", this.postSchedule );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>

