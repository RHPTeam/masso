<template>
  <div class="popup">
    <!-- Start: Header -->
    <div class="popup--header position_relative mx_3 pt_2">
      <div class="popup--title text_center mt_1">Thêm nội dung nâng cao</div>
      <div class="btn--close position_absolute"
           @click.prevent="closePopup"
      >
        <icon-base
          class="icon--close"
          icon--name="Hủy"
          height="12px"
          width="12px"
          viewBox="0 0 20 20"
        >
          <icon-close></icon-close>
        </icon-base>
      </div>
    </div>
    <!-- End: Header -->
    <!-- Start: Body -->
    <div class="popup--body mx_3">
      <!-- Start: Beginning -->
      <div class="form--group">
        <div class="title mb_2">
          Mở bài
        </div>
        <multiselect
          label="title"
          class="form--control"
          placeholder="Chọn danh mục mở bài"
        ></multiselect>
      </div>
      <!-- End: Beginning -->
      <!-- Start: Ending -->
      <div class="form--group mt_3">
        <div class="title mb_2">
          Kết bài
        </div>
        <multiselect
          label="title"
          class="form--control"
          placeholder="Chọn danh mục mở bài"
        ></multiselect>
      </div>
      <!-- End: Ending -->
    </div>
    <!-- End: Body -->
    <!-- Start: Footer -->
    <div class="popup--footer mx_3">
      <div class="d_flex justify_content_end">
        <button class="btn btn_success save" @click="submit">Thêm</button>
      </div>
    </div>
    <!-- End: Footer -->
  </div>
</template>

<script>
export default {
  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    },
    submit() {

    }
  }
}
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
