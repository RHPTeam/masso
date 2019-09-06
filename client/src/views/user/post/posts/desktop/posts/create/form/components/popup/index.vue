<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content py_4 px_4">
        <!-- Start: Modal Header -->
        <div class="header mb_3">
          <div class="title text_center mb_3">Cảnh báo</div>
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div class="body">
          <div class="danger mb_3">Ảnh bạn sử dụng vượt quá dung lượng cho phép trên hệ thống, vui lòng sử dụng một ảnh khác để thay thế.</div>
          <div class="desc">
            Khuyên dùng: Để nâng cao trải nghiệm của bạn trên hệ thống, bạn nên sử dụng những hình ảnh có dung lượng không quá 4MB.
          </div>
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center justify_content_between mt_3">
          <div></div>
          <button @click="closePopup">Đóng</button>
        </div>
        <!-- End: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "index.style";
</style>
