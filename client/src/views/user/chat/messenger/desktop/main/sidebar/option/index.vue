<template>
  <div class="option">
    <div class="option--desc">Tùy chọn</div>
    <div class="option--item d_flex justify_content_start align_items_center">
      <div class="option--item-name">Tìm kiếm tin nhắn</div>
      <div class="option--item-icon ml_auto">
        <icon-base
          icon-name="input-search"
          width="20"
          height="20"
          viewBox="0 0 16.772 17.287"
        >
          <icon-input-search />
        </icon-base>
      </div>
    </div>
    <div class="option--item d_flex justify_content_start align_items_center"
    >
      <div class="option--item-name">Xóa cuộc trò chuyện</div>
      <div class="option--item-icon ml_auto">
        <icon-base
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 16.772 17.287"
        >
          <icon-remove />
        </icon-base>
      </div>
    </div>

    <!--*********** POPUP *************-->
<!--    <transition name="popup">-->
<!--      <delete-conversation-popup-->
<!--        v-if="isShowDeletePopup === true"-->
<!--        :data-theme="currentTheme"-->
<!--        :isShowDeletePopup="isShowDeletePopup"-->
<!--        @closeAddPopup="isShowDeletePopup = $event"-->
<!--      />-->
<!--    </transition>-->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .option {
    padding: 20px;
    border-bottom: 1px solid #e4e4e4;
    .option--desc {
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      margin-top: -5px;
      text-transform: uppercase;
    }
    .option--item {
      cursor: pointer;
      font-size: 14px;
      margin-top: 20px;
      .option--item-icon {
        color: #ffb94a;
        margin-right: 10px;
        height: 20px;
      }
      .option--item-name {
        font-size: 14px;
      }
    }
  }
  /* ChangeColor */
  // Light
  .option[data-theme="light"] {
    border-color: #e4e4e4;
    .option--desc {
      color: #999;
    }
    .option--item-name {
      color: #444;
    }
  }

  //Dark
  .option[data-theme="dark"] {
    border-color: #444;
    .option--desc {
      color: #ccc;
    }
    .option--item-name {
      color: #f7f7f7;
    }
  }
</style>
