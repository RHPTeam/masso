<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title--small mt_2">{{ title }} {{ groupTarget.name }}</div>
          <div
            class="desc mt_3"
          >Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xóa không?</div>
        </div>
        <div class="modal--footer d_flex justify_content_between align_items_center">
          <button class="btn-skip" @click="closePopup">HỦY</button>
          <button class="btn-submit">XÓA</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "../style";
@import "./index.style"
</style>
